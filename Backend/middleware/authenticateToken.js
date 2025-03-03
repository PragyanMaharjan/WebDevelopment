// middleware/authenticateToken.js
import jwt from 'jsonwebtoken';

// Middleware to authenticate the JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: ' Order Sucessfully done.' });
    }

    req.user = user; // Attach the user info to the request
    next();
  });
};

export { authenticateToken };
