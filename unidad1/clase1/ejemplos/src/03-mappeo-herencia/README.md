# Mapeo de Herencia en Bases de Datos - SQL Puro

Este proyecto demuestra las **tres estrategias principales** para mapear herencia en bases de datos relacionales usando **SQL puro** y `better-sqlite3`.

## 🎯 Objetivos de Aprendizaje

Al completar estos ejemplos, entenderás:

1. **Fundamentos del mapeo de herencia** antes de usar ORMs
2. **Estrategias de base de datos** para representar jerarquías de clases
3. **Trade-offs** entre normalización, performance y complejidad
4. **Técnicas SQL** para consultas polimórficas y específicas

## 🏗️ Estrategias de Mapeo de Herencia

### 1. Table Per Hierarchy (TPH)

- **Una sola tabla** contiene todas las clases de la jerarquía
- Usa un **campo discriminador** para identificar el tipo
- Campos específicos pueden tener valores **NULL**

### 2. Table Per Class (TPC) - Table Per Concrete

- **Una tabla independiente** por cada clase concreta
- Cada tabla contiene **todos los campos** (base + específicos)
- Sin relaciones entre tablas
- Tablas completamente separadas

### 3. Joined Table (Table Per Subclass)

- **Tabla base** con campos comunes
- **Tablas específicas** con mismo ID (PK = FK)
- **JOINs** para obtener datos completos
- Normalización completa

## 📊 Comparación de Estrategias

| Aspecto                    | TPH      | TPC                     | Joined Table              |
| -------------------------- | -------- | ----------------------- | ------------------------- |
| **Número de tablas**       | 1        | n                       | n+1                       |
| **Campos NULL**            | Muchos   | Ninguno                 | Ninguno                   |
| **JOINs requeridos**       | Ninguno  | Ninguno                 | Sí (para datos completos) |
| **Consultas polimórficas** | Simples  | UNIONs complejos        | Simples                   |
| **Consultas específicas**  | Filtros  | Directas                | JOINs                     |
| **Integridad referencial** | Limitada | Por tabla               | Completa                  |
| **Rendimiento**            | Bueno    | Excelente (específicas) | Medio                     |
| **Mantenimiento**          | Fácil    | Complejo                | Medio                     |

## 🔧 Instalación

```bash
npm install
```

## 🚀 Ejemplos de Uso

### Ejecutar ejemplos con SQL puro

```bash
# Table Per Hierarchy
npm run table-per-hierarchy-sql

# Table Per Class
npm run table-per-class-sql

# Joined Table
npm run joined-table-sql

# Ejecutar todos los ejemplos
npm run mappeo-herencia
```

## 📋 Esquemas de Ejemplo

### Table Per Hierarchy (TPH)

```sql
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  type VARCHAR(20) NOT NULL,           -- Discriminador
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  hire_date DATE NOT NULL,

  -- Campos específicos (pueden ser NULL)
  programming_languages JSON,          -- Solo para Developer
  experience_years INTEGER,            -- Solo para Developer
  framework VARCHAR(100),              -- Solo para Developer
  department VARCHAR(100),             -- Solo para Manager
  team_size INTEGER,                   -- Solo para Manager
  budget DECIMAL(12,2),                -- Solo para Manager
  design_tools JSON,                   -- Solo para Designer
  specialization VARCHAR(100),         -- Solo para Designer
  portfolio_url VARCHAR(500),          -- Solo para Designer
  territory VARCHAR(100),              -- Solo para SalesRep
  commission_rate DECIMAL(5,4),        -- Solo para SalesRep
  sales_target DECIMAL(12,2)           -- Solo para SalesRep
);
```

### Table Per Class (TPC) - Table Per Concrete

