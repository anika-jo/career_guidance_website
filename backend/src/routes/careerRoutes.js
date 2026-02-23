const express = require("express");
const router = express.Router();
const { getRecommendations } = require("../controllers/careerController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to get career matches based on skills
router.post("/recommend", authMiddleware, getRecommendations);

module.exports = router;