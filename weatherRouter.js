// Import required modules
const express = require("express"); // Express framework to handle HTTP requests
const axios = require("axios"); // Axios for making HTTP requests to Visual Crossing API
const redis = require("./redisClient"); // Redis client to interact with in-memory cache
require("dotenv").config(); // Load environment variables from .env file
// Create new Express Router to handle API requests
const router = express.Router();
// Define route to get weather data by city name
router.get("/weather/:city", async (req, res) => {
    // Get city name from route parameter and convert it to lowercase
    const city = req.params.city.toLowerCase();
    // Use city name as the key for caching weather data
    const cacheKey = `weather:${city}`;

    try {
        // 1. Check cache for existing weather data
        // Try to retrieve cached data for requested city
        const cached = await redis.get(cacheKey);
        // If cached data exists, serve it directly from cache
        if (cached) {
            console.log("Serving from cache");
            return res.json(JSON.parse(cached)); // Parse and return cached data as JSON
        }
        // 2. Fetch weather data from visual crossing api
        // Construct URL to request weather data for given city
        const apiKey = process.env.WEATHER_API_KEY; // Get API key from .env
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=metric&key=${apiKey}&contentType=json`;
        // Make HTTP GET request to visual crossing api
        const response = await axios.get(url);
        const data = response.data; // Extract weather data from API response

        // 3. Save weather data in cache
        // Cache fetched weather data in Redis with specified expiration time
        await redis.set(cacheKey, JSON.stringify(data), "EX", process.env.CACHE_TTL); // "EX" sets TTL (Time to Live) in seconds 
        // Return fetched weather data as JSON response
        res.json(data);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error.message);
        if (error.response && error.response.status === 400) {
            return res.status(400).json({ error: "Invalid city name" });
        }
        // For any other errors, return 500 status indicating server issue
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
})
// Export router to use it in other parts of the application
module.exports = router;
