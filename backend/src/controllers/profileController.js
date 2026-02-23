const pool = require("../config/db");

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from JWT by authMiddleware

        // Fetch user info and their latest quiz results in one go
        const userQuery = `
            SELECT u.name, u.email, q.score, q.recommendations, q.created_at
            FROM users u
            LEFT JOIN quiz_results q ON u.id = q.user_id
            WHERE u.id = $1
            ORDER BY q.created_at DESC
            LIMIT 1;
        `;

        const user = await pool.query(userQuery, [userId]);

        if (user.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error" });
    }
};