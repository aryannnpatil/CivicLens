/**
 * controllers/issueController.js
 * Stub handlers — implement business logic here during feature work.
 */
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

exports.getAllIssues = asyncHandler(async (req, res) => {
  // TODO: query Issue model with filters (status, category, location)
  res.json({ message: 'getAllIssues — not implemented' });
});

exports.getIssueById = asyncHandler(async (req, res) => {
  // TODO: Issue.findById(req.params.id)
  res.json({ message: 'getIssueById — not implemented' });
});

exports.createIssue = asyncHandler(async (req, res) => {
  // TODO: validate → call aiService.classify() → save to DB → upload media
  res.status(201).json({ message: 'createIssue — not implemented' });
});

exports.updateIssueStatus = asyncHandler(async (req, res) => {
  // TODO: admin-only status update
  res.json({ message: 'updateIssueStatus — not implemented' });
});

exports.deleteIssue = asyncHandler(async (req, res) => {
  // TODO: soft delete or hard delete
  res.json({ message: 'deleteIssue — not implemented' });
});
