/*
 * Genera las cuatro paginas del sitio a partir de:
 *   src/template.html   -> estructura (el texto va marcado con data-i18n)
 *   src/translations.js -> los textos en es, fr, pt, en
 *
 * Uso:  node build.js
 *
 * Escribe:  index.html  fr/index.html  pt/index.html  en/index.html
 * NO edites esos archivos a mano: este script los sobrescribe.
 */

const fs = require('fs');
const path = require('path');

const SITE = 'https://foguetemovement.com/';

// Orden del selector de idioma
const LANGS = [
  { code: 'es', dir: '',    locale: 'es_ES' },
  { code: 'fr', dir: 'fr/', locale: 'fr_FR' },
  { code: 'pt', dir: 'pt/', locale: 'pt_PT' },
  { code: 'en', dir: 'en/', locale: 'en_GB' }
];

eval(fs.readFileSync(path.join(__dirname, 'src/translations.js'), 'utf8'));
const template = fs.readFileSync(path.join(__dirname, 'src/template.html'), 'utf8');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => esc(s).replace(/"/g, '&quot;');

// Ruta relativa entre dos paginas (funciona igual en el servidor y al abrir el archivo en local)
function relPath(fromDir, toDir) {
  const up = fromDir === '' ? '' : '../';
  return (up + toDir) || './';
}

function buildLangMenu(current) {
  return LANGS.map((l) => {
    const active = l.code === current.code ? ' active' : '';
    const aria = l.code === current.code ? ' aria-current="page"' : '';
    return '                        <li><a class="lang-option' + active + '" data-lang="' + l.code +
           '" hreflang="' + l.code + '" href="' + relPath(current.dir, l.dir) + '"' + aria + '>' +
           l.code.toUpperCase() + '</a></li>';
  }).join('\n');
}

function buildHreflang() {
  const rows = LANGS.map((l) =>
    '    <link rel="alternate" hreflang="' + l.code + '" href="' + SITE + l.dir + '">');
  rows.push('    <link rel="alternate" hreflang="x-default" href="' + SITE + '">');
  return rows.join('\n');
}

function buildOgLocale(current) {
  const rows = ['    <meta property="og:locale" content="' + current.locale + '">'];
  LANGS.filter((l) => l.code !== current.code).forEach((l) =>
    rows.push('    <meta property="og:locale:alternate" content="' + l.locale + '">'));
  return rows.join('\n');
}

let count = 0;

LANGS.forEach((lang) => {
  const t = translations[lang.code];
  if (!t) throw new Error('Falta el idioma ' + lang.code + ' en src/translations.js');

  let out = template
    .replace(/\{\{LANG\}\}/g, lang.code)
    .replace(/\{\{LANG_UPPER\}\}/g, lang.code.toUpperCase())
    .replace(/\{\{BASE\}\}/g, lang.dir === '' ? '' : '../')
    .replace(/\{\{URL\}\}/g, SITE + lang.dir)
    .replace(/\{\{TITLE\}\}/g, escAttr(t.title))
    .replace(/\{\{META_DESC\}\}/g, escAttr(t.meta_description))
    .replace(/\{\{META_KEYWORDS\}\}/g, escAttr(t.meta_keywords))
    .replace(/\{\{OG_TITLE\}\}/g, escAttr(t.og_title))
    .replace(/\{\{OG_DESC\}\}/g, escAttr(t.og_description))
    .replace(/\{\{OG_LOCALE_BLOCK\}\}/g, buildOgLocale(lang))
    .replace(/\{\{HREFLANG\}\}/g, buildHreflang())
    .replace(/\{\{LANG_MENU\}\}/g, buildLangMenu(lang));

  // Sustituye el texto de cada elemento con data-i18n
  const missing = [];
  out = out.replace(/(data-i18n="([a-zA-Z0-9_]+)"[^>]*>)([^<]*)/g, (m, open, key) => {
    if (t[key] === undefined) { missing.push(key); return m; }
    return open + esc(t[key]);
  });
  if (missing.length) throw new Error('Faltan claves en "' + lang.code + '": ' + [...new Set(missing)].join(', '));

  const leftover = out.match(/\{\{[A-Z_]+\}\}/g);
  if (leftover) throw new Error('Marcadores sin sustituir: ' + [...new Set(leftover)].join(', '));

  const dest = path.join(__dirname, lang.dir, 'index.html');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, out);
  console.log('  escrito  ' + (lang.dir || './') + 'index.html   (' + lang.code + ')');
  count++;
});

// sitemap.xml con las cuatro paginas
const today = new Date().toISOString().slice(0, 10);
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
  LANGS.map((l) =>
    '  <url>\n' +
    '    <loc>' + SITE + l.dir + '</loc>\n' +
    LANGS.map((a) => '    <xhtml:link rel="alternate" hreflang="' + a.code + '" href="' + SITE + a.dir + '"/>').join('\n') + '\n' +
    '    <lastmod>' + today + '</lastmod>\n' +
    '    <changefreq>monthly</changefreq>\n' +
    '    <priority>' + (l.code === 'es' ? '1.0' : '0.8') + '</priority>\n' +
    '  </url>'
  ).join('\n') + '\n</urlset>\n';
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);
console.log('  escrito  sitemap.xml');

console.log('\nListo: ' + count + ' paginas generadas.');
