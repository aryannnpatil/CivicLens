const bcrypt = require('bcryptjs');

// In-memory admin store (matches Phase-1 in-memory approach)
const admins = [];

function seedAdmin() {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('admin@gov', salt);
    admins.push({
        id: 'admin-001',
        username: 'admin@gov',
        passwordHash: hash,
        role: 'admin',
    });
    console.log('🔐 Admin account seeded');
}

function findAdminByUsername(username) {
    return admins.find((a) => a.username === username) || null;
}

module.exports = { seedAdmin, findAdminByUsername };
