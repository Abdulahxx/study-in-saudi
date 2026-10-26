// Скачивает фото кампусов с Wikimedia Commons в assets/img/unis/<slug>.jpg
// Запуск: node tools/fetch-images.mjs [--skip <slug>=<имя файла Commons>]...
// Существующие файлы пропускаются (можно положить своё фото).
import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'assets', 'img', 'unis');
const UA = 'StudyInSaudiSiteBuilder/1.0 (contact: studiinsaudi@gmail.com)';

// Ручные исключения: slug -> подстроки имён файлов Commons, которые не брать
const EXCLUDE = {
  // отбракованы после просмотра (не тот вуз / плохое фото / схема)
  'king-abdulaziz': ['King Abdulaziz University stadium'],
  'umm-al-qura': ['View of Lejbailat and State Mosque', 'Faysal manuscript'],
  'imam-muhammad-ibn-saud': ['Imam University in the Sandstorm', 'Imam University during Sandstorm'],
  'king-khalid': ['BAYTUR-KING KHALID', 'AI for Good'],
  jazan: ['Prof. Mohammed Alhayaza'],
  najran: ['MSZ02'],
  hail: ['صورة جوية لجامعة حائل'],
  'northern-border': ['Vilnius University'],
  majmaah: ['Three students discuss'],
  'imam-abdulrahman': ['Imam Abdulrahman bin Faisal University campus', 'Imam Abdul-Rahman bin Faisal University.jpg'],
  jeddah: ['King Abdulaziz University stadium', 'DSC00090-medicine-kau'],
  'hafr-al-batin': ['University of Hafr Al Batin - Panorama'],
  'qatar-university': ['Georgetown University in Qatar', 'Georgetown University in Education City'],
};

// Разбор --skip slug=имя файла
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--skip' && args[i + 1]) {
    const [s, ...rest] = args[++i].split('=');
    (EXCLUDE[s] ||= []).push(rest.join('=').trim());
  }
}

// Особые запросы вместо поиска по названию
const CUSTOM = {
  diyanet: ['Istanbul University Faculty of Theology', 'Süleymaniye Mosque'],
  'turkiye-burslari': ['Istanbul University main gate', 'Ankara University'],
  'king-salman-academy': ['Riyadh King Abdullah Financial District', 'Riyadh skyline'],
  'qatar-university': ['Qatar University campus'],
};

const BAD = /logo|emblem|seal|map|flag|svg|signature|coat/i;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(url) {
  for (let i = 0; i < 4; i++) {
    try { return await fetch(url, { headers: { 'User-Agent': UA } }); }
    catch (e) { await sleep(1500 * (i + 1)); }
  }
  return { ok: false, status: 'network' };
}
const strip = (s) => String(s || '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

async function search(q) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6'
    + `&gsrsearch=${encodeURIComponent(q)}&gsrlimit=10&prop=imageinfo&iiprop=url|size|mime|extmetadata`
    + '&iiurlwidth=1200&format=json';
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  await sleep(300);
  if (!res.ok) { console.warn(`  ! ${res.status} for "${q}"`); return []; }
  const data = await res.json();
  const pages = Object.values(data?.query?.pages || {}).sort((a, b) => a.index - b.index);
  return pages;
}

function pick(pages, slug) {
  for (const p of pages) {
    const ii = p.imageinfo?.[0];
    if (!ii) continue;
    if (ii.mime !== 'image/jpeg') continue;
    if (!(ii.width >= 800 && ii.width > ii.height)) continue;
    if (BAD.test(p.title)) continue;
    if ((EXCLUDE[slug] || []).some((x) => p.title.includes(x))) continue;
    const lic = ii.extmetadata?.LicenseShortName?.value || '';
    if (!/CC|public domain/i.test(lic)) continue;
    return { p, ii, lic };
  }
  return null;
}

async function exists(f) { try { await access(f); return true; } catch { return false; } }

const { universities } = await import(pathToFileURL(path.join(ROOT, 'data', 'universities.mjs')).href);
await mkdir(OUT, { recursive: true });
const credPath = path.join(OUT, 'credits.json');
let credits = {};
try { credits = JSON.parse(await readFile(credPath, 'utf8')); } catch {}

// убрать из credits записи без файла
for (const k of Object.keys(credits)) if (!(await exists(path.join(OUT, `${k}.jpg`)))) delete credits[k];

let downloaded = 0;
const missing = [];
for (const u of universities) {
  const file = path.join(OUT, `${u.slug}.jpg`);
  if ((await exists(file)) || (await exists(file.replace(/.jpg$/, '.webp')))) { console.log(`= ${u.slug}: уже есть`); continue; }
  const queries = CUSTOM[u.slug]
    || [`"${u.nameEn}" campus`, `"${u.nameEn}"`, `${u.nameEn} building`];
  let found = null;
  for (const q of queries) {
    found = pick(await search(q), u.slug);
    if (found) break;
  }
  if (!found) { console.log(`- ${u.slug}: не найдено`); missing.push(u.slug); continue; }
  const { p, ii, lic } = found;
  const r = await get(ii.thumburl || ii.url);
  await sleep(300);
  if (!r.ok) { console.log(`- ${u.slug}: ошибка загрузки ${r.status}`); missing.push(u.slug); continue; }
  await writeFile(file, Buffer.from(await r.arrayBuffer()));
  credits[u.slug] = {
    file: p.title,
    source: ii.descriptionurl,
    author: strip(ii.extmetadata?.Artist?.value),
    license: lic,
  };
  await writeFile(credPath, JSON.stringify(credits, null, 2) + '\n');
  downloaded++;
  console.log(`+ ${u.slug}: ${p.title}`);
}

await writeFile(credPath, JSON.stringify(credits, null, 2) + '\n');
console.log(`\nСкачано: ${downloaded}`);
console.log(`Без фото (${missing.length}): ${missing.join(', ') || '—'}`);
