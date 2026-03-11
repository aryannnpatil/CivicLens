/**
 * config/db.js
 *
 * Selects the correct MongoDB Atlas connection string based on NODE_ENV,
 * then establishes a Mongoose connection with retry logic.
 *
 * URI selection:
 *   NODE_ENV=development  → MONGO_URI_DEV
 *   NODE_ENV=production   → MONGO_URI_PROD
 *   NODE_ENV=test         → MONGO_URI_DEV  (isolated, but same cluster)
 *   fallback              → MONGO_URI_BACKUP
 */
const mongoose = require('mongoose');

const selectURI = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return process.env.MONGO_URI_PROD;
    case 'development':
    case 'test':
      return process.env.MONGO_URI_DEV;
    default:
      console.warn('[MongoDB] Unknown NODE_ENV — falling back to BACKUP cluster');
      return process.env.MONGO_URI_BACKUP;
  }
};

const MONGOOSE_OPTIONS = {
  // Connection pool — tuned for Atlas M10
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,  // fail fast if Atlas unreachable
  socketTimeoutMS: 45000,
};

const MAX_RETRIES   = 3;
const RETRY_DELAY   = 3000; // ms

const connectDB = async (attempt = 1) => {
  const uri = selectURI();

  if (!uri) {
    console.error('[MongoDB] No connection URI found. Check your .env file.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, MONGOOSE_OPTIONS);
    console.log(
      `[MongoDB] Connected (${process.env.NODE_ENV}): ${conn.connection.host}`
    );
  } catch (err) {
    console.error(`[MongoDB] Connection error (attempt ${attempt}): ${err.message}`);

    if (attempt < MAX_RETRIES) {
      console.log(`[MongoDB] Retrying in ${RETRY_DELAY / 1000}s...`);
      await new Promise((r) => setTimeout(r, RETRY_DELAY));
      return connectDB(attempt + 1);
    }

    // All retries exhausted — try backup cluster before giving up
    if (process.env.MONGO_URI_BACKUP && attempt === MAX_RETRIES) {
      console.warn('[MongoDB] Primary failed — attempting BACKUP cluster...');
      try {
        const backup = await mongoose.connect(
          process.env.MONGO_URI_BACKUP,
          MONGOOSE_OPTIONS
        );
        console.log(`[MongoDB] Connected to BACKUP: ${backup.connection.host}`);
        return;
      } catch (backupErr) {
        console.error(`[MongoDB] BACKUP also failed: ${backupErr.message}`);
      }
    }

    process.exit(1);
  }
};

// Graceful disconnect on process termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('[MongoDB] Connection closed (SIGINT)');
  process.exit(0);
});

module.exports = connectDB;
