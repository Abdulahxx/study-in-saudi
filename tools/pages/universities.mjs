// Списки вузов по странам и страница каждого вуза (шаг 3).
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { esc, starSvg, icons, WA_LINK, flag } from '../layout.mjs';
import { countries, universities } from '../../data/universities.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
// Имя файла фото вуза (assets/img/unis/<slug>.jpg или .webp) или null
const PHOTO_EXT = ['jpg', 'webp'];
const photoFile = (slug) =>
  PHOTO_EXT.map((ext) => `${slug}.${ext}`).find((f) => existsSync(join(ROOT, 'assets', 'img', 'unis', f))) || null;
const credits = JSON.parse(readFileSync(join(ROOT, 'assets', 'img', 'unis', 'credits.json'), 'utf8'));
const DEED = {
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
  'CC BY-SA 2.0': 'https://creativecommons.org/licenses/by-sa/2.0/',
  'CC BY 3.0': 'https://creativecommons.org/licenses/by/3.0/',
  'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0/'
};
const HERO_ALT = {
  diyanet: 'Мечеть теологического факультета Университета Мармара, Стамбул',
  'turkiye-burslari': 'Ворота Стамбульского университета',
  'king-salman-academy': 'Эр-Рияд'
};
function credit(slug) {
  const c = credits[slug];
  if (!c) return '';
  const author = c.author ? esc(c.author) : 'автор неизвестен';
  const deed = DEED[c.license];
  const lic = deed ? `, <a href="${deed}" target="_blank" rel="noopener">${esc(c.license)}</a>` : '';
  return `<p class="uni-hero__credit">Фото: <a href="${c.source}" target="_blank" rel="noopener">${author}</a>${lic}, Wikimedia Commons</p>`;
}
const country = (key) => countries.find((c) => c.key === key);

// Фото вуза или фирменный фолбэк. variant: 'card' | 'hero'
function media(u, variant) {
  const photo = photoFile(u.slug);
  const src = `../assets/img/unis/${photo}`;
  if (variant === 'hero') {
    return photo
      ? `<img class="uni-hero__img" src="${src}" alt="${esc(HERO_ALT[u.slug] || `Кампус: ${u.nameRu}`)}">${credit(u.slug)}`
      : starSvg('uni-hero__star');
  }
  const city = `<span class="uni-card__city">${esc(u.city)}</span>`;
  if (photo) {
    return `<span class="uni-card__media"><img src="${src}" alt="" loading="lazy">${city}</span>`;
  }
  return `<span class="uni-card__media uni-card__media--fallback">${starSvg('uni-card__star')}<span class="uni-card__fallback-city">${esc(u.city)}</span>${city}</span>`;
}

function card(u) {
  const levels = u.levels.map((l) => `<li class="chip">${esc(l)}</li>`).join('');
  const name = `${u.nameRu} ${u.nameEn} ${u.nameAr} ${u.city}`.toLowerCase();
  return `<a class="uni-card reveal" href="${u.slug}.html" data-uni data-name="${esc(name)}" data-city="${esc(u.city)}">
          ${media(u, 'card')}
          <div class="uni-card__body">
            <h3 class="uni-card__title">${esc(u.nameRu)}</h3>
            <p class="uni-card__ar" lang="ar" dir="rtl">${esc(u.nameAr)}</p>
            <ul class="chips">${levels}</ul>
          </div>
          <span class="uni-card__foot"><span>Подробнее</span><span class="uni-card__arrow">${icons.arrow}</span></span>
        </a>`;
}

// items: [текст, href?]; последний элемент — текущая страница
const crumbs = (items) =>
  `<ol class="crumbs">${items
    .map((it, i) =>
      i === items.length - 1
        ? `<li aria-current="page">${esc(it[0])}</li>`
        : `<li><a href="${it[1]}">${esc(it[0])}</a></li>`
    )
    .join('')}</ol>`;

const ctaBand = () => `    <section class="section">
      <div class="container">
        <div class="cta-band reveal">
          ${starSvg('cta-band__star')}
          <div>
            <h2>Не знаете, какой вуз выбрать?</h2>
            <p>Бесплатная консультация: подскажем подходящий вуз и направление.</p>
          </div>
          <a class="btn btn--light btn--lg" href="${WA_LINK}" target="_blank" rel="noopener">Бесплатная консультация</a>
        </div>
      </div>
    </section>`;

