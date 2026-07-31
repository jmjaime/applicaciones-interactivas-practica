# Clase 1 — Presentación

## Actividad: inspeccionar una página real

Abrí `ejemplos/pagina-demo.html` en el navegador con las DevTools abiertas (F12).
La página carga estilos, JS e imágenes desde varios dominios distintos — es a
propósito, para poder observar:

- **Network**: en qué orden salen los requests y cuáles van en paralelo.
- **Elements**: cómo quedó el DOM generado (comparado con "Ver código fuente").
- **Styles / Computed**: qué reglas del CSSOM se aplican a cada elemento.

El `<details>` al final de la página trae una referencia de colores del
waterfall de Network (Queueing, DNS Lookup, SSL, Waiting TTFB, Content
Download, etc.) para interpretar los requests sin depender de que el
profesor lo explique en el momento.
