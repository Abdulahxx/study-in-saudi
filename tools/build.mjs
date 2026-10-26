// Сборщик статического сайта: node tools/build.mjs
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { layout } from './layout.mjs';
import { mainPages } from './pages/main.mjs';
import { universityPages } from './pages/universities.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const written = []; // относительные пути сгенерированных страниц

function writePage(relPath, html) {
  const abs = join(ROOT, relPath);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, html, 'utf8');
  written.push(relPath);
  console.log('  + ' + relPath);
}

function checkLinks() {
  const broken = [];
  const re = /\b(?:href|src)="([^"]*)"/g;
  for (const rel of written) {
    const html = readFileSync(join(ROOT, rel), 'utf8');
    const pageDir = dirname(join(ROOT, rel));
    for (const m of html.matchAll(re)) {
      let url = m[1].trim();
      if (!url || /^(https?:|mailto:|tel:|#|data:)/i.test(url)) continue;
      url = url.split('#')[0].split('?')[0];
      if (!url) continue;
      const abs = resolve(pageDir, decodeURI(url));
      const fromRoot = abs.slice(ROOT.length + 1).replace(/\\/g, '/');
      if (existsSync(abs)) continue;
      broken.push(`${rel}: ${m[1]}`);
    }
  }
  if (broken.length) {
    console.error('\nБитые ссылки:');
    for (const b of broken) console.error('  ! ' + b);
    process.exit(1);
  }
  console.log('Ссылки в порядке.');
}

// Страницы собираются в модулях tools/pages/*.
const pages = [...mainPages(), ...universityPages()];

console.log('Сборка:');
for (const pg of pages) writePage(pg.path, layout(pg));
checkLinks();
