/**
 * backup/seeds/sampleUsers.js
 *
 * Sample seed data — 1 admin + 2 citizens for local development.
 * Passwords are bcrypt hashes of the plaintext shown in comments.
 * DO NOT use these credentials in production.
 */

const sampleUsers = [
  {
    name: 'Admin Ravi',
    email: 'admin@sih25031.dev',
    // plaintext: Admin@1234
    password: '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',
    role: 'admin',
    phone: '9000000001',
    ward: 'All',
    isVerified: true,
  },
  {
    name: 'Priya Sharma',
    email: 'priya@citizen.dev',
    // plaintext: Citizen@1234
    password: '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGsad/2CJLG1BoLGm2',
    role: 'citizen',
    phone: '9000000002',
    ward: 'Ward 76',
    isVerified: true,
  },
  {
    name: 'Arjun Mehta',
    email: 'arjun@citizen.dev',
    // plaintext: Citizen@1234
    password: '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGsad/2CJLG1BoLGm2',
    role: 'citizen',
    phone: '9000000003',
    ward: 'Ward 63',
    isVerified: false,
  },
];

module.exports = sampleUsers;
