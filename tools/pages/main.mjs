// Главная, Услуги, Отзывы, О нас (шаг 4).
import { esc, starSvg, icons, flag, WA_LINK, SOCIAL, PHONE, EMAIL } from '../layout.mjs';
import { reviews } from '../../data/reviews.mjs';

const EXT = 'target="_blank" rel="noopener"';

const ic = (inner) =>
  `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;
const svcIcons = {
  doc: ic('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>'),
  uni: ic('<path d="m3 9 9-5 9 5-9 5z"/><path d="M7 11.5V16c0 1.4 2.2 3 5 3s5-1.6 5-3v-4.5M21 9v6"/>'),
  chat: ic('<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>'),
};

const WA_BTN = (label, cls = 'btn--primary btn--lg') =>
  `<a class="btn ${cls}" href="${WA_LINK}" ${EXT}>${icons.whatsapp}${label}</a>`;

const COUNTRIES = [
  { key: 'ksa', href: 'universities/ksa.html', title: 'Саудовская Аравия', sub: '25 государственных университетов' },
  { key: 'uae', href: 'universities/uae.html', title: 'ОАЭ', sub: 'Al Qasimia University' },
  { key: 'qatar', href: 'universities/qatar.html', title: 'Катар', sub: 'Qatar University' },
  { key: 'turkey', href: 'universities/turkey.html', title: 'Турция', sub: 'Стипендии Diyanet и Türkiye Bursları' },
  { key: 'academy', href: 'universities/king-salman-academy.html', title: 'Академия арабского языка имени короля Салмана', sub: 'Годичные курсы арабского языка в Эр-Рияде' },
];

const countryCards = (list = COUNTRIES) =>
  list.map((c) => `<a class="country-card reveal" href="${c.href}">
          <span class="country-card__flag">${flag(c.key)}</span>
          <span class="country-card__title">${esc(c.title)}</span>
          <span class="country-card__sub">${esc(c.sub)}</span>
          <span class="country-card__arrow">${icons.arrow}</span>
        </a>`).join('\n        ');

const ABOUT_TEXT = 'Добро пожаловать в Study in Saudi — ваш надёжный партнёр в подготовке документов и поступлении в вузы Саудовской Аравии (КСА), ОАЭ, Катара и Турции! Мы предлагаем комплексные услуги по переводу документов и подаче заявок, чтобы сделать ваш путь к обучению за рубежом максимально простым и удобным.';

const ADVANTAGES = [
  'Опыт работы с 2008 года',
  'Признание наших переводов государственными органами КСА',
  'Качественные переводы',
  'Быстрая подача',
  'Низкие цены',
];

const WHY = [
  { t: 'Качество и скорость', d: 'Аккуратные переводы и подача без лишних задержек.', i: icons.check },
  { t: 'Доступные цены', d: 'Честные условия, без скрытых платежей.', i: svcIcons.doc },
  { t: 'Индивидуальный подход', d: 'Учитываем ваш аттестат, цели и пожелания.', i: svcIcons.chat },
  { t: 'Удобство', d: 'Всё решаем дистанционно: через WhatsApp и по email.', i: svcIcons.uni },
];
const whyHtml = () => WHY.map((w) => `<div class="feature reveal"><span class="card__icon">${w.i}</span><div><h3>${esc(w.t)}</h3><p>${esc(w.d)}</p></div></div>`).join('\n        ');

const SERVICES = [
  {
    n: '01', icon: svcIcons.doc, title: 'Перевод документов',
    text: 'Правильный перевод ваших документов для поступления в вузы Саудовской Аравии, ОАЭ, Катара и Турции. Быстро, точно и в соответствии с требованиями учебных заведений.',
    items: ['Перевод с русского на арабский и с арабского на русский', 'Проверка требований конкретного вуза', 'Оформление по стандарту учебного заведения', 'Перевод аттестата, паспортов, справок и свидетельства о рождении'],
    btn: 'Заказать перевод',
  },
  {
    n: '02', icon: svcIcons.uni, title: 'Подача в вузы',
    text: 'Поможем с подачей в ведущие вузы: от выбора университета до отправки заявки. Полное сопровождение и соблюдение всех требований.',
    items: ['Подбор вузов под ваш аттестат и цели', 'Заполнение анкет', 'Отправка заявок сразу в несколько вузов', 'Помощь после зачисления, в том числе с визой'],
    btn: 'Подать заявку',
  },
  {
    n: '03', icon: svcIcons.chat, title: 'Бесплатная консультация',
    text: 'Получите консультацию по поступлению в вузы Саудовской Аравии и других стран. Ответим на все вопросы и поможем разобраться с требованиями.',
    items: ['Консультация бесплатная', 'Ответим в WhatsApp или Telegram', 'Поможем выбрать страну и вуз', 'Составим список документов под вашу ситуацию'],
    btn: 'Получить консультацию',
  },
];

const starIcon = '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z"/></svg>';
const stars = `<div class="review-card__stars" role="img" aria-label="Оценка 5 из 5">${starIcon.repeat(5)}</div>`;

const reviewCard = (r, withBadge = false) => `<figure class="review-card">
            ${stars}
            <blockquote class="review-card__text">${esc(r.text)}</blockquote>
            <figcaption class="review-card__meta"><strong>${esc(r.author)}</strong><span>${esc(r.university)}</span>${withBadge ? `<span class="review-card__ok">${icons.check}Поступил</span>` : ''}</figcaption>
          </figure>`;

const ctaBand = (h, p, btns) => `<section class="section">
    <div class="container">
      <div class="cta-band reveal">
        ${starSvg('cta-band__star')}
        <div><h2>${h}</h2><p>${p}</p></div>
        <div class="cta-band__btns">${btns}</div>
      </div>
    </div>
  </section>`;

const waCta = ctaBand(
  'Готовы начать поступление?',
  'Напишите нам в WhatsApp — бесплатно проконсультируем и расскажем, с чего начать.',
  `<a class="btn btn--light btn--lg" href="${WA_LINK}" ${EXT}>${icons.whatsapp}Подать заявку</a><a class="btn btn--ghost btn--lg cta-ghost" href="${esc(SOCIAL.telegram)}" ${EXT}>${icons.telegram}Telegram-канал</a>`
);

const pageHero = (crumb, h1, lead) => `<section class="page-hero">
    ${starSvg('page-hero__star')}
    <div class="container">
      <ol class="crumbs"><li><a href="index.html">Главная</a></li><li aria-current="page">${esc(crumb)}</li></ol>
      <h1>${esc(h1)}</h1>
      ${lead ? `<p class="lead">${esc(lead)}</p>` : ''}
    </div>
  </section>`;

function home() {
  const featured = reviews.filter((r) => r.featured);
  const body = `
  <section class="hero">
    ${starSvg('hero__star')}
    <div class="container hero__grid">
      <div class="hero__text">
        <span class="hero__badge">с 2008 года</span>
        <h1>Подача документов и учёба в арабских странах и Турции</h1>
        <p class="lead">Переводим документы и подаём их в университеты Саудовской Аравии, ОАЭ, Катара и Турции. Сопровождаем от выбора вуза до зачисления.</p>
        <div class="hero__actions">
          ${WA_BTN('Подать заявку')}
          <a class="btn btn--ghost btn--lg" href="universities/ksa.html">Смотреть вузы</a>
        </div>
        <ul class="hero__flags">
          ${COUNTRIES.slice(0, 4).map((c) => `<li>${flag(c.key)}<span>${esc(c.title)}</span></li>`).join('')}
        </ul>
      </div>
      <div class="hero__visual">
        <div class="hero__frame">
          ${starSvg('hero__frame-star')}
          <div class="hero__arch"><img src="assets/img/logo.png" width="320" height="320" alt="Логотип STUDY IN SAUDI"></div>
        </div>
        <div class="float-chip float-chip--a">${icons.check}<span>25 университетов КСА</span></div>
        <div class="float-chip float-chip--b">${icons.check}<span>Перевод признают госорганы КСА</span></div>
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="grid grid--4">
        <div class="stat reveal"><span class="stat__num">с 2008</span><span class="stat__label">опыт работы</span></div>
        <div class="stat reveal"><span class="stat__num">4+</span><span class="stat__label">более 4 стран для учёбы</span></div>
        <div class="stat reveal"><span class="stat__num">30</span><span class="stat__label">вузов и программ</span></div>
        <div class="stat reveal"><span class="stat__num">3 этапа</span><span class="stat__label">перевод → подача → зачисление</span></div>
      </div>
    </div>
  </section>

  <section class="section section--sand">
    <div class="container">
      <div class="section-head section-head--center reveal">
        <span class="eyebrow">Направления</span>
        <h2>Куда мы подаём документы</h2>
        <p class="lead">Подаём документы в вузы более 4 стран: Саудовской Аравии, ОАЭ, Катара и Турции.</p>
      </div>
      <div class="grid grid--3 countries-grid">
        ${countryCards()}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container split">
      <div class="reveal">
        <span class="eyebrow">О компании</span>
        <h2>Study in Saudi</h2>
        <p class="lead">${esc(ABOUT_TEXT)}</p>
        <a class="btn btn--ghost" href="about.html">Подробнее о нас</a>
      </div>
      <div class="adv-box reveal">
        <h3>Наши преимущества</h3>
        <ul class="list-check">${ADVANTAGES.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
      </div>
    </div>
  </section>

  <section class="section section--sand">
    <div class="container">
      <div class="section-head section-head--center reveal">
        <span class="eyebrow">Услуги</span>
        <h2>Наши услуги</h2>
      </div>
      <div class="grid grid--3">
        ${SERVICES.map((s) => `<article class="card reveal"><span class="card__icon">${s.icon}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p><a class="link-arrow" href="services.html">Подробнее ${icons.arrow}</a></article>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head section-head--center reveal">
        <span class="eyebrow">Почему мы</span>
        <h2>Почему выбирают нас</h2>
      </div>
      <div class="grid grid--2 why-grid">
        ${whyHtml()}
      </div>
    </div>
  </section>

  <section class="section section--sand">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Отзывы</span>
        <h2>Что говорят студенты</h2>
      </div>
      <div data-carousel class="reveal">
        <div data-carousel-track>
          ${featured.map((r) => reviewCard(r)).join('\n          ')}
        </div>
        <div class="carousel-nav">
          <button class="carousel-btn carousel-btn--prev" type="button" data-carousel-prev aria-label="Назад">${icons.arrow}</button>
          <button class="carousel-btn carousel-btn--next" type="button" data-carousel-next aria-label="Вперёд">${icons.arrow}</button>
        </div>
      </div>
      <p class="center-actions"><a class="btn btn--ghost" href="reviews.html">Все отзывы</a></p>
    </div>
  </section>

  ${waCta}
`;
  return {
    path: 'index.html',
    title: 'Перевод и подача документов в вузы арабских стран и Турции',
    description: 'Переводим документы и подаём их в университеты Саудовской Аравии, ОАЭ, Катара и Турции с 2008 года.',
    depth: 0, active: 'home', body,
  };
}

function services() {
  const blocks = SERVICES.map((s, i) => `
  <section class="section${i % 2 ? ' section--sand' : ''}">
    <div class="container svc${i % 2 ? ' svc--rev' : ''}">
      <div class="svc__text reveal">
        <span class="eyebrow">Услуга ${s.n}</span>
        <h2>${esc(s.title)}</h2>
        <p class="lead">${esc(s.text)}</p>
        <h3 class="svc__sub">Что входит</h3>
        <ul class="list-check">${s.items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        <p class="svc__btn">${WA_BTN(esc(s.btn))}</p>
      </div>
      <div class="svc__visual reveal" aria-hidden="true">
        ${starSvg('svc__star')}
        <span class="svc__num">${s.n}</span>
        <span class="svc__icon">${s.icon}</span>
      </div>
    </div>
  </section>`).join('\n');

  const steps = [
    ['Консультация', 'Рассказываете о себе, а мы подбираем подходящие вузы.'],
    ['Документы', 'Присылаете сканы (PDF/JPEG) в WhatsApp или на email.'],
    ['Перевод и подача', 'Переводим документы и подаём заявки.'],
    ['Зачисление', 'Держим в курсе до ответа университета и помогаем с визой.'],
  ];
  const required = [
    'Справка о несудимости (не старше 6 месяцев)',
    'Аттестат с приложением и табелем оценок',
    'Ваш заграничный паспорт',
    'Цветная фотография 4×6',
  ];
  const extra = [
    'Медицинская справка об отсутствии инфекционных заболеваний (не старше 6 месяцев)',
    'Характеристика с места учёбы',
    'Рекомендации от исламских деятелей',
    'Сертификат знания арабского языка',
    'Сертификат знания английского языка',
    'Другие документы',
  ];
  const ages = [['Бакалавриат', 'от 16 до 25 лет'], ['Магистратура', 'до 30 лет'], ['Докторантура', 'до 35 лет']];

  const body = `
  ${pageHero('Услуги', 'Наши услуги', 'Переводим документы, подаём заявки в вузы и бесплатно консультируем — от первого вопроса до зачисления.')}
  ${blocks}

  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Процесс</span>
        <h2>Как мы работаем</h2>
      </div>
      <ol class="steps reveal">
        ${steps.map(([t, d]) => `<li class="step"><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join('\n        ')}
      </ol>
    </div>
  </section>

  <section class="section section--sand">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Документы</span>
        <h2>Документы для поступления в вузы Саудовской Аравии</h2>
      </div>
      <div class="grid grid--2 docs-grid">
        <div class="card reveal"><h3>Обязательные</h3><ul class="list-check">${required.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>
        <div class="card reveal"><h3>Дополнительные</h3><ul class="list-check">${extra.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>
      </div>
      <p class="note reveal">Для ОАЭ, Катара и Турции список может отличаться — уточним на бесплатной консультации.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="eyebrow">Возраст</span>
        <h2>Требования к возрасту</h2>
      </div>
      <div class="grid grid--3">
        ${ages.map(([t, v]) => `<div class="card age-card reveal"><h3>${esc(t)}</h3><p class="age-card__val">${esc(v)}</p></div>`).join('\n        ')}
      </div>
      <p class="note reveal">Университет вправе сделать исключение.</p>
      <div class="accordion reveal">
        <details>
          <summary>Можно ли поступить с аттестатом 9 класса?</summary>
          <div class="accordion__body"><p>Да, почти во все вузы Саудовской Аравии, кроме Исламского университета Медины и Университета принцессы Нуры. Если вы учитесь в 10 или 11 классе, можно подать и туда — с выпиской оценок за 10 класс.</p></div>
        </details>
      </div>
    </div>
  </section>

  ${waCta}
`;
  return {
    path: 'services.html', title: 'Услуги',
    description: 'Перевод документов, подача в вузы и бесплатная консультация по поступлению в Саудовскую Аравию, ОАЭ, Катар и Турцию.',
    depth: 0, active: 'services', body,
  };
}

function reviewsPage() {
  const body = `
  ${pageHero('Отзывы', 'Отзывы наших студентов', 'Мы ценим каждого клиента и всегда стремимся предоставить лучший сервис. Вот что говорят те, кто поступил с нашей помощью.')}
  <section class="section">
    <div class="container">
      <div class="masonry">
        ${reviews.map((r) => reviewCard(r, true)).join('\n        ')}
      </div>
    </div>
  </section>
  ${ctaBand('Поступили с нашей помощью? Поделитесь отзывом', 'Ваш отзыв поможет другим студентам сделать выбор.', `<a class="btn btn--light btn--lg" href="${WA_LINK}" ${EXT}>${icons.whatsapp}Оставить отзыв</a>`)}
`;
  return {
    path: 'reviews.html', title: 'Отзывы',
    description: 'Отзывы студентов, поступивших в вузы Саудовской Аравии и ОАЭ с помощью Study in Saudi.',
    depth: 0, active: 'reviews', body,
  };
}

function about() {
  const support = [
    ['С 2008 года', 'Переводим документы с русского на арабский и с арабского на русский.'],
    ['Знаем требования', 'Знаем требования вузов и заранее подсказываем, какие документы понадобятся.'],
    ['На связи', 'Остаёмся на связи на каждом этапе: отвечаем на вопросы и подсказываем.'],
    ['После зачисления', 'Помогаем и после зачисления — с визой и вопросами по приезду.'],
  ];
  const contacts = [
    ['WhatsApp-сообщество', SOCIAL.whatsappCommunity, icons.whatsapp],
    ['Telegram', SOCIAL.telegram, icons.telegram],
    ['YouTube', SOCIAL.youtube, icons.youtube],
    ['Instagram', SOCIAL.instagram, icons.instagram],
  ];
  const body = `
  ${pageHero('О нас', 'О компании Study in Saudi', '')}
  <section class="section">
    <div class="container split">
      <div class="reveal">
        <span class="eyebrow">О компании</span>
        <h2>Ваш надёжный партнёр</h2>
        <p class="lead">${esc(ABOUT_TEXT)}</p>
      </div>
      <div class="logo-box reveal">
        ${starSvg('hero__frame-star')}
        <div class="hero__arch"><img src="assets/img/logo.png" width="320" height="320" alt="Логотип STUDY IN SAUDI" loading="lazy"></div>
        <span class="logo-box__badge">с 2008 года</span>
      </div>
    </div>
  </section>

  <section class="section section--sand">
    <div class="container">
      <div class="section-head reveal"><span class="eyebrow">Преимущества</span><h2>Наши преимущества</h2></div>
      <div class="grid grid--3 adv-grid">
        ${ADVANTAGES.map((a, i) => `<div class="card reveal"><span class="adv-num">0${i + 1}</span><h3>${esc(a)}</h3></div>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head section-head--center reveal"><span class="eyebrow">Почему мы</span><h2>Почему выбирают нас</h2></div>
      <div class="grid grid--2 why-grid">
        ${whyHtml()}
      </div>
    </div>
  </section>

  <section class="section section--sand">
    <div class="container">
      <div class="section-head section-head--center reveal"><span class="eyebrow">Направления</span><h2>Куда мы подаём документы</h2></div>
      <div class="grid grid--3 countries-grid">
        ${countryCards()}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal"><span class="eyebrow">Сопровождение</span><h2>Как мы сопровождаем студента</h2></div>
      <div class="grid grid--2">
        ${support.map(([t, d]) => `<div class="card reveal"><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="section section--sand">
    <div class="container">
      <div class="section-head reveal"><span class="eyebrow">Контакты</span><h2>Свяжитесь с нами</h2></div>
      <div class="contact-lines reveal">
        <a class="contact-link" href="tel:+79894759320">${icons.phone}<span>${PHONE}</span></a>
        <a class="contact-link" href="mailto:${EMAIL}">${icons.mail}<span>${EMAIL}</span></a>
      </div>
      <div class="grid grid--4">
        ${contacts.map(([t, h, i]) => `<a class="social-card reveal" href="${esc(h)}" ${EXT}><span class="card__icon">${i}</span><strong>${t}</strong></a>`).join('\n        ')}
      </div>
    </div>
  </section>

  ${waCta}
`;
  return {
    path: 'about.html', title: 'О нас',
    description: 'Study in Saudi — перевод и подача документов в вузы Саудовской Аравии, ОАЭ, Катара и Турции с 2008 года.',
    depth: 0, active: 'about', body,
  };
}

export function mainPages() {
  return [home(), services(), reviewsPage(), about()];
}
