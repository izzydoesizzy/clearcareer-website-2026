(function () {
  'use strict';
  var names = { editorial: 'Editorial', atelier: 'Atelier', signal: 'Signal', blueprint: 'Blueprint' };
  var sides = ['left', 'right'];
  var picks = ['editorial', 'atelier'];
  var nextSide = 0;
  var mode = 'desktop';
  var saved = '';
  var status = document.getElementById('saved-choice');

  function saveFavorite(id) {
    saved = saved === id ? '' : id;
    try { if (saved) localStorage.setItem('clearcareer-theme-favorite', saved); else localStorage.removeItem('clearcareer-theme-favorite'); } catch (e) { /* Browsing still works when storage is disabled. */ }
    showFavorite();
  }
  function showFavorite() {
    document.querySelectorAll('[data-save]').forEach(function (button) {
      var selected = button.dataset.save === saved;
      button.setAttribute('aria-pressed', String(selected));
      button.innerHTML = (selected ? '♥' : '♡') + ' <span>' + (selected ? 'Your favorite' : 'Save favorite') + '</span>';
    });
    status.textContent = saved ? 'Your favorite: ' + names[saved] + '. Saved in this browser.' : 'Your favorite is waiting to be found.';
  }
  function fitFrames() {
    document.querySelectorAll('.frame-shell').forEach(function (shell) {
      var frame = shell.querySelector('iframe');
      var screenWidth = mode === 'mobile' ? 390 : 1280;
      var available = shell.clientWidth;
      var scale = Math.min(1, available / screenWidth);
      frame.style.width = screenWidth + 'px';
      frame.style.maxWidth = 'none';
      frame.style.height = Math.round(shell.clientHeight / scale) + 'px';
      frame.style.transform = 'scale(' + scale + ')';
      frame.style.left = Math.max(0, (available - screenWidth * scale) / 2) + 'px';
    });
  }
  function showPicks() {
    sides.forEach(function (side, i) {
      var id = picks[i];
      var select = document.getElementById(side + '-theme');
      var frame = document.getElementById(side + '-frame');
      var open = document.getElementById(side + '-open');
      select.value = id;
      if (frame.getAttribute('src') !== id + '.html') frame.src = id + '.html';
      frame.title = names[id] + ' full landing page';
      open.href = id + '.html';
      open.setAttribute('aria-label', 'Open ' + names[id] + ' in a new tab');
    });
    document.querySelectorAll('[data-compare]').forEach(function (button) {
      var selected = picks.indexOf(button.dataset.compare) !== -1;
      button.setAttribute('aria-pressed', String(selected));
      button.textContent = selected ? '✓ Comparing' : '+ Compare';
    });
    fitFrames();
  }
  try { var stored = localStorage.getItem('clearcareer-theme-favorite'); if (names[stored]) saved = stored; } catch (e) {}
  document.querySelectorAll('[data-save]').forEach(function (button) {
    button.addEventListener('click', function () { saveFavorite(button.dataset.save); });
  });
  document.querySelectorAll('[data-compare]').forEach(function (button) {
    button.addEventListener('click', function () {
      var id = button.dataset.compare;
      if (picks.indexOf(id) === -1) { picks[nextSide] = id; nextSide = 1 - nextSide; showPicks(); }
      document.getElementById('compare').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  });
  sides.forEach(function (side, i) {
    document.getElementById(side + '-theme').addEventListener('change', function (event) {
      var other = 1 - i;
      if (event.target.value === picks[other]) picks[other] = picks[i];
      picks[i] = event.target.value;
      showPicks();
    });
  });
  document.querySelectorAll('[data-view]').forEach(function (button) {
    button.addEventListener('click', function () {
      mode = button.dataset.view;
      document.body.classList.toggle('mobile-view', mode === 'mobile');
      document.querySelectorAll('[data-view]').forEach(function (option) {
        var active = option.dataset.view === mode;
        option.classList.toggle('active', active);
        option.setAttribute('aria-pressed', String(active));
      });
      fitFrames();
      document.getElementById('compare').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  });
  document.getElementById('reset-comparison').addEventListener('click', function () {
    picks = ['editorial', 'atelier']; nextSide = 0; showPicks();
  });
  if ('ResizeObserver' in window) {
    var observer = new ResizeObserver(fitFrames);
    document.querySelectorAll('.frame-shell').forEach(function (shell) { observer.observe(shell); });
  } else { window.addEventListener('resize', fitFrames); }
  showFavorite(); showPicks();
})();