const express = require('express');
const Joi = require('joi');
const Annonceur = require('../models/Annonceur');
const Influenceur = require('../models/Influenceur');
const { generateToken } = require('../middleware/auth');

const router = express.Router();

// Validation schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).required(),
  role: Joi.string().valid('annonceur', 'influenceur').required(),
  whatsapp: Joi.string().optional(),
  followers: Joi.number().integer().min(0).optional(),
  reseaux: Joi.array().items(Joi.string()).optional(),
  categories: Joi.array().items(Joi.string()).optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid('annonceur', 'influenceur').required()
});

// Register endpoint
router.post('/register', async (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password, name, role, whatsapp, followers, reseaux, categories } = req.body;

    // Check if user already exists
    let existingUser;
    if (role === 'annonceur') {
      existingUser = await Annonceur.findByEmail(email);
    } else {
      existingUser = await Influenceur.findByEmail(email);
    }

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists with this email' });
    }

    // Create user
    let user;
    if (role === 'annonceur') {
      user = await Annonceur.create({
        nom: name,
        email,
        mot_de_passe: password,
        whatsapp
      });
    } else {
      user = await Influenceur.create({
        nom: name,
        email,
        mot_de_passe: password,
        followers: followers || 0,
        reseaux: reseaux || [],
        categories: categories || []
      });
    }

    // Generate token
    const token = generateToken(user.id, role);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user,
        token,
        role
      }
    });
  } catch (error) {
    next(error);
  }
});

// Login endpoint
router.post('/login', async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password, role } = req.body;

    // Find user
    let user;
    if (role === 'annonceur') {
      user = await Annonceur.findByEmail(email);
    } else {
      user = await Influenceur.findByEmail(email);
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Validate password
    let isValidPassword;
    if (role === 'annonceur') {
      const fullUser = await Annonceur.findByEmail(email);
      isValidPassword = await Annonceur.validatePassword(password, fullUser.mot_de_passe);
    } else {
      const fullUser = await Influenceur.findByEmail(email);
      isValidPassword = await Influenceur.validatePassword(password, fullUser.mot_de_passe);
    }

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user.id, role);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user,
        token,
        role
      }
    });
  } catch (error) {
    next(error);
  }
});

// Demo login endpoint (for development)
router.post('/demo', async (req, res, next) => {
  try {
    const { role } = req.body;
    
    if (process.env.NODE_ENV !== 'production') {
      let demoUser;
      let demoEmail;
      
      if (role === 'annonceur') {
        demoEmail = 'demo@afriviral.com';
        demoUser = await Annonceur.findByEmail(demoEmail);
      } else {
        demoEmail = 'awa@influence.com';
        demoUser = await Influenceur.findByEmail(demoEmail);
      }

      if (!demoUser) {
        return res.status(404).json({ error: 'Demo user not found' });
      }

      const token = generateToken(demoUser.id, role);

      res.json({
        success: true,
        message: 'Demo login successful',
        data: {
          user: demoUser,
          token,
          role
        }
      });
    } else {
      res.status(403).json({ error: 'Demo login not available in production' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;