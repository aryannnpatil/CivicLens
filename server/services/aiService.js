/**
 * AI Classification Service Bridge
 * TODO: Member 2 — Calls the Flask /classify endpoint
 *
 * Usage:
 *   const { classifyImage } = require('./aiService');
 *   const result = await classifyImage(imageBuffer, fileName);
 *   // result = { category: 'pothole', confidence: 0.92, severity: 10 }
 */

// const axios = require('axios');
// const FormData = require('form-data');
//
// const FLASK_URL = process.env.FLASK_API_URL || 'http://localhost:5000';
//
// async function classifyImage(buffer, fileName) {
//   try {
//     const form = new FormData();
//     form.append('image', buffer, fileName);
//
//     const { data } = await axios.post(`${FLASK_URL}/classify`, form, {
//       headers: form.getHeaders(),
//       timeout: 30000,
//     });
//
//     return {
//       category: data.category || 'unclassified',
//       confidence: data.confidence || 0,
//       severity: data.severity || 5,
//     };
//   } catch (error) {
//     console.error('⚠️ AI Service unreachable, using fallback:', error.message);
//     return { category: 'unclassified', confidence: 0, severity: 5 };
//   }
// }
//
// module.exports = { classifyImage };

module.exports = {};