const firstSentence = (s) => s.split('. ')[0].replace(/\.$/, '') + '.';

function countryPage(c) {
  const list = universities.filter((u) => u.country === c.key);
  const isKsa = c.key === 'ksa';
  const h1 = isKsa ? 'Университеты Саудовской Аравии' : c.name;
  const lead = isKsa ? '25 государственных университетов' : firstSentence(c.intro);
  const hero = `    <section class="page-hero">
      ${starSvg('page-hero__star')}
      <div class="container">
        ${crumbs([['Главная', '../index.html'], ['Вузы', 'ksa.html'], [c.name]])}
        <h1>${flag(c.flag)} ${esc(h1)}</h1>
        <p class="lead">${esc(lead)}</p>
      </div>
    </section>`;

  const photoNote = list.some((u) => credits[u.slug] && photoFile(u.slug))
    ? '<p class="photo-note">Фото: Wikimedia Commons, авторы и лицензии указаны на страницах вузов</p>'
    : '';
  let main;
  if (isKsa) {
    const cities = [...new Set(list.map((u) => u.city))].sort((a, b) => a.localeCompare(b, 'ru'));
    const chips = ['<button class="chip is-active" type="button" data-city="all" aria-pressed="true">Все</button>']
      .concat(cities.map((x) => `<button class="chip" type="button" data-city="${esc(x)}" aria-pressed="false">${esc(x)}</button>`))
      .join('');
    main = `    <section class="section">
      <div class="container" data-uni-filter>
        <div class="toolbar">
          <input type="search" placeholder="Поиск по названию или городу" aria-label="Поиск вуза" data-uni-search>
          <div class="chips" role="group" aria-label="Город">${chips}</div>
        </div>
        <div class="grid grid--3">
        ${list.map(card).join('\n        ')}
        </div>
        <p class="empty-note" data-uni-empty hidden>Ничего не найдено. Попробуйте изменить запрос.</p>
        ${photoNote}
      </div>
    </section>`;
  } else {
    main = `    <section class="section">
      <div class="container">
        <div class="section-head reveal">
          <h2>Почему ${esc(c.name)}</h2>
          <p class="lead">${esc(c.intro)}</p>
        </div>
        <div class="grid grid--2">
        ${list.map(card).join('\n        ')}
        </div>
        ${photoNote}
      </div>
    </section>`;
  }
  return {
    path: `universities/${c.file}`,
    title: isKsa
      ? 'Университеты Саудовской Аравии — поступление и перевод документов'
      : `Университеты: ${c.name} — поступление и перевод документов`,
    description: isKsa
      ? '25 государственных университетов Саудовской Аравии: бесплатное обучение, стипендия и общежитие. Поможем с переводом и подачей документов.'
      : `${firstSentence(c.intro)} Поможем с переводом и подачей документов.`,
    depth: 1,
    active: 'unis',
    body: `${hero}\n${main}\n${ctaBand()}`,
  };
}

// Соседи: для КСА — следующие по списку (циклично), для остальных — вузы других стран
function others(u) {
  if (u.country === 'ksa') {
    const ksaList = universities.filter((x) => x.country === 'ksa');
    const i = ksaList.indexOf(u);
    return [1, 2, 3].map((k) => ksaList[(i + k) % ksaList.length]);
  }
  const pool = universities.filter((x) => x.country !== u.country && x.country !== 'academy');
  const picked = [];
  for (const key of ['ksa', 'uae', 'qatar', 'turkey']) {
    const f = pool.find((x) => x.country === key);
    if (f) picked.push(f);
  }
  return picked.slice(0, 3);
}

