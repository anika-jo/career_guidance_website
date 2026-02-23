const express = require("express");
const router = express.Router();
const { saveQuizResult, getQuizResults } = require("../controllers/quizController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/save", authMiddleware, saveQuizResult);
router.get("/my-results", authMiddleware, getQuizResults);

module.exports = router;