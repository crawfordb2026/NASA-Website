# NASA Space Explorer

An interactive web application that allows users to explore NASA's Astronomy Picture of the Day (APOD) archive. Users can select custom date ranges and view stunning space imagery with detailed explanations.

## Features

- 🚀 Browse NASA's Astronomy Picture of the Day archive
- 📅 Select custom date ranges (from 1995 to present)
- 🖼️ View high-quality space images and videos
- 📖 Read detailed explanations for each astronomical phenomenon
- 🎨 NASA-branded design with professional styling
- 📱 Responsive design for all devices

## Setup Instructions

### 1. Get Your NASA API Key

1. Visit [NASA's API Portal](https://api.nasa.gov/)
2. Sign up for a free account
3. Generate an API key for the APOD (Astronomy Picture of the Day) service

### 2. Configure the Application

1. Copy the template configuration file:
   ```bash
   cp js/config.template.js js/config.js
   ```

2. Edit `js/config.js` and replace `'YOUR_API_KEY_HERE'` with your actual NASA API key:
   ```javascript
   const NASA_API_KEY = 'your_actual_api_key_here';
   ```

### 3. Run the Application

1. Open `index.html` in your web browser
2. Select a date range using the date pickers
3. Click "Get Space Images" to explore the cosmos!

## API Information

This application uses NASA's Astronomy Picture of the Day (APOD) API:
- **Base URL**: `https://api.nasa.gov/planetary/apod`
- **Documentation**: [APOD API Docs](https://api.nasa.gov/planetary/apod)
- **Rate Limits**: 1000 requests per hour for free tier

## Security Notes

- The `js/config.js` file is included in `.gitignore` to prevent API keys from being committed to version control
- Always use the template file (`js/config.template.js`) as a reference for setup
- Never share your API key publicly

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Project Structure

```
nasa-space-explorer/
├── index.html          # Main HTML file
├── style.css           # NASA-branded styling
├── js/
│   ├── config.js       # API configuration (not in version control)
│   ├── config.template.js  # Template for API setup
│   ├── dateRange.js    # Date picker functionality
│   └── script.js       # Main application logic
├── img/
│   └── nasa-worm-logo.png  # NASA logo
└── README.md           # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- NASA for providing the amazing APOD API
- The NASA brand guidelines for design inspiration
- All the astronomers and photographers who capture these incredible images
