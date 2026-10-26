import { flag } from './flags.mjs';
export { flag };
// Общий каркас страницы: шапка, подвал, плавающая кнопка WhatsApp.

export const WA_LINK = 'https://wa.me/79894759320';
export const SOCIAL = {
  whatsappCommunity: 'https://chat.whatsapp.com/EC7XTTrD9MoCjsjeBSkVal',
  telegram: 'https://t.me/STUDYINABROUD',
  youtube: 'https://www.youtube.com/@Study_in_Saudi',
  instagram: 'https://www.instagram.com/study_in_saudi_?cplk=MWw2N3NrZTJtazF4Yg%3D%3D&utm_source=qr',
};
export const PHONE = '+7 989 475 93-20';
export const EMAIL = 'studiinsaudi@gmail.com';

export function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Восьмиконечная звезда (Рубъ-эль-Хизб): два квадрата, один повёрнут на 45°.
export function starSvg(className = '') {
  const cls = className ? ` class="${esc(className)}"` : '';
  return `<svg${cls} viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="18" y="18" width="64" height="64"/><rect x="18" y="18" width="64" height="64" transform="rotate(45 50 50)"/></svg>`;
}

const svg = (inner, extra = '') =>
  `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false" ${extra}>${inner}</svg>`;

export const icons = {
  whatsapp: svg('<path fill="currentColor" d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 1 1 7 3.86Zm4.5-6.1c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.17.25-.64.8-.78.96-.14.17-.29.18-.53.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.54.12.16 1.73 2.64 4.2 3.7.59.26 1.05.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28Z"/>'),
  telegram: svg('<path fill="currentColor" d="M21.5 4.1 2.9 11.3c-1.27.5-1.26 1.2-.23 1.52l4.77 1.49 1.84 5.65c.22.62.11.87.76.87.5 0 .72-.23 1-.5l2.3-2.24 4.78 3.53c.88.49 1.51.24 1.73-.82l3.13-14.77c.32-1.29-.49-1.87-1.48-1.43ZM8.3 13.7l9.5-6c.45-.27.86-.12.52.18l-7.9 7.14-.31 3.3-1.81-4.62Z"/>'),
  youtube: svg('<path fill="currentColor" d="M22 8.2a2.8 2.8 0 0 0-2-2C18.3 5.8 12 5.8 12 5.8s-6.3 0-8 .4a2.8 2.8 0 0 0-2 2C1.6 9.9 1.6 12 1.6 12s0 2.1.4 3.8a2.8 2.8 0 0 0 2 2c1.7.4 8 .4 8 .4s6.3 0 8-.4a2.8 2.8 0 0 0 2-2c.4-1.7.4-3.8.4-3.8s0-2.1-.4-3.8ZM10 15V9l5.2 3L10 15Z"/>'),
  instagram: svg('<rect x="3" y="3" width="18" height="18" rx="5.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/>'),
  phone: svg('<path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M5 3h3.5l1.7 4.4-2.2 1.6a12 12 0 0 0 6 6l1.6-2.2L20 14.5V18a2 2 0 0 1-2 2A15 15 0 0 1 3 5a2 2 0 0 1 2-2Z"/>'),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m4 7.5 8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>'),
  arrow: svg('<path d="M5 12h14m-5.5-5.5L19 12l-5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>'),
  check: svg('<path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>'),
};

const NAV_UNIS = [
  { href: 'universities/ksa.html', flag: 'ksa', title: 'Саудовская Аравия', sub: '25 университетов' },
  { href: 'universities/uae.html', flag: 'uae', title: 'ОАЭ', sub: 'Al Qasimia University' },
  { href: 'universities/qatar.html', flag: 'qatar', title: 'Катар', sub: 'Qatar University' },
  { href: 'universities/turkey.html', flag: 'turkey', title: 'Турция', sub: 'Diyanet и Türkiye Bursları' },
  { href: 'universities/king-salman-academy.html', flag: 'academy', title: 'Академия арабского языка имени короля Салмана', sub: 'Годичные курсы арабского языка' },
];

const NAV_MAIN = [
  { key: 'home', href: 'index.html', label: 'Главная' },
  { key: 'unis', label: 'Вузы', dropdown: true },
  { key: 'services', href: 'services.html', label: 'Услуги' },
  { key: 'reviews', href: 'reviews.html', label: 'Отзывы' },
  { key: 'about', href: 'about.html', label: 'О нас' },
];

