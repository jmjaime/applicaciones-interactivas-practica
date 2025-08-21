# 🚀 Guía de Inicio Rápido - TypeORM Examples

## ⚡ Inicio en 3 pasos

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar base de datos

```bash
npm run setup
```

### 3. Ejecutar un ejemplo

```bash
npm run entities
```

¡Listo! Ya puedes explorar TypeORM 🎉

---

## 🏃 Cómo ejecutar

1. Instalar dependencias y preparar la base de datos

```bash
npm install
npm run setup
# (opcional) cargar datos de ejemplo
npm run seed
```

2. Ejecutar el menú interactivo o un ejemplo específico

```bash
# Menú interactivo con todas las opciones
npm run dev

# Ejemplos individuales
npm run entities
npm run restrictions
npm run relations
npm run lazy-eager
npm run transactions
npm run embedded
npm run query-builder
npm run inheritance

# Estrategias específicas de herencia
npm run table-per-hierarchy
npm run table-per-class

# Optimización
npm run optimization

# Migraciones
npm run migrations
npm run migrations:fk
```

3. Limpiar archivos generados

```bash
npm run clean
# Windows
npm run clean:win
```

---

## 📚 Ejemplos Disponibles

### **1. Entidades Básicas**

```bash
npm run entities        # ✨ CRUD, tipos de columna, métodos de negocio
```

### **2. Restricciones y Validaciones**

```bash
npm run restrictions    # 🔒 Unique, Check, Index, class-validator
```

### **3. Relaciones**

```bash
npm run relations       # 🔗 One-to-One, One-to-Many, Many-to-Many
```

### **4. Lazy vs Eager Loading**

```bash
npm run lazy-eager      # ⚡ Estrategias de carga, problema N+1, performance
```

### **5. Transacciones**

```bash
npm run transactions    # 💳 ACID, rollback, transacciones anidadas
```

### **6. Objetos Embebidos**

```bash
npm run embedded        # 📦 Mapeo a múltiples columnas, JSON, embedding
```

### **7. Query Builder**

```bash
npm run query-builder   # 🔍 Consultas complejas, joins, agregaciones, subqueries
```

### **8. Herencia**

```bash
npm run inheritance      # 🧬 TPH y TPC con ejemplos completos
# O ejecutar estrategias específicas
npm run table-per-hierarchy
npm run table-per-class
```

### **9. Optimizaciones**

```bash
npm run optimization     # ⚡ N+1, índices, SELECT específicos, batch, métricas
```

### **10. Migraciones**

```bash
npm run migrations       # 🧱 Crear y ejecutar migraciones
npm run migrations:fk    # 🔗 Ejemplo con claves foráneas
```

---

## 🔧 Comandos Útiles

```bash
# Datos de ejemplo
npm run seed

# Reconfigurar todo
npm run setup && npm run seed

# Ver estructura del proyecto
tree src/
```

---

## 📂 Estructura del Proyecto

