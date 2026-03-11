const { getAllTickets, createTicket, updateTicketStatus, getStats } = require('../models/ticketStore');
const { uploadBufferToBlob } = require('../utils/blobUpload');
const { classifyImageFromUrl } = require('../utils/aiClassifier');
const TicketModel = require('../../models/Ticket');
const mongoose = require('mongoose');

const ALLOWED_STATUS = ['open', 'in_progress', 'resolved'];

function getTickets(req, res) {
    const { status, category, sort } = req.query;
    let tickets = [...getAllTickets()];

    if (status) {
        tickets = tickets.filter((ticket) => ticket.status === status);
    }

    if (category) {
        tickets = tickets.filter((ticket) => ticket.aiCategory === category);
    }

    // sort=severity → severityScore desc; no sort → createdAt desc
    const sortMap = { severity: 'severityScore' };
    const resolvedField = sort ? (sortMap[sort] || sort) : 'createdAt';
    const sortDirection = sort ? -1 : -1; // both cases descending

    const sortableFields = new Set(['severityScore', 'createdAt']);
    if (sortableFields.has(resolvedField)) {
        tickets.sort((a, b) => {
            if (resolvedField === 'createdAt') {
                return (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            }
            return (b[resolvedField] - a[resolvedField]);
        });
    }

    return res.status(200).json({
        success: true,
        count: tickets.length,
        data: tickets,
    });
}

async function postTicket(req, res) {
    const { description, longitude, latitude } = req.body;
    const uploadedPhoto = req.file;

    // ── 1. Validate required fields ──────────────────────────────
    if (!uploadedPhoto && !req.body.photoUrl) {
        return res.status(400).json({
            success: false,
            error: 'A photo file (multipart) or photoUrl (JSON) is required.',
        });
    }
    if (longitude === undefined || latitude === undefined) {
        return res.status(400).json({
            success: false,
            error: 'longitude and latitude are required.',
        });
    }
    const parsedLongitude = Number(longitude);
    const parsedLatitude = Number(latitude);
    if (Number.isNaN(parsedLongitude) || Number.isNaN(parsedLatitude)) {
        return res.status(400).json({
            success: false,
            error: 'longitude and latitude must be valid numbers.',
        });
    }

    // ── 2. Upload image to Azure Blob Storage ─────────────────────
    let photoUrl = req.body.photoUrl || null;
    if (uploadedPhoto) {
        try {
            const { blobUrl } = await uploadBufferToBlob({
                buffer: uploadedPhoto.buffer,
                originalName: uploadedPhoto.originalname,
                mimeType: uploadedPhoto.mimetype,
            });
            photoUrl = blobUrl;
        } catch (azureErr) {
            console.error('Azure upload failed:', azureErr.message);
            return res.status(500).json({
                success: false,
                error: 'Image upload to Azure failed.',
            });
        }
    }

    // ── 3. AI classification (with fallback) ──────────────────────
    let aiCategory = 'unclassified';
    let aiConfidence = 0;
    let severityScore = 5;
    try {
        const aiResult = await classifyImageFromUrl(photoUrl);
        if (aiResult && aiResult.category) {
            aiCategory = aiResult.category;
            aiConfidence = aiResult.confidence ?? 0;
            severityScore = aiResult.severity ?? 5;
        }
    } catch (aiErr) {
        console.warn('AI classification failed, using fallback values:', aiErr.message);
    }

    // ── 4. Save to MongoDB (if connected) ─────────────────────────
    let mongoId = null;
    if (mongoose.connection.readyState === 1) {
        try {
            const doc = await TicketModel.create({
                description: description || '',
                photoUrl,
                location: {
                    type: 'Point',
                    coordinates: [parsedLongitude, parsedLatitude],
                },
                aiCategory,
                aiConfidence,
                severityScore,
                status: 'open',
            });
            mongoId = doc._id;
        } catch (dbErr) {
            console.error('MongoDB save failed:', dbErr.message);
            return res.status(500).json({
                success: false,
                error: 'Failed to save ticket to database.',
            });
        }
    }

    // ── 5. Sync in-memory store (keeps GET endpoints consistent) ──
    const ticket = createTicket({
        description,
        photoUrl,
        longitude: parsedLongitude,
        latitude: parsedLatitude,
        aiCategory,
        aiConfidence,
        severityScore,
        mongoId,
    });

    return res.status(201).json({
        success: true,
        data: ticket,
    });
}

async function patchTicketStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    // ── 1. Update in-memory store ──────────────────────────────────
    const updated = updateTicketStatus(id, status);

    // ── 2. Persist to MongoDB if connected ────────────────────────
    if (mongoose.connection.readyState === 1) {
        try {
            const mongoDoc = await TicketModel.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            );
            if (!mongoDoc && !updated) {
                return res.status(404).json({ success: false, error: 'Ticket not found.' });
            }
        } catch {
            // id may be an in-memory string id, not a Mongo ObjectId — fallback silently
        }
    }

    if (!updated) {
        return res.status(404).json({ success: false, error: 'Ticket not found.' });
    }

    return res.status(200).json({ success: true, data: updated });
}

async function getTicketById(req, res) {
    const { id } = req.params;

    // Try MongoDB first
    if (mongoose.connection.readyState === 1) {
        try {
            const doc = await TicketModel.findById(id).lean();
            if (doc) {
                return res.status(200).json({ success: true, data: doc });
            }
        } catch {
            // fall through to in-memory
        }
    }

    // Fallback: in-memory store
    const ticket = getAllTickets().find((t) => t.id === id || t._id === id);
    if (!ticket) {
        return res.status(404).json({ success: false, error: 'Ticket not found.' });
    }
    return res.status(200).json({ success: true, data: ticket });
}

async function getDashboardStats(req, res) {
    if (mongoose.connection.readyState === 1) {
        try {
            const [total, open, in_progress, resolved] = await Promise.all([
                TicketModel.countDocuments(),
                TicketModel.countDocuments({ status: 'open' }),
                TicketModel.countDocuments({ status: 'in_progress' }),
                TicketModel.countDocuments({ status: 'resolved' }),
            ]);
            return res.status(200).json({ total, open, in_progress, resolved });
        } catch (err) {
            console.error('Stats MongoDB query failed:', err.message);
        }
    }
    // Fallback to in-memory counts
    return res.status(200).json(getStats());
}

module.exports = {
    getTickets,
    postTicket,
    patchTicketStatus,
    getTicketById,
    getDashboardStats,
};

