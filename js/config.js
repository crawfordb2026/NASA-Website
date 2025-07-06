// NASA API Configuration
// This will be replaced by GitHub Actions with the actual API key from secrets
const NASA_API_KEY = 'DEMO_KEY';
const NASA_APOD_BASE_URL = 'https://api.nasa.gov/planetary/apod';

// Export configuration for use in other scripts
window.NASA_CONFIG = {
  apiKey: NASA_API_KEY,
  baseUrl: NASA_APOD_BASE_URL
}; 