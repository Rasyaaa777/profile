// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
  links.classList.toggle('open');
});

// Close nav on link click
links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => links.classList.remove('open'));
});

// Hide navbar on scroll-down, show on scroll-up
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  const currentY = window.scrollY;

  if (currentY > lastScrollY && currentY > 80) {
    // Scrolling down — hide
    nav.classList.add('nav-hidden');
    links.classList.remove('open'); // close mobile menu too
  } else {
    // Scrolling up — show
    nav.classList.remove('nav-hidden');
  }

  // Add shadow when not at top
  nav.style.boxShadow = currentY > 20
    ? '0 4px 40px rgba(0,0,0,0.5)'
    : 'none';

  lastScrollY = currentY;
});

// Fade-in on scroll (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .exp-card, .edu-card, .cert-card, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease';
  observer.observe(el);
});