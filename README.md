# Foguete Movement

Web de una sola página en cuatro idiomas: capoeira, talleres, shows y documentales.
Sitio estático, sin frameworks ni dependencias.

## Idiomas

| Idioma    | URL                       |
|-----------|---------------------------|
| Español   | `foguetemovement.com/`    |
| Francés   | `foguetemovement.com/fr/` |
| Portugués | `foguetemovement.com/pt/` |
| Inglés    | `foguetemovement.com/en/` |

Cada idioma es una página real con sus textos escritos dentro del HTML. Así el
preview al compartir el enlace sale en el idioma correcto y Google puede indexar
las cuatro por separado.

## Estructura

    src/template.html      <- EDITA AQUI la estructura (marcado, secciones)
    src/translations.js    <- EDITA AQUI los textos (es, fr, pt, en)
    build.js               Genera las paginas
    css/styles.css         Estilos
    js/main.js             Navegacion, scroll-reveal, email
    favicon.svg
    og-image.jpg           Miniatura al compartir (1200x630) - PENDIENTE
    img/                   Fotos

    index.html             <- GENERADO, no lo edites
    fr/index.html          <- GENERADO
    pt/index.html          <- GENERADO
    en/index.html          <- GENERADO
    sitemap.xml            <- GENERADO

## Como hacer un cambio

1. Si es **texto**: editalo en `src/translations.js`, en los cuatro idiomas.
2. Si es **estructura o diseno**: edita `src/template.html` o `css/styles.css`.
3. Ejecuta:

       node build.js

4. Revisa el resultado y haz commit de todo, incluidos los archivos generados
   (GitHub Pages publica lo que hay en el repo, no ejecuta el script).

**Nunca edites `index.html`, `fr/index.html`, `pt/index.html` ni `en/index.html`
a mano.** El script los sobrescribe y perderias el cambio.

Para anadir un texto nuevo: ponle un `data-i18n="mi_clave"` en la plantilla y
anade `mi_clave` a los cuatro idiomas. Si falta en alguno, `build.js` se para y
te dice cual.

## Ver el sitio en local

Abrir `index.html` con doble clic funciona para ver una pagina, pero los enlaces
del selector de idioma apuntan a rutas de servidor (`/fr/`) y no navegaran bien.
Para probarlo entero, levanta un servidor local desde la carpeta del proyecto:

    python3 -m http.server 8000

Y abre `http://localhost:8000`.

## Publicacion

GitHub Pages desde la rama `main`, carpeta raiz.
`CNAME` apunta el dominio propio; borralo si no lo usas.

## Pendiente

- [ ] Subir `og-image.jpg` (1200x630) a la raiz
- [ ] Sustituir los `.media-frame` de Shows y Documentales por fotos o videos
- [ ] Autoalojar la tipografia Inter en lugar de cargarla desde Google Fonts
