# Mapeo de Relaciones con SQL Puro

Este proyecto demuestra el uso de **SQL puro** y `better-sqlite3` para gestionar relaciones complejas entre entidades en una base de datos de libros, autores y reseñas.

## 🎯 Objetivos de Aprendizaje

Al completar estos ejemplos, entenderás:

1. **Relaciones uno-a-muchos** y **muchos-a-uno** con SQL
2. **Relaciones uno-a-uno** con claves foráneas
3. **Consultas JOIN** complejas para obtener datos relacionados
4. **Transacciones** para mantener integridad de datos
5. **Fundamentos del mapeo relacional** antes de usar ORMs

## 🏗️ Estructura del Proyecto

```
src/
├── books/                    # Scripts de implementación
│   └── raw/                  # Implementación SQL puro
│       ├── book-listing.ts   # Listado de libros con SQL
│       ├── create-book.ts    # Creación de libros con SQL
│       └── persistence.ts    # Capa de persistencia SQL
├── common/                   # Lógica compartida
│   └── sample-data.ts        # Datos de ejemplo y utilidades
├── one-to-one/               # Ejemplo 1:1 (usuario ↔ perfil)
│   └── example.ts
├── one-to-many/              # Ejemplo 1:N (autor → libros)
│   └── example.ts
├── many-to-one/              # Ejemplo N:1 (libro → autor)
│   └── example.ts
└── many-to-many/             # Ejemplo N:M (curso ↔ estudiante)
    └── example.ts
```

## 🚀 Instalación y Configuración

1. **Instalar dependencias:**

   ```bash
   npm install
   ```

2. **Ejecutar listado de libros:**

   ```bash
   npm run books-raw
   ```

3. **Ejecutar ejemplos por relación:**
   ```bash
   npm run one-to-one-sql
   npm run one-to-many-sql
   npm run many-to-one-sql
   npm run many-to-many-sql
   ```

## 📦 Dependencias Principales

- **better-sqlite3**: Cliente SQLite síncrono y rápido
- **sqlite3**: Driver SQLite para Node.js
- **typescript**: Compilador TypeScript
- **ts-node**: Ejecutor TypeScript para desarrollo

## 🗃️ Modelo de Datos

### Author (Autor)

- `id`: Identificador único
- `firstName`: Nombre
- `lastName`: Apellido
- `email`: Email único
- `birthDate`: Fecha de nacimiento
- `biography`: Biografía (opcional)
- **Relación**: Uno-a-muchos con libros

### Book (Libro)

- `id`: Identificador único
- `title`: Título
- `price`: Precio
- `pages`: Número de páginas
- `description`: Descripción (opcional)
- `author_id`: Clave foránea a Author
- **Relación**: Muchos-a-uno con autor, uno-a-uno con ISBN, uno-a-muchos con reseñas

### ISBN

- `id`: Identificador único
- `code`: Código ISBN único
- `publishedDate`: Fecha de publicación
- `book_id`: Clave foránea a Book
- **Relación**: Uno-a-uno con libro

### Review (Reseña)

- `id`: Identificador único
- `reviewerName`: Nombre del reseñador
- `rating`: Calificación (1-5)
- `comment`: Comentario
- `createdAt`: Fecha de creación
- `book_id`: Clave foránea a Book
- **Relación**: Muchos-a-uno con libro

## 📋 Esquema de Base de Datos

```sql
-- Tabla de autores
CREATE TABLE authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    birthDate DATE,
    biography TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de libros
CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    pages INTEGER NOT NULL,
    description TEXT,
    author_id INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES authors(id)
);

-- Tabla de ISBNs (relación 1:1 con libros)
CREATE TABLE isbns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    publishedDate DATE NOT NULL,
    book_id INTEGER NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id)
);

-- Tabla de reseñas
CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reviewerName TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    book_id INTEGER NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id)
);
```

## 📊 Consultas SQL Complejas

### Listado de Libros con Todas las Relaciones

```sql
SELECT
    b.id,
    b.title,
    b.price,
    a.firstName || ' ' || a.lastName as author_name,
    i.code as isbn_code,
    AVG(r.rating) as avg_rating,
    COUNT(r.id) as review_count
FROM books b
JOIN authors a ON b.author_id = a.id
JOIN isbns i ON b.id = i.book_id
LEFT JOIN reviews r ON b.id = r.book_id
GROUP BY b.id, b.title, b.price, a.firstName, a.lastName, i.code
ORDER BY b.title;
```

### Consulta de Autor con Todos sus Libros

```sql
SELECT
    a.firstName || ' ' || a.lastName as author_name,
    b.title,
    b.price,
    i.code as isbn,
    COUNT(r.id) as review_count
FROM authors a
LEFT JOIN books b ON a.id = b.author_id
LEFT JOIN isbns i ON b.id = i.book_id
LEFT JOIN reviews r ON b.id = r.book_id
GROUP BY a.id, b.id
ORDER BY a.lastName, b.title;
```

## 🛠️ Scripts Disponibles

