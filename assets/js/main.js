'use strict';

(() => {
  const messages = window.STUDIO_MESSAGES;
  const initial = window.STUDIO_INITIAL || { language: 'en', theme: 'light' };
  let language = initial.language;
  const save = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  const t = (key) => messages[language][key] || messages.id[key] || key;
  window.siteLocale = { t, get language() { return language; } };

  const updateThemeButton = () => {
    const button = document.querySelector('[data-theme-toggle]');
    button.setAttribute('aria-label', t(document.documentElement.dataset.theme === 'dark' ? 'theme.light' : 'theme.dark'));
    button.setAttribute('aria-pressed', String(document.documentElement.dataset.theme === 'dark'));
  };
  const applyLanguage = (value, persist = false) => {
    language = value;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    for (const attribute of ['aria-label', 'alt']) {
      document.querySelectorAll(`[data-i18n-${attribute}]`).forEach((node) => {
        node.setAttribute(attribute, t(node.getAttribute(`data-i18n-${attribute}`)));
      });
    }
    document.title = t('page.title');
    document.querySelector('meta[name="description"]').content = t('page.description');
    document.querySelector('meta[property="og:title"]').content = t('page.title');
    document.querySelector('meta[property="og:description"]').content = t('page.description');
    document.querySelectorAll('[data-language]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    updateThemeButton();
    if (persist) {
      save('mmm-language', language);
      const url = new URL(location.href);
      url.searchParams.set('lang', language);
      history.replaceState(null, '', url);
    }
    window.dispatchEvent(new CustomEvent('studio:languagechange'));
  };
  document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => applyLanguage(button.dataset.language, true)));
  document.querySelector('[data-theme-toggle]').addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    save('mmm-theme', theme);
    updateThemeButton();
  });
  applyLanguage(language);
  document.querySelectorAll('[data-preferences]').forEach((node) => node.hidden = false);

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('#primary-navigation');
  const mobile = window.matchMedia('(max-width: 640px)');
  const setExpanded = (expanded) => {
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.setAttribute('aria-label', t(expanded ? 'menu.close' : 'menu.open'));
    navigation.hidden = mobile.matches && !expanded;
  };
  const syncViewport = () => {
    const focusWasInNavigation = navigation.contains(document.activeElement);
    header.classList.add('nav-enhanced');
    toggle.hidden = !mobile.matches;
    setExpanded(false);
    if (focusWasInNavigation && mobile.matches) toggle.focus({ preventScroll: true });
  };
  toggle.addEventListener('click', () => setExpanded(toggle.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', (event) => {
    if (!event.target.closest('a[href^="#"]') || !mobile.matches || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    setExpanded(false);
    toggle.focus({ preventScroll: true });
  });
  header.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') {
      setExpanded(false);
      toggle.focus();
    }
  });
  mobile.addEventListener('change', syncViewport);
  window.addEventListener('studio:languagechange', () => toggle.setAttribute('aria-label', t(toggle.getAttribute('aria-expanded') === 'true' ? 'menu.close' : 'menu.open')));
  syncViewport();

  const dialog = document.querySelector('#project-dialog');
  const mainImage = dialog.querySelector('[data-gallery-main]');
  const caption = dialog.querySelector('[data-gallery-caption]');
  const thumbnails = [...dialog.querySelectorAll('[data-gallery-index]')];
  let selected = 0;
  const selectArtwork = (index) => {
    selected = index;
    mainImage.src = thumbnails[index].querySelector('img').src;
    mainImage.alt = t(thumbnails[index].dataset.galleryKey);
    caption.textContent = t(thumbnails[index].dataset.galleryKey);
    // Dynamic gallery captions must not revert when the language changes.
    caption.removeAttribute('data-i18n');
    thumbnails.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  };
  document.querySelector('[data-open-project]').addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    selectArtwork(selected);
    dialog.showModal();
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  thumbnails.forEach((button, index) => button.addEventListener('click', () => selectArtwork(index)));
  dialog.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const index = event.key === 'Home' ? 0 : event.key === 'End' ? thumbnails.length - 1 : (selected + (event.key === 'ArrowRight' ? 1 : -1) + thumbnails.length) % thumbnails.length;
    selectArtwork(index);
    thumbnails[index].focus();
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  window.addEventListener('studio:languagechange', () => selectArtwork(selected));
})();
