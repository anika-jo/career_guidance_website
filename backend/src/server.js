const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({ message: "Backend working properly" });
});

// Port
const PORT = process.env.PORT || 8000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// authRoutes
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);