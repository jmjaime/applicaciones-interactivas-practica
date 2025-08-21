# Ejercicio 9: Optimización de Performance en TypeORM

## 🎯 Objetivo

Dominar las **técnicas avanzadas de optimización** para mejorar el rendimiento de aplicaciones TypeORM en producción, desde la identificación de problemas comunes hasta la implementación de soluciones empresariales.

## 📋 Conceptos Cubiertos

### 1. Identificación y Resolución de Problemas

- **Problema N+1** y sus soluciones
- **Consultas ineficientes** y optimización
- **Monitoring de performance** en tiempo real
- **Detección de queries lentas**

### 2. Optimización de Consultas

- **Índices estratégicos** simples y compuestos
- **SELECT específicos** para reducir transferencia
- **JOINs optimizados** con campos selectivos
- **Agregaciones eficientes**

### 3. Operaciones en Lote

- **Inserción masiva** de datos
- **Actualizaciones en lote**
- **Eliminación masiva**
- **Operaciones Upsert**

### 4. Transacciones Optimizadas

- **Transacciones atómicas** para operaciones complejas
- **Manejo de errores** y rollback
- **Optimización de bloqueos**

### 5. Técnicas de Desnormalización

- **Campos calculados** para evitar agregaciones
- **Información duplicada** estratégica
- **Mantenimiento de estadísticas**

### 6. Paginación Eficiente

- **Paginación básica** con LIMIT/OFFSET
- **Paginación con cursor** para datasets grandes
- **Paginación con agregación**

## 🏗️ Arquitectura del Sistema

### Modelo de Datos E-commerce Optimizado

```
👤 User (usuarios)
├── 📦 Order (pedidos) [1:N]
│   └── 📋 OrderItem (items) [1:N]
│       └── 🛍️ Product (productos) [N:1]
│           └── 📂 Category (categorías) [N:1]
├── ⭐ Review (reseñas) [1:N]
│   └── 🛍️ Product (productos) [N:1]
```

### Índices Estratégicos Implementados

#### User

- `idx_user_email` - Búsquedas por email
- `idx_user_status_created` - Filtrado por estado y fecha
- `idx_user_last_login` - Ordenamiento por último login
- `idx_user_role_status` - Consultas por rol y estado
- `idx_user_total_spent` - Ordenamiento por gasto total

#### Product

- `idx_product_name` - Búsqueda por nombre
- `idx_product_category_price` - Consultas por categoría y precio
- `idx_product_category_rating` - Consultas por categoría y rating
- `idx_product_active_stock` - Productos disponibles
- `idx_product_sales_popularity` - Productos populares

#### Order

- `idx_order_user_status` - Pedidos por usuario y estado
- `idx_order_status_date` - Consultas por estado y fecha
- `idx_order_tracking` - Búsqueda por tracking

### Campos Desnormalizados

#### Estadísticas de Usuario

```typescript
@Column({ default: 0 })
totalSpent!: number; // Evita SUM() en orders

@Column({ default: 0 })
orderCount!: number; // Evita COUNT() en orders
```

#### Estadísticas de Producto

```typescript
@Column({ default: 0 })
totalSales!: number; // Evita SUM() en order_items

@Column({ default: 0 })
reviewCount!: number; // Evita COUNT() en reviews
```

#### Información Duplicada en OrderItem

```typescript
@Column({ length: 300 })
productName!: string; // Evita JOIN con products

@Column({ length: 50 })
productSku!: string; // Histórico al momento de compra
```

## 🚀 Ejecución

### Prerequisitos

```bash
npm install
```

### Ejecutar Tests del Ejercicio

Implementá en `exercise.ts` y corré los tests:

```bash
npm run test:ej09
```

## 🔴 Problema N+1 Detallado

### ❌ Problema Identificado

```typescript
// Esto ejecuta 1 + N queries (muy ineficiente)
const users = await userRepo.find({ take: 10 });
for (const user of users) {
  const orders = await user.orders; // Query adicional por usuario
}
// Total: 1 query inicial + 10 queries de pedidos = 11 queries
```

### ✅ Solución 1: Eager Loading con JOIN

```typescript
// Una sola query optimizada
const usersWithOrders = await userRepo
  .createQueryBuilder("user")
  .leftJoinAndSelect("user.orders", "order")
  .take(10)
  .getMany();
// Total: 1 query con JOIN
```

### ✅ Solución 2: Agregación Específica

