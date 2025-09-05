const express = require('express');
const Joi = require('joi');
const Brief = require('../models/Brief');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Validation schema
const briefSchema = Joi.object({
  prompt: Joi.string().min(10).max(1000).required(),
  categorie: Joi.string().valid('beauté', 'mode', 'restauration', 'tech', 'lifestyle', 'fitness', 'finance', 'education').required(),
  objectif: Joi.string().max(255).required(),
  audience: Joi.object({
    age: Joi.string().pattern(/^\d+-\d+$/).required(),
    localisation: Joi.string().required(),
    genre: Joi.string().valid('homme', 'femme', 'mixte').required()
  }).required(),
  produit: Joi.string().max(255).required(),
  formats: Joi.array().items(Joi.string().valid('post', 'story', 'reel', 'video', 'live')).min(1).required(),
  duree: Joi.number().integer().min(1).max(30).default(7)
});

// Create brief
router.post('/', authenticateToken, authorizeRoles('annonceur'), async (req, res, next) => {
  try {
    const { error } = briefSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const briefData = {
      ...req.body,
      annonceur_id: req.user.userId
    };

    // Here you would integrate with IA-1 Brief Parser
    // For now, we'll use simple logic to estimate budget
    const baseBudget = {
      'beauté': { min: 50000, max: 150000 },
      'mode': { min: 40000, max: 120000 },
      'restauration': { min: 30000, max: 80000 },
      'tech': { min: 60000, max: 200000 },
      'lifestyle': { min: 35000, max: 100000 },
      'fitness': { min: 30000, max: 90000 },
      'finance': { min: 70000, max: 250000 },
      'education': { min: 25000, max: 75000 }
    };

    const budgetRange = baseBudget[req.body.categorie] || { min: 25000, max: 100000 };
    const formatMultiplier = req.body.formats.length;
    const durationMultiplier = req.body.duree / 7;

    briefData.budget_estime_min = Math.round(budgetRange.min * formatMultiplier * durationMultiplier);
    briefData.budget_estime_max = Math.round(budgetRange.max * formatMultiplier * durationMultiplier);

    const brief = await Brief.create(briefData);

    res.status(201).json({
      success: true,
      message: 'Brief created successfully',
      data: brief
    });
  } catch (error) {
    next(error);
  }
});

// Get all briefs for current user
router.get('/', authenticateToken, authorizeRoles('annonceur'), async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const briefs = await Brief.findByUser(req.user.userId, 'annonceur');
    
    res.json({
      success: true,
      data: {
        briefs: briefs.slice(offset, offset + limit),
        pagination: {
          page,
          limit,
          total: briefs.length,
          pages: Math.ceil(briefs.length / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get brief by ID
router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const brief = await Brief.findById(req.params.id);
    
    if (!brief) {
      return res.status(404).json({ error: 'Brief not found' });
    }

    // Check ownership
    const isOwner = brief.annonceur_id === req.user.userId || brief.client_id === req.user.userId;
    if (!isOwner && req.user.role !== 'influenceur') {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({
      success: true,
      data: brief
    });
  } catch (error) {
    next(error);
  }
});

// Get matching influenceurs for a brief
router.get('/:id/matching', authenticateToken, authorizeRoles('annonceur'), async (req, res, next) => {
  try {
    const brief = await Brief.findById(req.params.id);
    
    if (!brief) {
      return res.status(404).json({ error: 'Brief not found' });
    }

    // Check ownership
    if (brief.annonceur_id !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Get matching influenceurs
    const influenceurs = await Brief.getMatchingInfluenceurs(req.params.id);

    res.json({
      success: true,
      data: {
        brief_id: req.params.id,
        influenceurs: influenceurs.map(inf => ({
          id: inf.id,
          nom: inf.nom,
          email: inf.email,
          followers: inf.followers,
          reseaux: inf.reseaux,
          verified: inf.verified,
          categories: inf.categories,
          taux_engagement: inf.taux_engagement,
          matching_score: inf.matching_score || 0
        }))
      }
    });
  } catch (error) {
    next(error);
  }
});

// Update brief
router.put('/:id', authenticateToken, authorizeRoles('annonceur'), async (req, res, next) => {
  try {
    const { error } = briefSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const brief = await Brief.findById(req.params.id);
    
    if (!brief) {
      return res.status(404).json({ error: 'Brief not found' });
    }

    if (brief.annonceur_id !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updatedBrief = await Brief.update(req.params.id, req.body);

    res.json({
      success: true,
      message: 'Brief updated successfully',
      data: updatedBrief
    });
  } catch (error) {
    next(error);
  }
});

// Delete brief
router.delete('/:id', authenticateToken, authorizeRoles('annonceur'), async (req, res, next) => {
  try {
    const brief = await Brief.findById(req.params.id);
    
    if (!brief) {
      return res.status(404).json({ error: 'Brief not found' });
    }

    if (brief.annonceur_id !== req.user.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await Brief.delete(req.params.id);

    res.json({
      success: true,
      message: 'Brief deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;