/*
  Amaan Mohammed – Portfolio JavaScript

  Adds interactive flourishes to the portfolio: a typewriter effect
  cycles through multiple descriptors, a scroll observer reveals
  sections as they enter the viewport, and a burger menu toggles
  navigation on smaller screens.
*/

// Typewriter effect for the hero subtitle
const typewriterSpan = document.getElementById('typewriter');
const words = [
  'Data Analyst',
  'ETL & BI Expert',
  'SQL & Python Enthusiast',
  'Transforming Data into Decisions'
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 120;
const erasingSpeed = 60;
const delayBetweenWords = 2000;

function type() {
  const currentWord = words[wordIndex];
  if (!isDeleting) {
    // Add characters
    typewriterSpan.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      // Word fully typed
      isDeleting = true;
      setTimeout(type, delayBetweenWords);
      return;
    }
  } else {
    // Remove characters
    typewriterSpan.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      // Finished deleting
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  const timeout = isDeleting ? erasingSpeed : typingSpeed;
  setTimeout(type, timeout);
}
// Start typing once the page has loaded
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 500);
});

// Intersection Observer to reveal sections on scroll
const sections = document.querySelectorAll('.section');
const options = {
  threshold: 0.2
};
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, options);

sections.forEach(section => {
  observer.observe(section);
});

// Burger menu toggle
const burger = document.getElementById('burger');
const navLinks = document.querySelector('nav ul');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
// Hide menu after clicking a link (for mobile convenience)
navLinks.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    navLinks.classList.remove('show');
  }
});