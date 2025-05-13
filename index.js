// Import required modules
const express = require("express");
const rateLimit = require("express-rate-limit"); // Middleware to limit repeated request
const weatherRouter = require("./weatherRouter"); // Custom router for handling / weather routes
require("dotenv").config(); // Load environment variables from .env file
// Create Express app
const app = express();

/**
 * Apply rate limiting middleware
 * - Limit each IP to 100 requests per 15 minute window
 */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
    max: 100, // Maximum number of requests per IP
});
app.use(limiter); // Apply limiter to all requests

/**
 * Mount weather router
 * - All routes defined in weatherRouter will be available under /api
 */
app.use("/api", weatherRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
