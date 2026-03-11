"""
CivicLens AI Classification Microservice
Flask server that classifies civic issue images using a pre-trained model.

Endpoints:
  POST /classify  — Accepts an image, returns {category, confidence, severity}
  GET  /health    — Health check
"""

import os
import math
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# ============================================
# Configuration
# ============================================
CATEGORIES = ['pothole', 'garbage', 'broken_streetlight', 'waterlogging', 'other']

CATEGORY_WEIGHTS = {
    'pothole': 1.0,
    'waterlogging': 0.9,
    'broken_streetlight': 0.7,
    'garbage': 0.6,
    'other': 0.5,
}

MODEL_NAME = 'MobileNetV2'  # Change to 'YOLOv8' if using ultralytics
model = None  # Will be loaded on startup


def load_model():
    """
    Load the pre-trained classification model.
    TODO: Member 3 — Replace with actual model loading.
    
    Options:
    1. MobileNetV2 (TensorFlow/Keras):
       from tensorflow.keras.applications import MobileNetV2
       model = MobileNetV2(weights='imagenet')
    
    2. YOLOv8-cls (Ultralytics):
       from ultralytics import YOLO
       model = YOLO('yolov8n-cls.pt')
    
    3. Custom fine-tuned model:
       model = torch.load('models/weights/civic_classifier.pt')
    """
    global model, MODEL_NAME
    print(f"🔄 Loading {MODEL_NAME} model...")
    
    # PLACEHOLDER: Simulates model loading
    # Replace this block with real model initialization
    model = "placeholder"
    
    print(f"✅ {MODEL_NAME} model loaded successfully")


def classify_image(image_bytes):
    """
    Run inference on the image and return civic category + confidence.
    TODO: Member 3 — Replace with actual inference logic.
    
    Expected return: (category: str, confidence: float)
    """
    # PLACEHOLDER: Returns mock classification
    # Replace with real model inference:
    #
    # image = Image.open(io.BytesIO(image_bytes)).resize((224, 224))
    # prediction = model.predict(preprocess(image))
    # category = CATEGORIES[prediction.argmax()]
    # confidence = float(prediction.max())
    
    import random
    category = random.choice(CATEGORIES)
    confidence = round(random.uniform(0.6, 0.98), 2)
    
    return category, confidence


def calculate_severity(category, confidence):
    """
    Severity = ceil(confidence × category_weight × 10)
    Range: 1–10
    """
    weight = CATEGORY_WEIGHTS.get(category, 0.5)
    severity = math.ceil(confidence * weight * 10)
    return max(1, min(10, severity))  # Clamp between 1 and 10


# ============================================
# Routes
# ============================================
@app.route('/classify', methods=['POST'])
def classify():
    """Accept an image file and return AI classification results."""
    if 'image' not in request.files:
        return jsonify({
            'success': False,
            'error': 'No image file provided. Send as multipart/form-data with key "image".'
        }), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({
            'success': False,
            'error': 'Empty filename.'
        }), 400
    
    try:
        image_bytes = file.read()
        
        # Validate it's actually an image
        Image.open(io.BytesIO(image_bytes)).verify()
        
        category, confidence = classify_image(image_bytes)
        severity = calculate_severity(category, confidence)
        
        return jsonify({
            'success': True,
            'category': category,
            'confidence': confidence,
            'severity': severity,
        }), 200
    
    except Exception as e:
        print(f"❌ Classification error: {e}")
        return jsonify({
            'success': False,
            'error': 'Classification failed.',
            'category': 'unclassified',
            'confidence': 0.0,
            'severity': 5,
        }), 500


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({
        'status': 'ok',
        'model': MODEL_NAME,
        'version': '1.0.0',
    }), 200


# ============================================
# Startup
# ============================================
if __name__ == '__main__':
    load_model()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