```typescript
// Cuando solo necesitas estadísticas
const userStats = await userRepo
  .createQueryBuilder("user")
  .leftJoin("user.orders", "order")
  .select("user.id", "userId")
  .addSelect("COUNT(order.id)", "orderCount")
  .addSelect("SUM(order.total)", "totalSpent")
  .groupBy("user.id")
  .getRawMany();
// Total: 1 query con agregación
```

## 📈 Optimización con Índices

### Índices Simples

```typescript
@Index("idx_product_name", ["name"])        // Búsquedas por nombre
@Index("idx_product_price", ["price"])      // Ordenamiento por precio
@Index("idx_product_created", ["createdAt"]) // Ordenamiento por fecha
```

### Índices Compuestos

```typescript
@Index("idx_product_category_price", ["categoryId", "price"])
// Optimiza: WHERE categoryId = ? AND price > ?
// Optimiza: WHERE categoryId = ? ORDER BY price
```

### Consultas Optimizadas

```typescript
// Usa índice compuesto eficientemente
const products = await productRepo
  .createQueryBuilder("product")
  .where("product.categoryId = :categoryId", { categoryId: 1 })
  .andWhere("product.price > :minPrice", { minPrice: 100 })
  .orderBy("product.price", "DESC")
  .getMany();
```

## ⚡ Operaciones en Lote

### Inserción en Lote

```typescript
// ❌ Ineficiente - N queries
for (const productData of products) {
  await productRepo.save(productData);
}

// ✅ Eficiente - 1 query
await productRepo.save(products);
```

### Actualización en Lote

```typescript
// Actualizar múltiples registros
const result = await productRepo
  .createQueryBuilder()
  .update(Product)
  .set({ price: () => "price * 1.1" })
  .where("categoryId = :categoryId", { categoryId: 1 })
  .execute();
```

### Operación Upsert

```typescript
await userRepo
  .createQueryBuilder()
  .insert()
  .into(User)
  .values({
    email: "usuario@ejemplo.com",
    firstName: "Juan",
    lastName: "Pérez",
  })
  .orUpdate(["firstName", "lastName"], ["email"])
  .execute();
```

## 💰 Transacciones Optimizadas

### Transacción Completa

```typescript
await dataSource.transaction(async (manager) => {
  // 1. Crear pedido
  const order = await manager.save(Order, orderData);

  // 2. Crear items y actualizar stock
  for (const itemData of items) {
    const product = await manager.findOne(Product, {
      where: { id: itemData.productId },
    });

    if (product.stock < itemData.quantity) {
      throw new Error("Stock insuficiente");
    }

    // Actualizar stock
    await manager.update(Product, itemData.productId, {
      stock: product.stock - itemData.quantity,
    });

    // Crear item
    await manager.save(OrderItem, orderItem);
  }

  // 3. Actualizar estadísticas del usuario
  await manager.increment(User, { id: order.userId }, "orderCount", 1);
  await manager.increment(User, { id: order.userId }, "totalSpent", total);
});
```

## 📊 Monitoring de Performance

### Configuración del DataSource

```typescript
const dataSource = new DataSource({
  type: "postgres",
  logging: ["query", "error"],
  maxQueryExecutionTime: 1000, // Log queries > 1s

  // Pool de conexiones
  extra: {
    max: 20, // Conexiones máximas
    min: 5, // Conexiones mínimas
    acquire: 30000, // Timeout para obtener conexión
    idle: 10000, // Timeout de inactividad
  },
});
```

### Clase de Monitoring

```typescript
class PerformanceMonitor {
  static async measure<T>(operation: string, fn: () => Promise<T>): Promise<T> {
    const start = Date.now();
    const result = await fn();
    const duration = Date.now() - start;

    if (duration > 100) {
      console.warn(`⚠️ Operación lenta: ${operation} tomó ${duration}ms`);
    }

    return result;
  }
}
```

## 📄 Paginación Eficiente

### Paginación Básica

```typescript
const [items, total] = await repository.findAndCount({
  skip: (page - 1) * pageSize,
  take: pageSize,
  order: { createdAt: "DESC" },
});
```

### Paginación con Cursor (Recomendada)

```typescript
const items = await repository
  .createQueryBuilder("item")
  .where("item.id > :cursor", { cursor: lastId })
  .orderBy("item.id", "ASC")
  .take(pageSize)
  .getMany();
```

## 🧠 Técnicas de Desnormalización

### Campos Calculados

```typescript
@Entity()
class User {
  @Column({ default: 0 })
  totalSpent!: number; // Evita SUM() queries

  @Column({ default: 0 })
  orderCount!: number; // Evita COUNT() queries
}
```