function header(p, active) {
  const items = NAV_MAIN.map((item) => {
    const cur = item.key === active ? ' aria-current="page"' : '';
    const activeCls = item.key === active ? ' is-active' : '';
    if (!item.dropdown) {
      return `<li class="nav__item"><a class="nav__link${activeCls}" href="${p}${item.href}"${cur}>${item.label}</a></li>`;
    }
    const rows = NAV_UNIS.map(
      (u) => `<li><a class="dropdown__row" href="${p}${u.href}"><span class="dropdown__flag">${flag(u.flag)}</span><span class="dropdown__text"><strong>${esc(u.title)}</strong><small>${esc(u.sub)}</small></span></a></li>`
    ).join('');
    return `<li class="nav__item has-dropdown" data-dropdown>
            <button class="nav__link nav__toggle${activeCls}" type="button" aria-expanded="false" aria-haspopup="true" aria-controls="dd-unis">${item.label}<svg class="nav__caret" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <ul class="dropdown" id="dd-unis">${rows}</ul>
          </li>`;
  }).join('\n          ');

  return `<header class="site-header" data-header>
    <div class="container site-header__inner">
      <a class="brand" href="${p}index.html" aria-label="STUDY IN SAUDI — на главную">
        <img class="brand__logo" src="${p}assets/img/logo.png" width="44" height="44" alt="">
        <span class="brand__text"><span class="brand__name">STUDY IN SAUDI</span><span class="brand__sub">Перевод и подача документов</span></span>
      </a>
      <button class="burger" type="button" aria-label="Открыть меню" aria-expanded="false" aria-controls="site-nav" data-burger><span></span><span></span><span></span></button>
      <nav class="nav" id="site-nav" aria-label="Основное меню" data-nav>
        <ul class="nav__list">
          ${items}
        </ul>
        <a class="btn btn--primary nav__cta" href="${WA_LINK}" target="_blank" rel="noopener">Подать заявку</a>
      </nav>
    </div>
  </header>`;
}

function footer(p) {
  const menu = NAV_MAIN.filter((i) => i.href)
    .map((i) => `<li><a href="${p}${i.href}">${i.label}</a></li>`)
    .join('');
  const unis = NAV_UNIS.map((u) => `<li><a href="${p}${u.href}">${flag(u.flag)} ${esc(u.title)}</a></li>`).join('');
  const soc = (href, label, icon) =>
    `<a class="social__btn" href="${esc(href)}" target="_blank" rel="noopener" aria-label="${label}">${icon}</a>`;
  return `<footer class="site-footer">
    ${starSvg('site-footer__star')}
    <div class="container">
      <div class="site-footer__grid">
        <div class="site-footer__col site-footer__about">
          <a class="brand brand--light" href="${p}index.html" aria-label="STUDY IN SAUDI — на главную">
            <img class="brand__logo" src="${p}assets/img/logo.png" width="52" height="52" alt="" loading="lazy">
            <span class="brand__text"><span class="brand__name">STUDY IN SAUDI</span></span>
          </a>
          <p>Перевод и подача документов в вузы Саудовской Аравии, ОАЭ, Катара и Турции с 2008 года</p>
        </div>
        <div class="site-footer__col"><h3>Меню</h3><ul>${menu}</ul></div>
        <div class="site-footer__col"><h3>Вузы</h3><ul>${unis}</ul></div>
        <div class="site-footer__col">
          <h3>Контакты</h3>
          <ul>
            <li><a class="contact-link" href="tel:+79894759320">${icons.phone}<span>${PHONE}</span></a></li>
            <li><a class="contact-link" href="mailto:${EMAIL}">${icons.mail}<span>${EMAIL}</span></a></li>
          </ul>
          <div class="social">
            ${soc(SOCIAL.whatsappCommunity, 'WhatsApp-сообщество', icons.whatsapp)}
            ${soc(SOCIAL.telegram, 'Telegram', icons.telegram)}
            ${soc(SOCIAL.youtube, 'YouTube', icons.youtube)}
            ${soc(SOCIAL.instagram, 'Instagram', icons.instagram)}
          </div>
        </div>
      </div>
      <div class="site-footer__bottom">© 2008–<span data-year>2026</span> Study in Saudi</div>
    </div>
  </footer>
  <a class="wa-float" href="${WA_LINK}" target="_blank" rel="noopener" aria-label="Написать в WhatsApp">${icons.whatsapp}</a>`;
}

export function layout({ title, description = '', depth = 0, active = '', body = '', bodyClass = '' }) {
  const p = '../'.repeat(depth);
  const fullTitle = title ? `${title} — STUDY IN SAUDI` : 'STUDY IN SAUDI';
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(description)}">
  <script>document.documentElement.classList.add('js')</script>
  <meta name="theme-color" content="#FBF7F1">
  <link rel="icon" type="image/png" href="${p}assets/img/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Manrope:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${p}assets/css/style.css">
  <link rel="stylesheet" href="${p}assets/css/unis.css">
  <link rel="stylesheet" href="${p}assets/css/pages.css">
</head>
<body${bodyClass ? ` class="${esc(bodyClass)}"` : ''}>
  <a class="skip-link" href="#main">К содержимому</a>
  ${header(p, active)}
  <main id="main">
${body}
  </main>
  ${footer(p)}
  <script src="${p}assets/js/main.js"></script>
</body>
</html>
`;
}
