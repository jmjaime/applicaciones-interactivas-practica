# Query Builder - Ejemplo Completo

Este ejemplo demuestra el uso completo del **Query Builder** de TypeORM, una herramienta poderosa para construir consultas SQL de forma programática y type-safe.

## 🎯 Características Demostradas

### 1. **Query Builder Básico**
- Selección de campos específicos con `.select()`
- Condiciones WHERE con parámetros seguros
- Ordenamiento múltiple con `.orderBy()` y `.addOrderBy()`
- Limitación de resultados con `.limit()` y `.offset()`

### 2. **Joins**
- **LEFT JOIN**: Incluye registros incluso si no tienen relación
- **INNER JOIN**: Solo registros que tienen relación
- **joinAndSelect**: Carga las relaciones en la consulta

### 3. **Agregaciones**
- **COUNT**: Contar registros
- **AVG**: Promedio de valores
- **SUM**: Suma de valores
- **MAX/MIN**: Valores máximo y mínimo
- **GROUP BY**: Agrupación de resultados
- **HAVING**: Filtros sobre grupos

### 4. **Subqueries**
- Consultas anidadas para comparaciones complejas
- Uso de `.subQuery()` para crear subconsultas
- Comparación con promedios calculados dinámicamente

### 5. **Consultas Complejas**
- Múltiples condiciones con `.andWhere()` y `.orWhere()`
- Búsqueda de texto con LIKE e ILIKE
- Filtros por rangos de fechas y valores numéricos
- Ordenamiento múltiple por diferentes criterios

### 6. **Paginación**
- Conteo total de registros con `.getCount()`
- Paginación con `.skip()` y `.take()`
- Cálculo de páginas totales

### 7. **Consultas Dinámicas**
- Construcción de consultas basada en filtros opcionales
- Aplicación condicional de WHERE clauses
- Búsquedas flexibles con múltiples criterios

### 8. **Consultas Raw**
- Uso de SQL nativo cuando es necesario
- Consultas complejas que aprovechan características específicas del motor de BD
- Integración de funciones SQL avanzadas

### 9. **Funciones de Fecha**
- Filtros por rangos de fechas
- Funciones de fecha específicas del motor de BD
- Cálculos temporales

### 10. **Expresiones CASE WHEN**
- Lógica condicional en consultas
- Clasificación dinámica de datos
- Transformación de valores sobre la marcha

## 🏗️ Modelo de Datos

El ejemplo utiliza un modelo de blog con las siguientes entidades:

- **User**: Usuarios del sistema con roles y estadísticas
- **Post**: Artículos con métricas de engagement
- **Comment**: Comentarios con sistema de aprobación
- **Category**: Categorías para organizar contenido
- **Tag**: Etiquetas para clasificación adicional

## 🚀 Cómo Ejecutar

```bash
# Instalar dependencias
npm install

# Ejecutar el ejemplo
npm run query-builder
```

## 💡 Conceptos Clave

### **Parámetros Seguros**
```typescript
.where("user.age > :minAge", { minAge: 18 })
```
- Previene inyección SQL
- Mejor rendimiento con consultas preparadas

### **Alias de Tabla**
```typescript
.createQueryBuilder("user")
```
- Simplifica las consultas
- Evita ambigüedad en joins

### **Métodos de Resultado**
- `.getMany()`: Múltiples registros
- `.getOne()`: Un registro o null
- `.getCount()`: Solo contar
- `.getRawMany()`: Datos sin entidades
- `.getRawOne()`: Un registro raw

### **Joins Optimizados**
```typescript
.leftJoinAndSelect("user.category", "category")
```
- Carga relaciones en una sola consulta
- Evita el problema N+1

## 📊 Ventajas del Query Builder

1. **Type Safety**: Verificación de tipos en tiempo de compilación
2. **Flexibilidad**: Construcción dinámica de consultas
3. **Rendimiento**: Control total sobre las consultas generadas
4. **Legibilidad**: Código más claro que SQL string
5. **Reutilización**: Consultas modulares y reutilizables

## 🔧 Casos de Uso Comunes

- **Búsquedas Avanzadas**: Filtros múltiples y dinámicos
- **Reportes**: Agregaciones y análisis de datos
- **Paginación**: Listados con paginación eficiente
- **Dashboards**: Estadísticas y métricas complejas
- **APIs**: Endpoints flexibles con múltiples opciones

## 🎓 Mejores Prácticas

1. **Usar parámetros** en lugar de concatenar strings
2. **Limitar resultados** para evitar consultas masivas
3. **Usar índices** en campos de búsqueda frecuente
4. **Prefetch relaciones** cuando sea necesario
5. **Optimizar joins** para evitar consultas innecesarias
6. **Testear consultas** para verificar rendimiento

## 🔍 Queries SQL Generadas

El ejemplo muestra las consultas SQL reales generadas por TypeORM, permitiendo:
- Verificar la eficiencia de las consultas
- Debugging y optimización
- Aprendizaje de SQL avanzado
- Identificación de problemas de rendimiento

## 📚 Recursos Adicionales

- [TypeORM Query Builder Documentation](https://typeorm.io/select-query-builder)
- [SQL Performance Optimization](https://use-the-index-luke.com/)
- [Database Indexing Best Practices](https://www.postgresql.org/docs/current/indexes.html) 