```sql
-- Tablas completamente independientes
CREATE TABLE developers (
  id INTEGER PRIMARY KEY,
  -- Campos base (duplicados)
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  hire_date DATE NOT NULL,
  -- Campos específicos
  programming_languages JSON NOT NULL,
  experience_years INTEGER NOT NULL,
  framework VARCHAR(100)
);

CREATE TABLE managers (
  id INTEGER PRIMARY KEY,
  -- Campos base (duplicados)
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  hire_date DATE NOT NULL,
  -- Campos específicos
  department VARCHAR(100) NOT NULL,
  team_size INTEGER NOT NULL,
  budget DECIMAL(12,2) NOT NULL
);
```

### Joined Table (Table Per Subclass)

```sql
-- Tabla base con campos comunes
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  type VARCHAR(20) NOT NULL,              -- Discriminador
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  hire_date DATE NOT NULL
);

-- Tablas específicas con FK a la tabla base (mismo ID)
CREATE TABLE developers (
  id INTEGER PRIMARY KEY,
  programming_languages JSON NOT NULL,
  experience_years INTEGER NOT NULL,
  framework VARCHAR(100),
  FOREIGN KEY (id) REFERENCES employees(id)
);

CREATE TABLE managers (
  id INTEGER PRIMARY KEY,
  department VARCHAR(100) NOT NULL,
  team_size INTEGER NOT NULL,
  budget DECIMAL(12,2) NOT NULL,
  FOREIGN KEY (id) REFERENCES employees(id)
);
```

## 🎯 Cuándo Usar Cada Estrategia

### Use TPH cuando:

- La jerarquía es simple y estable
- Necesita consultas polimórficas frecuentes
- No le importan los campos NULL
- Prioriza simplicidad

### Use TPC cuando:

- Prioriza el rendimiento de consultas específicas
- Las clases tienen pocos campos en común
- Raramente necesita consultas polimórficas
- Puede manejar la duplicación de esquema

### Use Joined Table cuando:

- Quiere evitar campos NULL
- Necesita consultas polimórficas frecuentes
- La jerarquía es moderadamente compleja
- Balance entre normalización y rendimiento
- Prioriza integridad referencial

## 📁 Estructura del Proyecto

```
src/
├── common/
│   ├── entities.ts          # Clases base TypeScript
│   └── sample-data.ts       # Datos de ejemplo
├── table-per-hierarchy/
│   └── sql/example.ts       # Implementación SQL puro
├── table-per-class/
│   └── sql/example.ts       # Implementación SQL puro
├── joined-table/
│   └── sql/example.ts       # Implementación SQL puro
└── index.ts                 # Punto de entrada principal
```

## 🧪 Dominio de Ejemplo

El proyecto usa una jerarquía de empleados:

- **Employee** (base)
  - firstName, lastName, email, salary, hireDate
- **Developer** extends Employee
  - programmingLanguages[], experienceYears, framework
- **Manager** extends Employee
  - department, teamSize, budget
- **Designer** extends Employee
  - designTools[], specialization, portfolioUrl
- **SalesRep** extends Employee
  - territory, commissionRate, salesTarget

## 🔍 Scripts de Utilidad

```bash
npm run build          # Compilar TypeScript
npm run clean          # Limpiar archivos generados
npm run dev            # Ejecutar índice principal
```

## 📚 Referencias

- [Martin Fowler - Patterns of Enterprise Application Architecture](https://martinfowler.com/eaaCatalog/)
- [SQL Antipatterns - Bill Karwin](https://pragprog.com/titles/bksqla/sql-antipatterns/)
- [Database Design for Mere Mortals](https://www.amazon.com/Database-Design-Mere-Mortals-Hands/dp/0321884493)

## 📝 Nota

Los ejemplos usan **solo SQL puro** para enseñar los fundamentos del mapeo de herencia. Para ver implementaciones con TypeORM, consulta la **Clase II** que se enfoca en características avanzadas de ORM.

## 🎓 Conclusiones

1. **Cada estrategia tiene sus casos de uso** específicos
2. **SQL puro te da control total** sobre la implementación
3. **Entender estos fundamentos** es crucial antes de usar ORMs
4. **Las decisiones de diseño** afectan performance y mantenimiento
5. **No hay una estrategia perfecta**: todo depende del contexto
