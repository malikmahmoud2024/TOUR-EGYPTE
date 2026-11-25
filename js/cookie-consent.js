/* ==========================================================================
   Cookie consent (CNIL / GDPR)
   tarteaucitron.js v1.37.0, self-hosted in js/tarteaucitron/ (MIT licence).

   - Google Analytics 4 (G-9JT5JNJZKN) loads ONLY after the visitor accepts.
     Before that, no request is made to Google.
   - Google Consent Mode v2: everything "denied" by default; analytics_storage
     switches to "granted" only on acceptance ("basic" mode = softConsentMode).
   - Banner language = the page's <html lang> (fr / en / de / es / it).
   - Consent is kept 183 days (~6 months). CNIL maximum is 13 months.
   - Must be loaded right after js/tarteaucitron/tarteaucitron.min.js.
   ========================================================================== */
(function () {
  'use strict';

  if (typeof tarteaucitron === 'undefined') { return; }

  var lang = (document.documentElement.getAttribute('lang') || 'fr').slice(0, 2).toLowerCase();

  /* Privacy page per language. Leave '' until the page exists. */
  var PRIVACY_URLS = { fr: '', en: '', de: '', es: '', it: '' };

  /* Consent lifetime in days (read by tarteaucitron when it writes its cookie). */
  window.tarteaucitronForceExpire = 183;
  window.tarteaucitronExpireInDay = true;

  /* Short, balanced button labels: "Accept" and "Refuse" read the same weight. */
  var TEXTS = {
    fr: { acceptAll: 'Tout accepter', denyAll: 'Tout refuser', personalize: 'Personnaliser' },
    en: { acceptAll: 'Accept all', denyAll: 'Refuse all', personalize: 'Customize' },
    de: {
      acceptAll: 'Alle akzeptieren', denyAll: 'Alle ablehnen', personalize: 'Anpassen',
      alertBigPrivacy: 'Diese Website verwendet Cookies und lässt Sie entscheiden, welche Sie aktivieren möchten'
    },
    es: { acceptAll: 'Aceptar todo', denyAll: 'Rechazar todo', personalize: 'Personalizar' },
    it: { acceptAll: 'Accetta tutto', denyAll: 'Rifiuta tutto', personalize: 'Personalizza' }
  };
  if (TEXTS[lang]) { window.tarteaucitronCustomText = TEXTS[lang]; }

  /* Styles: vendor CSS first, then the site's brand overrides (css/cookie-consent.css). */
  function addCss(href) {
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
  }
  addCss(tarteaucitron.cdn + 'css/tarteaucitron.min.css?v=' + tarteaucitron.version);
  addCss(tarteaucitron.cdn + '../../css/cookie-consent.css?v=1');

  tarteaucitron.init({
    privacyUrl: PRIVACY_URLS[lang] || '',
    bodyPosition: 'top',          /* banner first in the page for keyboard / screen readers */
    hashtag: '#tarteaucitron',
    cookieName: 'tarteaucitron',
    orientation: 'bottom',        /* bottom bar, the page stays usable */
    groupServices: false,
    showDetailsOnClick: true,
    serviceDefaultState: 'wait',
    showAlertSmall: false,
    cookieslist: false,
    closePopup: false,            /* no close "X": closing never counts as consent */
    showIcon: false,              /* panel is reopened from the footer link */
    adblocker: false,
    DenyAllCta: true,             /* "Refuse all" button on the banner */
    AcceptAllCta: true,           /* "Accept all" button on the banner */
    highPrivacy: true,            /* no consent by scrolling or browsing */
    alwaysNeedConsent: false,
    handleBrowserDNTRequest: false,
    removeCredit: true,
    moreInfoLink: true,
    useExternalCss: true,         /* CSS is added above */
    useExternalJs: false,
    mandatory: true,
    mandatoryCta: false,
    googleConsentMode: true,      /* Consent Mode v2, all denied by default */
    softConsentMode: true,        /* gtag.js is NOT loaded at all before consent */
    bingConsentMode: false,
    pianoConsentMode: false,
    piwikConsentMode: false,
    dataLayer: false,
    serverSide: false,
    partnersList: false
  });

  /* Google Analytics 4. The site's own events (js/main.js, contact forms) check
     that window.gtag exists, so they only fire after consent. */
  tarteaucitron.user.gtagUa = 'G-9JT5JNJZKN';
  (tarteaucitron.job = tarteaucitron.job || []).push('gtag');

  /* Footer link "Gestion des cookies" (any element with data-cookie-settings)
     reopens the panel so the visitor can change or withdraw consent.
     Its href="#tarteaucitron" also opens the panel on its own as a fallback. */
  document.addEventListener('click', function (e) {
    var link = e.target && e.target.closest ? e.target.closest('[data-cookie-settings]') : null;
    if (!link) { return; }
    if (tarteaucitron.userInterface && typeof tarteaucitron.userInterface.openPanel === 'function') {
      e.preventDefault();
      tarteaucitron.userInterface.openPanel();
    }
  });
})();
