/* ClearCareer 2026: small, dependency-free behaviours. */
(function () {
  document.documentElement.classList.remove('no-js');

  // Mobile nav
  var toggle = document.querySelector('.nav__toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('nav--open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav__links a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('nav--open'); });
    });
  }

  // Reveal on scroll
  var items = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var delay = e.target.getAttribute('data-delay');
          if (delay) e.target.style.transitionDelay = delay + 'ms';
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Pass UTM parameters from the current URL to outbound checkout / booking links.
  // Any link with data-track keeps attribution from Instagram -> ManyChat -> page -> Stripe/Calendly.
  try {
    var params = new URLSearchParams(window.location.search);
    var utm = [];
    params.forEach(function (v, k) { if (/^(utm_|ref$|src$)/i.test(k)) utm.push(encodeURIComponent(k) + '=' + encodeURIComponent(v)); });
    if (utm.length) {
      document.querySelectorAll('a[data-track]').forEach(function (a) {
        var href = a.getAttribute('href');
        if (!href || href.charAt(0) === '#') return;
        a.setAttribute('href', href + (href.indexOf('?') > -1 ? '&' : '?') + utm.join('&'));
      });
    }
  } catch (e) { /* ignore */ }

  // Current year
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Copy buttons: <button class="copy-btn" data-copy="#id">
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var sel = btn.getAttribute('data-copy');
      var target = sel ? document.querySelector(sel) : null;
      if (!target) return;
      var text = target.innerText || target.textContent;
      navigator.clipboard.writeText(text).then(function () {
        var old = btn.textContent; btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = old; }, 1400);
      });
    });
  });

  // Sticky CTA on sales pages: show after the hero scrolls away
  var sticky = document.querySelector('.sticky-cta');
  if (sticky) {
    document.body.classList.add('has-sticky-cta');
  }
})();
