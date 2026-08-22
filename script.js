// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile hamburger menu
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('nav-mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
});

// Close mobile menu on link click
document.querySelectorAll('.nav__mobile-link, .nav__mobile-cta').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

// FAQ accordion
document.querySelectorAll('.faq__toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    // Close all
    document.querySelectorAll('.faq__toggle').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      const target = document.getElementById(b.getAttribute('aria-controls'));
      if (target) target.hidden = true;
    });
    // Open clicked if was closed
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      const target = document.getElementById(btn.getAttribute('aria-controls'));
      if (target) target.hidden = false;
    }
  });
});

// Sticky nav scroll shadow
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 10
    ? '0 8px 32px rgba(0,0,0,0.4)'
    : 'none';
}, { passive: true });

// Intersection observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.feature-card, .how__step, .pricing-card, .faq__item, .trust__item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Add visible class via JS so CSS transition fires
document.head.insertAdjacentHTML('beforeend', `<style>
  .feature-card.visible, .how__step.visible, .pricing-card.visible,
  .faq__item.visible, .trust__item.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
</style>`);
