const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/profile/me - Protected by JWT auth
router.get("/me", authMiddleware, getUserProfile);

module.exports = router;