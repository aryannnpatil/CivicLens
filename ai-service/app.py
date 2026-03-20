from flask import Flask, request, jsonify
from transformers import pipeline
from PIL import Image
import io

app = Flask(__name__)

# Load the model once when the server starts
print("Loading AI Model...")
classifier = pipeline("zero-shot-image-classification", model="openai/clip-vit-base-patch32")

LABEL_MAPPING = {
    "a severe pothole, broken tarmac, or heavily damaged road surface": "Pothole",
    "an overflowing garbage bin, litter, or pile of trash dumped on the street": "Garbage Dump",
    "a flooded street, stagnant water, or severe road waterlogging": "Waterlogging",
    "dangerous hanging electrical wires, tangled cables, or fallen poles": "Electrical Hazard",
    "overflowing sewage, dirty water, or an open, blocked drainage system": "Open/Blocked Drain",
    "a clean, normal, and well-maintained street with no visible issues": "Clean Street"
}
ai_descriptions = list(LABEL_MAPPING.keys())

# Define severity levels for the AI to choose from
SEVERITY_PROMPTS = [
    "minor or small issue, low impact",        # Score: 1-3
    "moderate damage or noticeable issue",    # Score: 4-6
    "severe, dangerous, or high-risk issue",  # Score: 7-9
    "extreme emergency or life-threatening"    # Score: 10
]


@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "ok",
        "service": "civiclens-ai",
        "modelLoaded": classifier is not None
    })

@app.route('/classify', methods=['POST'])
def classify_image():
    if 'image' not in request.files:
        return jsonify({"success": False, "error": "No image uploaded"}), 400
    
    file = request.files['image']
    img = Image.open(io.BytesIO(file.read()))

    # 1. Identify Category
    cat_preds = classifier(img, candidate_labels=ai_descriptions)
    top_cat = cat_preds[0]
    final_category = LABEL_MAPPING[top_cat['label']]
    confidence = top_cat['score']

    # 2. Analyze Visual Severity - How bad is THIS specific problem?
    # Use more granular and specific severity descriptions
    severity_descriptions = [
        # 1-2: Minimal
        "a tiny, barely visible defect or mark with no real impact",
        "a very minor issue that is hardly noticeable and poses no risk",
        # 3-4: Low
        "a small problem that is visible but causes minimal inconvenience",
        "a minor issue that is noticeable but not concerning",
        # 5-6: Medium
        "a moderate problem with visible damage that needs attention",
        "a clear issue with noticeable damage or deterioration",
        # 7-8: High
        "a significant problem with substantial damage requiring urgent repair",
        "a serious issue with major damage posing safety concerns",
        # 9-10: Critical
        "a severe and dangerous problem with extensive damage requiring immediate action",
        "a catastrophic situation with extreme damage posing imminent danger"
    ]
    
    # Use zero-shot classification to determine visual severity
    sev_preds = classifier(img, candidate_labels=severity_descriptions)
    
    # Get top 3 predictions and their scores
    top_3_severities = sev_preds[:3]
    
    # Calculate weighted severity score based on top predictions
    total_weight = 0
    weighted_sum = 0
    
    for pred in top_3_severities:
        severity_index = severity_descriptions.index(pred['label'])
        severity_value = severity_index + 1  # Convert 0-9 index to 1-10 score
        weight = pred['score']
        
        weighted_sum += severity_value * weight
        total_weight += weight
    
    # Calculate final severity as weighted average
    if total_weight > 0:
        severity_score = round(weighted_sum / total_weight)
    else:
        severity_score = 5  # Default to medium if something goes wrong
    
    # Get the confidence of the top severity prediction
    severity_confidence = top_3_severities[0]['score']
    
    # Ensure severity is between 1 and 10
    severity_score = max(1, min(10, severity_score))

    return jsonify({
        "success": True,
        "category": final_category,
        "confidence": round(float(confidence), 2),
        "severity": severity_score,
        "severity_confidence": round(float(severity_confidence), 2)
    })

if __name__ == '__main__':
    # Using 0.0.0.0 makes the server accessible on your local network
    # Change port to 5005 to avoid common conflicts with Windows AirPlay/Services
    app.run(host='0.0.0.0', port=5000, debug=False)