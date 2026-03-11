require('dotenv').config();
const express = require('express');
const cors = require('cors');

const ticketRoutes = require('./src/routes/ticketsRoutes');
const { seedTickets } = require('./src/models/ticketStore');

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// ========================
// Middleware
// ========================
app.use(
    cors({
        origin: [CLIENT_ORIGIN, 'http://localhost:3000'],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================
// Routes
// ========================
app.use('/api', ticketRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'civiclens-api' });
});

// ========================
// Start Server (Phase 1: In-memory data only)
// ========================
seedTickets();

app.listen(PORT, () => {
    console.log('🚀 Server running with in-memory ticket data');
    console.log(`🌐 Listening on http://localhost:${PORT}`);
});
