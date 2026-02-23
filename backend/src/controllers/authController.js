const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id, name, email",
            [name, email, hashedPassword]
        );

        res.status(201).json({
            message: "User registered successfully",
            user: newUser.rows[0],
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = result.rows[0];

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );
        // console.log("Password Match Result:", validPassword); // DEBUG LOG 1


        if (!validPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // console.log("JWT Secret being used:", process.env.JWT_SECRET); // DEBUG LOG 2

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // UPDATED: Now sending the user object along with the token
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};