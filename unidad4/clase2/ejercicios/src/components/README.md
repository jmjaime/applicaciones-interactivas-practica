# 📝 Ejercicios - MusicStream App

Crea tus componentes en este directorio organizados por tema.

## 🎨 Ejercicios de Styling

### 1.1 - Card de Canción con CSS Modules

**Archivo**: `styling/SongCard.tsx` + `styling/SongCard.module.css`

**Qué hacer**:

1. Crear un componente que muestre información de una canción
2. Usar CSS Modules para los estilos (archivo `.module.css`)
3. Mostrar: imagen del álbum, título, artista y duración

**Estructura sugerida**:

```typescript
interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

export default function SongCard({ song }: { song: Song }) {
  return <div className={styles.card}>{/* Tu código aquí */}</div>;
}
```

**Recordatorio**:

- Importar estilos: `import styles from './SongCard.module.css'`
- Usar: `className={styles.tuClase}`

---

### 1.2 - Theme Toggle con Inline Styles

**Archivo**: `styling/ThemeToggle.tsx`

**Qué hacer**:

1. Crear botón que alterne entre tema claro y oscuro
2. Usar `useState` para guardar el tema actual ('light' | 'dark')
3. Aplicar estilos inline dinámicos según el tema
4. Cambiar colores de fondo, texto y botones

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

**Tip**: Usa operador ternario para estilos condicionales

---

### 1.3 - Botones de Categoría con Clases Condicionales

**Archivo**: `styling/CategoryFilter.tsx`

**Qué hacer**:

1. Crear botones para filtrar por categoría: "All", "Rock", "Pop", "Jazz", "Electronic"
2. Usar `useState` para guardar la categoría activa
3. Aplicar clase CSS condicional al botón activo
4. Usar template literals para combinar clases

**Patrón**:

```typescript
className={`button ${isActive ? 'active' : ''}`}
```

---

### 1.4 - Progress Bar Animada

**Archivo**: `styling/ProgressBar.tsx`

**Qué hacer**:

1. Crear barra de progreso para reproducción de canción
2. Props: `currentTime` (número) y `duration` (número)
3. Calcular porcentaje: `(currentTime / duration) * 100`
4. Usar div interno con width dinámico
5. Agregar animación CSS

**Estructura**:

```typescript
<div className="progress-container">
  <div className="progress-bar" style={{ width: `${progress}%` }} />
</div>
```

---

## 🔗 Ejercicios de Refs

### 2.1 - SearchBar con Auto-focus

**Archivo**: `refs/SearchBar.tsx`

**Qué hacer**:

1. Crear input de búsqueda
2. Usar `useRef` para referenciar el input
3. Auto-enfocar el input cuando el componente se monta (useEffect)
4. Botón para volver a enfocar el input

**Código base**:

```typescript
const inputRef = useRef<HTMLInputElement>(null)

useEffect(() => {
  inputRef.current?.focus()
}, [])

<input ref={inputRef} />
```

---

### 2.2 - Control de Audio Tag

**Archivo**: `refs/AudioPlayer.tsx`

**Qué hacer**:

1. Crear elemento `<audio>` con ref
2. Botones para play/pause/stop
3. Usar `audioRef.current?.play()` y `.pause()`
4. Mostrar estado de reproducción con useState

**Métodos útiles**:

```typescript
audioRef.current?.play();
audioRef.current?.pause();
audioRef.current!.currentTime = 0;
```

---

### 2.3 - Scroll al Último Comentario

**Archivo**: `refs/CommentSection.tsx`

**Qué hacer**:

1. Lista de comentarios
2. Botón "Agregar comentario" que añade uno nuevo
3. Scroll automático al último comentario agregado
4. Usar `ref.current?.scrollIntoView({ behavior: 'smooth' })`

**Estructura**:

```typescript
const lastCommentRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  lastCommentRef.current?.scrollIntoView({ behavior: "smooth" });
}, [comments]);
```

---

### 2.4 - Contador de Renders sin Re-render

**Archivo**: `refs/RenderCounter.tsx`

**Qué hacer**:

1. Usar `useRef` para contar cuántas veces se renderiza el componente
2. Incrementar `renderCount.current` en cada render (NO en useEffect)
3. Agregar un botón que cause re-render (useState)
4. Mostrar el contador

**Concepto clave**: `ref.current` cambia SIN causar re-render

```typescript
const renderCount = useRef(0);
renderCount.current = renderCount.current + 1;
```

