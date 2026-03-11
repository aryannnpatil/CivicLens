/**
 * server.js — Entry point
 * Load env → connect DB → register middleware → mount routes → listen
 */
require('dotenv').config();

const express = require('express');
const cors       = require('cors');
const corsOptions = require('./config/cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Connect to MongoDB ─────────────────────────────────────────────────────
connectDB();

// ── Global Middleware ──────────────────────────────────────────────────────
app.use(helmet());
app.use(cors(corsOptions));
console.log(`[CORS] Allowed origin: ${process.env.FRONTEND_URL || 'localhost:3000 (dev)'}`);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ─────────────────────────────────────────────────────────────────
app.use('/api/issues',  require('./routes/issueRoutes'));
app.use('/api/users',   require('./routes/userRoutes'));

// ── Health Check ───────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'backend' }));

// ── Global Error Handler ───────────────────────────────────────────────────
app.use(require('./middleware/errorHandler'));

// ── Start ──────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[backend] running on http://localhost:${PORT}`);
});
