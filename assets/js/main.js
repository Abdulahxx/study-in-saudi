(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var desktop = window.matchMedia ? window.matchMedia('(min-width: 960px)') : { matches: true };

  // Год в подвале
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Шапка при прокрутке
  var header = $('[data-header]');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Бургер
  var burger = $('[data-burger]');
  var nav = $('[data-nav]');
  function setMenu(open) {
    if (!burger || !nav) return;
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    nav.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('menu-open', open);
  }
  if (burger && nav) {
    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a')) setMenu(false);
    });
    window.addEventListener('resize', function () { if (desktop.matches) setMenu(false); });
  }

  // Выпадающее меню «Вузы»
  var dropdowns = $$('[data-dropdown]');
  function setDropdown(dd, open) {
    var btn = $('button', dd);
    dd.classList.toggle('is-open', open);
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  dropdowns.forEach(function (dd) {
    var btn = $('button', dd);
    if (!btn) return;
    var timer;
    var openedByHover = false;
    btn.addEventListener('click', function () {
      if (openedByHover) return;
      setDropdown(dd, !dd.classList.contains('is-open'));
    });
    dd.addEventListener('pointerenter', function (e) {
      if (!desktop.matches || e.pointerType !== 'mouse') return;
      clearTimeout(timer);
      openedByHover = true;
      setDropdown(dd, true);
    });
    dd.addEventListener('pointerleave', function (e) {
      if (e.pointerType !== 'mouse') return;
      openedByHover = false;
      if (!desktop.matches) return;
      timer = setTimeout(function () { setDropdown(dd, false); }, 120);
    });
    dd.addEventListener('focusout', function (e) {
      if (desktop.matches && e.relatedTarget && !dd.contains(e.relatedTarget)) setDropdown(dd, false);
    });
  });
  document.addEventListener('click', function (e) {
    dropdowns.forEach(function (dd) {
      if (!dd.contains(e.target)) setDropdown(dd, false);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var focusBtn = null;
    dropdowns.forEach(function (dd) {
      if (dd.classList.contains('is-open')) {
        if (dd.contains(document.activeElement)) focusBtn = $('button', dd);
        setDropdown(dd, false);
      }
    });
    if (focusBtn) focusBtn.focus();
    if (burger && burger.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      burger.focus();
    }
  });

  // Появление блоков
  var reveals = $$('.reveal');
  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('is-visible');
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  // Карусель
  $$('[data-carousel]').forEach(function (root) {
    var track = $('[data-carousel-track]', root) || root;
    var prev = $('[data-carousel-prev]', root);
    var next = $('[data-carousel-next]', root);
    function step() {
      var first = track.firstElementChild;
      return first ? first.getBoundingClientRect().width + 20 : track.clientWidth * 0.8;
    }
    function update() {
      if (prev) prev.disabled = track.scrollLeft <= 4;
      if (next) next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    }
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  // Фильтр списка вузов
  var filter = $('[data-uni-filter]');
  if (filter) {
    var scope = document;
    var search = $('[data-uni-search]', scope);
    var cityBtns = $$('button[data-city]', filter); // только кнопки фильтра: у карточек тоже есть data-city
    var items = $$('[data-uni]', scope);
    var empty = $('[data-uni-empty]', scope);
    var city = 'all';

    var apply = function () {
      var q = search ? search.value.trim().toLowerCase() : '';
      var shown = 0;
      items.forEach(function (it) {
        var name = (it.getAttribute('data-name') || '').toLowerCase();
        var c = it.getAttribute('data-city') || '';
        var ok = (!q || name.indexOf(q) !== -1) && (city === 'all' || c === city);
        it.hidden = !ok;
        if (ok) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    };

    if (search) search.addEventListener('input', apply);
    cityBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        city = b.getAttribute('data-city') || 'all';
        cityBtns.forEach(function (x) {
          var on = x === b;
          x.classList.toggle('is-active', on);
          x.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        apply();
      });
    });
    apply();
  }
})();
