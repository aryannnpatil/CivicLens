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
    const ticketId = String(nextId++);
    return {
        id: ticketId,
        _id: ticketId,
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
            longitude: 77.5946, latitude: 12.9716,
            aiCategory: 'pothole', aiConfidence: 0.93, severityScore: 9, status: 'open',
        }),
        createSeedTicket({
            description: 'Garbage overflow near community park entrance for 2 days.',
            photoUrl: 'https://example.com/issues/garbage-park.jpg',
            longitude: 72.8777, latitude: 19.076,
            aiCategory: 'garbage', aiConfidence: 0.89, severityScore: 6, status: 'in_progress',
        }),
        createSeedTicket({
            description: 'Streetlight not working on Ring Road after 8 PM.',
            photoUrl: 'https://example.com/issues/broken-streetlight-ring-road.jpg',
            longitude: 78.4867, latitude: 17.385,
            aiCategory: 'broken_streetlight', aiConfidence: 0.9, severityScore: 5, status: 'open',
        }),
        createSeedTicket({
            description: 'Severe waterlogging on MG Road underpass — cars stranded.',
            photoUrl: 'https://example.com/issues/waterlogging-mg-road.jpg',
            longitude: 80.2707, latitude: 13.0827,
            aiCategory: 'waterlogging', aiConfidence: 0.95, severityScore: 10, status: 'open',
        }),
        createSeedTicket({
            description: 'Pothole causing motorcycle accidents near school zone.',
            photoUrl: 'https://example.com/issues/pothole-school-zone.jpg',
            longitude: 73.8567, latitude: 18.5204,
            aiCategory: 'pothole', aiConfidence: 0.87, severityScore: 8, status: 'open',
        }),
        createSeedTicket({
            description: 'Overflowing garbage bins outside bus terminal for 3 days.',
            photoUrl: 'https://example.com/issues/garbage-bus-terminal.jpg',
            longitude: 88.3639, latitude: 22.5726,
            aiCategory: 'garbage', aiConfidence: 0.82, severityScore: 7, status: 'resolved',
        }),
        createSeedTicket({
            description: 'Three streetlights out on highway stretch near toll plaza.',
            photoUrl: 'https://example.com/issues/streetlight-highway.jpg',
            longitude: 76.2711, latitude: 10.8505,
            aiCategory: 'broken_streetlight', aiConfidence: 0.91, severityScore: 6, status: 'in_progress',
        }),
        createSeedTicket({
            description: 'Waterlogging in residential colony blocking access after rain.',
            photoUrl: 'https://example.com/issues/waterlogging-colony.jpg',
            longitude: 85.8245, latitude: 20.2961,
            aiCategory: 'waterlogging', aiConfidence: 0.88, severityScore: 7, status: 'open',
        }),
        createSeedTicket({
            description: 'Broken road surface near metro station entrance.',
            photoUrl: 'https://example.com/issues/pothole-metro.jpg',
            longitude: 72.5714, latitude: 23.0225,
            aiCategory: 'pothole', aiConfidence: 0.85, severityScore: 7, status: 'open',
        }),
        createSeedTicket({
            description: 'Illegal dumping site near river bank — health hazard.',
            photoUrl: 'https://example.com/issues/garbage-river.jpg',
            longitude: 80.9462, latitude: 26.8467,
            aiCategory: 'garbage', aiConfidence: 0.78, severityScore: 8, status: 'open',
        }),
        createSeedTicket({
            description: 'Damaged streetlight shorting during rains — electric hazard.',
            photoUrl: 'https://example.com/issues/streetlight-short.jpg',
            longitude: 77.1025, latitude: 28.7041,
            aiCategory: 'broken_streetlight', aiConfidence: 0.94, severityScore: 9, status: 'open',
        }),
        createSeedTicket({
            description: 'Flash flood waterlogging blocks main market road.',
            photoUrl: 'https://example.com/issues/waterlogging-market.jpg',
            longitude: 74.8723, latitude: 32.7266,
            aiCategory: 'waterlogging', aiConfidence: 0.92, severityScore: 9, status: 'in_progress',
        }),
        // ── Ranchi tickets ──
        createSeedTicket({
            description: 'Deep pothole on Main Road near Ranchi Railway Station.',
            photoUrl: 'https://example.com/issues/ranchi-pothole-station.jpg',
            longitude: 85.3350, latitude: 23.3432,
            aiCategory: 'pothole', aiConfidence: 0.91, severityScore: 8, status: 'open',
        }),
        createSeedTicket({
            description: 'Overflowing garbage near Firayalal Chowk, Ranchi.',
            photoUrl: 'https://example.com/issues/ranchi-garbage-firayalal.jpg',
            longitude: 85.3096, latitude: 23.3551,
            aiCategory: 'garbage', aiConfidence: 0.86, severityScore: 7, status: 'open',
        }),
        createSeedTicket({
            description: 'Streetlight out on Kanke Road for over a week.',
            photoUrl: 'https://example.com/issues/ranchi-streetlight-kanke.jpg',
            longitude: 85.3200, latitude: 23.3700,
            aiCategory: 'broken_streetlight', aiConfidence: 0.89, severityScore: 6, status: 'in_progress',
        }),
        createSeedTicket({
            description: 'Waterlogging at Lalpur Chowk after monsoon rain.',
            photoUrl: 'https://example.com/issues/ranchi-waterlogging-lalpur.jpg',
            longitude: 85.3150, latitude: 23.3600,
            aiCategory: 'waterlogging', aiConfidence: 0.93, severityScore: 9, status: 'open',
        }),
        // ── Mumbai tickets ──
        createSeedTicket({
            description: 'Massive pothole on Western Express Highway, Andheri.',
            photoUrl: 'https://example.com/issues/mumbai-pothole-andheri.jpg',
            longitude: 72.8370, latitude: 19.1136,
            aiCategory: 'pothole', aiConfidence: 0.90, severityScore: 8, status: 'open',
        }),
        createSeedTicket({
            description: 'Garbage pileup outside Dadar station west entrance.',
            photoUrl: 'https://example.com/issues/mumbai-garbage-dadar.jpg',
            longitude: 72.8430, latitude: 19.0178,
            aiCategory: 'garbage', aiConfidence: 0.84, severityScore: 7, status: 'in_progress',
        }),
        // ── Delhi tickets ──
        createSeedTicket({
            description: 'Broken streetlight near India Gate causing safety concern.',
            photoUrl: 'https://example.com/issues/delhi-streetlight-indiagate.jpg',
            longitude: 77.2295, latitude: 28.6129,
            aiCategory: 'broken_streetlight', aiConfidence: 0.92, severityScore: 8, status: 'open',
        }),
        createSeedTicket({
            description: 'Severe waterlogging at ITO intersection after rain.',
            photoUrl: 'https://example.com/issues/delhi-waterlogging-ito.jpg',
            longitude: 77.2407, latitude: 28.6280,
            aiCategory: 'waterlogging', aiConfidence: 0.88, severityScore: 9, status: 'open',
        })
    );
}

