# Integrador: Panel con sesión y edición

Arranca con los Ejercicios 3 y 4 resueltos. Suma lo que falta para que el
panel se parezca al del TPO: login, rutas protegidas y edición. Se trabaja
en `rutas.tsx`, `Login.tsx` (+ `.module.css`), `RequiereSesion.tsx`,
`EditarPropiedad.tsx`, `LayoutPanel.tsx` y `DetallePropiedad.tsx`. La
sesión de prueba ya está en `sesion.ts`. Se ve en
`http://localhost:5173/5/`.

**Objetivo**: combinar rutas anidadas, parámetros, navegación programática,
rutas protegidas y CSS Modules en un flujo completo.

**Requisitos**:

- [ ] `/login` muestra un formulario (email y contraseña, `required`) centrado en una pantalla de fondo oscuro, con estilos de `Login.module.css`. Cualquier dato sirve: al enviar se llama a `iniciarSesion(email)`.
- [ ] Todo el panel queda detrás de `RequiereSesion`: sin sesión, cualquier URL del panel redirige a `/login`.
- [ ] Después de ingresar, se vuelve a la URL que se había pedido, **con** su query (`/5/?estado=Publicada` vuelve filtrada). Si se entró directo a `/login`, va a Mis propiedades.
- [ ] Ni después de la redirección ni después del login, Atrás vuelve a una página que redirige otra vez.
- [ ] Con la sesión ya iniciada, entrar a mano a `/5/login` no muestra el formulario: redirige a Mis propiedades (y Atrás no vuelve al login).
- [ ] Un botón "Salir" en la nav cierra la sesión y lleva a `/login`.
- [ ] En la nav, "Consultas" muestra la cantidad de consultas sin responder (clase `contador`, ya está en el module). Si no hay, no se muestra nada.
- [ ] El detalle tiene un link "✏️ Editar" a `propiedades/:id/editar`, salvo si la propiedad está Vendida, Alquilada o Cancelada.
- [ ] `EditarPropiedad` muestra `FormularioPropiedad` precargado (prop `inicial`). Al guardar, llama a `editarPropiedad` y vuelve al detalle con los datos nuevos. "Cancelar" vuelve atrás.
- [ ] Entrar a mano a `/5/propiedades/5/editar` (vendida) muestra un mensaje en vez del formulario.

Pistas:

- Una ruta sin `path` y con `children` sirve de "envoltorio": no cambia la
  URL, solo decide si dibujar el `<Outlet />` o un `<Navigate>`.
- `<Navigate to="/login" replace state={…} />` redirige y puede llevar a
  dónde se quería ir. En el login se lee con `useLocation().state`.
- `location.pathname` no incluye la query: está en `location.search`.
- El guardia del front es para la experiencia de uso: en el TPO, quien
  protege los datos es el backend validando el JWT (Clase 9).
