export interface ExerciseInstruction {
  id: string;
  title: string;
  file: string;
  objective: string;
  steps: string[];
  code?: string;
  tips?: string[];
}

export const exercises: Record<string, ExerciseInstruction> = {
  "styling-1": {
    id: "styling-1",
    title: "1.1 - Card de Canción con CSS Modules",
    file: "styling/SongCard.tsx + SongCard.module.css",
    objective:
      "Crear un componente de tarjeta de canción usando CSS Modules para evitar conflictos de estilos.",
    steps: [
      "Crear SongCard.module.css con estilos scoped",
      "Implementar SongCard.tsx que muestre: imagen del álbum, título, artista y duración",
      "Usar className dinámico con styles.nombreClase",
    ],
    code: `interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
}

export default function SongCard({ song }: { song: Song }) {
  return <div className={styles.card}>
    {/* Tu código aquí */}
  </div>;
}`,
    tips: [
      'Importar estilos: import styles from "./SongCard.module.css"',
      "Usar: className={styles.tuClase}",
    ],
  },
  "styling-2": {
    id: "styling-2",
    title: "1.2 - Tema Claro/Oscuro con Inline Styles",
    file: "styling/ThemeToggle.tsx",
    objective: "Implementar un switch de tema usando inline styles dinámicos.",
    steps: [
      "Crear botón que alterne entre tema claro y oscuro",
      'Usar useState para guardar el tema actual ("light" | "dark")',
      "Aplicar estilos inline dinámicos según el tema",
      "Cambiar colores de fondo, texto y botones",
    ],
    code: `const lightTheme = {
  background: "#ffffff",
  text: "#000000",
  primary: "#1db954",
};

const darkTheme = {
  background: "#121212",
  text: "#ffffff",
  primary: "#1db954",
};`,
    tips: ["Usa operador ternario para estilos condicionales"],
  },
  "styling-3": {
    id: "styling-3",
    title: "1.3 - Botones de Categoría con Clases Condicionales",
    file: "styling/CategoryFilter.tsx",
    objective:
      "Crear botones de filtro con clases CSS que cambien según el estado activo.",
    steps: [
      'Crear botones para: "All", "Rock", "Pop", "Jazz", "Electronic"',
      "Usar useState para guardar la categoría activa",
      "Aplicar clase CSS condicional al botón activo",
      "Usar template literals para combinar clases",
    ],
    code: `className={\`button \${isActive ? 'active' : ''}\`}`,
    tips: ['Usa template literals: `clase-base ${condicion ? "activa" : ""}`'],
  },
  "styling-4": {
    id: "styling-4",
    title: "1.4 - Progress Bar Animada",
    file: "styling/ProgressBar.tsx",
    objective: "Crear barra de progreso para reproducción de canción.",
    steps: [
      "Props: currentTime (número) y duration (número)",
      "Calcular porcentaje: (currentTime / duration) * 100",
      "Usar div interno con width dinámico",
      "Agregar animación CSS",
    ],
    code: `<div className="progress-container">
  <div 
    className="progress-bar" 
    style={{ width: \`\${progress}%\` }} 
  />
</div>`,
  },
  "refs-1": {
    id: "refs-1",
    title: "2.1 - SearchBar con Auto-focus",
    file: "refs/SearchBar.tsx",
    objective:
      "Crear input de búsqueda que se enfoque automáticamente al montar.",
    steps: [
      "Crear input de búsqueda",
      "Usar useRef para referenciar el input",
      "Auto-enfocar el input cuando el componente se monta (useEffect)",
      "Botón para volver a enfocar el input",
    ],
    code: `const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);

<input ref={inputRef} />`,
  },
  "refs-2": {
    id: "refs-2",
    title: "2.2 - Control de Audio Tag",
    file: "refs/AudioPlayer.tsx",
    objective: "Crear reproductor de audio controlado por refs.",
    steps: [
      "Crear elemento <audio> con ref",
      "Botones para play/pause/stop",
      "Usar audioRef.current?.play() y .pause()",
      "Mostrar estado de reproducción con useState",
    ],
    code: `audioRef.current?.play();
audioRef.current?.pause();
audioRef.current!.currentTime = 0;`,
  },
  "refs-3": {
    id: "refs-3",
    title: "2.3 - Scroll al Último Comentario",
    file: "refs/CommentSection.tsx",
    objective: "Lista de comentarios con scroll automático al último.",
    steps: [
      "Lista de comentarios",
      'Botón "Agregar comentario" que añade uno nuevo',
      "Scroll automático al último comentario agregado",
      'Usar ref.current?.scrollIntoView({ behavior: "smooth" })',
    ],
    code: `const lastCommentRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  lastCommentRef.current?.scrollIntoView({ 
    behavior: "smooth" 
  });
}, [comments]);`,
  },
  "refs-4": {
    id: "refs-4",
    title: "2.4 - Contador de Renders sin Re-render",
    file: "refs/RenderCounter.tsx",
    objective: "Usar useRef para contar renders sin causar re-renders.",
    steps: [
      "Usar useRef para contar cuántas veces se renderiza",
      "Incrementar renderCount.current en cada render (NO en useEffect)",
      "Agregar un botón que cause re-render (useState)",
      "Mostrar el contador",
    ],
    code: `const renderCount = useRef(0);
renderCount.current = renderCount.current + 1;`,
    tips: ["ref.current cambia SIN causar re-render"],
  },
  "effects-1": {
    id: "effects-1",
    title: "3.1 - Cargar Playlist desde API",
    file: "effects/PlaylistLoader.tsx",
    objective: "Cargar datos al montar el componente con useEffect.",
    steps: [
      "useEffect con array vacío [] (ejecuta al montar)",
      "Fetch de albums desde JSONPlaceholder API",
      "Estados: albums, loading, error",
      "Mostrar loading mientras carga",
    ],
    code: `useEffect(() => {
  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/albums?_limit=10'
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
}, []);`,
    tips: ["API real: https://jsonplaceholder.typicode.com/albums"],
  },
  "effects-2": {
    id: "effects-2",
    title: "3.2 - Buscar Canciones con Debounce",
    file: "effects/SearchWithDebounce.tsx",
    objective: "Implementar búsqueda con debounce usando useEffect.",
    steps: [
      "Input para buscar posts/canciones",
      "useEffect que dependa del término de búsqueda",
      "Usar setTimeout para debounce (500ms)",
      "Cleanup: clearTimeout para cancelar búsqueda anterior",
      "Buscar en JSONPlaceholder",
    ],
    code: `useEffect(() => {
  if (!searchTerm) {
    setResults([]);
    return;
  }

  const timeoutId = setTimeout(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        \`https://jsonplaceholder.typicode.com/posts?q=\${searchTerm}\`
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
}, [searchTerm]);`,
    tips: [
      "API: https://jsonplaceholder.typicode.com/posts",
      "El parámetro q funciona para búsqueda básica",
    ],
  },
  "effects-3": {
    id: "effects-3",
    title: "3.3 - Timer de Reproducción",
    file: "effects/PlaybackTimer.tsx",
    objective: "Cronómetro con cleanup function.",
    steps: [
      "Cronómetro que incrementa cada segundo",
      "Botones: Play/Pause/Reset",
      "Usar setInterval en useEffect",
      "Cleanup: clearInterval cuando pausa o desmonta",
    ],
    code: `useEffect(() => {
  if (isPlaying) {
    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }
}, [isPlaying]);`,
  },
  "effects-4": {
    id: "effects-4",
    title: "3.4 - Sincronizar con localStorage",
    file: "effects/FavoriteSongs.tsx",
    objective: "Persistir datos en localStorage con useEffect.",
    steps: [
      "Lista de canciones favoritas",
      "useEffect para CARGAR favoritos al montar",
      "useEffect para GUARDAR favoritos cuando cambian",
      "Botones para agregar/quitar favoritos",
    ],
    code: `// Guardar
localStorage.setItem("favorites", JSON.stringify(favorites));

// Cargar
const saved = localStorage.getItem("favorites");
const favorites = saved ? JSON.parse(saved) : [];`,
    tips: ["Dos useEffect separados: uno para cargar, otro para guardar"],
  },
  "effects-5": {
    id: "effects-5",
    title: "3.5 - Polling de Now Playing",
    file: "effects/NowPlaying.tsx",
    objective: "Consultar API periódicamente (polling).",
    steps: [
      "Consultar API cada 5 segundos",
      "Usar setInterval en useEffect",
      "Actualizar estado con un post/comentario aleatorio",
      "Cleanup al desmontar",
    ],
    code: `useEffect(() => {
  const fetchRandomPost = async () => {
    try {
      const randomId = Math.floor(Math.random() * 100) + 1;
      const response = await fetch(
        \`https://jsonplaceholder.typicode.com/posts/\${randomId}\`
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
}, []);`,
    tips: [
      "API: https://jsonplaceholder.typicode.com/posts/:id",
      "Usa Math.random() para simular 'canción actual' diferente",
    ],
  },
  "forms-1": {
    id: "forms-1",
    title: "4.1 - Crear Playlist (Controlled)",
    file: "forms/CreatePlaylistForm.tsx",
    objective: "Formulario controlado con useState.",
    steps: [
      "Formulario con nombre y descripción",
      "Usar useState para cada campo",
      "Pattern: value={name} + onChange",
      "Botón submit que muestre los datos",
    ],
    code: `const [name, setName] = useState('');

<input 
  value={name} 
  onChange={(e) => setName(e.target.value)} 
/>`,
  },
  "forms-2": {
    id: "forms-2",
    title: "4.2 - Comentario Rápido (Uncontrolled)",
    file: "forms/QuickComment.tsx",
    objective: "Formulario no controlado con useRef.",
    steps: [
      "Textarea para comentarios",
      "Usar useRef (no useState)",
      "Leer valor en submit: textareaRef.current?.value",
      'Limpiar después: textareaRef.current!.value = ""',
    ],
    code: `const commentRef = useRef<HTMLTextAreaElement>(null);

const handleSubmit = (e) => {
  e.preventDefault();
  const comment = commentRef.current?.value;
  commentRef.current!.value = ""; // Limpiar
};`,
  },
  "forms-3": {
    id: "forms-3",
    title: "4.3 - Filtros Avanzados (FormData)",
    file: "forms/SongFilters.tsx",
    objective: "Usar FormData API para extraer valores.",
    steps: [
      "Form con múltiples filtros",
      "Usar FormData para extraer todos los valores",
      "No necesitas useState ni refs",
      "Usa atributo name en cada input",
    ],
    code: `const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  
  const filters = {
    genre: formData.get("genre"),
    onlyFavorites: formData.get("onlyFavorites") === "on",
  };
};`,
  },
  "forms-4": {
    id: "forms-4",
    title: "4.4 - Add to Favorites (Form Action)",
    file: "forms/AddToFavorites.tsx",
    objective: "Usar Form Actions de React 19.",
    steps: [
      "Usar prop action en lugar de onSubmit",
      "La función recibe FormData automáticamente",
      "No necesitas e.preventDefault()",
    ],
    code: `const addToFavorites = (formData: FormData) => {
  const songId = formData.get("songId");
};

<form action={addToFavorites}>
  <input name="songId" type="hidden" value={songId} />
  <button type="submit">Add</button>
</form>`,
  },
  "forms-5": {
    id: "forms-5",
    title: "4.5 - Rating con useActionState",
    file: "forms/SongRating.tsx",
    objective: "Simular useActionState con validación.",
    steps: [
      "Form para calificar canción (1-5 estrellas)",
      "Simular useActionState con useState + async",
      "Validar que rating esté entre 1 y 5",
      "Mostrar error si validación falla",
      'Mostrar "Guardando..." mientras procesa',
    ],
    code: `const [isPending, setIsPending] = useState(false);

const rateAction = async (formData: FormData) => {
  setIsPending(true);
  const rating = Number(formData.get("rating"));
  
  if (rating < 1 || rating > 5) {
    setState({ error: "Rating debe estar entre 1 y 5" });
    setIsPending(false);
    return;
  }
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  setState({ error: null, success: true });
  setIsPending(false);
};`,
  },
  integrador: {
    id: "integrador",
    title: "Dashboard Completo - MusicStream",
    file: "integrador/",
    objective: "Combinar TODOS los conceptos en una aplicación completa.",
    steps: [
      "Tema claro/oscuro persistente (localStorage)",
      "Búsqueda de canciones con debounce",
      "Reproductor funcional con refs",
      "Agregar/quitar favoritos",
      "Crear playlists",
      "Todo con estilos profesionales",
    ],
    tips: [
      "Divide en componentes pequeños",
      "Usa CSS Modules para estilos",
      "Combina todos los patrones aprendidos",
    ],
  },
};