### Scripts Principales

- `npm run one-to-one-sql`: **Relación 1:1** (usuario ↔ perfil)
- `npm run one-to-many-sql`: **Relación 1:N** (autor → libros)
- `npm run many-to-one-sql`: **Relación N:1** (libro → autor)
- `npm run many-to-many-sql`: **Relación N:M** (curso ↔ estudiante)
- `npm run create-book-raw`: **Crear libro con SQL** - Ejemplo de creación con transacciones

### Scripts de Utilidad

_(no hay utilidades adicionales en esta sección)_

### Scripts de Utilidad

- `npm run build`: Compilar TypeScript
- `npm run start`: Ejecutar versión compilada
- `npm run clean`: Limpiar archivos generados y bases de datos

## 💻 Ejecución

Ejecuta cualquiera de los ejemplos de relación:

```bash
npm run one-to-one-sql
npm run one-to-many-sql
npm run many-to-one-sql
npm run many-to-many-sql
```

## 🏛️ Arquitectura por Capas

### 📊 Capa de Presentación (`book-listing.ts`)

- **Responsabilidad**: Orquestación del flujo y presentación de datos
- **Contiene**: Lógica de negocio, formateo de salida, manejo de errores
- **No contiene**: Detalles específicos de persistencia

### 💾 Capa de Persistencia (`persistence.ts`)

- **Responsabilidad**: Acceso y manipulación de datos
- **Contiene**: Configuración de BD, queries SQL, transacciones
- **Implementación**: `SQLPersistence` usando better-sqlite3 con SQL directo

### 🎯 Beneficios de esta Arquitectura

- ✅ **Separación de responsabilidades** clara
- ✅ **Testabilidad** mejorada (fácil mock de persistencia)
- ✅ **Mantenibilidad** - cambios en BD no afectan presentación
- ✅ **Control total** sobre las consultas SQL
- ✅ **Performance optimizada** con consultas específicas

## 📝 Scripts de Creación de Libros

### 🎯 Funcionalidad de Creación

El script `create-book-raw` demuestra cómo crear libros de forma robusta usando SQL puro:

**Características:**

- ✅ **Transacciones ACID** - Garantiza integridad de datos
- ✅ **Manejo de errores** - Rollback automático en caso de falla
- ✅ **Validaciones** - Previene duplicados de ISBN y email
- ✅ **Relaciones complejas** - Maneja autores nuevos o existentes
- ✅ **Creación de reseñas** - Asocia reseñas al libro creado

### 🔄 Flujo de Creación con SQL

1. **Iniciar transacción**: `BEGIN TRANSACTION`
2. **Validar autor**: Usar existente por ID o crear nuevo con validación
3. **Validar ISBN**: Verificar unicidad con `SELECT COUNT(*)`
4. **Crear libro**: `INSERT INTO books` con author_id
5. **Crear ISBN**: `INSERT INTO isbns` con book_id
6. **Crear reseñas**: `INSERT INTO reviews` con book_id
7. **Confirmar transacción**: `COMMIT` o `ROLLBACK`

## 🔧 Características del SQL Puro

### Ventajas

- ✅ **Rendimiento superior** - Consultas optimizadas manualmente
- ✅ **Control total** - Cada consulta es exactamente lo que necesitas
- ✅ **Transparencia** - Sabes exactamente qué SQL se ejecuta
- ✅ **Flexibilidad** - Consultas complejas son más fáciles
- ✅ **Menos overhead** - Sin abstracción adicional

### Características Implementadas

- ✅ **Prepared statements** automáticos para seguridad
- ✅ **Transacciones manuales** para integridad
- ✅ **Consultas JOIN** complejas
- ✅ **Validaciones** a nivel de aplicación
- ✅ **Manejo de errores** robusto

## 📈 Casos de Uso

Este proyecto es ideal para aprender:

1. **Fundamentos de SQL** para relaciones entre entidades
2. **Consultas JOIN** complejas
3. **Transacciones** y manejo de integridad
4. **Arquitectura por capas** con SQL puro
5. **Mapeo manual** de resultados SQL a objetos

## 📄 Base de Datos

Cada ejemplo crea su propia base de datos SQLite en la raíz del proyecto:

- 1:1 → `rel-one-to-one.sqlite`
- 1:N → `rel-one-to-many.sqlite`
- N:1 → `rel-many-to-one.sqlite`
- N:M → `rel-many-to-many.sqlite`

## 🎓 Conclusiones

1. **SQL puro te da control total** sobre las consultas
2. **Las transacciones son cruciales** para mantener integridad
3. **Los JOINs son la base** del mapeo relacional
4. **La arquitectura por capas** funciona perfectamente con SQL
5. **Entender estos fundamentos** es esencial antes de usar ORMs

## 📝 Nota

Los ejemplos usan **solo SQL puro** para enseñar los fundamentos del mapeo relacional.

## 🤝 Contribuir

Este es un proyecto educativo. Siéntete libre de experimentar y modificar el código para aprender más sobre el mapeo de datos y SQL puro.