### Información Duplicada Estratégica

```typescript
@Entity()
class OrderItem {
  @Column()
  productName!: string; // Duplicado para evitar JOINs

  @Column()
  productSku!: string; // Histórico al momento de compra
}
```

### Mantenimiento de Estadísticas

```typescript
// Actualizar estadísticas cuando cambian los datos
async function updateUserStats(userId: number) {
  const stats = await orderRepo
    .createQueryBuilder("order")
    .select("COUNT(order.id)", "orderCount")
    .addSelect("SUM(order.total)", "totalSpent")
    .where("order.userId = :userId", { userId })
    .getRawOne();

  await userRepo.update(userId, {
    orderCount: stats.orderCount,
    totalSpent: stats.totalSpent,
  });
}
```

## 🔧 Configuración de Producción

### Pool de Conexiones

```typescript
{
  type: "postgres",
  host: "localhost",
  port: 5432,

  // Pool configuration
  poolSize: 20,                    // Conexiones concurrentes
  acquireTimeout: 60000,           // Timeout para obtener conexión
  timeout: 60000,                  // Query timeout

  // Connection limits
  extra: {
    max: 20,
    min: 5,
    acquire: 30000,
    idle: 10000
  }
}
```

### Cache de Consultas

```typescript
// Cache a nivel de aplicación
const cachedResult = await repository.find({
  cache: {
    id: "products_active",
    milliseconds: 300000, // 5 minutos
  },
});
```

## 📊 Métricas de Performance

### Estadísticas de Consultas

```typescript
// Obtener consultas más lentas
const slowQueries = await dataSource.query(`
  SELECT query, calls, total_time, mean_time
  FROM pg_stat_statements
  WHERE mean_time > 1000
  ORDER BY mean_time DESC
  LIMIT 10;
`);
```

### Análisis de Índices

```typescript
// Verificar uso de índices
const indexUsage = await dataSource.query(`
  SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
  FROM pg_stat_user_indexes
  WHERE idx_scan = 0
  ORDER BY schemaname, tablename;
`);
```

## 🎓 Ejercicios Propuestos

### Ejercicio 1: Optimización de Consultas

1. Identificar 3 consultas lentas en tu aplicación
2. Crear índices apropiados
3. Medir la mejora de performance

### Ejercicio 2: Implementar Cache

1. Implementar cache Redis para consultas frecuentes
2. Configurar invalidación automática
3. Medir hit ratio del cache

### Ejercicio 3: Análisis de N+1

1. Encontrar problemas N+1 en relaciones complejas
2. Implementar soluciones con DataLoader
3. Comparar performance antes y después

### Ejercicio 4: Operaciones en Lote

1. Implementar importación masiva de datos
2. Optimizar con transacciones
3. Agregar progress tracking

## 🔍 Herramientas de Debugging

### Query Logging

```typescript
// Habilitar logging detallado
{
  logging: ["query", "error", "warn"],
  logger: "advanced-console",
  maxQueryExecutionTime: 1000
}
```

### Análisis de Explain

```typescript
const result = await dataSource.query(
  `
  EXPLAIN ANALYZE
  SELECT * FROM products 
  WHERE category_id = $1 AND price > $2
  ORDER BY price DESC
  LIMIT 10;
`,
  [1, 100]
);
```

## 📚 Recursos Adicionales

- [TypeORM Performance Tips](https://typeorm.io/performance-tips)
- [Database Indexing Best Practices](https://use-the-index-luke.com/)
- [PostgreSQL Query Performance](https://www.postgresql.org/docs/current/performance-tips.html)
- [Node.js Performance Monitoring](https://nodejs.org/en/docs/guides/simple-profiling/)

## 🎯 Mejores Prácticas

### 1. Índices

- Crear índices basados en consultas reales
- Usar índices compuestos para consultas multi-columna
- Monitorear uso de índices regularmente

### 2. Consultas

- Usar SELECT específicos en lugar de SELECT \*
- Evitar N+1 con eager loading apropiado
- Implementar paginación para datasets grandes

### 3. Transacciones

- Mantener transacciones cortas
- Usar isolation levels apropiados
- Implementar retry logic para deadlocks

### 4. Cache

- Cachear consultas frecuentes y costosas
- Implementar invalidación inteligente
- Usar diferentes niveles de cache

### 5. Monitoring

- Implementar logging de performance
- Monitorear métricas de base de datos
- Alertas para queries lentas

---

**¡Optimiza tu aplicación TypeORM para producción con estas técnicas avanzadas!**
