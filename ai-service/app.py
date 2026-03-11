"""
app.py — Flask AI Microservice entry point
Classifies civic issues by category using text (and optionally image) input.
"""
import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'service': 'ai-service'}), 200


@app.route('/classify', methods=['POST'])
def classify():
    """
    Request body: { "text": "...", "imageUrl": "..." (optional) }
    Response:     { "label": "road", "confidence": 0.92 }
    TODO: load model and implement classification logic
    """
    data = request.get_json()
    text = data.get('text', '')
    image_url = data.get('imageUrl', None)

    # Placeholder response — replace with real model inference
    return jsonify({'label': 'uncategorized', 'confidence': 0.0}), 200


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)
