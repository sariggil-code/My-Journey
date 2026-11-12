/* Shared header, footer, theme toggle and data helpers for every page. */
(function () {
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (saved) document.documentElement.setAttribute('data-theme', saved);

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

  var PAGES = [['index.html', 'Home'], ['map.html', 'Map'], ['countries.html', 'Countries'], ['timeline.html', 'Timeline'],
    ['gallery.html', 'Gallery'], ['videos.html', 'Videos'], ['2027.html', '2027']];
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (here === '') here = 'index.html';

  document.addEventListener('DOMContentLoaded', function () {
    var head = document.createElement('header');
    head.className = 'site-head';
    head.innerHTML = '<div class="wrap"><a class="brand" href="index.html"><span class="grad">Where I Have Been</span></a>' +
      '<button class="icon-btn menu-btn" aria-label="Menu" aria-expanded="false">☰</button>' +
      '<nav class="nav">' + PAGES.map(function (p) { return '<a href="' + p[0] + '"' + (p[0] === here ? ' class="on" aria-current="page"' : '') + '>' + p[1] + '</a>'; }).join('') + '</nav>' +
      '<button class="icon-btn theme-btn" aria-label="Toggle dark or light mode" title="Dark / Light">🌓</button></div>';
    document.body.insertBefore(head, document.body.firstChild);
    var nav = head.querySelector('.nav'), mb = head.querySelector('.menu-btn');
    mb.onclick = function () { var o = nav.classList.toggle('open'); mb.setAttribute('aria-expanded', o); };
    head.querySelector('.theme-btn').onclick = function () {
      var cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
      var nx = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nx);
      try { localStorage.setItem('theme', nx); } catch (e) {}
    };
    var foot = document.createElement('footer');
    foot.className = 'site-foot';
    foot.innerHTML = '<div class="wrap"><div class="mono">· My Travel Stories ·</div><p>61 countries · 5 continents · 1986 — 2026 &nbsp;|&nbsp; ' +
      '<a href="https://www.instagram.com/gil.sarig" target="_blank" rel="noopener">Instagram</a></p></div>';
    document.body.appendChild(foot);
  });
})();
