// Generate shooting stars
function createShootingStar() {
  const star = document.createElement('div');
  star.classList.add('shooting-star');
  star.style.top = Math.random() * 100 + 'vh';
  star.style.left = Math.random() * 100 + 'vw';
  star.style.animationDuration = (Math.random() * 3 + 2) + 's'; // Random duration between 2s and 5s
  star.style.width = Math.random() * 3 + 'px'; // Random width between 2px and 5px
  star.style.height = Math.random() * 150 + 'px'; // Random height between 100px and 200px

  document.body.appendChild(star);
  setTimeout(() => star.remove(), 5000); // Remove star after animation
}

// Create multiple shooting stars
setInterval(createShootingStar, 500); // Adjust interval as needed

// Constellation navigation effect
const navLinks = document.querySelectorAll('#constellation-nav a');
navLinks.forEach(link => {
  link.addEventListener('mouseover', () => {
      // Add any hover effect or animation here
  });
});



document.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
          section.classList.add('visible');
      }
  });
});




