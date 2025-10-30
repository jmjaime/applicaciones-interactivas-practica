# 🎮 React - Ejercicios: Music Streaming App

Este proyecto contiene ejercicios prácticos para los conceptos avanzados de React usando la temática de una **aplicación de streaming de música** (estilo Spotify/Apple Music).

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Ejecutar

```bash
npm run dev
```

Abre `http://localhost:5173` en tu navegador

## 🎯 Temática: MusicStream

Todos los ejercicios están basados en una app de streaming de música que incluye:

- 🎵 Lista de canciones
- 🎨 Temas claros/oscuros (styling)
- 🎧 Reproductor de audio (refs)
- 📡 Carga de playlists desde API (side effects)
- ⭐ Sistema de favoritos (forms)

## 📚 Ejercicios por Tema

### 🎨 Tema 1: Styling (4 ejercicios)

#### Ejercicio 1.1: Card de Canción con CSS Modules


**Objetivo**: Crear un componente de tarjeta de canción usando CSS Modules para evitar conflictos de estilos.

**Requisitos**:

1. Crear `SongCard.module.css` con estilos scoped
2. Implementar `SongCard.tsx` que muestre:
   - Imagen del álbum
   - Nombre de la canción
   - Artista
   - Duración
3. Usar `className` dinámico

**Archivo**: `src/components/SongCard.tsx`

**Datos de ejemplo**:

```typescript
{
  id: 1,
  title: "Bohemian Rhapsody",
  artist: "Queen",
  album: "A Night at the Opera",
  duration: "5:55",
  coverUrl: "/covers/queen.jpg"
}
```

**Pistas**:

- Archivo CSS debe llamarse `*.module.css`
- Importar como: `import styles from './SongCard.module.css'`
- Usar: `className={styles.nombreClase}`

---

#### Ejercicio 1.2: Tema Claro/Oscuro con Inline Styles


**Objetivo**: Implementar un switch de tema usando inline styles dinámicos.

**Requisitos**:

1. Crear componente `ThemeToggle.tsx`
2. useState para guardar tema actual ('light' | 'dark')
3. Estilos que cambien según el tema
4. Botón para alternar tema

**Colores sugeridos**:

```typescript
const lightTheme = {
  background: "#ffffff",
  text: "#000000",
  primary: "#1db954", // Verde Spotify
};

const darkTheme = {
  background: "#121212",
  text: "#ffffff",
  primary: "#1db954",
};
```

**Pistas**:

- Usa operador ternario para estilos condicionales
- `backgroundColor` en camelCase, no `background-color`

---

#### Ejercicio 1.3: Botones de Categoría con Clases Condicionales


**Objetivo**: Crear botones de filtro con clases CSS que cambien según el estado activo.

**Requisitos**:

1. Componente `CategoryFilter.tsx`
2. Categorías: "All", "Rock", "Pop", "Jazz", "Electronic"
3. Solo una categoría activa a la vez
4. Clase diferente para botón activo

**Estructura CSS**:

```css
.button {
  /* Estilo base */
}

.button-active {
  /* Estilo activo */
}
```

**Pistas**:

- Usa template literals para combinar clases
- Patrón: `className={\`base ${activo ? 'activo' : ''}\`}`

---

#### Ejercicio 1.4: Progress Bar Animada


**Objetivo**: Crear una barra de progreso de canción que se actualice dinámicamente.

**Requisitos**:

1. Componente `ProgressBar.tsx`
2. Props: `currentTime` y `duration`
3. Barra que refleje el progreso visual
4. Inline styles para el ancho dinámico

**Cálculo del progreso**:

```typescript
const progress = (currentTime / duration) * 100;
```

**Pistas**:

- Usa un `<div>` exterior y otro interior para la barra
- El div interno tiene `width` calculado dinámicamente

---

### 🔗 Tema 2: Refs (4 ejercicios)

#### Ejercicio 2.1: Auto-focus en Search Bar


**Objetivo**: Crear una barra de búsqueda que reciba focus automáticamente al cargar.

