# 09 - Optimización de Performance en TypeORM

Este módulo demuestra **técnicas avanzadas de optimización** para mejorar el rendimiento de aplicaciones TypeORM, cubriendo desde problemas comunes hasta soluciones empresariales.

## 🎯 Objetivos de Aprendizaje

Al completar este ejemplo, dominarás:

1. **Identificar y resolver el problema N+1**
2. **Optimizar consultas** con índices y selects específicos
3. **Implementar operaciones en lote** para mejor performance
4. **Usar transacciones eficientemente**
5. **Monitorear performance** de aplicaciones
6. **Gestionar memoria** en datasets grandes
7. **Aplicar mejores prácticas** de TypeORM

## 🗃️ Modelo de Datos

El ejemplo usa un **sistema de e-commerce** optimizado:

```
👤 User (usuarios)
├── 📦 Order (pedidos) [1:N]
    └── 📋 OrderItem (items) [1:N]
        └── 🛍️ Product (productos) [N:1]
            └── 📂 Category (categorías) [N:1]
```

### Entidades con Índices Optimizados

#### User

- `idx_user_email` - Búsquedas por email
- `idx_user_status_created` - Filtrado por estado y fecha
- `idx_user_last_login` - Ordenamiento por último login

#### Product

- `idx_product_name` - Búsqueda por nombre
- `idx_product_category_price` - Consultas por categoría y precio
- `idx_product_active_stock` - Productos disponibles

#### Order

- `idx_order_user_status` - Pedidos por usuario y estado
- `idx_order_status_date` - Consultas por estado y fecha

## 🚀 Ejecutar el Ejemplo

```bash
npm run optimization
```

## 🔴 Problema N+1 y su Solución

### ❌ Problema N+1

```typescript
// Esto ejecuta 1 + N queries (muy ineficiente)
const users = await userRepo.find({ take: 5 });
for (const user of users) {
  const orders = await user.orders; // Query adicional por usuario
}
// Total: 1 query inicial + 5 queries de pedidos = 6 queries
```

### ✅ Solución con JOIN

```typescript
// Una sola query optimizada
const usersWithOrders = await userRepo
  .createQueryBuilder("user")
  .leftJoinAndSelect("user.orders", "order")
  .take(5)
  .getMany();
// Total: 1 query con JOIN
```

## 📈 Optimización con Índices

### Índices Simples

```typescript
@Index("idx_product_name", ["name"])        // Búsquedas por nombre
@Index("idx_product_price", ["price"])      // Ordenamiento por precio
```

### Índices Compuestos

```typescript
@Index("idx_product_category_price", ["categoryId", "price"])
// Optimiza: WHERE categoryId = ? AND price > ?
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

## ⚡ SELECT Específicos

### ❌ Ineficiente

```typescript
// Carga todos los campos (puede ser pesado)
const products = await productRepo.find();
```

### ✅ Optimizado

```typescript
// Solo campos necesarios
const products = await productRepo
  .createQueryBuilder("product")
  .select(["product.id", "product.name", "product.price"])
  .getMany();
```

## 🔥 Operaciones en Lote

### ❌ Inserción Individual

```typescript
// N queries separadas (lento)
for (const userData of users) {
  await userRepo.save(userData);
}
```

### ✅ Inserción en Lote

```typescript
// Una sola query (mucho más rápido)
await userRepo.save(users);
```

## 💰 Transacciones Optimizadas

```typescript
await dataSource.transaction(async (manager) => {
  // Todas las operaciones en una transacción
  const order = await manager.save(Order, orderData);
  const items = await manager.save(OrderItem, itemsData);
  await manager.update(Order, order.id, { total: calculatedTotal });
});
```

## 📊 Monitoring de Performance

### Query Logging

```typescript
// En DataSource config
{
    logging: ["query", "error"],
    maxQueryExecutionTime: 1000, // Log queries > 1s
}
```

### Performance Tracking

```typescript
const start = Date.now();
const result = await repository.find();
const duration = Date.now() - start;

if (duration > 100) {
  console.warn(`Slow query detected: ${duration}ms`);
}
```

## 🧠 Optimización de Memoria

### Streaming para Datasets Grandes

```typescript
// Procesa sin cargar todo en memoria
const stream = await repository.createQueryBuilder("entity").stream();

