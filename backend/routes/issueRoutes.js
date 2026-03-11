const express = require('express');
const router  = express.Router();
const issueController = require('../controllers/issueController');
// const { protect } = require('../middleware/authMiddleware'); // uncomment when auth is ready

/**
 * Issue Routes
 * Base path: /api/issues
 */
router.get('/',      issueController.getAllIssues);
router.get('/:id',   issueController.getIssueById);
router.post('/',     issueController.createIssue);
router.patch('/:id', issueController.updateIssueStatus);
router.delete('/:id',issueController.deleteIssue);

module.exports = router;
