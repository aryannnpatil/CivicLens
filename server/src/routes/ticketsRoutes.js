const express = require('express');
const { getTickets, postTicket, patchTicketStatus } = require('../controllers/ticketsController');

const router = express.Router();

router.get('/tickets', getTickets);
router.post('/tickets', postTicket);
router.patch('/tickets/:id', patchTicketStatus);

module.exports = router;
