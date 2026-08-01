/* ============================================================
   TOUR EGYPTE — Language Switcher
   ============================================================
   Every real page already carries a full, correct set of
   <link rel="alternate" hreflang="xx" href="..."> tags (for SEO).
   This reads those tags at runtime to know where each language
   button should go, instead of a hardcoded per-page redirect map
   copy-pasted into every HTML file. Only the URL *path* is taken
   from the hreflang href — never its origin — so this works
   correctly on any host (localhost, a Vercel preview, production)
   without ever redirecting off the current domain.

   The handful of pages with no hreflang block (currently just the
   5 404.html files) fall back to the old folder-prefix + current-
   filename approach, since those pages share an identical filename
   across all 5 language folders.
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  var hreflangPaths = {};
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(function (link) {
    var lang = link.getAttribute('hreflang');
    if (!lang || lang === 'x-default') return;
    var href = link.getAttribute('href');
    if (!href) return;
    try {
      hreflangPaths[lang] = new URL(href).pathname;
    } catch (e) { /* malformed href, skip */ }
  });

  var FOLDER_PREFIX = { fr: '', en: '/en', de: '/de', es: '/es', it: '/it' };

  document.querySelectorAll('[data-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-lang');
      var targetPath = hreflangPaths[lang];

      if (!targetPath) {
        if (!(lang in FOLDER_PREFIX)) return;
        var currentPage = location.pathname.split('/').pop() || 'index.html';
        if (currentPage.indexOf('.') === -1) { currentPage += '.html'; }
        targetPath = FOLDER_PREFIX[lang] + '/' + currentPage;
      }

      window.location.href = location.origin + targetPath;
    });
  });
});
