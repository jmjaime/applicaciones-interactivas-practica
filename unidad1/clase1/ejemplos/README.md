# Ejemplos Clase I – Mapeo de datos (SQL)

Orden de ejecución (de simple a avanzado):

1. Mapeo básico – `src/01-mapeo-basico/example.ts`
2. Mappeo embebido – `src/02-mappeo-embebido/*`
3. Mappeo herencia – `src/03-mappeo-herencia/*`
4. Mappeo relaciones – `src/04-mappeo-relaciones/*`

Scripts:

```
npm run mapeo-basico-sql
npm run mappeo-embebido
npm run mappeo-herencia
npm run mappeo-relaciones
npm run all-sql
```

# Ejemplos de Mapeo de Datos con SQL Puro

Este proyecto consolidado incluye **tres tipos principales de mapeo de datos** en bases de datos relacionales, utilizando **exclusivamente SQL puro**. Los ejemplos están organizados de forma educativa para demostrar los fundamentos del mapeo objeto-relacional a nivel de base de datos.

## 📁 Estructura del Proyecto

```
src/
├── 01-mapeo-basico/             # Mapeo más simple (clase → tabla)
├── 02-mappeo-embebido/          # Mapeo de datos embebidos
│   ├── multiple-columns/        # Múltiples columnas → objeto
│   ├── comma-separated/         # Valores separados por coma
│   ├── json-mapping/            # Datos JSON
│   └── README.md                # Documentación
├── 03-mappeo-herencia/          # Mapeo de herencia
│   ├── table-per-hierarchy/     # Tabla por jerarquía
│   ├── table-per-class/         # Tabla por clase
│   ├── joined-table/            # Tabla unida
│   └── README.md                # Documentación
├── 04-mappeo-relaciones/        # Mapeo de relaciones
│   ├── books/                   # Gestión de libros (SQL)
│   ├── compare-implementations.ts
│   ├── inspect-db.ts
│   ├── sql-client.ts
│   └── README.md                # Documentación
└── index.ts                     # Punto de entrada principal
```

## 🚀 Instalación y Configuración

```bash
# Instalar dependencias
npm install

# Ejecutar todos los ejemplos
npm run all-mappeo

# Ver información del proyecto
npm run dev
```

## 📚 Tipos de Mapeo Incluidos

### 1. 🗂️ Mappeo Embebido (`01-mappeo-embebido/`)

Demuestra cómo mapear múltiples columnas o datos complejos a objetos embebidos:

- **Multiple Columns**: Mapea varias columnas de BD a un objeto value
- **Comma Separated**: Maneja valores separados por coma como arrays
- **JSON Mapping**: Almacena y recupera datos JSON complejos

```bash
# Ejecutar todos los ejemplos de mappeo embebido
npm run mappeo-embebido

# Ejemplos específicos
npm run multiple-columns-sql  # Mapeo de múltiples columnas
npm run comma-separated-sql   # Valores separados por coma
npm run json-mapping-sql      # Datos JSON
```

### 2. 🏗️ Mappeo de Herencia (`02-mappeo-herencia/`)

Implementa las tres estrategias principales de mapeo de herencia **usando SQL puro**:

- **Table Per Hierarchy (TPH)**: Una tabla para toda la jerarquía
- **Table Per Class (TPC)**: Una tabla por cada clase concreta
- **Joined Table (JT)**: Tablas separadas unidas por joins

```bash
# Ejecutar todos los ejemplos de mappeo de herencia (SQL puro)
npm run mappeo-herencia

# Ejemplos específicos (SQL puro)
npm run table-per-hierarchy-sql   # TPH con SQL
npm run table-per-class-sql       # TPC con SQL
npm run joined-table-sql          # JT con SQL
```

> **📝 Nota**: Los ejemplos de herencia con TypeORM están en la **Clase II** que se enfoca exclusivamente en ORM.