function getAllTickets() {
    return tickets;
}

function createTicket({ description, photoUrl, longitude, latitude, aiCategory, aiConfidence, severityScore, mongoId }) {
    const ticketId = mongoId ? String(mongoId) : String(nextId++);
    if (!mongoId) nextId = Math.max(nextId, Number(ticketId) + 1);
    const newTicket = {
        id: ticketId,
        _id: ticketId,
        description: description || '',
        photoUrl,
        location: {
            type: 'Point',
            coordinates: [longitude, latitude],
        },
        aiCategory: aiCategory || 'unclassified',
        aiConfidence: aiConfidence ?? 0,
        severityScore: severityScore ?? 5,
        status: 'open',
        createdAt: new Date().toISOString(),
    };

    tickets.push(newTicket);
    return newTicket;
}

function updateTicketStatus(id, status) {
    const matchId = String(id);
    const ticket = tickets.find((item) => item.id === matchId || item._id === matchId);
    if (!ticket) {
        return null;
    }

    ticket.status = status;
    return ticket;
}

function getStats() {
    const byStatus = { open: 0, in_progress: 0, resolved: 0 };
    const byCategory = {};
    let severitySum = 0;

    for (const t of tickets) {
        if (t.status in byStatus) byStatus[t.status]++;
        const cat = t.aiCategory || 'other';
        byCategory[cat] = (byCategory[cat] || 0) + 1;
        severitySum += t.severityScore || 0;
    }

    const total = tickets.length;
    const avgSeverity = total ? Math.round((severitySum / total) * 10) / 10 : 0;

    return { total, byStatus, byCategory, avgSeverity };
}

module.exports = {
    seedTickets,
    getAllTickets,
    createTicket,
    updateTicketStatus,
    getStats,
};