const list = (arr) => `<ul class="list-check">${arr.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;

function asideTitle(u) {
  if (u.country === 'academy') return 'Хотите учиться в Академии?';
  if (u.country === 'turkey') return `Хотите получить стипендию ${u.nameRu.replace(/^Стипендия\s+/, '')}?`;
  return `Хотите поступить в ${u.nameRu}?`;
}

function uniPage(u) {
  const c = country(u.country);
  const isAcademy = u.country === 'academy';
  const isTurkey = u.country === 'turkey';
  const crumbItems = isAcademy
    ? [['Главная', '../index.html'], ['Вузы', 'ksa.html'], ['Академия']]
    : [['Главная', '../index.html'], ['Вузы', 'ksa.html'], [c.name, c.file], [u.nameRu]];

  const forWhom = u.womenOnly
    ? 'Только для девушек'
    : (u.features || []).includes('Только для юношей') ? 'Только для юношей' : '';
  const fact = (label, value) =>
    `<div class="facts__item"><span class="facts__label">${label}</span><span class="facts__value">${esc(value)}</span></div>`;
  const facts = [
    fact('Город', u.city),
    u.founded ? fact('Основан', u.founded) : '',
    fact('Уровни', u.levels.join(', ')),
    forWhom ? fact('Для кого', forWhom) : '',
    u.age ? fact('Возраст', u.age) : '',
  ].join('');

  const aboutH = isTurkey || isAcademy ? 'О программе' : 'Об университете';
  const privH = isTurkey ? 'Что даёт стипендия' : isAcademy ? 'Что вы получите' : 'Привилегии студентам';
  const facH = isTurkey || isAcademy ? 'Направления обучения' : 'Факультеты';
  const relH = isAcademy ? 'Программа курса' : isTurkey ? 'Теология и исламские науки' : 'Шариатские и гуманитарные';

  const facCards = [
    u.facultiesReligious?.length ? `<div class="aside-card"><h3>${relH}</h3>${list(u.facultiesReligious)}</div>` : '',
    u.facultiesSecular?.length ? `<div class="aside-card"><h3>Светские направления</h3>${list(u.facultiesSecular)}</div>` : '',
  ].join('');

  const feats = [...(u.features || []), ...(u.languageNote ? [u.languageNote] : [])];

  const content = `<div class="uni-content">
            <div class="uni-block reveal">
              <h2>${aboutH}</h2>
              ${u.about.map((p) => `<p>${esc(p)}</p>`).join('')}
            </div>
            ${u.privileges?.length ? `<div class="uni-block reveal"><h2>${privH}</h2>${list(u.privileges)}</div>` : ''}
            ${facCards ? `<div class="uni-block reveal"><h2>${facH}</h2><div class="uni-faculties">${facCards}</div></div>` : ''}
            ${feats.length ? `<div class="uni-block reveal"><h2>Особенности</h2>${list(feats)}</div>` : ''}
          </div>`;

  const aside = `<aside>
            <div class="aside-card">
              <h3>${esc(asideTitle(u))}</h3>
              <p>Переведём и подадим документы под ключ</p>
              <a class="btn btn--wa" href="${WA_LINK}" target="_blank" rel="noopener">${icons.whatsapp} Подать заявку</a>
              <p class="uni-aside__link"><a href="${WA_LINK}" target="_blank" rel="noopener">Бесплатная консультация</a></p>
              <h4>Что нужно</h4>
              <ul class="list-check"><li>Загранпаспорт</li><li>Аттестат об образовании</li><li>Фотографии</li><li>Остальное подскажет менеджер</li></ul>
            </div>
          </aside>`;

  return {
    path: `universities/${u.slug}.html`,
    title: `${u.nameRu} — учёба и поступление`,
    description: u.short,
    depth: 1,
    active: 'unis',
    body: `    <section class="uni-hero">
      ${media(u, 'hero')}
      <div class="container">
        ${crumbs(crumbItems)}
        <h1>${esc(u.nameRu)}</h1>
        <p class="uni-hero__ar" lang="ar" dir="rtl">${esc(u.nameAr)}</p>
        <span class="uni-hero__city">${flag(c.flag)} ${esc(u.city)}</span>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="facts">${facts}</div>
      </div>
    </section>
    <section class="section uni-main">
      <div class="container">
        <div class="two-col">
          ${content}
          ${aside}
        </div>
      </div>
    </section>
    <section class="section section--sand">
      <div class="container">
        <div class="section-head reveal"><h2>Другие вузы</h2></div>
        <div class="grid grid--3">
        ${others(u).map(card).join('\n        ')}
        </div>
      </div>
    </section>`,
  };
}

export function universityPages() {
  const lists = countries.filter((c) => c.key !== 'academy').map(countryPage);
  return [...lists, ...universities.map(uniPage)];
}
