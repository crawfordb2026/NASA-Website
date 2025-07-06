// NASA API Configuration
// IMPORTANT: Replace 'YOUR_API_KEY_HERE' with your actual NASA API key
// For security, never commit the actual API key to version control
const NASA_API_KEY = 'qmWqmNgMeRzU4hxRBqrmMnvY5omfbNYKDmdlberb';
const NASA_APOD_BASE_URL = 'https://api.nasa.gov/planetary/apod';

// Export configuration for use in other scripts
window.NASA_CONFIG = {
  apiKey: NASA_API_KEY,
  baseUrl: NASA_APOD_BASE_URL
}; 