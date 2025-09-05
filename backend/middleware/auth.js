const jwt = require('jsonwebtoken');
const Annonceur = require('../models/Annonceur');
const Influenceur = require('../models/Influenceur');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '7d' });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    
    // Fetch user details based on role
    let userDetails;
    if (decoded.role === 'annonceur') {
      userDetails = await Annonceur.findById(decoded.userId);
    } else if (decoded.role === 'influenceur') {
      userDetails = await Influenceur.findById(decoded.userId);
    } else if (decoded.role === 'agence') {
      // Add agence model when created
      userDetails = { id: decoded.userId, role: 'agence' };
    }

    if (!userDetails) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.userDetails = userDetails;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Insufficient permissions',
        required: roles,
        current: req.user?.role 
      });
    }
    next();
  };
};

const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      
      let userDetails;
      if (decoded.role === 'annonceur') {
        userDetails = await Annonceur.findById(decoded.userId);
      } else if (decoded.role === 'influenceur') {
        userDetails = await Influenceur.findById(decoded.userId);
      }

      req.userDetails = userDetails;
    } catch (error) {
      // Token invalid but continue as guest
    }
  }
  
  next();
};

module.exports = {
  generateToken,
  verifyToken,
  authenticateToken,
  authorizeRoles,
  optionalAuth
};