**Requisitos**:

1. Componente `SearchBar.tsx`
2. useRef para el input
3. useEffect para hacer focus al montar
4. Placeholder: "Buscar canciones, artistas..."

**Código base**:

```typescript
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  // Tu código aquí
}, []);
```

---

#### Ejercicio 2.2: Controlar Audio Tag con Refs


**Objetivo**: Usar refs para controlar reproducción de audio sin Form.

**Requisitos**:

1. Componente `AudioPlayer.tsx`
2. `<audio>` element con ref
3. Botones Play/Pause que usen `.play()` y `.pause()`
4. Mostrar si está reproduciendo o pausado

**Métodos del audio element**:

```typescript
audioRef.current?.play();
audioRef.current?.pause();
```

**Pistas**:

- Necesitas un state para saber si está reproduciendo
- Actualiza el state después de llamar `.play()` o `.pause()`

---

#### Ejercicio 2.3: Scroll al Último Comentario


**Objetivo**: Al agregar un comentario, hacer scroll automático hasta él.

**Requisitos**:

1. Componente `CommentSection.tsx`
2. Lista de comentarios
3. useRef para el último comentario
4. useEffect que haga scroll cuando agregues comentario

**Método para scroll**:

```typescript
lastCommentRef.current?.scrollIntoView({ behavior: "smooth" });
```

---

#### Ejercicio 2.4: Contador de Renders sin Re-render


**Objetivo**: Demostrar la diferencia entre useRef y useState.

**Requisitos**:

1. Componente `RenderCounter.tsx`
2. useRef para contar renders (NO causa re-render)
3. useState para valor que el usuario cambia
4. Mostrar ambos valores

**Código base**:

```typescript
const renderCount = useRef(0);

renderCount.current = renderCount.current + 1;
// NO usar setState aquí
```

**Pregunta de reflexión**: ¿Por qué renderCount.current cambia pero no ves el nuevo valor hasta el próximo render?

---

### ⚡ Tema 3: Side Effects (5 ejercicios)

#### Ejercicio 3.1: Cargar Playlist desde API


**Objetivo**: Usar useEffect para cargar datos al montar el componente.

**Requisitos**:

1. Componente `PlaylistLoader.tsx`
2. useEffect con array vacío `[]`
3. fetch a API (simulada o real)
4. Mostrar loading mientras carga

**API simulada** (usar esto si no tienes backend):

```typescript
const fetchPlaylist = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Chill Vibes", songs: 50 },
        { id: 2, title: "Workout Mix", songs: 30 },
      ]);
    }, 1000);
  });
};
```

**Estados necesarios**:

```typescript
const [playlists, setPlaylists] = useState([]);
const [loading, setLoading] = useState(true);
```

---

#### Ejercicio 3.2: Buscar Canciones con Debounce


**Objetivo**: Implementar búsqueda que espere 500ms después de que el usuario deje de escribir.

**Requisitos**:

1. Componente `SearchWithDebounce.tsx`
2. useEffect que dependa del término de búsqueda
3. setTimeout para el debounce
4. Cleanup function para limpiar timeout anterior

**Patrón de debounce**:

```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    // Hacer búsqueda aquí
  }, 500);

  return () => clearTimeout(timer);
}, [searchTerm]);
```

**¿Por qué?**: Evita hacer búsqueda en cada tecla, solo cuando el usuario pausa.

---

#### Ejercicio 3.3: Timer de Reproducción


**Objetivo**: Crear un timer que cuente segundos mientras una canción "reproduce".

**Requisitos**:

1. Componente `PlaybackTimer.tsx`
2. setInterval para incrementar contador
3. Botones Start/Stop
4. Cleanup function para limpiar interval

**Código base**:

```typescript
useEffect(() => {
  if (isPlaying) {
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }
}, [isPlaying]);
```

---

#### Ejercicio 3.4: Sincronizar con localStorage


**Objetivo**: Guardar canciones favoritas en localStorage y cargarlas al montar.

