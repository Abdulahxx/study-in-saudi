# STUDY IN SAUDI

Сайт агентства по переводу и подаче документов в вузы Саудовской Аравии, ОАЭ, Катара и Турции.

Статический сайт: готовые HTML-страницы лежат в корне и в `universities/`, их можно разместить на любом хостинге.

## Как править

- Тексты вузов: `data/universities.mjs`, отзывы: `data/reviews.mjs`
- Главная, услуги, отзывы, о нас: `tools/pages/main.mjs`; страницы вузов: `tools/pages/universities.mjs`
- Шапка и подвал: `tools/layout.mjs`; стили: `assets/css/`
- Фото вузов: `assets/img/unis/<slug>.jpg`

После правок пересобрать страницы:

```bash
node tools/build.mjs
```

Просмотр локально: `node tools/serve.mjs` → http://localhost:5173
