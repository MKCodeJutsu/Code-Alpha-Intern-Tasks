const images = document.querySelectorAll('.gallery-image');
const totalImages = images.length;
let currentIndex = 0;

const updateGallery = () => {
    const offset = -currentIndex * 100;
    document.querySelector('.gallery').style.transform = `translateX(${offset}%)`;
};

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
    updateGallery();
});

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
    updateGallery();
});

// Auto-slide functionality (optional)
setInterval(() => {
    currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
    updateGallery();
}, 5000);

document.addEventListener('DOMContentLoaded', () => {
  const imageCount = 15; // Number of images
  const imageContainer = document.querySelector('.background');
  const imagePaths = [
      '/Pic/svg1.svg',
      '/Pic/svg2.svg',
      '/Pic/svg3.svg',
      '/Pic/svg4.svg',
      '/Pic/svg5.svg'
  ]; // Add paths to your images

  function createImages() {
      imageContainer.innerHTML = ''; // Clear existing images
      for (let i = 0; i < imageCount; i++) {
          const img = document.createElement('div');
          img.className = 'image glow'; // Added glow class for enhanced effect
          img.style.backgroundImage = `url('${imagePaths[Math.floor(Math.random() * imagePaths.length)]}')`;
          img.style.width = `${Math.random() * 150 + 100}px`; // Random width between 100px and 250px
          img.style.height = img.style.width; // Maintain aspect ratio
          img.style.top = `${Math.random() * 100}vh`; // Random vertical position
          img.style.left = `${Math.random() * 100}vw`; // Random horizontal position

          imageContainer.appendChild(img);
      }
  }

  createImages();
});


