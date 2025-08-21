# Ejercicio 3: Relaciones en TypeORM

## Descripción

Este ejercicio demuestra cómo implementar y trabajar con los tres tipos de relaciones en TypeORM:

- **One-to-One**: Chef ↔ Restaurant
- **One-to-Many**: Restaurant → Menu, Menu → Dish
- **Many-to-Many**: Dish ↔ Ingredient

## Contexto del Dominio

Sistema de gestión de restaurantes con las siguientes entidades:

- **Chef**: Chefs que trabajan en restaurantes
- **Restaurant**: Restaurantes con información completa
- **Menu**: Menús de cada restaurante (desayuno, almuerzo, cena, etc.)
- **Dish**: Platos individuales en cada menú
- **Ingredient**: Ingredientes utilizados en los platos

## Estructura de Entidades

### 1. Chef

Representa a los chefs que trabajan en restaurantes.

**Características principales:**

- Especialidad culinaria (italiana, francesa, japonesa, etc.)
- Rango profesional (sous chef, head chef, executive chef, michelin chef)
- Años de experiencia
- Información personal (nombre, email, teléfono, fecha de nacimiento)
- Premios y reconocimientos
- Idiomas que habla
- Rating y biografía

**Enums:**

- `ChefSpecialty`: Especialidades culinarias
- `ChefRank`: Rangos profesionales

### 2. Restaurant

Representa restaurantes con información completa.

**Características principales:**

- Tipo de restaurante (fine dining, casual dining, fast food, etc.)
- Información de contacto y ubicación
- Capacidad y horarios
- Servicios (delivery, takeaway, reservas)
- Amenidades (wifi, parking, terraza, etc.)
- Métodos de pago aceptados
- Rating y reseñas

**Enums:**

- `RestaurantType`: Tipos de restaurante
- `RestaurantStatus`: Estados operativos

### 3. Menu

Representa los menús de cada restaurante.

**Características principales:**

- Tipo de menú (desayuno, almuerzo, cena, etc.)
- Período de validez y horarios de disponibilidad
- Días de la semana disponibles
- Opciones dietéticas
- Información sobre alérgenos
- Precio base

**Enums:**

- `MenuType`: Tipos de menú
- `MenuStatus`: Estados del menú

### 4. Dish

Representa platos individuales en los menús.

**Características principales:**

- Categoría (aperitivo, plato principal, postre, etc.)
- Precio y tiempo de preparación
- Información nutricional y calórica
- Nivel de picante
- Opciones dietéticas (vegetariano, vegano, sin gluten)
- Alérgenos
- Popularidad y rating

**Enums:**

- `DishCategory`: Categorías de platos
- `DishStatus`: Estados de disponibilidad
- `SpiceLevel`: Niveles de picante

### 5. Ingredient

Representa ingredientes utilizados en los platos.

**Características principales:**

- Tipo de ingrediente (vegetal, carne, lácteo, etc.)
- Información de stock y precio
- Información nutricional
- Condiciones de almacenamiento
- Alérgenos
- Temporalidad
- Calidad y origen

**Enums:**

- `IngredientType`: Tipos de ingredientes
- `IngredientStatus`: Estados de disponibilidad
- `AllergenType`: Tipos de alérgenos

## Relaciones Implementadas

### 1. One-to-One: Chef ↔ Restaurant

Un chef puede ser chef principal de un solo restaurante, y un restaurante tiene un solo chef principal.

```typescript
// En Chef.ts
@OneToOne(() => Restaurant, (restaurant) => restaurant.headChef, {
  cascade: true,
  onDelete: "SET NULL"
})
@JoinColumn() // Chef es el propietario de la relación
restaurant?: Restaurant;

// En Restaurant.ts
@OneToOne(() => Chef, (chef) => chef.restaurant, {
  onDelete: "SET NULL"
})
headChef?: Chef;
```

### 2. One-to-Many: Restaurant → Menu

Un restaurante puede tener múltiples menús, pero cada menú pertenece a un solo restaurante.

```typescript
// En Restaurant.ts
@OneToMany(() => Menu, (menu) => menu.restaurant, {
  cascade: true,
  eager: false
})
menus: Menu[];

// En Menu.ts
@ManyToOne(() => Restaurant, (restaurant) => restaurant.menus, {
  nullable: false,
  onDelete: "CASCADE"
})
@JoinColumn({ name: "restaurantId" })
restaurant: Restaurant;
```

### 3. One-to-Many: Menu → Dish

Un menú puede tener múltiples platos, pero cada plato pertenece a un solo menú.

```typescript
// En Menu.ts
@OneToMany(() => Dish, (dish) => dish.menu, {
  cascade: true,
  eager: false
})
dishes: Dish[];

// En Dish.ts
@ManyToOne(() => Menu, (menu) => menu.dishes, {
  nullable: false,
  onDelete: "CASCADE"
})
@JoinColumn({ name: "menuId" })
menu: Menu;
```

