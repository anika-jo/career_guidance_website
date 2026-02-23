const express = require("express");
const cors = require("cors");
require("dotenv").config();


// 1. Route Imports
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const careerRoutes = require("./routes/careerRoutes");
// Note: Ensure profileRoutes.js exists in your routes folder if you keep this line
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// 2. Middleware
// CORS must be enabled for your React app (usually on port 3000/5173) to talk to port 8000
app.use(cors());
app.use(express.json());

// 3. API Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/profile", profileRoutes);

// 4. Base Health Check
app.get("/", (req, res) => {
    res.send("Career Guidance Backend Running on Port 8000");
});

// 5. Port Configuration
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});