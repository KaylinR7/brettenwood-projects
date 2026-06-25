/* =========================================================
   BrettenWood Projects – main.js
   ========================================================= */

'use strict';

// ----------------------------------------------------------------
// AOS – Animate on Scroll
// ----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
  });
});

// ----------------------------------------------------------------
// Navbar scroll behaviour
// ----------------------------------------------------------------
(function () {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load
})();

// ----------------------------------------------------------------
// Smooth scrolling for anchor links
// ----------------------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ----------------------------------------------------------------
// Star Rating selector (reviews page)
// ----------------------------------------------------------------
(function () {
  const starContainer = document.getElementById('starRating');
  const starHint = document.getElementById('starHint');
  if (!starContainer) return;

  const hints = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];

  starContainer.querySelectorAll('input[type="radio"]').forEach(function (input) {
    input.addEventListener('change', function () {
      if (starHint) {
        starHint.textContent = hints[parseInt(this.value)] + ' (' + this.value + '/5)';
        starHint.style.color = '#000';
        starHint.style.fontWeight = '600';
      }
    });
  });
})();

// ----------------------------------------------------------------
// Bootstrap form validation (review form)
// ----------------------------------------------------------------
(function () {
  const reviewForm = document.getElementById('reviewForm');
  if (!reviewForm) return;

  reviewForm.addEventListener('submit', function (e) {
    let valid = true;

    // Check rating selected
    const ratingInputs = reviewForm.querySelectorAll('input[name="rating"]');
    const ratingError = document.getElementById('ratingError');
    const ratingSelected = Array.from(ratingInputs).some(function (r) { return r.checked; });

    if (!ratingSelected) {
      valid = false;
      if (ratingError) {
        ratingError.textContent = 'Please select a star rating.';
        ratingError.style.display = 'block';
      }
    } else {
      if (ratingError) ratingError.style.display = 'none';
    }

    // Bootstrap built-in validation
    if (!reviewForm.checkValidity()) {
      valid = false;
    }
    reviewForm.classList.add('was-validated');

    if (!valid) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      // Loading state
      const btn = document.getElementById('reviewSubmitBtn');
      if (btn) {
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting…';
        btn.disabled = true;
      }
    }
  }, false);
})();

// ----------------------------------------------------------------
// Bootstrap form validation (contact form)
// ----------------------------------------------------------------
(function () {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    if (!contactForm.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending…';
        btn.disabled = true;
      }
    }
    contactForm.classList.add('was-validated');
  }, false);
})();

// ----------------------------------------------------------------
// Button press micro-interaction
// ----------------------------------------------------------------
document.addEventListener('mousedown', function (e) {
  const btn = e.target.closest('.bw-btn-primary, .bw-btn-outline, .bw-btn-outline-light');
  if (btn) btn.style.transform = 'scale(0.96)';
});
document.addEventListener('mouseup', function (e) {
  const btn = e.target.closest('.bw-btn-primary, .bw-btn-outline, .bw-btn-outline-light');
  if (btn) setTimeout(function () { btn.style.transform = ''; }, 150);
});

// ----------------------------------------------------------------
// Auto-dismiss flash alerts after 6 seconds
// ----------------------------------------------------------------
(function () {
  document.querySelectorAll('.bw-flash').forEach(function (alert) {
    setTimeout(function () {
      var bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
      if (bsAlert) bsAlert.close();
    }, 6000);
  });
})();

// ----------------------------------------------------------------
// Filter-bar active state (client-side portfolio filtering)
// ----------------------------------------------------------------
(function () {
  // Portfolio already filtered server-side; this adds instant visual feedback
  var portfolioCards = document.querySelectorAll('.portfolio-item');
  if (!portfolioCards.length) return;

  document.querySelectorAll('.bw-filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      // Let the link navigate (server-side filter)
      // If we ever want client-side, implement here
    });
  });
})();

// ----------------------------------------------------------------
// Scroll-to-top if there's a flash (success after form submit)
// ----------------------------------------------------------------
(function () {
  const flash = document.querySelector('.bw-flash-wrapper');
  if (flash) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
})();