---

## ⚡ Ejercicios de Side Effects

### 3.1 - Cargar Playlist desde API

**Archivo**: `effects/PlaylistLoader.tsx`

**Qué hacer**:

1. useEffect con array vacío `[]` (ejecuta al montar)
2. Fetch de albums desde JSONPlaceholder API
3. Estados: `albums`, `loading`, `error`
4. Mostrar loading mientras carga

**API real - JSONPlaceholder**:

```typescript
useEffect(() => {
  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/albums?_limit=10"
      );
      const data = await response.json();
      setAlbums(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchAlbums();
}, []);
```

**API**: https://jsonplaceholder.typicode.com/albums

---

### 3.2 - Buscar Canciones con Debounce

**Archivo**: `effects/SearchWithDebounce.tsx`

**Qué hacer**:

1. Input para buscar posts/canciones
2. useEffect que dependa del término de búsqueda
3. Usar `setTimeout` para debounce (500ms)
4. Cleanup: `clearTimeout` para cancelar búsqueda anterior
5. Buscar en JSONPlaceholder

**Patrón debounce con API real**:

```typescript
useEffect(() => {
  if (!searchTerm) {
    setResults([]);
    return;
  }

  const timeoutId = setTimeout(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?q=${searchTerm}`
      );
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, 500);

  return () => clearTimeout(timeoutId);
}, [searchTerm]);
```

**API**: https://jsonplaceholder.typicode.com/posts

---

### 3.3 - Timer de Reproducción

**Archivo**: `effects/PlaybackTimer.tsx`

**Qué hacer**:

1. Cronómetro que incrementa cada segundo
2. Botones: Play/Pause/Reset
3. Usar `setInterval` en useEffect
4. Cleanup: `clearInterval` cuando pausa o desmonta

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

### 3.4 - Sincronizar con localStorage

**Archivo**: `effects/FavoriteSongs.tsx`

**Qué hacer**:

1. Lista de canciones favoritas
2. useEffect para CARGAR favoritos al montar (de localStorage)
3. useEffect para GUARDAR favoritos cuando cambian
4. Botones para agregar/quitar favoritos

**localStorage API**:

```typescript
// Guardar
localStorage.setItem("favorites", JSON.stringify(favorites));

