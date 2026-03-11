const multer = require('multer');

// Memory storage only for Phase 1 scaffolding.
// File persistence and cloud upload will be added in later phases.
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

module.exports = {
    upload,
};
