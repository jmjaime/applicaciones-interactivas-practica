# Ejercicios Clase 1: Mapeo con SQL Plano

**UADE - Aplicaciones Interactivas**  
_Clase 1: Mapeo Objeto-Relacional_

## 📋 Descripción

Ejercicios prácticos para aprender los conceptos fundamentales de **persistencia y mapeo de datos usando SQL plano**. Los ejercicios están organizados en dos bloques principales:

1. **Mapeo de Herencia**: Implementación de jerarquías de clases en bases de datos relacionales
2. **Mapeo de Relaciones**: Manejo de relaciones entre entidades (1:1, 1:N, N:M)

## 🏗️ Estructura del Proyecto

```
ejercicios/
├── src/
│   ├── index.ts
│   ├── 01-herencia/
│   │   ├── table-per-hierarchy/
│   │   │   ├── exercise.ts
│   │   │   └── exercise.spec.ts
│   │   ├── table-per-type/
│   │   │   ├── exercise.ts
│   │   │   └── exercise.spec.ts
│   │   └── table-per-class/
│   │       ├── exercise.ts
│   │       └── exercise.spec.ts
│   └── 02-relaciones/
│       ├── one-to-one/
│       │   ├── exercise.ts
│       │   └── exercise.spec.ts
│       ├── one-to-many/
│       │   ├── exercise.ts
│       │   └── exercise.spec.ts
│       └── many-to-many/
│           ├── exercise.ts
│           └── exercise.spec.ts
├── package.json
├── tsconfig.json
├── jest.config.ts
├── README.md
└── QUICKSTART.md
```

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js 16+
- npm o yarn

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar menú interactivo
npm run dev
```

## ✅ Tests (Jest)

Los ejercicios incluyen tests en Jest (estilo `describe`/`it`) ubicados junto a cada ejercicio con sufijo `exercise.spec.ts`.

### Ejecutar todos los tests

```bash
npm test
```

### Ejecutar un test específico

```bash
# Por archivo
npm run test -- src/01-herencia/table-per-hierarchy/exercise.spec.ts

# Por nombre de test (pattern)
npm run test -- -t "TPH (vehicles)"
```

### Qué validan los tests

- Herencia (TPH): compara `getAll()`, `getByType("Car")` y `filterByBrand(...)` contra las cantidades exactas del arreglo `vehicles` en `exercise.ts`.
- Herencia (TPT): compara `getAll()`, `getByType("Developer")` y `filterByDepartment(...)` contra `employees` de `exercise.ts`.
- Herencia (TPC): compara `getAll()`, `getByType("Book")` y `filterByCategory(...)` contra `sampleBooks` de `exercise.ts`.
- Relaciones (1:1): valida que `getAll()` y `getByActive(true)` devuelvan registros y que `filterByCountry(...)` funcione.
- Relaciones (1:N): valida que `getAllOrders()` devuelva registros y que los filtros por status y activos funcionen.
- Relaciones (N:M): compara `getAllEnrollments()` y filtros (`getEnrollmentsByCourse(...)`, `filterStudentsByProgram(...)`) contra las cantidades exactas de `enrollments`, `courses` y `students`.

Si los métodos `createSchema()`, `insertData()` y las consultas no están implementados, los tests fallarán. Implementá el SQL en cada `exercise.ts` para que pasen.

### Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Menú interactivo principal
npm run build           # Compilar TypeScript
npm run clean           # Limpiar archivos generados

# Ejercicios de Herencia
npm run herencia        # Ejecutar todos los ejercicios de herencia
npm run tph-sql         # Solo Table-Per-Hierarchy
npm run tpt-sql         # Solo Table-Per-Type
npm run tpc-sql         # Solo Table-Per-Class

# Ejercicios de Relaciones
npm run relaciones      # Ejecutar todos los ejercicios de relaciones
npm run one-to-one-sql  # Solo relación 1:1
npm run one-to-many-sql # Solo relación 1:N
npm run many-to-many-sql # Solo relación N:M

# Ejecutar todo
npm run all-sql         # Todos los ejercicios
```

## 📚 Contenido de los Ejercicios

### 1. Mapeo de Herencia

#### Table-Per-Hierarchy (TPH)

- **Concepto**: Una sola tabla para toda la jerarquía
- **Implementación**: Vehículos (Car, Motorcycle, Truck)
- **Base de datos**: `ejercicio-tph.sqlite`
- **Características**:
  - Campo discriminador `vehicle_type`
  - Campos comunes y específicos en una tabla
  - Consultas rápidas sin JOINs
  - Campos NULL para tipos específicos

#### Table-Per-Type (TPT)

- **Concepto**: Tabla base + tablas específicas por tipo
- **Implementación**: Empleados (Developer, Manager, Salesperson)
- **Base de datos**: `ejercicio-tpt.sqlite`
- **Características**:
  - Tabla `employee` con campos comunes
  - Tablas específicas con relaciones FK
  - Integridad referencial completa
  - Requiere JOINs para datos completos

#### Table-Per-Class (TPC)

