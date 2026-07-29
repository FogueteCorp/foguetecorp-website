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

/* ---------- Navegacion y menu de idioma ---------- */
// Las opciones de idioma son enlaces a /fr/, /pt/, /en/: aqui solo se abre y cierra el menu.
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

langTrigger.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = langMenu.classList.toggle('open');
    langTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) closeNavMenu();
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
