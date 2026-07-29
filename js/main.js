// Depende de translations.js: cargalo antes que este archivo.

/* ---------- Aparicion al hacer scroll ---------- */
(function () {
    var targets = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || targets.length === 0) {
        targets.forEach(function (el) { el.classList.add('is-visible'); });
        return;
    }
    var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    targets.forEach(function (el) { observer.observe(el); });
})();

/* ---------- Idioma y navegacion ---------- */
var langSwitcher = document.getElementById('langSwitcher');
var langTrigger = document.getElementById('langTrigger');
var langMenu = document.getElementById('langMenu');
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');
var navContainer = document.getElementById('navContainer');
var logoEl = document.querySelector('.logo');

function closeLangMenu() {
    langMenu.classList.remove('open');
    langTrigger.setAttribute('aria-expanded', 'false');
}
function closeNavMenu() {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
}
function openNavMenu() {
    navLinks.classList.add('open');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
}

function setLanguage(lang) {
    var dict = translations[lang];
    if (!dict) return;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.title = dict.title;
    document.documentElement.setAttribute('lang', lang);
    langTrigger.setAttribute('data-lang', lang);
    document.getElementById('langTriggerCode').textContent = lang.toUpperCase();
    document.querySelectorAll('.lang-option').forEach(function (opt) {
        var isActive = opt.getAttribute('data-lang') === lang;
        opt.classList.toggle('active', isActive);
        opt.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    // Guarda la elección para recordarla en próximas visitas
    // (funciona una vez publicado el archivo; ignorado en la vista previa).
    try { localStorage.setItem('foguete_lang', lang); } catch (e) {}
    evaluateNav();
}

langTrigger.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = langMenu.classList.toggle('open');
    langTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) closeNavMenu();
});
document.querySelectorAll('.lang-option').forEach(function (opt) {
    opt.addEventListener('click', function () {
        setLanguage(opt.getAttribute('data-lang'));
        closeLangMenu();
    });
});

navToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    if (navLinks.classList.contains('open')) { closeNavMenu(); }
    else { openNavMenu(); closeLangMenu(); }
});
navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNavMenu);
});

document.addEventListener('click', function (e) {
    if (!langSwitcher.contains(e.target)) closeLangMenu();
    if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) closeNavMenu();
});
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeLangMenu(); closeNavMenu(); }
});

function evaluateNav() {
    navContainer.classList.remove('is-compact');
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');

    var linksWidth = navLinks.scrollWidth;
    var rightWidth = document.querySelector('.nav-right').scrollWidth;
    var logoWidth = logoEl.scrollWidth;
    var available = navContainer.clientWidth;
    var needed = logoWidth + linksWidth + rightWidth + 80;

    if (needed > available) navContainer.classList.add('is-compact');
}

var resizeTimer;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(evaluateNav, 120);
});
evaluateNav();

// --- Detección automática de idioma al entrar ---
// Prioridad: 1) elección guardada (una vez publicado), 2) idioma del
// navegador si es uno de los soportados, 3) español por defecto.
(function initLanguage() {
    var supported = ['es', 'fr', 'pt', 'en'];
    var chosen = 'es'; // respaldo por defecto

    // 1) Preferencia guardada de una visita anterior.
    //    (localStorage no funciona en la vista previa, pero sí una vez
    //    publiques el archivo en tu servidor.)
    var saved = null;
    try { saved = localStorage.getItem('foguete_lang'); } catch (e) {}

    if (saved && supported.indexOf(saved) !== -1) {
        chosen = saved;
    } else {
        // 2) Idioma del navegador (toma solo el código base: "fr-FR" -> "fr")
        var browserLangs = navigator.languages || [navigator.language || 'es'];
        for (var i = 0; i < browserLangs.length; i++) {
            var base = browserLangs[i].toLowerCase().split('-')[0];
            if (supported.indexOf(base) !== -1) { chosen = base; break; }
        }
    }

    if (chosen !== 'es') setLanguage(chosen);
})();

/* ---------- Email ofuscado ---------- */
// La dirección nunca aparece completa en el HTML ni en una sola cadena de
// texto: se reconstruye aquí a partir de trozos. Los recolectores de spam
// que solo descargan el HTML (la gran mayoría) no la encuentran.
// Para cambiar el email, edita únicamente las dos líneas de abajo.
(function () {
    var user = ['foguete', 'movement'].join('');
    var domain = ['gmail', 'com'].join('.');

    var btn = document.getElementById('contactBtn');
    if (!btn) return;

    var address = user + String.fromCharCode(64) + domain;
    btn.setAttribute('href', 'mail' + 'to:' + address);
    btn.removeAttribute('role');
    btn.removeAttribute('tabindex');
    btn.setAttribute('aria-label', address);
})();
