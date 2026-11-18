/* Shared header, footer, data helpers and cinematic effects for every page. */
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  root.removeAttribute('data-theme');

  window.CONT = {
    europe: { name: 'Europe', v: '--europe' },
    samerica: { name: 'South & Central America', v: '--samerica' },
    namerica: { name: 'North America', v: '--namerica' },
    asia: { name: 'Asia', v: '--asia' },
    africa: { name: 'Africa', v: '--africa' }
  };
  window.CONT_ORDER = ['europe', 'samerica', 'namerica', 'asia', 'africa'];
  window.THEMES = { tribes: '👥 Tribes', ceremonies: '🎭 Ceremonies & Festivals', landscapes: '⛰️ Landscapes', animals: '🦁 Animals' };
  window.flag = function (c) { return '<img class="flag" src="assets/flags/' + c.a2 + '.svg" alt="">'; };
  window.cvar = function (c) { return 'var(' + CONT[c.cont].v + ')'; };
  window.yearsText = function (c) { return c.years.length ? c.years.join(' · ') : 'Home'; };
  window.esc = function (s) { return String(s).replace(/[&<>"]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); };

  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var fine = matchMedia('(pointer:fine)').matches;
  window.FX = { reduce: reduce, fine: fine };

  var PAGES = [['index.html', 'Home'], ['map.html', 'Map'], ['countries.html', 'Countries'], ['timeline.html', 'Timeline'],
    ['gallery.html', 'Gallery'], ['videos.html', 'Videos'], ['2027.html', '2027']];
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (here === '') here = 'index.html';

  document.addEventListener('DOMContentLoaded', function () {
    /* ---------- header ---------- */
    var head = document.createElement('header');
    head.className = 'site-head';
    head.innerHTML = '<div class="wrap"><a class="brand" href="index.html"><i></i>Where I Have Been</a>' +
      '<button class="icon-btn menu-btn" aria-label="Menu" aria-expanded="false">☰</button>' +
      '<nav class="nav">' + PAGES.map(function (p) { return '<a href="' + p[0] + '"' + (p[0] === here ? ' class="on" aria-current="page"' : '') + '>' + p[1] + '</a>'; }).join('') + '</nav></div>';
    document.body.insertBefore(head, document.body.firstChild);
    var nav = head.querySelector('.nav'), mb = head.querySelector('.menu-btn');
    mb.onclick = function () {
      var o = nav.classList.toggle('open');
      mb.setAttribute('aria-expanded', o); mb.textContent = o ? '✕' : '☰';
      if (o) head.classList.add('solid'); else onScroll();
    };
    var isHome = document.body.classList.contains('home');
    function onScroll() { head.classList.toggle('solid', nav.classList.contains('open') || scrollY > (isHome ? 80 : 10)); }
    addEventListener('scroll', onScroll, { passive: true }); onScroll();

    /* ---------- footer ---------- */
    var foot = document.createElement('footer');
    foot.className = 'site-foot';
    foot.innerHTML = '<div class="wrap"><div class="mono">· Next departure ·</div>' +
      '<a class="big" href="2027.html">Yalla <em>2027</em> →</a>' +
      '<div class="row"><span>61 countries · 5 continents · 1986 — 2026</span><span>My Travel Stories &nbsp;·&nbsp; ' +
      '<a href="https://www.instagram.com/gil.sarig" target="_blank" rel="noopener">Instagram ↗</a></span></div></div>';
    document.body.appendChild(foot);

    /* ---------- film grain ---------- */
    var g = document.createElement('div'); g.className = 'grain'; g.setAttribute('aria-hidden', 'true');
    document.body.appendChild(g);

    /* ---------- scroll reveal ---------- */
    var SEL = '.page-head > *, .sec-title, .card, .ccard, .shot, .tl-row, .cont-h, .vcard, .wall > *, .chapters li, .film-sec .film, .next-teaser, [data-rv]';
    var io = 'IntersectionObserver' in window && !reduce ? new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target; io.unobserve(el); el.classList.add('in');
        setTimeout(function () { el.classList.remove('rv', 'in'); el.style.removeProperty('--d'); }, 1400);
      });
    }, { rootMargin: '0px 0px -8% 0px' }) : null;
    function scan(scope) {
      if (!io) return;
      var list = (scope || document).querySelectorAll(SEL), n = 0;
      list.forEach(function (el) {
        if (el.dataset.rvDone || el.closest('.site-head,.site-foot,.lb')) return;
        el.dataset.rvDone = 1;
        var r = el.getBoundingClientRect();
        el.classList.add('rv');
        if (r.top < innerHeight) el.style.setProperty('--d', (Math.min(n++, 10) * 0.06) + 's');
        io.observe(el);
      });
    }
    window.FX.scan = scan;
    scan();
    var main = document.querySelector('main');
    if (main && io) new MutationObserver(function () { scan(main); }).observe(main, { childList: true, subtree: true });

    /* ---------- custom cursor ---------- */
    if (fine && !reduce) {
      var ring = document.createElement('div'), dot = document.createElement('div');
      ring.className = 'cursor hidden'; dot.className = 'cursor-dot hidden';
      document.body.appendChild(ring); document.body.appendChild(dot);
      var mx = -100, my = -100, rx = -100, ry = -100;
      addEventListener('pointermove', function (e) {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
        ring.classList.remove('hidden'); dot.classList.remove('hidden');
        var t = e.target.closest ? e.target.closest('[data-cursor],a,button,.shot,input,.chip') : null;
        var lab = t && t.closest('[data-cursor]');
        if (lab) { ring.textContent = lab.getAttribute('data-cursor'); ring.className = 'cursor label'; }
        else { ring.textContent = ''; ring.className = 'cursor' + (t ? ' hover' : ''); }
      }, { passive: true });
      document.addEventListener('mouseleave', function () { ring.classList.add('hidden'); dot.classList.add('hidden'); });
      (function loop() {
        rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
        ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
        requestAnimationFrame(loop);
      })();

      /* magnetic buttons */
      document.addEventListener('pointermove', function (e) {
        var b = e.target.closest && e.target.closest('.btn,.cf-btns button,.icon-btn');
        document.querySelectorAll('.magnet').forEach(function (m) { if (m !== b) { m.style.transform = ''; m.classList.remove('magnet'); } });
        if (!b) return;
        var r = b.getBoundingClientRect();
        b.classList.add('magnet');
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.25) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.35) + 'px)';
      }, { passive: true });
    }

    /* ---------- smooth scrolling (Lenis) ---------- */
    if (!reduce) {
      var s = document.createElement('script');
      s.src = 'https://unpkg.com/lenis@1.1.13/dist/lenis.min.js';
      s.onload = function () {
        if (!window.Lenis) return;
        var lenis = new Lenis({ lerp: 0.1, anchors: true });
        window.FX.lenis = lenis;
        if (window.ScrollTrigger) { lenis.on('scroll', ScrollTrigger.update); }
        (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
      };
      document.head.appendChild(s);
    }
  });
})();
