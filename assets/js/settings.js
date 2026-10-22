// Apply saved appearance before CSS paints; storage may be unavailable in private contexts.
(() => {
  let theme;
  let language;
  try {
    theme = localStorage.getItem('mmm-theme');
    language = localStorage.getItem('mmm-language');
  } catch {}
  const queryLanguage = new URLSearchParams(location.search).get('lang');
  language = ['id', 'en'].includes(queryLanguage) ? queryLanguage : language === 'id' ? 'id' : 'en';
  theme = ['light', 'dark'].includes(theme) ? theme : 'light';
  document.documentElement.dataset.theme = theme;
  document.documentElement.lang = language;
  window.STUDIO_INITIAL = { theme, language };
})();
