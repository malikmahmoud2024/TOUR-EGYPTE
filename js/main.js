/* ============================================================
   TOUR EGYPTE — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Navbar: transparent → solid on scroll ───────────── */
  const navbar = document.querySelector('.navbar');

  function updateNavbar() {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.remove('transparent');
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.add('transparent');
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* ── 2. Mobile menu ─────────────────────────────────────── */
  const toggle = document.querySelector('.navbar__toggle');
  const mobileNav = document.querySelector('.navbar__mobile');
  const mobileClose = document.querySelector('.navbar__mobile-close');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (mobileClose && mobileNav) {
    mobileClose.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── 3. Language switcher (desktop + mobile) ─────────── */
  const langSwitcher = document.querySelector('.lang-switcher');
  const langBtn = document.querySelector('.lang-switcher__btn');

  if (langBtn && langSwitcher) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langSwitcher.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      langSwitcher.classList.remove('open');
    });

    langSwitcher.addEventListener('click', (e) => e.stopPropagation());

    langSwitcher.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        applyTranslations(btn.dataset.lang);
        langSwitcher.classList.remove('open');
      });
    });
  }

  /* Mobile language switcher */
  const mobileLangBtns = document.querySelectorAll('.navbar__mobile-lang-grid [data-lang]');
  mobileLangBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      applyTranslations(btn.dataset.lang);
      /* Update active state on mobile buttons */
      mobileLangBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === btn.dataset.lang));
    });
  });

  /* ── 4. Hero parallax ───────────────────────────────────── */
  const heroBg = document.querySelector('.hero__bg');

  function parallaxHero() {
    if (!heroBg) return;
    const scrollY = window.scrollY;
    const speed = 0.4;
    heroBg.style.transform = `scale(1.08) translateY(${scrollY * speed}px)`;
  }
  window.addEventListener('scroll', parallaxHero, { passive: true });

  /* ── 5. Parallax dividers ───────────────────────────────── */
  const parallaxBgs = document.querySelectorAll('.parallax-divider__bg');

  function parallaxDividers() {
    parallaxBgs.forEach(bg => {
      const section = bg.closest('.parallax-divider');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const centerOffset = (rect.top + rect.height / 2) - window.innerHeight / 2;
      bg.style.transform = `translateY(${centerOffset * 0.25}px)`;
    });
  }

  /* Only use JS parallax on non-touch devices */
  if (!('ontouchstart' in window)) {
    window.addEventListener('scroll', parallaxDividers, { passive: true });
    parallaxDividers();
  } else {
    /* On mobile: remove background-attachment:fixed */
    parallaxBgs.forEach(bg => {
      bg.style.backgroundAttachment = 'scroll';
    });
  }

  /* ── 6. Scroll-reveal animations ───────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── 7. Animated counters ───────────────────────────────── */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target || el.textContent);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
      const current = Math.round(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterEls = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => counterObserver.observe(el));

  /* ── 8. Gallery Lightbox ────────────────────────────────── */
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('.lightbox__img-wrap img');
  const lightboxCaption = lightbox?.querySelector('.lightbox__caption');
  const lightboxClose = lightbox?.querySelector('.lightbox__close');
  const lightboxPrev = lightbox?.querySelector('.lightbox__prev');
  const lightboxNext = lightbox?.querySelector('.lightbox__next');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  let currentGalleryIndex = 0;

  function openLightbox(index) {
    if (!lightbox) return;
    currentGalleryIndex = index;
    const item = galleryItems[index];
    const img = item?.querySelector('img');
    const caption = item?.querySelector('.gallery-item__caption');
    if (lightboxImg) {
      lightboxImg.src = img?.src || '';
      lightboxImg.alt = img?.alt || '';
    }
    if (lightboxCaption && caption) {
      lightboxCaption.textContent = caption.textContent;
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateLightbox(dir) {
    currentGalleryIndex = (currentGalleryIndex + dir + galleryItems.length) % galleryItems.length;
    openLightbox(currentGalleryIndex);
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', () => navigateLightbox(-1));
  lightboxNext?.addEventListener('click', () => navigateLightbox(1));

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft')  navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  /* ── 9. Testimonials slider ─────────────────────────────── */
  const track = document.querySelector('.testimonials-track');
  const dots = document.querySelectorAll('.testimonials-dot');
  const prevBtn = document.querySelector('.testimonials-btn.prev');
  const nextBtn = document.querySelector('.testimonials-btn.next');
  const cards = track?.querySelectorAll('.testimonial-card');

  if (track && cards && cards.length > 0) {
    let currentSlide = 0;
    let slidesPerView = getSlidesPerView();
    let totalSlides = Math.ceil(cards.length / slidesPerView);
    let autoplayTimer;

    function getSlidesPerView() {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    function updateSlider() {
      slidesPerView = getSlidesPerView();
      totalSlides = Math.ceil(cards.length / slidesPerView);

      const cardWidth = cards[0].offsetWidth;
      const gap = 24; /* 1.5rem */
      const offset = currentSlide * (slidesPerView * (cardWidth + gap));
      track.style.transform = `translateX(-${offset}px)`;

      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
    }

    function goToSlide(index) {
      slidesPerView = getSlidesPerView();
      totalSlides = Math.ceil(cards.length / slidesPerView);
      currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
      updateSlider();
    }

    function nextSlide() { goToSlide((currentSlide + 1) % totalSlides); }
    function prevSlide() { goToSlide((currentSlide - 1 + totalSlides) % totalSlides); }

    prevBtn?.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
    nextBtn?.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); resetAutoplay(); });
    });

    function startAutoplay() {
      autoplayTimer = setInterval(nextSlide, 5000);
    }
    function resetAutoplay() {
      clearInterval(autoplayTimer);
      startAutoplay();
    }

    /* Touch/swipe support */
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? nextSlide() : prevSlide();
        resetAutoplay();
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      updateSlider();
    }, { passive: true });

    updateSlider();
    startAutoplay();
  }

  /* ── 10. Newsletter form ────────────────────────────────── */
  const newsletterForm = document.querySelector('.footer__newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const btn = newsletterForm.querySelector('button');
      if (input?.value) {
        btn.textContent = '✓';
        btn.style.background = '#4CAF50';
        input.value = '';
        setTimeout(() => {
          const t = TRANSLATIONS[currentLang]?.footer;
          btn.textContent = t?.subscribe || 'Subscribe';
          btn.style.background = '';
        }, 3000);
      }
    });
  }

  /* ── 11. Active nav link ────────────────────────────────── */
  const navLinks = document.querySelectorAll('.navbar__links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── 12. Smooth scroll for anchor links ─────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
