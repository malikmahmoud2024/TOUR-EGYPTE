/* ============================================================
   TOUR EGYPTE — Featured Tours Carousel
   Peek carousel: shows the active card centered with adjacent
   cards partially visible (dimmed/scaled) on both sides. Loops
   infinitely via two cloned slides (last-clone prepended,
   first-clone appended) — when the track glides past a clone,
   it snaps instantly (no transition) back to the matching real
   slide, so the loop never visibly "jumps back to start".
   Auto-advances, pauses on hover, supports arrows/dots/swipe.
   Language-agnostic — same script runs unmodified on every locale.
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  var AUTO_ADVANCE_MS = 4000;
  var SWIPE_THRESHOLD = 40;
  var TRACK_TRANSITION_MS = 700; /* must stay >= the .featured-carousel__track transition duration */

  document.querySelectorAll('.featured-carousel').forEach(function (carousel) {
    var viewport = carousel.querySelector('.featured-carousel__viewport');
    var track = carousel.querySelector('.featured-carousel__track');
    var realSlides = Array.prototype.slice.call(carousel.querySelectorAll('.featured-carousel__slide'));
    var prevBtn = carousel.querySelector('.featured-carousel__arrow--prev');
    var nextBtn = carousel.querySelector('.featured-carousel__arrow--next');
    var dotsContainer = carousel.parentElement.querySelector('.featured-carousel__dots');
    var dots = dotsContainer ? Array.prototype.slice.call(dotsContainer.querySelectorAll('.featured-carousel__dot')) : [];

    var realCount = realSlides.length;
    if (!track || realCount === 0) return;

    /* Clone last slide -> prepend, clone first slide -> append.
       slides[] now has realCount + 2 items; real slides live at
       array indices 1..realCount, clones at 0 and realCount+1. */
    var lastClone = realSlides[realCount - 1].cloneNode(true);
    var firstClone = realSlides[0].cloneNode(true);
    lastClone.setAttribute('aria-hidden', 'true');
    firstClone.setAttribute('aria-hidden', 'true');
    track.insertBefore(lastClone, realSlides[0]);
    track.appendChild(firstClone);

    var slides = Array.prototype.slice.call(track.querySelectorAll('.featured-carousel__slide'));
    var current = 1; /* start on real slide 0, at array position 1 */
    var timer = null;

    function realIndexOf(position) {
      return ((position - 1) % realCount + realCount) % realCount;
    }

    function setActiveClasses() {
      slides.forEach(function (s, i) { s.classList.toggle('is-active', i === current); });
      var realIdx = realIndexOf(current);
      dots.forEach(function (dot, i) { dot.classList.toggle('is-active', i === realIdx); });
    }

    function centerOffset() {
      var target = slides[current];
      if (!target) return 0; /* defensive: should never happen, but never let a stale index crash the track */
      var viewportWidth = viewport.clientWidth;
      var targetCenter = target.offsetLeft + target.offsetWidth / 2;
      return viewportWidth / 2 - targetCenter;
    }

    function render(animate) {
      track.style.transition = animate ? '' : 'none';
      track.style.transform = 'translateX(' + centerOffset() + 'px)';
      setActiveClasses();
      if (!animate) {
        /* force reflow so the next transform change re-enables transition */
        void track.offsetHeight;
        track.style.transition = '';
      }
    }

    function handleLoopBoundary() {
      if (current === slides.length - 1) {
        current = 1;
        render(false);
      } else if (current === 0) {
        current = slides.length - 2;
        render(false);
      }
    }

    /* The loop-wrap snap-back is scheduled with setTimeout rather than
       relying on the track's 'transitionend' event: transitionend does
       not reliably fire in every scenario (rapid re-clicks that
       interrupt an in-flight transition, a backgrounded/hidden tab
       throttling the animation, etc.), and a missed event would leave
       `current` permanently stuck past the cloned slide with no way
       back — a hard crash the next time the track re-centers. A timer
       matched to the CSS transition duration is deterministic. */
    var loopCheckTimer = null;
    function scheduleLoopCheck() {
      clearTimeout(loopCheckTimer);
      loopCheckTimer = setTimeout(handleLoopBoundary, TRACK_TRANSITION_MS);
    }

    function goTo(position) {
      current = position;
      render(true);
      scheduleLoopCheck();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function goToReal(realIdx) { goTo(realIdx + 1); }

    function startAuto() {
      stopAuto();
      timer = setInterval(next, AUTO_ADVANCE_MS);
    }
    function stopAuto() {
      if (timer) { clearInterval(timer); timer = null; }
    }
    function restartAuto() { startAuto(); }

    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restartAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); restartAuto(); });

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goToReal(i); restartAuto(); });
    });

    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    /* Touch / swipe support */
    var touchStartX = null;
    carousel.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
      stopAuto();
    }, { passive: true });

    carousel.addEventListener('touchend', function (e) {
      if (touchStartX === null) return;
      var deltaX = e.changedTouches[0].clientX - touchStartX;
      if (deltaX > SWIPE_THRESHOLD) {
        prev();
      } else if (deltaX < -SWIPE_THRESHOLD) {
        next();
      }
      touchStartX = null;
      restartAuto();
    }, { passive: true });

    /* Reposition (no animation) on resize, since offsets are measured in px */
    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { render(false); }, 100);
    });

    render(false);
    startAuto();
  });
});
