/**
 * config/cors.js
 *
 * Dynamic CORS configuration driven by FRONTEND_URL env var.
 * Rejects requests from unlisted origins in production.
 *
 * Usage in server.js:
 *   const corsOptions = require('./config/cors');
 *   app.use(cors(corsOptions));
 */

const ALLOWED_ORIGINS_DEV = [
  'http://localhost:3000',   // React dev server
  'http://localhost:5173',   // Vite dev server (if used)
  'http://127.0.0.1:3000',
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server calls (no Origin header) in dev
    if (!origin && process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }

    const allowed =
      process.env.NODE_ENV === 'production'
        ? [process.env.FRONTEND_URL]          // only the deployed frontend
        : ALLOWED_ORIGINS_DEV;

    if (allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    }
  },
  credentials: true,          // allow cookies / Authorization headers
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = corsOptions;