// Cargar
const saved = localStorage.getItem("favorites");
const favorites = saved ? JSON.parse(saved) : [];
```

**Dos useEffect separados**:

- Uno para cargar: `useEffect(() => { /* load */ }, [])`
- Otro para guardar: `useEffect(() => { /* save */ }, [favorites])`

---

### 3.5 - Polling de Now Playing

**Archivo**: `effects/NowPlaying.tsx`

**Qué hacer**:

1. Consultar API cada 5 segundos
2. Usar `setInterval` en useEffect
3. Actualizar estado con un post/comentario aleatorio
4. Cleanup al desmontar

**Patrón polling con API real**:

```typescript
useEffect(() => {
  const fetchRandomPost = async () => {
    try {
      const randomId = Math.floor(Math.random() * 100) + 1;
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${randomId}`
      );
      const data = await response.json();
      setCurrentPost(data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchRandomPost(); // Llamada inicial
  const interval = setInterval(fetchRandomPost, 5000);

  return () => clearInterval(interval);
}, []);
```

**API**: https://jsonplaceholder.typicode.com/posts/:id  
**Tip**: Usa `Math.random()` para simular diferentes posts

---

## 📝 Ejercicios de Forms

### 4.1 - Crear Playlist con Controlled Form

**Archivo**: `forms/CreatePlaylistForm.tsx`

**Qué hacer**:

1. Formulario con nombre y descripción de playlist
2. Usar `useState` para cada campo
3. Pattern: `value={name}` + `onChange={(e) => setName(e.target.value)}`
4. Botón submit que muestre los datos

**Patrón controlled**:

```typescript
const [name, setName] = useState('')

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

---

### 4.2 - Comentario Rápido con Uncontrolled Form

**Archivo**: `forms/QuickComment.tsx`

**Qué hacer**:

1. Textarea para comentarios
2. Usar `useRef` (no useState)
3. Leer valor en submit: `textareaRef.current?.value`
4. Limpiar después: `textareaRef.current!.value = ""`

**Patrón uncontrolled**:

```typescript
const commentRef = useRef<HTMLTextAreaElement>(null);

const handleSubmit = (e) => {
  e.preventDefault();
  const comment = commentRef.current?.value;
  // Usar comentario...
  commentRef.current!.value = ""; // Limpiar
};
```

---

### 4.3 - Filtros Avanzados con FormData

**Archivo**: `forms/SongFilters.tsx`

**Qué hacer**:

1. Form con múltiples filtros: género, año mínimo, duración máxima, solo favoritos
2. Usar FormData para extraer todos los valores
3. No necesitas useState ni refs
4. Usa atributo `name` en cada input

**Patrón FormData**:

```typescript
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)

  const filters = {
    genre: formData.get("genre"),
    minYear: formData.get("minYear"),
    onlyFavorites: formData.get("onlyFavorites") === "on",
  }
}

// En el HTML
<input name="genre" />
<input name="minYear" type="number" />
<input name="onlyFavorites" type="checkbox" />
```

---

### 4.4 - Agregar a Favoritos con Form Action

**Archivo**: `forms/AddToFavorites.tsx`

**Qué hacer**:

1. Usar prop `action` en lugar de `onSubmit`
2. La función recibe FormData automáticamente
3. No necesitas `e.preventDefault()`
4. React 19 feature

**Patrón Form Action**:

```typescript
const addToFavorites = (formData: FormData) => {
  const songId = formData.get("songId");
  // Agregar a favoritos...
};

<form action={addToFavorites}>
  <input name="songId" type="hidden" value={songId} />
  <button type="submit">Add to Favorites</button>
</form>;
```

---

### 4.5 - Rating de Canción con useActionState

**Archivo**: `forms/SongRating.tsx`

**Qué hacer**:

1. Form para calificar canción (1-5 estrellas)
2. Simular `useActionState` con useState + async function
3. Validar que rating esté entre 1 y 5
4. Mostrar error si validación falla
5. Mostrar "Guardando..." mientras procesa

**Patrón simulado**:

```typescript
const [state, setState] = useState({ error: null, success: false });
const [isPending, setIsPending] = useState(false);

const rateAction = async (formData: FormData) => {
  setIsPending(true);
  const rating = Number(formData.get("rating"));

  if (rating < 1 || rating > 5) {
    setState({ error: "Rating debe estar entre 1 y 5", success: false });
    setIsPending(false);
    return;
  }

  // Simular guardado...
  await new Promise((resolve) => setTimeout(resolve, 1000));
  setState({ error: null, success: true });
  setIsPending(false);
};

<form action={rateAction}>
  <input type="number" name="rating" min="1" max="5" />
  <button disabled={isPending}>
    {isPending ? "Guardando..." : "Enviar Rating"}
  </button>
  {state.error && <p>{state.error}</p>}
</form>;
```

---

## 🏆 Ejercicio Integrador

### MusicStream Dashboard Completo

**Ubicación**: `integrador/`

**Qué hacer**:
Combina TODOS los conceptos en una aplicación completa de streaming de música.

**Componentes sugeridos**:

- `Dashboard.tsx` - Layout principal
- `Sidebar.tsx` - Navegación (CSS Modules)
- `ThemeToggle.tsx` - Tema persistente (localStorage)
- `SearchBar.tsx` - Con auto-focus y debounce
- `SongList.tsx` - Lista con scroll
- `AudioPlayer.tsx` - Con refs para controles
- `PlaylistForm.tsx` - Controlled/uncontrolled
- `FavoritesManager.tsx` - Con localStorage sync

**Features mínimas**:

1. Tema claro/oscuro persistente
2. Búsqueda de canciones con debounce
3. Reproductor funcional
4. Agregar/quitar favoritos
5. Crear playlists
6. Todo con estilos profesionales

---

## 💡 Tips Generales

### Imports que necesitarás:

```typescript
import { useState, useEffect, useRef } from "react";
```

### TypeScript types útiles:

```typescript
// Props
interface MiComponenteProps {
  titulo: string;
  opcional?: number;
}

// Event handlers
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {};
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

// Refs
const divRef = useRef<HTMLDivElement>(null);
const inputRef = useRef<HTMLInputElement>(null);
```

### Debugging:

```typescript
// Console logs
console.log("Estado actual:", state);

// React DevTools (F12)
// Ve estado y props en tiempo real
```

---

## 📚 Recursos

- Revisa los ejemplos en `../../ejemplos/` si te atoras
- Consulta las slides de clase
- Lee la documentación de React: https://react.dev
- Usa TypeScript para mejor autocompletado