**Requisitos**:

1. Componente `FavoriteSongs.tsx`
2. useEffect para cargar favoritos al montar
3. useEffect para guardar cuando cambien los favoritos
4. Botón para agregar/remover favoritos

**localStorage API**:

```typescript
// Guardar
localStorage.setItem("favorites", JSON.stringify(favorites));

// Cargar
const saved = localStorage.getItem("favorites");
const favorites = saved ? JSON.parse(saved) : [];
```

**Dos useEffect separados**:

1. Para cargar (dependencias: `[]`)
2. Para guardar (dependencias: `[favorites]`)

---

#### Ejercicio 3.5: Polling de Now Playing


**Objetivo**: Consultar API cada 5 segundos para obtener canción actual.

**Requisitos**:

1. Componente `NowPlaying.tsx`
2. setInterval para polling
3. fetch dentro del interval
4. Cleanup para detener polling al desmontar

**Patrón**:

```typescript
useEffect(() => {
  const fetchNowPlaying = async () => {
    const response = await fetch("/api/now-playing");
    const data = await response.json();
    setCurrentSong(data);
  };

  // Fetch inmediato
  fetchNowPlaying();

  // Polling cada 5 segundos
  const interval = setInterval(fetchNowPlaying, 5000);

  return () => clearInterval(interval);
}, []);
```

---

### 📝 Tema 4: Forms (5 ejercicios)

#### Ejercicio 4.1: Crear Playlist con Controlled Form


**Objetivo**: Formulario controlado para crear una nueva playlist.

**Requisitos**:

1. Componente `CreatePlaylistForm.tsx`
2. useState para nombre y descripción
3. onSubmit con preventDefault
4. Mostrar la playlist creada

**Campos**:

- Nombre de la playlist (input text)
- Descripción (textarea)
- Botón "Crear Playlist"

**Patrón controlled**:

```typescript
<input value={name} onChange={(e) => setName(e.target.value)} />
```

---

#### Ejercicio 4.2: Comentario Rápido con Uncontrolled Form


**Objetivo**: Agregar comentarios usando refs (uncontrolled).

**Requisitos**:

1. Componente `QuickComment.tsx`
2. useRef para el textarea
3. Leer valor al hacer submit
4. Limpiar input después de enviar

**Patrón**:

```typescript
const commentRef = useRef<HTMLTextAreaElement>(null);

const handleSubmit = (e) => {
  e.preventDefault();
  const comment = commentRef.current?.value;
  // Usar el comentario...
  commentRef.current!.value = ""; // Limpiar
};
```

---

#### Ejercicio 4.3: Filtros Avanzados con FormData


**Objetivo**: Formulario de filtros con múltiples campos usando FormData.

**Requisitos**:

1. Componente `SongFilters.tsx`
2. FormData para extraer todos los valores
3. Campos:
   - Género (select)
   - Año mínimo (number)
   - Duración máxima (number)
   - Solo favoritos (checkbox)

**Patrón FormData**:

```typescript
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  const filters = {
    genre: formData.get("genre"),
    minYear: formData.get("minYear"),
    maxDuration: formData.get("maxDuration"),
    onlyFavorites: formData.get("onlyFavorites") === "on",
  };
};
```

---

#### Ejercicio 4.4: Agregar a Favoritos con Form Action ⭐⭐ (React 19)


**Objetivo**: Usar la nueva API de Form Actions de React 19.

**Requisitos**:

1. Componente `AddToFavorites.tsx`
2. Form con prop `action` (no `onSubmit`)
3. FormData pasa automáticamente
4. Input hidden con songId

**Patrón Form Action**:

```typescript
const addToFavorites = (formData: FormData) => {
  const songId = formData.get("songId");
  // Agregar a favoritos...
};

return (
  <form action={addToFavorites}>
    <input type="hidden" name="songId" value={song.id} />
    <button type="submit">♥ Favorito</button>
  </form>
);
```

---

#### Ejercicio 4.5: Rating de Canción con useActionState


