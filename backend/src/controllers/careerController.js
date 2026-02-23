const pool = require("../config/db");

exports.getRecommendations = async (req, res) => {
    try {
        const { userSkills } = req.body; // Expecting an array like ['HTML', 'React']

        // This query finds careers and calculates a match percentage
        const query = `
            SELECT *,
            (
                SELECT COUNT(*)
                FROM unnest(required_skills) as skill
                WHERE skill = ANY($1)
            ) * 100 / array_length(required_skills, 1) as match_percentage
            FROM career_options
            WHERE required_skills && $1
            ORDER BY match_percentage DESC;
        `;

        const result = await pool.query(query, [userSkills]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error matching careers" });
    }
};