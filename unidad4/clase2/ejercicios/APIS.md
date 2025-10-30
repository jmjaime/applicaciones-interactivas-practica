# 🌐 APIs Gratuitas para Práctica

Este documento lista APIs públicas y gratuitas que puedes usar en tus ejercicios de React.

## 🎯 API Principal Recomendada

### JSONPlaceholder

**URL**: https://jsonplaceholder.typicode.com

**Descripción**: API REST falsa para testing y prototipos. No requiere autenticación.

**Endpoints disponibles**:

```
/posts       - 100 posts
/comments    - 500 comentarios
/albums      - 100 álbumes
/photos      - 5000 fotos
/todos       - 200 tareas
/users       - 10 usuarios
```

**Ejemplos de uso**:

```typescript
// GET - Obtener todos los posts (limitar a 10)
fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");

// GET - Obtener un post específico
fetch("https://jsonplaceholder.typicode.com/posts/1");

// GET - Filtrar posts por usuario
fetch("https://jsonplaceholder.typicode.com/posts?userId=1");

// POST - Crear un nuevo post (simulado)
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Mi post",
    body: "Contenido",
    userId: 1,
  }),
});

// PUT - Actualizar un post (simulado)
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    id: 1,
    title: "Título actualizado",
    body: "Contenido actualizado",
    userId: 1,
  }),
});

// DELETE - Eliminar un post (simulado)
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "DELETE",
});
```

**Características**:

- ✅ Sin autenticación
- ✅ CORS habilitado
- ✅ HTTPS
- ✅ Soporta GET, POST, PUT, PATCH, DELETE
- ✅ Los cambios son simulados (no se guardan realmente)
- ✅ Responde rápido (~200ms)

---

## 🎵 Otras APIs Útiles (Sin Autenticación)

### 1. REST Countries

**URL**: https://restcountries.com/v3.1/all

**Uso**: Información de países (nombre, capital, bandera, población, etc.)

```typescript
// Todos los países
fetch("https://restcountries.com/v3.1/all");

// Buscar por nombre
fetch("https://restcountries.com/v3.1/name/argentina");

// Por código de país
fetch("https://restcountries.com/v3.1/alpha/ar");
```

**Ideal para**: Ejercicios con listas, búsqueda, filtros.

---

### 2. The Dog API (Public)

**URL**: https://dog.ceo/api/breeds/image/random

**Uso**: Imágenes aleatorias de perros

```typescript
// Imagen aleatoria
fetch("https://dog.ceo/api/breeds/image/random");

// Múltiples imágenes
fetch("https://dog.ceo/api/breeds/image/random/10");

// Por raza
fetch("https://dog.ceo/api/breed/husky/images");
```

**Ideal para**: Galería de imágenes, carruseles.

---

### 3. RandomUser.me

**URL**: https://randomuser.me/api/

**Uso**: Datos de usuarios falsos (nombre, email, foto, etc.)

```typescript
// Un usuario aleatorio
fetch("https://randomuser.me/api/");

// Múltiples usuarios
fetch("https://randomuser.me/api/?results=10");

// Solo campos específicos
fetch("https://randomuser.me/api/?inc=name,email,picture");
```

**Ideal para**: Listas de usuarios, perfiles, contactos.

---

### 4. Open Trivia Database

**URL**: https://opentdb.com/api.php

**Uso**: Preguntas de trivia

```typescript
// 10 preguntas aleatorias
fetch("https://opentdb.com/api.php?amount=10");

// Por categoría (ej: música = 12)
fetch("https://opentdb.com/api.php?amount=10&category=12");

// Con dificultad
fetch("https://opentdb.com/api.php?amount=10&difficulty=easy");
```

**Ideal para**: Quiz apps, juegos.

---

### 5. CoinGecko (Criptomonedas)

**URL**: https://api.coingecko.com/api/v3/simple/price

**Uso**: Precios de criptomonedas

```typescript
// Precio de Bitcoin en USD
fetch(
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
);

// Top 10 criptomonedas
fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10"
);
```

**Ideal para**: Dashboard de precios, gráficos.

---

## 🎨 APIs para Imágenes/Placeholder

### Picsum Photos

**URL**: https://picsum.photos/

**Uso**: Imágenes placeholder aleatorias

```typescript
// Imagen específica de tamaño
<img src="https://picsum.photos/200/300" />

// Imagen aleatoria diferente
<img src="https://picsum.photos/200/300?random=1" />

// Con ID específico
<img src="https://picsum.photos/id/237/200/300" />
```

---

## 💡 Tips para usar APIs

### 1. Manejo de errores

```typescript
try {
  const response = await fetch("https://api.example.com/data");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  // Usar data...
} catch (error) {
  console.error("Error:", error);
  setError(error.message);
}
```

### 2. Loading states

```typescript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("...");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
```

### 3. Cancelar requests (AbortController)

```typescript
useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const response = await fetch("...", {
        signal: controller.signal,
      });
      const data = await response.json();
      setData(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    }
  };

  fetchData();

  return () => controller.abort(); // Cleanup
}, []);
```

### 4. Debounce para búsquedas

```typescript
useEffect(() => {
  if (!searchTerm) return;

  const timeoutId = setTimeout(async () => {
    // Buscar aquí
  }, 500);

  return () => clearTimeout(timeoutId);
}, [searchTerm]);
```

---

## 🚫 APIs que Requieren API Key (Gratis pero con registro)

Estas son gratuitas pero necesitas registrarte para obtener una API key:

- **OpenWeatherMap**: https://openweathermap.org/api (clima)
- **NewsAPI**: https://newsapi.org/ (noticias)
- **TMDB**: https://www.themoviedb.org/settings/api (películas/series)
- **Spotify**: https://developer.spotify.com/ (música)
- **GitHub**: https://docs.github.com/en/rest (repositorios, usuarios)

---

## ⚠️ Limitaciones y Buenas Prácticas

1. **Rate Limiting**: La mayoría tiene límites de requests por hora
2. **No guardar datos sensibles**: Nunca pongas API keys en el frontend
3. **CORS**: Si da error de CORS, usa un proxy o una API diferente
4. **Cache**: Considera cachear respuestas para reducir requests
5. **Error handling**: Siempre maneja errores de red

---

## 📚 Recursos Adicionales

- **Public APIs List**: https://github.com/public-apis/public-apis
- **RapidAPI Hub**: https://rapidapi.com/hub (APIs curadas)
- **API List**: https://apilist.fun/ (colección de APIs públicas)

---

**¡Úsalas en tus ejercicios de React! 🚀**
