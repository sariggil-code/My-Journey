/* v2 · shared header, footer, data helpers, smooth scroll. */
(function () {
  var A = '../assets/';
  window.ASSET = A;
  window.CONT = {
    europe: { name: 'Europe', v: '--europe' },
    samerica: { name: 'South & Central America', v: '--samerica' },
    namerica: { name: 'North America', v: '--namerica' },
    asia: { name: 'Asia', v: '--asia' },
    africa: { name: 'Africa', v: '--africa' }
  };
  window.CONT_ORDER = ['europe', 'samerica', 'namerica', 'asia', 'africa'];
  window.THEMES = { tribes: 'Tribes', ceremonies: 'Ceremonies & Festivals', landscapes: 'Landscapes', animals: 'Animals' };
  window.flag = function (c) { return '<img class="flag" src="' + A + 'flags/' + c.a2 + '.svg" alt="" width="24" height="18">'; };
  window.cvar = function (c) { return 'var(' + CONT[c.cont].v + ')'; };
  window.yearsText = function (c) { return c.years.length ? c.years.join(' · ') : 'Home'; };
  window.esc = function (s) { return String(s).replace(/[&<>"]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); };
  var P = { // lucide-style strokes, one weight
    arrowR: '<path d="M5 12h14M13 6l6 6-6 6"/>', arrowL: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>',
    upR: '<path d="M7 17 17 7M8 7h9v9"/>', play: '<path d="M8 5.5v13l10.5-6.5z"/>', shuffle: '<path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>'
  };
  window.icon = function (n) { return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + P[n] + '</svg>'; };

  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  window.FX = { reduce: reduce, fine: fine };

  var PAGES = [['index.html', 'Home'], ['map.html', 'Map'], ['countries.html', 'Countries'], ['timeline.html', 'Timeline'],
    ['gallery.html', 'Gallery'], ['videos.html', 'Videos'], ['2027.html', '2027']];
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase() || 'index.html';

  document.addEventListener('DOMContentLoaded', function () {
    var head = document.createElement('header');
    head.className = 'site-head';
    head.innerHTML = '<div class="wrap"><a class="brand" href="index.html"><i></i>Where I Have Been</a>' +
      '<button class="icon-btn menu-btn" aria-label="Open menu" aria-expanded="false">' + icon('menu') + '</button>' +
      '<nav class="nav" aria-label="Site">' + PAGES.map(function (p) { return '<a href="' + p[0] + '"' + (p[0] === here ? ' class="on" aria-current="page"' : '') + '>' + p[1] + '</a>'; }).join('') + '</nav></div>';
    document.body.insertBefore(head, document.body.firstChild);
    var nav = head.querySelector('.nav'), mb = head.querySelector('.menu-btn');
    var isHome = document.body.classList.contains('home');
    function onScroll() { head.classList.toggle('solid', nav.classList.contains('open') || scrollY > (isHome ? 60 : 8)); }
    mb.onclick = function () {
      var o = nav.classList.toggle('open');
      mb.setAttribute('aria-expanded', o); mb.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
      mb.innerHTML = icon(o ? 'x' : 'menu'); onScroll();
    };
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) mb.click(); });
    addEventListener('scroll', onScroll, { passive: true }); onScroll();

    var foot = document.createElement('footer');
    foot.className = 'site-foot';
    foot.innerHTML = '<div class="wrap row"><span>61 countries, 5 continents, 1986–2026</span><span>My Travel Stories · ' +
      '<a href="https://www.instagram.com/gil.sarig" target="_blank" rel="noopener">Instagram</a></span></div>';
    document.body.appendChild(foot);

    var g = document.createElement('div'); g.className = 'grain'; g.setAttribute('aria-hidden', 'true');
    document.body.appendChild(g);

    if (!reduce) {
      var s = document.createElement('script');
      s.src = 'https://unpkg.com/lenis@1.1.13/dist/lenis.min.js';
      s.onload = function () {
        if (!window.Lenis) return;
        var lenis = new Lenis({ lerp: 0.12, anchors: true });
        window.FX.lenis = lenis;
        if (window.ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
        (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
      };
      document.head.appendChild(s);
    }
  });
})();
