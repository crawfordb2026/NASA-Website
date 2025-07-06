// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const getImagesButton = document.querySelector('button');
const gallery = document.getElementById('gallery');

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

// Add event listener to the button
getImagesButton.addEventListener('click', fetchSpaceImages);

// Random space facts array
const spaceFacts = [
  "Did you know? The Sun contains 99.86% of the solar system's mass!",
  "Did you know? A day on Venus is longer than its year!",
  "Did you know? There are more stars in the universe than grains of sand on Earth!",
  "Did you know? The Great Red Spot on Jupiter has been raging for over 400 years!",
  "Did you know? Saturn's rings are mostly made of ice and rock!",
  "Did you know? The Milky Way galaxy is moving through space at 2.1 million kilometers per hour!",
  "Did you know? A neutron star can spin up to 600 times per second!",
  "Did you know? The largest known star, UY Scuti, is 1,700 times bigger than our Sun!",
  "Did you know? There's a planet made of diamonds twice the size of Earth!",
  "Did you know? The universe is expanding faster than the speed of light!"
];

// Display random space fact on page load
function displayRandomFact() {
  const randomFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
  
  // Create fact container if it doesn't exist
  let factContainer = document.querySelector('.space-fact');
  if (!factContainer) {
    factContainer = document.createElement('div');
    factContainer.className = 'space-fact';
    factContainer.style.cssText = `
      background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
      color: white;
      padding: 15px 20px;
      margin: 20px;
      border-radius: 10px;
      text-align: center;
      font-weight: bold;
      font-size: 16px;
      box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
      animation: fadeIn 0.5s ease-in;
    `;
    
    // Insert after header
    const header = document.querySelector('.site-header');
    header.parentNode.insertBefore(factContainer, header.nextSibling);
  }
  
  factContainer.textContent = randomFact;
}

// Create modal functionality
function createModal() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.cssText = `
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    animation: fadeIn 0.3s ease-in;
  `;
  
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  modalContent.style.cssText = `
    position: relative;
    margin: 5% auto;
    padding: 20px;
    width: 90%;
    max-width: 800px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  `;
  
  const closeBtn = document.createElement('span');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.cssText = `
    position: absolute;
    right: 20px;
    top: 15px;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    color: #666;
    z-index: 1001;
  `;
  
  closeBtn.onclick = () => {
    modal.style.display = 'none';
  };
  
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  };
  
  modalContent.appendChild(closeBtn);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  
  return modal;
}

// Global modal instance
let modal = null;

// Function to open modal with image details
function openModal(image) {
  if (!modal) {
    modal = createModal();
  }
  
  const modalContent = modal.querySelector('.modal-content');
  
  let mediaElement;
  if (image.media_type === 'video') {
    mediaElement = document.createElement('iframe');
    mediaElement.src = image.url;
    mediaElement.style.cssText = `
      width: 100%;
      height: 400px;
      border: none;
      border-radius: 8px;
      margin-bottom: 20px;
    `;
    mediaElement.allowFullscreen = true;
  } else {
    mediaElement = document.createElement('img');
    mediaElement.src = image.url;
    mediaElement.alt = image.title;
    mediaElement.style.cssText = `
      width: 100%;
      max-height: 500px;
      object-fit: contain;
      border-radius: 8px;
      margin-bottom: 20px;
    `;
  }
  
  const title = document.createElement('h2');
  title.textContent = image.title;
  title.style.cssText = `
    color: #0b3d91;
    margin-bottom: 10px;
    font-size: 24px;
    font-weight: bold;
  `;
  
  const date = document.createElement('p');
  date.textContent = new Date(image.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  date.style.cssText = `
    color: #666;
    font-size: 14px;
    margin-bottom: 20px;
    font-style: italic;
  `;
  
  const explanation = document.createElement('p');
  explanation.textContent = image.explanation;
  explanation.style.cssText = `
    font-size: 16px;
    line-height: 1.6;
    color: #333;
  `;
  
  // Clear previous content and add new content
  modalContent.innerHTML = '';
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(mediaElement);
  modalContent.appendChild(title);
  modalContent.appendChild(date);
  modalContent.appendChild(explanation);
  
  modal.style.display = 'block';
}

// Function to fetch space images from NASA API
async function fetchSpaceImages() {
  const startDate = startInput.value;
  const endDate = endInput.value;
  
  if (!startDate || !endDate) {
    alert('Please select both start and end dates.');
    return;
  }
  
  if (startDate > endDate) {
    alert('Start date must be before or equal to end date.');
    return;
  }
  
  // Show loading state
  showLoading();
  
  try {
    const images = await fetchImagesFromNASA(startDate, endDate);
    displayImages(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    showError('Failed to fetch images. Please try again.');
  }
}

// Function to fetch images from NASA API
async function fetchImagesFromNASA(startDate, endDate) {
  const { apiKey, baseUrl } = window.NASA_CONFIG;
  
  if (apiKey === 'YOUR_API_KEY_HERE') {
    throw new Error('Please configure your NASA API key in js/config.js');
  }
  
  const url = `${baseUrl}?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// Function to display images in the gallery
function displayImages(images) {
  // Clear existing content
  gallery.innerHTML = '';
  
  if (!Array.isArray(images) || images.length === 0) {
    showPlaceholder('No images found for the selected date range.');
    return;
  }
  
  images.forEach(image => {
    const imageCard = createImageCard(image);
    gallery.appendChild(imageCard);
  });
}

// Function to create an image card
function createImageCard(image) {
  const card = document.createElement('div');
  card.className = 'gallery-item';
  
  // Handle different media types (image, video)
  let mediaElement;
  if (image.media_type === 'video') {
    mediaElement = document.createElement('iframe');
    mediaElement.src = image.url;
    mediaElement.allowFullscreen = true;
    mediaElement.style.border = 'none';
  } else {
    mediaElement = document.createElement('img');
    mediaElement.src = image.url;
    mediaElement.alt = image.title;
    mediaElement.loading = 'lazy';
  }
  
  const title = document.createElement('h3');
  title.textContent = image.title;
  title.style.marginBottom = '10px';
  title.style.fontSize = '16px';
  title.style.fontWeight = 'bold';
  
  const date = document.createElement('p');
  date.textContent = new Date(image.date).toLocaleDateString();
  date.style.color = '#666';
  date.style.fontSize = '12px';
  date.style.marginBottom = '10px';
  
  const explanation = document.createElement('p');
  explanation.textContent = image.explanation;
  explanation.style.fontSize = '14px';
  explanation.style.lineHeight = '1.4';
  
  card.appendChild(mediaElement);
  card.appendChild(title);
  card.appendChild(date);
  card.appendChild(explanation);
  
  // Add click event to open modal
  card.addEventListener('click', () => {
    openModal(image);
  });
  
  // Add cursor pointer to indicate clickable
  card.style.cursor = 'pointer';
  
  return card;
}

// Function to show loading state
function showLoading() {
  gallery.innerHTML = `
    <div class="placeholder">
      <div class="placeholder-icon">🚀</div>
      <p>Loading space images from NASA...</p>
    </div>
  `;
}

// Function to show error state
function showError(message) {
  gallery.innerHTML = `
    <div class="placeholder">
      <div class="placeholder-icon">⚠️</div>
      <p>${message}</p>
    </div>
  `;
}

// Function to show placeholder
function showPlaceholder(message) {
  gallery.innerHTML = `
    <div class="placeholder">
      <div class="placeholder-icon">🔭</div>
      <p>${message}</p>
    </div>
  `;
}

// Display random fact when page loads
document.addEventListener('DOMContentLoaded', displayRandomFact);