stream.on("data", (row) => {
  // Procesar fila por fila
});
```

### Paginación Eficiente

```typescript
// Cargar datos por páginas
const [items, total] = await repository.findAndCount({
  skip: page * pageSize,
  take: pageSize,
});
```

## 🏗️ Técnicas de Desnormalización

### Campos Calculados

```typescript
@Entity()
class Order {
  @Column({ default: 0 })
  itemCount!: number; // Evita COUNT() queries

  @Column({ type: "decimal" })
  total!: number; // Evita SUM() queries
}
```

### Información Duplicada Estratégica

```typescript
@Entity()
class OrderItem {
  @Column()
  productName!: string; // Duplicado para evitar JOINs en reportes

  @Column()
  productSku!: string; // Histórico al momento de la compra
}
```

## 🔧 Configuración de Performance

### Connection Pool

```typescript
{
    type: "postgres",
    poolSize: 20,                    // Conexiones concurrentes
    acquireTimeout: 60000,           // Timeout para obtener conexión
    timeout: 60000,                  // Query timeout
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

## 📋 Mejores Prácticas

### 1. **Usar Lazy Loading por Defecto**

```typescript
@OneToMany(() => Order, order => order.user, {
    lazy: true // Evita cargas innecesarias
})
orders!: Promise<Order[]>;
```

### 2. **FK Explícitas para Joins Eficientes**

```typescript
@Column()
userId!: number; // FK explícita

@ManyToOne(() => User)
@JoinColumn({ name: "userId" })
user!: Promise<User>;
```

### 3. **Índices en Columnas de Filtrado**

```typescript
// Cualquier columna en WHERE debe tener índice
@Index("idx_status", ["status"])
@Index("idx_created_at", ["createdAt"])
```

### 4. **Evitar SELECT N+1 en Loops**

```typescript
// ❌ MAL
for (const order of orders) {
  const items = await order.orderItems; // N queries
}

// ✅ BIEN
const ordersWithItems = await orderRepo.find({ relations: ["orderItems"] });
```

## 📊 Resultados de Performance

El ejemplo demuestra mejoras significativas:

| Técnica              | Antes           | Después    | Mejora       |
| -------------------- | --------------- | ---------- | ------------ |
| **N+1 Problem**      | 1 + N queries   | 1 query    | ~90%         |
| **Batch Operations** | N inserts       | 1 insert   | ~85%         |
| **Specific Selects** | Full table scan | Index scan | ~60%         |
| **Memory Streaming** | Full load       | Streaming  | ~95% memoria |

## 🎯 Casos de Uso

### Cuándo Usar Cada Técnica

- **Eager Loading**: Datos que siempre necesitas
- **Lazy Loading**: Datos que raramente necesitas
- **Batch Operations**: Múltiples inserts/updates
- **Índices**: Columnas de WHERE, ORDER BY, JOIN
- **Streaming**: Datasets > 10,000 registros
- **Caching**: Datos que cambian poco

## 🔍 Tools de Debugging

### 1. **Query Logging**

```typescript
logging: ["query", "schema", "error", "warn", "info", "log"];
```

### 2. **Performance Analysis**

```typescript
// Medir tiempo de ejecución
console.time("query");
await repository.find();
console.timeEnd("query");
```

### 3. **Explain Plans** (PostgreSQL)

```sql
EXPLAIN ANALYZE SELECT * FROM products WHERE category_id = 1;
```

## 🚨 Señales de Problemas de Performance

1. **Queries > 100ms** - Revisar índices
2. **N+1 Patterns** - Usar eager loading o joins
3. **Full Table Scans** - Agregar índices
4. **High Memory Usage** - Implementar streaming
5. **Connection Pool Exhaustion** - Optimizar connection management

## 📚 Referencias

- [TypeORM Performance Tips](https://typeorm.io/caching)
- [Database Indexing Best Practices](https://use-the-index-luke.com/)
- [SQL Performance Explained](https://sql-performance-explained.com/)
- [Node.js Performance Monitoring](https://nodejs.org/en/docs/guides/simple-profiling/)

## 🎉 Conclusiones

1. **Los índices son cruciales** para consultas rápidas
2. **El problema N+1 es muy común** - siempre estar alerta
3. **Las operaciones en lote** pueden mejorar performance dramáticamente
4. **El monitoring es esencial** para detectar problemas
5. **La optimización es un proceso iterativo** - medir, optimizar, repetir

---

**¡La performance no es un accidente, es una decisión de diseño!** 🚀