### 3. 🔗 Mappeo de Relaciones (`03-mappeo-relaciones/`)

Demuestra el mapeo de relaciones complejas entre entidades:

- **Relaciones One-to-Many**: Autor → Libros
- **Relaciones Many-to-Many**: Libros ↔ Autores
- **Relaciones complejas**: Libros → Reseñas

```bash
# Ejecutar todos los ejemplos de mappeo de relaciones
npm run mappeo-relaciones

# Ejemplos específicos
npm run one-to-one-sql   # Relación 1:1 (usuario ↔ perfil)
npm run one-to-many-sql  # Relación 1:N (autor → libros)
npm run many-to-one-sql  # Relación N:1 (libro → autor)
npm run many-to-many-sql # Relación N:M (curso ↔ estudiante)
```

## 🎯 Scripts Principales

### Scripts por Categoría

```bash
# Ejecutar por tipo de mappeo
npm run mappeo-embebido      # Todos los ejemplos embebidos
npm run mappeo-herencia      # Todos los ejemplos de herencia
npm run mappeo-relaciones    # Todos los ejemplos de relaciones

# Ejecutar todos los ejemplos
npm run all-sql              # Todos los ejemplos con SQL puro
```

### Scripts de Utilidad

```bash
npm run clean               # Limpiar archivos generados
npm run build               # Compilar TypeScript
npm run dev:watch           # Modo desarrollo con watch
```

## 🎓 Objetivos Educativos

### Mappeo Embebido

- Aprender a mapear datos complejos en columnas simples usando SQL puro
- Entender las ventajas y desventajas de cada estrategia
- Dominar las técnicas fundamentales antes de usar ORMs

### Mappeo de Herencia

- Conocer las tres estrategias principales de mapeo de herencia
- Entender cuándo usar cada estrategia
- Implementar cada patrón usando solo SQL para comprender los fundamentos

### Mappeo de Relaciones

- Dominar las relaciones entre entidades usando SQL nativo
- Entender las consultas JOIN y subconsultas
- Aprender los fundamentos antes de abstracciones ORM

## 🛠️ Tecnologías Utilizadas

- **TypeScript**: Lenguaje principal
- **SQL Puro**: Consultas y operaciones de base de datos nativas
- **SQLite**: Base de datos embebida
- **better-sqlite3**: Driver SQLite optimizado
- **Node.js**: Entorno de ejecución

## 📊 Bases de Datos Generadas

Los ejemplos generan diferentes archivos SQLite:

```
├── multiple-columns-sql.sqlite     # Mapeo múltiples columnas (SQL)
├── comma-separated-sql.sqlite      # Valores separados por coma (SQL)
├── json-mapping-sql.sqlite         # Datos JSON (SQL)
├── table-per-hierarchy-sql.sqlite  # TPH con SQL puro
├── table-per-class-sql.sqlite      # TPC con SQL puro
├── joined-table-sql.sqlite         # JT con SQL puro
└── books-create-raw.sqlite         # Libros con SQL puro
```

## 🔍 Exploración de Datos

```bash
# Inspeccionar base de datos
npm run inspect-db

# Cliente SQL interactivo
npm run sql-client

# Comparar implementaciones
npm run compare
```

## 📖 Documentación Adicional

Cada carpeta de ejemplos incluye su propio README.md con:

- Explicación detallada del concepto
- Diagramas de base de datos
- Ejemplos de código comentados
- Casos de uso recomendados

## 🎯 Orden de Aprendizaje Recomendado

1. **Mappeo Embebido**: Conceptos básicos de mapeo
2. **Mappeo de Herencia**: Estrategias avanzadas
3. **Mappeo de Relaciones**: Casos complejos del mundo real

## 🤝 Contribución

Este proyecto es parte del material educativo de la asignatura. Las mejoras y sugerencias son bienvenidas.

---

**¡Comienza explorando con `npm run dev` para ver todas las opciones disponibles!**
