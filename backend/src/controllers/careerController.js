const pool = require("../config/db");

exports.getRecommendations = async (req, res) => {
    try {
        // This 'type' comes from the URL ?type=...
        const { type } = req.query;
        const { userSkills } = req.body;

        // Choose column based on the URL parameter, NOT the user profile
        const filterColumn = type === 'pro' ? 'is_for_pro' : 'is_for_student';

        const query = `
            SELECT *,
            (
                SELECT COUNT(*)
                FROM unnest(required_skills) as skill
                WHERE skill = ANY($1)
            ) * 100 / GREATEST(array_length(required_skills, 1), 1) as match_percentage
            FROM career_paths
            WHERE ${filterColumn} = true 
            ORDER BY match_percentage DESC;
        `;

        const result = await pool.query(query, [userSkills || []]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};

exports.getRoadmap = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "SELECT * FROM roadmaps WHERE career_id = $1 ORDER BY step_number ASC",
            [id]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};