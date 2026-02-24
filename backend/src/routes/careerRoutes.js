// backend/src/routes/careerRoutes.js
const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/recommend', authMiddleware, careerController.getRecommendations);
router.get('/:id/roadmap', authMiddleware, careerController.getRoadmap);

module.exports = router;