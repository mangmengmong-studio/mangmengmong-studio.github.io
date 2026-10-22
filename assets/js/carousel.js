'use strict';

(() => {
  const root = document.querySelector('.home-carousel');
  const track = document.querySelector('#home-track');
  if (!root || !track) return;

  const slides = [...track.querySelectorAll('.carousel-slide')];
  const links = [...root.querySelectorAll('[data-slide-link]')];
  const slideLinks = [...document.querySelectorAll('a[href^="#"]')].filter((link) =>
    slides.some((slide) => link.hash === `#${slide.id}`));
  const previous = root.querySelector('[data-slide-prev]');
  const next = root.querySelector('[data-slide-next]');
  const counter = root.querySelector('.carousel-counter');
  const status = root.querySelector('[data-slide-status]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = -1;
  let frame = 0;
  let lastWheel = 0;

  const indexFromHash = () => {
    const target = document.getElementById(location.hash.slice(1));
    return slides.indexOf(target?.closest('.carousel-slide'));
  };

  const render = (index, updateHash = true) => {
    if (index === current) return;
    // Move focus out before an outgoing panel becomes inert.
    if (slides.some((slide, i) => i !== index && slide.contains(document.activeElement))) {
      track.focus({ preventScroll: true });
    }
    current = index;
    slides.forEach((slide, i) => {
      slide.inert = i !== index;
      slide.setAttribute('aria-hidden', String(i !== index));
    });
    links.forEach((link, i) => {
      if (i === index) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    document.querySelectorAll('#primary-navigation a').forEach((link) => {
      if (link.hash === `#${slides[index].id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    previous.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    status.textContent = `Slide ${slides[index].getAttribute('aria-label')}`;
    if (updateHash) history.replaceState(null, '', `#${slides[index].id}`);
  };

  const goTo = (index, immediate = false) => {
    const bounded = Math.max(0, Math.min(slides.length - 1, index));
    track.scrollTo({
      left: bounded * track.clientWidth,
      behavior: immediate || reducedMotion.matches ? 'instant' : 'smooth',
    });
    if (immediate || reducedMotion.matches) render(bounded);
  };

  slideLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const index = slides.findIndex((slide) => link.hash === `#${slide.id}`);
      goTo(index);
    });
  });
  previous.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));

  root.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
    const destinations = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: slides.length - 1 };
    if (!(event.key in destinations)) return;
    event.preventDefault();
    goTo(destinations[event.key]);
  });

  track.addEventListener('scroll', () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      render(Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth))));
    });
  }, { passive: true });

  // A wheel gesture moves one panel. Taller panels keep their native vertical scroll.
  track.addEventListener('wheel', (event) => {
    if (event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
    const slide = slides[current];
    if (!slide || slide.scrollHeight > slide.clientHeight + 2) return;
    event.preventDefault();
    const now = performance.now();
    if (Math.abs(event.deltaY) < 4 || now - lastWheel < 650) return;
    lastWheel = now;
    goTo(current + Math.sign(event.deltaY));
  }, { passive: false });

  window.addEventListener('hashchange', () => {
    const index = indexFromHash();
    if (index >= 0) goTo(index);
  });

  window.addEventListener('studio:languagechange', () => {
    if (current >= 0) status.textContent = `Slide ${slides[current].getAttribute('aria-label')}`;
  });

  const initial = Math.max(0, indexFromHash());
  render(initial, false);
  goTo(initial, true);
  root.querySelector('.carousel-arrows').hidden = false;

  // Preserve the selected panel across rotation, zoom, or a resized browser.
  let previousWidth = track.clientWidth;
  new ResizeObserver(() => {
    if (track.clientWidth === previousWidth) return;
    previousWidth = track.clientWidth;
    goTo(current, true);
  }).observe(track);
})();
