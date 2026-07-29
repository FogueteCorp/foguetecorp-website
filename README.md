# Foguete Movement

Web de una sola página: capoeira, talleres, shows y documentales.
Sitio estático, sin frameworks ni build tools.

## Estructura

    index.html            Marcado (el texto visible está en español)
    css/styles.css        Todos los estilos
    js/translations.js    Textos en ES, FR, PT, EN
    js/main.js            Navegación, idioma, scroll-reveal, email
    favicon.svg           Icono de pestaña
    og-image.jpg          Miniatura al compartir el enlace (1200x630) — PENDIENTE
    img/                  Fotos

## Desarrollo

Abre `index.html` en el navegador. No hace falta servidor ni instalar nada.

## Al editar textos

Cada texto traducible lleva un atributo `data-i18n`. Si cambias uno hay que
tocarlo en dos sitios: el HTML (versión española) y `js/translations.js`
(los cuatro idiomas).

## Publicación

GitHub Pages desde la rama `main`, carpeta raíz.
El archivo `CNAME` apunta el dominio propio; bórralo si no lo usas.

## Paletas de color

Las tres versiones comparten estructura, tipografía, fotos y textos. Solo cambia
el color: pasar de una a otra es editar el bloque `:root` de `css/styles.css`.
Los contrastes están medidos según la norma WCAG (mínimo 4,5:1 para texto normal).

### A · Oscura / naranja  *(la original)*

| función | valor | contraste sobre el fondo |
|---|---|---|
| fondo | `#0f0f0f` | — |
| tarjetas y secciones alternas | `#1a1a1a` | — |
| bordes | `#2a2a2a` | — |
| texto | `#e8e8e8` | 15,64:1 |
| texto suave | `#a0a0a0` | 7,33:1 |
| acento | `#ff6b35` | 6,76:1 |
| acento hover | `#ff8555` | 7,98:1 |

Cruda y neutra. El color no compite con las fotos.

### B · Azul  *(ink black · baltic blue · atomic tangerine)*

| función | valor | contraste sobre el fondo |
|---|---|---|
| fondo — ink black | `#0a1b26` | — |
| tarjetas y secciones alternas | `#0f2836` | — |
| bordes | `#1d3f57` | — |
| texto | `#e9eff3` | 15,12:1 |
| texto suave | `#9db1c0` | 7,92:1 |
| acento — atomic tangerine | `#e87e49` | 6,27:1 |
| acento hover | `#f2996a` | 7,97:1 |
| baltic blue — **solo superficie** | `#1f5f93` | 2,6:1 · NO USAR COMO TEXTO |

El baltic blue aparece únicamente en el degradado de Documentales
(`#0f2836` → `#16405c`) y en las aletas del cohete del logo. Sobre el fondo da
2,6:1, muy por debajo del mínimo legible: como color de texto o enlace sería
ilegible, y como segundo acento restaría fuerza al naranja.

### C · Beige / bordeaux

| función | valor | contraste sobre el fondo |
|---|---|---|
| fondo | `#f2e8dc` | — |
| tarjetas y secciones alternas | `#e9dccb` | — |
| bordes | `#d8c7b0` | — |
| texto | `#2a1a14` | 13,81:1 |
| texto suave | `#6b5546` | 5,76:1 |
| acento — bordeaux | `#8c2233` | 7,25:1 |
| acento hover | `#a02942` | 6,0:1 |
| bloque profundo — Documentales | `#4a1620` | texto beige encima: 12,16:1 |

Único caso en modo claro. El bordeaux se eligió midiendo: es el más claro que
aún da AAA como texto sobre el beige y que a la vez admite el beige encima con
el mismo contraste, así que sirve de una sola vez para enlaces, números de
sección, bordes de hover y relleno de botones.

En esta versión el bloque de Documentales va a sangre en `#4a1620` con todo el
texto invertido a beige, y el velo del hero es claro y reforzado por la
izquierda, no oscuro.

### Descartado

El naranja `#ff6b35` sobre el beige da **2,34:1**, y el tangerine `#e87e49`
**2,31:1**. Ambos muy por debajo de 4,5:1: sobre fondo claro el naranja no puede
usarse como color de texto ni de enlace. Por eso la versión clara cambió el
acento a bordeaux en lugar de conservar el naranja.

Texto blanco sobre un botón naranja tampoco llega (3,39:1); si algún día se
recupera esa combinación, el texto del botón debe ir en marrón oscuro.

> **Esta carpeta usa la versión B · azul.**

## Pendiente

- [ ] **Añadir una imagen para la sección Shows** — el hueco está comentado en
      `index.html`, dentro de `<section id="shows">`. Ideal: plano abierto desde
      abajo, con público en primer término. Guardar en `img/show-capoeira.jpg`.
- [ ] **Añadir el vídeo del tráiler del documental** — hueco comentado dentro de
      `<section id="documentales">`. Subirlo a YouTube y pegar el enlace de
      inserción (`/embed/`), no la URL normal.
- [ ] Subir `og-image.jpg` (1200x630) a la raíz — sin ella, al compartir el
      enlace no aparece miniatura.
- [ ] Autoalojar la tipografía Inter en lugar de cargarla desde Google Fonts.

- [ ] **WhatsApp en la web** — enlace `wa.me` junto al botón de contacto.
      Antes hace falta un segundo número (eSIM prepago + WhatsApp Business): el
      número queda en el HTML en texto plano y los bots lo rastrean, así que no
      conviene publicar el personal.
- [ ] **Formulario de contacto** — acompañaría al `mailto:`, que falla en
      silencio si el visitante no tiene cliente de correo configurado. Ojo, no es
      solo el formulario: requiere proveedor externo (Formspree, Web3Forms…),
      contrato de encargado de tratamiento con ese proveedor, página de política
      de privacidad, aviso legal y casilla de consentimiento sin premarcar.
- [ ] **Idioma con URL propia, y título de pestaña según el idioma** — una
      página HTML por idioma (`/`, `/fr/`, `/pt/`, `/en/`) en lugar de sustituir
      los textos con JavaScript. Es la única forma de que el preview al compartir
      y el resultado en Google salgan en el idioma correcto: los rastreadores no
      ejecutan JS. El generador (`build.js` + plantilla + `translations.js`) ya
      está prototipado en la carpeta `foguetemovement-repo`.
