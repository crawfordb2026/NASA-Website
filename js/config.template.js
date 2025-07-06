// NASA API Configuration Template
// Copy this file to config.js and replace 'YOUR_API_KEY_HERE' with your actual NASA API key
// Get your free API key from: https://api.nasa.gov/
const NASA_API_KEY = 'YOUR_API_KEY_HERE';
const NASA_APOD_BASE_URL = 'https://api.nasa.gov/planetary/apod';

// Export configuration for use in other scripts
window.NASA_CONFIG = {
  apiKey: NASA_API_KEY,
  baseUrl: NASA_APOD_BASE_URL
}; 