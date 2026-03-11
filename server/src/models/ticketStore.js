const tickets = [];

let nextId = 1;

function createSeedTicket({
    description,
    photoUrl,
    longitude,
    latitude,
    aiCategory,
    aiConfidence,
    severityScore,
    status,
}) {
    return {
        id: String(nextId++),
        description,
        photoUrl,
        location: {
            type: 'Point',
            coordinates: [longitude, latitude],
        },
        aiCategory,
        aiConfidence,
        severityScore,
        status,
        createdAt: new Date().toISOString(),
    };
}

function seedTickets() {
    if (tickets.length > 0) {
        return;
    }

    tickets.push(
        createSeedTicket({
            description: 'Large pothole near City Mall signal causing traffic slowdown.',
            photoUrl: 'https://example.com/issues/pothole-city-mall.jpg',
            longitude: 77.5946,
            latitude: 12.9716,
            aiCategory: 'pothole',
            aiConfidence: 0.93,
            severityScore: 8,
            status: 'open',
        }),
        createSeedTicket({
            description: 'Garbage overflow near community park entrance for 2 days.',
            photoUrl: 'https://example.com/issues/garbage-park.jpg',
            longitude: 72.8777,
            latitude: 19.076,
            aiCategory: 'garbage',
            aiConfidence: 0.89,
            severityScore: 6,
            status: 'in_progress',
        }),
        createSeedTicket({
            description: 'Streetlight not working on Ring Road after 8 PM.',
            photoUrl: 'https://example.com/issues/broken-streetlight-ring-road.jpg',
            longitude: 78.4867,
            latitude: 17.385,
            aiCategory: 'broken_streetlight',
            aiConfidence: 0.9,
            severityScore: 5,
            status: 'open',
        })
    );
}

function getAllTickets() {
    return tickets;
}

function createTicket({ description, photoUrl, longitude, latitude }) {
    const newTicket = {
        id: String(nextId++),
        description: description || '',
        photoUrl,
        location: {
            type: 'Point',
            coordinates: [longitude, latitude],
        },
        aiCategory: 'unclassified',
        aiConfidence: 0,
        severityScore: 5,
        status: 'open',
        createdAt: new Date().toISOString(),
    };

    tickets.push(newTicket);
    return newTicket;
}

function updateTicketStatus(id, status) {
    const ticket = tickets.find((item) => item.id === String(id));
    if (!ticket) {
        return null;
    }

    ticket.status = status;
    return ticket;
}

module.exports = {
    seedTickets,
    getAllTickets,
    createTicket,
    updateTicketStatus,
};
