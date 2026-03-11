require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const ticketRoutes = require('./src/routes/ticketsRoutes');
const authRoutes = require('./src/routes/authRoutes');
const azureTestRoutes = require('./src/routes/azureTestRoutes');
const { seedTickets } = require('./src/models/ticketStore');
const { seedAdmin } = require('./src/models/adminStore');

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
app.use('/api/auth', authRoutes);
app.use('/api', azureTestRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'civiclens-api' });
});

// ========================
// Start Server — connect MongoDB then listen
// ========================
seedTickets();
seedAdmin();

const MONGO_URI = process.env.MONGO_URI;

async function startServer() {
    if (MONGO_URI) {
        try {
            await mongoose.connect(MONGO_URI);
            console.log('MongoDB connected');
        } catch (err) {
            console.error('MongoDB connection failed — running without persistence:', err.message);
        }
    } else {
        console.warn('MONGO_URI not set — MongoDB persistence disabled');
    }

    const server = app.listen(PORT, () => {
        console.log('Server running');
        console.log(`Listening on http://localhost:${PORT}`);
    });

    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`Port ${PORT} is already in use.`);
            console.error('Stop the existing process on that port or set a different PORT in .env.');
            process.exit(1);
        }
        throw error;
    });
}

startServer();


