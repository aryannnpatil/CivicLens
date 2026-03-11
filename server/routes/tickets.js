const express = require('express');
const router = express.Router();

// TODO: Member 2 — Import controllers and middleware
// const multer = require('multer');
// const { uploadToBlob } = require('../services/blobStorage');
// const { classifyImage } = require('../services/aiService');
// const Ticket = require('../models/Ticket');

// ============================================
// POST /api/tickets — Submit a new civic issue
// ============================================
router.post('/tickets', async (req, res) => {
    // TODO: Member 2
    // 1. Receive image via multer
    // 2. Upload to Azure Blob Storage → get photoUrl
    // 3. Forward to Flask /classify → get {category, confidence, severity}
    // 4. Create Ticket in MongoDB
    // 5. Return 201 with ticket data
    res.status(501).json({ success: false, error: 'Not implemented yet' });
});

// ============================================
// GET /api/tickets — List tickets with filters
// ============================================
router.get('/tickets', async (req, res) => {
    // TODO: Member 2
    // Query params: status, category, sort, page, limit
    res.status(501).json({ success: false, error: 'Not implemented yet' });
});

// ============================================
// GET /api/tickets/:id — Get single ticket
// ============================================
router.get('/tickets/:id', async (req, res) => {
    // TODO: Member 2
    res.status(501).json({ success: false, error: 'Not implemented yet' });
});

// ============================================
// PATCH /api/tickets/:id — Update ticket status
// ============================================
router.patch('/tickets/:id', async (req, res) => {
    // TODO: Member 2
    // Accept { status: 'open' | 'in_progress' | 'resolved' }
    res.status(501).json({ success: false, error: 'Not implemented yet' });
});

// ============================================
// GET /api/stats — Dashboard aggregate stats
// ============================================
router.get('/stats', async (req, res) => {
    // TODO: Member 2
    // Return { total, byStatus, byCategory, avgSeverity }
    res.status(501).json({ success: false, error: 'Not implemented yet' });
});

module.exports = router;
