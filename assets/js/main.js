/**
 * KCRACKER — Reverse Engineering Services
 * Core Vanilla JS Interactivity & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Sticky Navigation & Scroll Effects ---
  const navbar = document.querySelector('.navbar');
  const scrollThreshold = 20;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Initial check in case of page refresh while scrolled
  handleScroll();

  // --- Mobile Drawer Toggle ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      // Prevent body scrolling when menu is open
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'initial';
    });

    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'initial';
      });
    });
  }

  // --- FAQ Accordion Transition & Logic ---
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other FAQ items first
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-answer').style.maxHeight = null;
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          // Set max-height to scrollHeight to allow CSS transition
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // Form and pre-filling logic removed as the contact portal relies strictly on direct Telegram channels.
});
