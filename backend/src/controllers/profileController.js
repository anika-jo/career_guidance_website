const pool = require("../config/db");
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const userQuery = `
            SELECT u.name, u.email, q.score, q.recommendations, q.created_at
            FROM users u
            LEFT JOIN quiz_results q ON u.id = q.user_id
            WHERE u.id = $1
            ORDER BY q.created_at DESC
            LIMIT 1;
        `;

        const result = await pool.query(userQuery, [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const userData = result.rows[0];

        // We package the data so 'name' is always at the top level
        res.json({
            id: userId,
            name: userData.name,
            email: userData.email,
            quizData: userData.score ? {
                score: userData.score,
                recommendations: userData.recommendations,
                date: userData.created_at
            } : null
        });
    } catch (error) {
        console.error("Profile Controller Error:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};