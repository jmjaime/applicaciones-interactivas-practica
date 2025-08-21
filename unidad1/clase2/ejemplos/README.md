# Ejemplos TypeORM - Clase 2

Este proyecto contiene ejemplos prácticos de TypeORM organizados por temas para complementar la teoría vista en clase.

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Configurar la base de datos
npm run setup

# Cargar datos de ejemplo
npm run seed
```

## 📁 Estructura de Ejemplos

### 1. **Entidades Básicas** (`01-entities/`)

- Definición de entidades
- Decoradores básicos
- Tipos de columnas
- Configuración avanzada

```bash
npm run entities
```

### 2. **Restricciones y Validaciones** (`02-restrictions/`)

- Restricciones de base de datos
- Validaciones con class-validator
- Índices y constrains
- Manejo de errores

```bash
npm run restrictions
```

### 3. **Relaciones** (`03-relations/`)

- One-to-One
- One-to-Many / Many-to-One
- Many-to-Many
- Configuración de relaciones

```bash
npm run relations
```

### 4. **Lazy vs Eager Loading** (`04-lazy-eager/`)

- Comparación entre estrategias
- Ejemplos prácticos
- Cuándo usar cada una

```bash
npm run lazy-eager
```

### 5. **Transacciones** (`05-transactions/`)

- Transacciones manuales
- Transacciones con decoradores
- Manejo de rollback
- Casos de uso comunes

```bash
npm run transactions
```

### 6. **Objetos Embebidos** (`06-embedded/`)

- Definición de objetos embebidos
- Mapeo a múltiples columnas
- Transformadores JSON
- Casos de uso prácticos

```bash
npm run embedded
```

### 7. **Query Builder** (`07-query-builder/`)

- Query Builder básico con select, where, orderBy
- Joins (LEFT, INNER) con relaciones
- Agregaciones (COUNT, AVG, SUM, MAX, MIN)
- Subqueries para comparaciones complejas
- Paginación avanzada
- Consultas dinámicas con filtros opcionales
- Consultas SQL raw cuando es necesario
- Operaciones con fechas
- Expresiones CASE WHEN

```bash
npm run query-builder
```

### 8. **Mapeo de Herencia** (`08-inheritance/`)

- **Table Per Hierarchy (TPH)**: Una tabla para toda la jerarquía
- **Table Per Class (TPC)**: Una tabla por cada clase concreta
- Comparación de estrategias y casos de uso

```bash
# Ejecutar todos los ejemplos de herencia
npm run inheritance

# Ejemplos específicos
npm run table-per-hierarchy    # TPH - Una tabla para toda la jerarquía
npm run table-per-class        # TPC - Una tabla por clase concreta
```

### 9. **Optimización de Performance** (`09-optimization/`)

Técnicas avanzadas para optimizar aplicaciones TypeORM:

- **Problema N+1**: Identificación y solución con JOINs
- **Índices de BD**: Optimización de consultas con índices simples y compuestos
- **SELECT específicos**: Cargar solo campos necesarios
- **Operaciones en lote**: Inserts/updates masivos eficientes
- **Transacciones optimizadas**: Manejo eficiente de transacciones
- **Performance monitoring**: Métricas y alertas de queries lentas
- **Optimización de memoria**: Paginación y streaming para datasets grandes
- **Mejores prácticas**: Lazy loading, FK explícitas, desnormalización estratégica

```bash
npm run optimization
```

### 10. **Migraciones** (`10-migrations/`)

- Creación y ejecución de migraciones
- Estrategias para cambios de esquema en producción
- Ejemplo de migración con claves foráneas

```bash
npm run migrations         # Ejecuta ejemplo principal de migraciones
npm run migrations:fk      # Ejemplo de migraciones con claves foráneas
```

**Resultados del ejemplo:**

- 🔴 Problema N+1: 6 queries → 1 query (mejora 83%)
- ⚡ SELECT específicos: Mejora del 44% en performance
- 🔥 Operaciones en lote: Mejora del 75% en inserts
- 📊 Monitoring automático de queries >100ms

## 🛠️ Comandos Útiles

```bash
# Ejecutar todos los ejemplos
npm run dev

# Limpiar y reconfigurar la base de datos
npm run setup

# Recargar datos de ejemplo
npm run seed

# Compilar TypeScript
npm run build

# Ejecutar versión compilada
npm run start
```

## 📄 Archivos de Base de Datos

Los ejemplos generarán archivos `.sqlite` en el directorio raíz:

- `entities-example.sqlite`
- `restrictions-example.sqlite`
- `relations-example.sqlite`
- `lazy-eager-example.sqlite`
- `transactions-example.sqlite`
- `embedded-example.sqlite`
- `query-builder-example.sqlite`
- `optimization-example.sqlite`

## 🎯 Objetivos de Aprendizaje

Al completar estos ejemplos, podrás:

1. **Configurar** TypeORM desde cero
2. **Definir** entidades con decoradores
3. **Implementar** restricciones y validaciones
4. **Manejar** relaciones entre entidades
5. **Optimizar** consultas y performance
6. **Usar** transacciones correctamente
7. **Aplicar** mejores prácticas de ORM

## 🔍 Cómo Estudiar

1. **Lee el código** de cada ejemplo
2. **Ejecuta** los scripts para ver los resultados
3. **Modifica** los ejemplos para experimentar
4. **Compara** performance entre diferentes enfoques
5. **Prueba** tus propias variaciones

## 📚 Recursos Adicionales

- [Documentación oficial de TypeORM](https://typeorm.io/)
- [Guía de TypeScript](https://www.typescriptlang.org/docs/)
- [Class-validator documentación](https://github.com/typestack/class-validator)

## 🐛 Solución de Problemas

### Error: "Cannot find module 'sqlite3'"

```bash
npm install sqlite3
```

### Error: "Reflect.getMetadata is not a function"

```bash
# Asegúrate de tener la importación en tu archivo principal
import "reflect-metadata";
```

## 🎉 ¡Proyecto Completado!

Con estos 10 ejemplos tienes una base sólida para:

- **Entender TypeORM** desde conceptos básicos hasta avanzados
- **Optimizar performance** de aplicaciones reales
- **Implementar mejores prácticas** de desarrollo
- **Resolver problemas comunes** de ORMs

¡Disfruta aprendiendo TypeORM! 🎉
