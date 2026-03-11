/**
 * middleware/authMiddleware.js
 * Verifies JWT and attaches decoded user to req.user.
 * Apply to protected routes: router.get('/me', protect, controller)
 */
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorised — no token' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // TODO: optionally re-fetch user from DB here
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Not authorised — invalid token' });
  }
};

module.exports = { protect };
