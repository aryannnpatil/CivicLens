/**
 * services/aiService.js
 * HTTP client wrapper for the Python Flask AI microservice.
 * Uses axios — base URL read from environment.
 */
const axios = require('axios');

const AI_BASE = process.env.AI_SERVICE_URL || 'http://localhost:5001';

/**
 * classify(text, imageUrl?)
 * Sends issue description (and optional image URL) to the AI service
 * and returns { label, confidence }.
 *
 * @param {string} text       - Issue description text
 * @param {string} [imageUrl] - Public Azure Blob URL for image classification
 * @returns {{ label: string, confidence: number }}
 */
const classify = async (text, imageUrl = null) => {
  // TODO: implement once Flask /classify endpoint is ready
  const response = await axios.post(`${AI_BASE}/classify`, { text, imageUrl });
  return response.data;
};

module.exports = { classify };
