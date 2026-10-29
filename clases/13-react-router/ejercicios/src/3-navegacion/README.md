# Ejercicio 3: Filtros en la URL y alta

Arranca con el Ejercicio 2 resuelto. Se trabaja en `MisPropiedades.tsx`,
`NuevaPropiedad.tsx` y `rutas.tsx`. El formulario de propiedad ya está
resuelto en `src/comun/FormularioPropiedad.tsx` (es el de la Clase 12).
Se ve en `http://localhost:5173/3/`.

**Objetivo**: guardar filtros en la URL con `useSearchParams` y navegar
desde el código con `useNavigate` después de un submit.

**Requisitos**:

- [ ] Arriba del listado, una fila de chips (`nav.chips`): "Todas" y uno por estado, con la cantidad entre paréntesis (`Publicada (2)`). Cada chip es un `<Link>` cuyo destino es la misma página con `?estado=…`; "Todas" saca el parámetro.
- [ ] El chip del estado actual tiene la clase `chip activo`; el resto, `chip`.
- [ ] Un buscador (`input type="search"` dentro de `div.filtros`) filtra por título con `?q=…`. Escribir no agrega una entrada al historial por cada letra.
- [ ] Los dos filtros se combinan, y cambiar de chip **no** borra la búsqueda.
- [ ] Copiar la URL filtrada y abrirla en otra pestaña muestra lo mismo. Si nada coincide, se ve "No hay propiedades con esos filtros." en un `p.mensaje`.
- [ ] Un link "+ Nueva propiedad" (`boton primario`, junto al título en un `div.titulo-con-accion`) lleva a la nueva ruta `propiedades/nueva`.
- [ ] `NuevaPropiedad` usa `FormularioPropiedad`. Al guardar, crea la propiedad con `crearPropiedad` y navega a su detalle. Desde ahí, Atrás **no** vuelve al formulario.
- [ ] "Cancelar" vuelve a la página anterior.

Pistas:

- Un `Link` con `to="?estado=Publicada"` se queda en la misma página y solo
  cambia la query. Para no perder `q`, conviene una función que copie los
  parámetros actuales (`new URLSearchParams(searchParams)`), cambie
  `estado` y devuelva `` `?${params}` ``.
- `propiedades/nueva` y `propiedades/:id` no chocan: el router prefiere el
  segmento fijo antes que el parámetro, sin importar el orden.
- Las propiedades nuevas viven en memoria: un F5 las borra (más adelante
  pasan a la API).
