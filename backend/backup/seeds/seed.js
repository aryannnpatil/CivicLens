/**
 * backup/seeds/seed.js
 *
 * Seeds the DEVELOPMENT database with sample users and issues.
 * Usage:  node backup/seeds/seed.js
 *
 * WARNING: Drops existing data in dev DB before inserting.
 *          Never run against production.
 */
require('dotenv').config({ path: '../../.env' });
const mongoose  = require('mongoose');
const Issue     = require('../../models/Issue');
const User      = require('../../models/User');
const users     = require('./sampleUsers');
const issues    = require('./sampleIssues');

const seed = async () => {
  if (process.env.NODE_ENV === 'production') {
    console.error('[seed] Refusing to seed PRODUCTION database. Exiting.');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI_DEV);
  console.log('[seed] Connected to DEV cluster');

  // Clear collections
  await User.deleteMany({});
  await Issue.deleteMany({});
  console.log('[seed] Cleared existing data');

  // Insert users first, attach their ObjectId to issues
  const createdUsers = await User.insertMany(users);
  console.log(`[seed] Inserted ${createdUsers.length} users`);

  // Assign reportedBy to the citizen user (index 1)
  const citizenId = createdUsers[1]._id;
  const issuesWithUser = issues.map((issue) => ({
    ...issue,
    reportedBy: citizenId,
  }));

  const createdIssues = await Issue.insertMany(issuesWithUser);
  console.log(`[seed] Inserted ${createdIssues.length} issues`);

  await mongoose.connection.close();
  console.log('[seed] Done. Connection closed.');
};

seed().catch((err) => {
  console.error('[seed] Error:', err.message);
  process.exit(1);
});
