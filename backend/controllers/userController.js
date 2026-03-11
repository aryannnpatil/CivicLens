/**
 * controllers/userController.js
 * Stub handlers for auth routes.
 */
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

exports.register = asyncHandler(async (req, res) => {
  // TODO: validate → hash password (bcryptjs) → save User → return JWT
  res.status(201).json({ message: 'register — not implemented' });
});

exports.login = asyncHandler(async (req, res) => {
  // TODO: find User by email → compare password → return JWT
  res.json({ message: 'login — not implemented' });
});

exports.getProfile = asyncHandler(async (req, res) => {
  // TODO: return req.user (set by authMiddleware)
  res.json({ message: 'getProfile — not implemented' });
});
