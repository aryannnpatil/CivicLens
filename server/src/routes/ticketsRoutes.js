const express = require('express');
const { getTickets, postTicket, patchTicketStatus, getTicketById, getDashboardStats } = require('../controllers/ticketsController');
const { upload } = require('../config/multer');
const { validatePostTicket, validatePatchTicket } = require('../middleware/validate');

const router = express.Router();

router.get('/stats', getDashboardStats);
router.get('/tickets', getTickets);
router.get('/tickets/:id', getTicketById);
router.post('/tickets', upload.single('photo'), validatePostTicket, postTicket);
router.patch('/tickets/:id', validatePatchTicket, patchTicketStatus);

module.exports = router;
