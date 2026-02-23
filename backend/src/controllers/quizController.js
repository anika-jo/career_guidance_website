const pool = require("../config/db");

//save quiz results
exports.saveQuizResult = async (req, res) => {
    try {
        console.log(req.user);
        const userId = req.user.id; // from authMiddleware
        const { score, recommendations } = req.body;

        const result = await pool.query(
            `INSERT INTO quiz_results (user_id, score, recommendations)
       VALUES ($1, $2, $3) RETURNING *`,
            [userId, score, recommendations]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

//get quiz results function
exports.getQuizResults = async (req, res) => {
    try {
        const userId = req.user.id;

        const results = await pool.query(
            `SELECT * FROM quiz_results 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
            [userId]
        );

        res.json(results.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
};