```
src/
├── 01-entities/          # Entidades básicas
│   ├── entities/
│   │   ├── User.ts       # Entidad usuario con tipos de columna
│   │   └── Product.ts    # Entidad producto con hooks
│   └── example.ts        # Ejemplo CRUD completo
├── 02-restrictions/      # Restricciones y validaciones
│   ├── entities/
│   │   ├── UserWithRestrictions.ts  # Restricciones BD + validaciones
│   │   └── CategoryEntity.ts        # Restricciones avanzadas
│   └── example.ts        # Manejo de errores y validaciones
├── 03-relations/         # Relaciones entre entidades
│   ├── entities/
│   │   ├── Author.ts     # One-to-Many (lado "uno")
│   │   ├── Book.ts       # Many-to-One (lado "muchos")
│   │   ├── Profile.ts    # One-to-One
│   │   ├── Student.ts    # Many-to-Many
│   │   └── Course.ts     # Many-to-Many (inverso)
│   ├── example.ts        # Ejemplo completo de relaciones
│   └── relations-simple.ts  # Ejemplo simplificado
├── 04-lazy-eager/        # Estrategias de carga
│   ├── entities/
│   │   ├── User.ts       # Entidad con lazy loading
│   │   ├── Post.ts       # Relación many-to-one
│   │   ├── Comment.ts    # Relación many-to-one
│   │   ├── UserEager.ts  # Entidad con eager loading
│   │   ├── PostEager.ts  # Posts con eager loading
│   │   └── CommentEager.ts # Comentarios eager
│   ├── example.ts        # Comparación lazy vs eager
│   └── README.md         # Documentación detallada
├── 05-transactions/      # Manejo de transacciones
│   ├── entities/
│   │   ├── User.ts       # Usuario con balance
│   │   ├── Account.ts    # Cuenta bancaria
│   │   ├── TransactionRecord.ts # Registro de transacciones
│   │   ├── Product.ts    # Producto con inventario
│   │   ├── Order.ts      # Pedido
│   │   └── OrderItem.ts  # Items del pedido
│   └── example.ts        # Casos: simple, rollback, anidadas
├── 06-embedded/          # Objetos embebidos
│   ├── entities/
│   │   ├── Address.ts    # Objeto embebido básico
│   │   ├── Company.ts    # Múltiples direcciones embebidas
│   │   └── Employee.ts   # Objetos embebidos complejos
│   ├── example.ts        # Ejemplos completos de embedding
│   └── README.md         # Documentación de patrones
├── 07-query-builder/     # Query Builder completo
│   ├── entities/
│   │   ├── User.ts       # Usuario con estadísticas
│   │   ├── Post.ts       # Post con métricas
│   │   ├── Comment.ts    # Comentario con engagement
│   │   ├── Category.ts   # Categoría de contenido
│   │   └── Tag.ts        # Tags para clasificación
│   ├── example.ts        # 10 ejemplos de Query Builder
│   └── README.md         # Guía completa de Query Builder
├── common/               # Configuración compartida
│   └── data-source.ts    # Configuración TypeORM
├── index.ts              # Archivo principal con menú
├── setup-database.ts     # Script configuración inicial
└── seed-data.ts          # Datos de ejemplo para pruebas
```

---

## 🎯 Por dónde empezar

### **Nuevo en TypeORM?**

1. `npm run entities` - Aprende lo básico de entidades y CRUD
2. `npm run restrictions` - Validaciones y restricciones de base de datos
3. `npm run relations` - Relaciones entre entidades
4. `npm run lazy-eager` - Optimización de consultas y problema N+1
5. `npm run transactions` - Manejo de transacciones y consistencia
6. `npm run embedded` - Objetos embebidos y transformadores
7. `npm run query-builder` - Consultas complejas con Query Builder

### **Orden recomendado:**

1. **Entidades** → Domina los conceptos básicos
2. **Restricciones** → Asegura la integridad de datos
3. **Relaciones** → Conecta entidades entre sí
4. **Lazy vs Eager** → Optimiza el rendimiento de consultas
5. **Transacciones** → Garantiza consistencia de datos
6. **Objetos Embebidos** → Mapeo avanzado y transformaciones
7. **Query Builder** → Consultas complejas y dinámicas

### **Próximos pasos:**

Una vez que domines estos conceptos, podrás expandir a temas más avanzados como lazy loading, transacciones, query builder, objetos embebidos, herencia y optimizaciones.

---

## 🐛 Problemas Comunes

### Error: "Cannot find module"

```bash
npm install
```

### Error: "SQLITE_CANTOPEN"

```bash
rm -f *.sqlite && npm run setup
```

### Error: "Reflect.getMetadata"

Ya está configurado, pero verifica que tienes:

```typescript
import "reflect-metadata";
```

---

## 💡 Tips

- **Cada ejemplo es independiente** - puedes ejecutarlos en cualquier orden
- **Los archivos .sqlite** se crean automáticamente
- **Revisa el código** en `src/` mientras ejecutas los ejemplos
- **Experimenta** - modifica los ejemplos para aprender más

---

## 📖 Recursos

- [Documentación TypeORM](https://typeorm.io/)
- [README completo](./README.md)
- [Ejercicios adicionales](../ejercicios/)

¡Diviértete aprendiendo TypeORM! 🎉