### 4. Many-to-Many: Dish ↔ Ingredient

Un plato puede tener múltiples ingredientes, y un ingrediente puede estar en múltiples platos.

```typescript
// En Dish.ts
@ManyToMany(() => Ingredient, (ingredient) => ingredient.dishes, {
  cascade: true,
  eager: false
})
@JoinTable({
  name: "dish_ingredients", // Nombre de la tabla intermedia
  joinColumn: {
    name: "dishId",
    referencedColumnName: "id"
  },
  inverseJoinColumn: {
    name: "ingredientId",
    referencedColumnName: "id"
  }
})
ingredients: Ingredient[];

// En Ingredient.ts
@ManyToMany(() => Dish, (dish) => dish.ingredients)
dishes: Dish[];
```

## Funcionalidades Implementadas

### Métodos Utilitarios

Cada entidad incluye métodos útiles:

- **Display names**: Para mostrar enums en formato legible
- **Validaciones**: Para verificar estados y condiciones
- **Cálculos**: Para operaciones matemáticas y estadísticas
- **Manejo de arrays**: Para agregar/quitar elementos de arrays JSON

### Operaciones con Relaciones

- Asignación de chefs a restaurantes
- Creación de menús para restaurantes
- Adición de platos a menús
- Asociación de ingredientes con platos
- Consultas con carga de relaciones

## Consultas Demostradas

### Consultas Básicas con Relaciones

```typescript
// Chefs con sus restaurantes
const chefsWithRestaurants = await chefRepository.find({
  relations: ["restaurant"],
});

// Restaurantes con menús y chef
const restaurantsWithMenus = await restaurantRepository.find({
  relations: ["menus", "headChef"],
});

// Platos con ingredientes
const dishesWithIngredients = await dishRepository.find({
  relations: ["ingredients", "menu"],
});
```

### Consultas Avanzadas

```typescript
// Filtrar por especialidad
const italianChefs = await chefRepository.find({
  where: { specialty: ChefSpecialty.ITALIAN },
  relations: ["restaurant"],
});

// Platos vegetarianos
const vegetarianDishes = await dishRepository.find({
  where: { isVegetarian: true },
  relations: ["menu", "ingredients"],
});
```

## Casos de Uso Demostrados

1. **Gestión de Chefs y Restaurantes**

   - Asignación de chef principal a restaurante
   - Consulta de información completa de chef y restaurante

2. **Gestión de Menús**

   - Creación de múltiples menús por restaurante
   - Configuración de horarios y disponibilidad
   - Opciones dietéticas y alérgenos

3. **Gestión de Platos**

   - Creación de platos en menús específicos
   - Configuración nutricional y dietary tags
   - Seguimiento de popularidad y ratings

4. **Gestión de Ingredientes**
   - Inventario y stock management
   - Asociación con múltiples platos
   - Información nutricional y alérgenos

## Ejecutar el Ejemplo

```bash
# Navegar al directorio del ejercicio
cd src/ejercicio-03-relations

# Ejecutar el ejemplo
npm run ejercicio-03
```

## Estructura de la Base de Datos

### Tablas Principales

- `chef`: Información de chefs
- `restaurant`: Información de restaurantes
- `menu`: Menús de restaurantes
- `dish`: Platos en menús
- `ingredient`: Ingredientes disponibles

### Tabla de Relación

- `dish_ingredients`: Tabla intermedia para relación Many-to-Many entre platos e ingredientes

## Características Avanzadas

### Cascade Operations

- Los menús se eliminan automáticamente cuando se elimina un restaurante
- Los platos se eliminan automáticamente cuando se elimina un menú
- Las asociaciones de ingredientes se manejan automáticamente

### Eager vs Lazy Loading

- Por defecto, todas las relaciones usan lazy loading
- Se pueden cargar relaciones específicas usando el parámetro `relations`

### Validaciones de Dominio

- Verificación de stock de ingredientes
- Validación de horarios de disponibilidad
- Comprobación de estados operativos

## Consideraciones de Rendimiento

1. **Índices**: Se recomienda crear índices en columnas de relación frecuentemente consultadas
2. **Eager Loading**: Usar con cuidado para evitar N+1 queries
3. **Proyección**: Seleccionar solo los campos necesarios en consultas complejas

## Extensiones Posibles

1. **Más Relaciones**:

   - Customer → Order
   - Order → OrderItem
   - Supplier → Ingredient

2. **Funcionalidades Adicionales**:

   - Sistema de reservas
   - Gestión de inventario automática
   - Análisis de costos por plato

3. **Optimizaciones**:
   - Caché de consultas frecuentes
   - Paginación para listas grandes
   - Búsqueda full-text en descripciones