- **Concepto**: Tabla separada por cada clase concreta
- **Implementación**: Productos (Book, Electronics, Clothing)
- **Base de datos**: `ejercicio-tpc.sqlite`
- **Características**:
  - Tabla independiente por tipo
  - Duplicación de campos comunes
  - Consultas UNION para polimorfismo
  - Sin relaciones FK entre tipos

### 2. Mapeo de Relaciones

#### One-to-One (1:1)

- **Concepto**: Cada registro se relaciona con exactamente uno
- **Implementación**: Usuario ↔ Perfil
- **Base de datos**: `ejercicio-one-to-one.sqlite`
- **Características**:
  - FK con constraint UNIQUE
  - Separación de datos (auth vs profile)
  - Integridad referencial con CASCADE
  - Manejo de datos JSON

#### One-to-Many (1:N)

- **Concepto**: Un registro se relaciona con múltiples
- **Implementación**: Cliente → Órdenes → Items
- **Base de datos**: `ejercicio-one-to-many.sqlite`
- **Características**:
  - FK en el lado "Many"
  - Agregaciones y estadísticas
  - Relaciones anidadas (1:N:N)
  - Análisis temporal de datos

#### Many-to-Many (N:M)

- **Concepto**: Múltiples registros se relacionan con múltiples
- **Implementación**: Estudiantes ↔ Cursos
- **Base de datos**: `ejercicio-many-to-many.sqlite`
- **Características**:
  - Tabla junction (enrollment)
  - Datos adicionales en la relación
  - Análisis bidireccional
  - Detección de conflictos

## 🔧 Tecnologías Utilizadas

### Base de Datos

- **SQLite**: Base de datos embebida
- **better-sqlite3**: Driver optimizado para Node.js
- **SQL plano**: Consultas directas sin ORM

### Lenguajes y Herramientas

- **TypeScript**: Tipado estático
- **Node.js**: Runtime de JavaScript
- **readline-sync**: Interfaz interactiva

### Características Técnicas

- **Integridad referencial**: Constraints FK
- **Índices**: Optimización de consultas
- **Transacciones**: Operaciones atómicas
- **Validaciones**: CHECK constraints
- **Datos JSON**: Almacenamiento flexible

## 📊 Ejemplos de Consultas

### Consultas de Herencia

```sql
-- TPH: Todos los vehículos
SELECT vehicle_type, brand, model, price
FROM vehicles
ORDER BY price DESC;

-- TPT: Desarrolladores con experiencia
SELECT e.first_name, e.last_name, d.experience_years
FROM employee e
JOIN developer d ON e.id = d.employee_id;

-- TPC: Productos caros en todas las categorías
SELECT 'Book' as type, name, price FROM book WHERE price > 100
UNION ALL
SELECT 'Electronics' as type, name, price FROM electronics WHERE price > 100;
```

### Consultas de Relaciones

```sql
-- 1:1: Usuario con perfil
SELECT u.username, p.first_name, p.last_name
FROM user u
JOIN user_profile p ON u.id = p.user_id;

-- 1:N: Cliente con resumen de órdenes
SELECT c.company_name, COUNT(o.id) as orders, SUM(o.total_amount) as sales
FROM customer c
LEFT JOIN purchase_order o ON c.id = o.customer_id
GROUP BY c.id;

-- N:M: Estudiantes por curso
SELECT c.course_name, COUNT(e.student_id) as enrolled
FROM course c
LEFT JOIN enrollment e ON c.id = e.course_id
GROUP BY c.id;
```

## 🎯 Objetivos de Aprendizaje

### Conceptos Teóricos

- ✅ Mapeo objeto-relacional sin ORM
- ✅ Patrones de herencia en bases de datos
- ✅ Tipos de relaciones y sus implementaciones
- ✅ Integridad referencial y constraints
- ✅ Normalización vs desnormalización

### Habilidades Prácticas

- ✅ Diseño de esquemas de base de datos
- ✅ Escritura de consultas SQL complejas
- ✅ Manejo de transacciones y integridad
- ✅ Optimización con índices
- ✅ Análisis de rendimiento y trade-offs

## 🤝 Contribución

Este proyecto es parte del material académico de UADE. Para sugerencias o mejoras:

1. Revisar el código de los ejercicios
2. Probar las diferentes implementaciones
3. Comparar rendimiento entre enfoques
4. Documentar hallazgos y observaciones

## 📖 Recursos Adicionales

- [Documentación SQLite](https://sqlite.org/docs.html)
- [better-sqlite3 API](https://github.com/JoshuaWise/better-sqlite3)
- [SQL Tutorial](https://www.w3schools.com/sql/)
- [Database Design Patterns](https://www.martinfowler.com/articles/dblogic.html)

## 📝 Notas

- Los ejercicios están diseñados para **SQLite** por simplicidad
- Todos los ejemplos usan **SQL plano** (no ORM)
- Las bases de datos se crean automáticamente al ejecutar
- Los datos de ejemplo son generados para cada ejercicio
- Se incluyen análisis y conclusiones en cada implementación
