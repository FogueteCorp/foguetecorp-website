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

## Pendiente

- [ ] Subir `og-image.jpg` (1200x630) a la raíz
- [ ] Sustituir los `.media-frame` de Shows y Documentales por fotos o vídeos
- [ ] Autoalojar la tipografía Inter en lugar de cargarla desde Google Fonts
