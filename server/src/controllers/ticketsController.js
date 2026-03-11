const { getAllTickets, createTicket, updateTicketStatus } = require('../models/ticketStore');

const ALLOWED_STATUS = ['open', 'in_progress', 'resolved'];

function getTickets(req, res) {
    const tickets = getAllTickets();
    return res.status(200).json({
        success: true,
        count: tickets.length,
        data: tickets,
    });
}

function postTicket(req, res) {
    const { description, photoUrl, longitude, latitude } = req.body;

    if (!photoUrl || longitude === undefined || latitude === undefined) {
        return res.status(400).json({
            success: false,
            error: 'photoUrl, longitude, and latitude are required.',
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

    const ticket = createTicket({
        description,
        photoUrl,
        longitude: parsedLongitude,
        latitude: parsedLatitude,
    });

    return res.status(201).json({
        success: true,
        data: ticket,
    });
}

function patchTicketStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !ALLOWED_STATUS.includes(status)) {
        return res.status(400).json({
            success: false,
            error: 'status must be one of: open, in_progress, resolved.',
        });
    }

    const updated = updateTicketStatus(id, status);
    if (!updated) {
        return res.status(404).json({
            success: false,
            error: 'Ticket not found.',
        });
    }

    return res.status(200).json({
        success: true,
        data: updated,
    });
}

module.exports = {
    getTickets,
    postTicket,
    patchTicketStatus,
};
