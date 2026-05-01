// Mobile menu toggle
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// Header background on scroll
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.background = 'rgba(10, 10, 26, 0.98)';
  } else {
    header.style.background = 'rgba(15, 15, 35, 0.95)';
  }
});

// Past events carousel
const pastEventsTrack = document.querySelector('.past-events-track');
const pastEventCards = document.querySelectorAll('.past-event-card');
const prevArrow = document.querySelector('.carousel-arrow-left');
const nextArrow = document.querySelector('.carousel-arrow-right');

if (pastEventsTrack && prevArrow && nextArrow && pastEventCards.length > 0) {
  let currentIndex = 0;

  function getVisibleCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function getStepSize() {
    const firstCard = pastEventCards[0];
    const cardStyle = window.getComputedStyle(firstCard);
    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = parseFloat(cardStyle.marginRight) || parseFloat(window.getComputedStyle(pastEventsTrack).gap) || 0;
    return cardWidth + gap;
  }

  function updateCarousel() {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, pastEventCards.length - visibleCount);
    currentIndex = Math.min(currentIndex, maxIndex);

    const offset = currentIndex * getStepSize();
    pastEventsTrack.style.transform = `translateX(-${offset}px)`;

    prevArrow.disabled = currentIndex === 0;
    nextArrow.disabled = currentIndex >= maxIndex;
  }

  prevArrow.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateCarousel();
  });

  nextArrow.addEventListener('click', () => {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, pastEventCards.length - visibleCount);
    currentIndex = Math.min(maxIndex, currentIndex + 1);
    updateCarousel();
  });

  window.addEventListener('resize', updateCarousel);
  updateCarousel();
}

// Fade-in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.event-card, .past-event-card, .about-content, .merch-content, .all-events-content').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