**Objetivo**: Sistema de rating con validación usando useActionState.

**Requisitos**:

1. Componente `SongRating.tsx`
2. useActionState para manejar estado
3. Validación: rating entre 1 y 5
4. Mostrar errores de validación
5. Estado de pending durante "envío"

**Patrón useActionState**:

```typescript
import { useActionState } from "react";

const rateAction = (prevState: any, formData: FormData) => {
  const rating = Number(formData.get("rating"));

  if (rating < 1 || rating > 5) {
    return { error: "Rating debe estar entre 1 y 5" };
  }

  // Simular guardado...
  return { success: true, error: null };
};

const [state, action, isPending] = useActionState(rateAction, {});

return (
  <form action={action}>
    <input type="number" name="rating" min="1" max="5" />
    <button disabled={isPending}>
      {isPending ? "Guardando..." : "Enviar Rating"}
    </button>
    {state.error && <p className="error">{state.error}</p>}
  </form>
);
```

---

## 🎯 Ejercicio Integrador Final

### MusicStream Dashboard Completo


**Objetivo**: Combinar TODOS los conceptos en una aplicación funcional.

**Requisitos**:

1. **Styling**:

   - Tema claro/oscuro persistente (localStorage)
   - CSS Modules para todos los componentes
   - Animaciones de transición

2. **Refs**:

   - Audio player funcional con controles
   - Auto-scroll a canción actual
   - Focus en búsqueda con atajo de teclado (Ctrl+K)

3. **Side Effects**:

   - Cargar playlists desde API
   - Búsqueda con debounce
   - Guardar estado en localStorage
   - Timer de reproducción

4. **Forms**:
   - Crear playlist (Form Actions)
   - Agregar canción a playlist (useActionState)
   - Filtros de búsqueda (FormData)
   - Sistema de rating

**Componentes sugeridos**:

- `App.tsx` - Layout principal
- `Sidebar.tsx` - Navegación
- `PlayerBar.tsx` - Reproductor inferior
- `PlaylistView.tsx` - Vista de playlist
- `SearchView.tsx` - Búsqueda de canciones
- `SettingsView.tsx` - Configuración de tema

**API Mock** (incluida en el proyecto):

```typescript
// src/api/mockApi.ts
export const api = {
  getPlaylists: () => Promise<Playlist[]>,
  getSongs: (query?: string) => Promise<Song[]>,
  addToPlaylist: (playlistId, songId) => Promise<void>,
  createPlaylist: (name, description) => Promise<Playlist>,
};
```

---

## 📊 Sistema de Evaluación

Cada ejercicio tiene una puntuación:

- ⭐ Fácil: 5 puntos
- ⭐⭐ Medio: 10 puntos
- ⭐⭐⭐ Difícil: 15 puntos
- ⭐⭐⭐⭐⭐ Integrador: 50 puntos

**Total**: 250 puntos posibles

**Aprobado**: 150 puntos (60%)

## 🎓 Tips para los Ejercicios

1. **Lee los ejemplos primero**: Cada ejercicio corresponde a un ejemplo
2. **Empieza simple**: Haz funcionar lo básico antes de añadir features
3. **Usa TypeScript**: Los tipos te ayudan a evitar errores
4. **DevTools son tu amigo**: Inspecciona estado y props
5. **Commits frecuentes**: Guarda tu progreso constantemente
6. **Pide ayuda**: Si te atascas más de 30 minutos, consulta

## 🔗 Recursos

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MDN Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- Ejemplos en `../ejemplos/`
- Slides de clase en `../`

## 🐛 Problemas Comunes

### "Property does not exist on type"

Revisa los tipos de TypeScript, quizás necesitas `?` para opcional

### "Cannot read property of undefined"

Usa optional chaining: `obj?.property`

### useEffect loop infinito

Verifica el array de dependencias

### Refs is null

El elemento aún no se montó, usa optional chaining

---

**¡Mucho éxito con los ejercicios! 🎵🚀**
