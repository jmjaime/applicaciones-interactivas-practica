# Mapeo Embebido (Embedded Mapping) - SQL Puro

Este proyecto demuestra diferentes tipos de mapeo embebido usando **SQL puro** y `better-sqlite3` para entender los fundamentos del mapeo objeto-relacional.

## Tipos de Mapeo Embebido

### 1. Múltiples Columnas (multiple-columns)

Un objeto embebido que se mapea a múltiples columnas de la tabla principal.

**Ejemplo**: Una dirección embebida en una entidad Usuario que se mapea a columnas como `direccion_calle`, `direccion_ciudad`, `direccion_codigo_postal`.

**Implementación SQL**:

- `multiple-columns/sql/example.ts` - Mapeo manual usando SQL puro

### 2. Lista Separada por Comas (comma-separated)

Una lista de valores que se mapea a un string separado por comas en la base de datos.

**Ejemplo**: Una lista de tags o categorías que se almacena como `"tag1,tag2,tag3"` en una columna de texto.

**Implementación SQL**:

- `comma-separated/sql/example.ts` - Conversión manual usando SQL puro

### 3. Mapeo JSON (json-mapping)

Un objeto que se mapea a un campo JSON en la base de datos.

**Ejemplo**: Metadatos o configuraciones complejas que se almacenan como JSON en una columna específica.

**Implementación SQL**:

- `json-mapping/sql/example.ts` - Funciones JSON de SQLite con mapeo manual

## Instalación

```bash
npm install
```

## Ejecución de Ejemplos

### Ejemplos con SQL puro

```bash
# Ejemplo de múltiples columnas con SQL
npm run multiple-columns-sql

# Ejemplo de lista separada por comas con SQL
npm run comma-separated-sql

# Ejemplo de mapeo JSON con SQL
npm run json-mapping-sql

# Ejecutar todos los ejemplos
npm run mappeo-embebido
```

## Compilación

```bash
npm run build
npm start
```

## Limpiar archivos generados

```bash
npm run clean
```

## 🎯 Objetivos de Aprendizaje

Al completar estos ejemplos, entenderás:

1. **Mapeo de múltiples columnas**: Cómo mapear objetos value a múltiples columnas de BD
2. **Serialización de listas**: Técnicas para almacenar arrays como strings
3. **Almacenamiento JSON**: Uso de columnas JSON en SQLite
4. **Fundamentos del ORM**: Preparación para entender cómo funcionan los ORMs internamente

## 📝 Nota

Los ejemplos usan **solo SQL puro** para enseñar los fundamentos. Para ver implementaciones con TypeORM, consulta la **Clase II** que se enfoca en características avanzadas de ORM.
