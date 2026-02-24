const pool = require("../config/db");

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query(
            "SELECT id, name, email, user_type FROM users WHERE id = $1",
            [userId]
        );

        if (result.rows.length === 0) return res.status(404).json({ message: "User not found" });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { user_type } = req.body;

        // This updates the user_type column ('student' or 'pro')
        const result = await pool.query(
            "UPDATE users SET user_type = $1 WHERE id = $2 RETURNING id, name, email, user_type",
            [user_type, userId]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Update Profile Error:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};