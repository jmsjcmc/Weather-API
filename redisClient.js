// Import ioredis library to interact with Redis
const Redis = require('ioredis');
// Load environment varialbels from .env file
require('dotenv').config();
// Create new Redis client instance using REDIS_URL from .env file
// Connect Redis server
const redis = new Redis(process.env.REDIS_URL);
// Event listener for successful connection to Redis
redis.on('connect', () => {
    console.log('Connected to Redis')
});
// Event listener for error that occur when interacting with Redis
redis.on('error', (error) => {
    console.error('Redis error', error)
});
// Export Redis client so it can be used in other parts of the application
module.exports = redis;