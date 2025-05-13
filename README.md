
# 🌤️ Weather API with Redis Caching

This is a simple Node.js API that fetches real-time weather data from the Visual Crossing Weather API and caches it using Redis to reduce redundant API calls.

## 🚀 Features

 -   Get current weather data by city name.
    
 -   Uses Redis as an in-memory cache to improve performance.
    
 -   Automatically refreshes cached data every 12 hours.
    
 -   Basic error handling for invalid cities or failed requests.
    
 -   Rate limiting to protect against abuse.

## 🏗️ Tech Stack

- [Node.js](https://nodejs.org/)  
- [Express.js](https://expressjs.com/)  
- [Axios](https://axios-http.com/) for HTTP requests  
- [Redis](https://redis.io/) via [`ioredis`](https://github.com/luin/ioredis)  
- [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)  
- [`dotenv`](https://www.npmjs.com/package/dotenv) for environment variables  
- [`express-rate-limit`](https://www.npmjs.com/package/express-rate-limit) for rate limiting
## 📦 Installation
#### 1. Clone the repo
```bash
git clone https://github.com/yourusername/weather-api.git
cd weather-api
```
#### 2.Install dependencies
```bash
npm install
```
#### 3.**Create a `.env` file** in the root directory and add the following:
```bash
# Server Configuration
PORT=3000

# Visual Crossing Weather API
WEATHER_API_KEY=your_api_key_here

# Redis Configuration
REDIS_URL=your_redis_url_here

# Cache TTL in seconds (43200 = 12 hours)
CACHE_TTL=43200
```
#### 4.Start the server
```bash
node index.js
```
## 📡 API Usage
### Endpoint
```bash
GET /api/weather/:city
```
### Example
```bash
GET http://localhost:3000/api/weather/davao
```
### Response (sample)
```bash
{
  "address": "Davao, Philippines",
  "days": [
    {
      "datetime": "2025-05-13",
      "temp": 30.2,
      "conditions": "Partially Cloudy",
      ...
    }
  ]
}
```
## 🧠 How It Works
1.  When a user requests weather data for a city, the API first checks the Redis cache.
    
2.  If the data exists in the cache and hasn't expired, it returns the cached data.
    
3.  If not, it fetches data from the Visual Crossing API and stores it in Redis with a 12-hour TTL.
    
4.  Rate limiting is applied to prevent abuse (100 requests per 15 minutes per IP).
