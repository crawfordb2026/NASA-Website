// NASA API Configuration
// Using NASA's demo API key for public deployment
// For personal use, replace with your own API key from https://api.nasa.gov/
const NASA_API_KEY = 'DEMO_KEY';
const NASA_APOD_BASE_URL = 'https://api.nasa.gov/planetary/apod';

// Export configuration for use in other scripts
window.NASA_CONFIG = {
  apiKey: NASA_API_KEY,
  baseUrl: NASA_APOD_BASE_URL
}; 