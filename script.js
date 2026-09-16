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

document.querySelectorAll('.skill-card, .exp-card, .edu-card, .cert-card, .contact-item, .doc-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease';
  observer.observe(el);
});

// Lightbox Modal for Documentation
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxBadge = document.getElementById('lightboxBadge');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');

function openLightbox(card) {
  const imgSrc = card.getAttribute('data-img');
  const badge = card.getAttribute('data-badge');
  const title = card.getAttribute('data-title');
  const desc = card.getAttribute('data-desc');

  if (imgSrc) {
    lightboxImg.src = imgSrc;
    lightboxImg.alt = title || 'Documentation Image';
    lightboxBadge.textContent = badge || 'Documentation';
    lightboxTitle.textContent = title || '';
    lightboxDesc.textContent = desc || '';

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  lightboxModal.classList.remove('active');
  lightboxModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.doc-card').forEach(card => {
  card.addEventListener('click', () => openLightbox(card));
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxBackdrop) {
  lightboxBackdrop.addEventListener('click', closeLightbox);
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
    closeLightbox();
  }
});