# Ejercicio 8: Herencia en TypeORM

## 🎯 Objetivo

Dominar las **tres estrategias principales de herencia** en TypeORM para modelar jerarquías de clases en bases de datos relacionales usando un sistema de gestión de vehículos.

## 📋 Conceptos Cubiertos

### 1. Estrategias de Herencia

- **Table Per Hierarchy (TPH)** - Una tabla para toda la jerarquía
- **Table Per Class (TPC)** - Una tabla por clase concreta
- **Joined Table (JT)** - Tablas separadas con JOINs

### 2. Decoradores TypeORM

- `@Entity()` - Definición de entidad
- `@TableInheritance()` - Configuración de herencia TPH
- `@ChildEntity()` - Clases derivadas en TPH
- `@PrimaryColumn()` - Clave primaria personalizada
- `@JoinColumn()` - Configuración de JOIN

### 3. Consultas Avanzadas

- Consultas polimórficas
- Queries específicas por tipo
- Operaciones UNION para TPC
- JOINs complejos para JT

## 🏗️ Arquitectura del Sistema

### Modelo de Datos

```
Vehicle (base)
├── Car
│   ├── doors: number
│   ├── transmission: TransmissionType
│   ├── fuelType: FuelType
│   ├── engineSize: number
│   ├── mpg: number
│   └── features: boolean[]
├── Motorcycle
│   ├── engineSize: number (cc)
│   ├── motorcycleType: MotorcycleType
│   ├── topSpeed: number
│   └── accessories: boolean[]
└── Truck
    ├── payloadCapacity: number
    ├── cabType: TruckCabType
    ├── driveType: DriveType
    ├── bedLength: number
    └── towingCapacity: number
```

### Estructura de Archivos

```
ejercicio-08-inheritance/
├── common/
│   ├── entities.ts          # Clases base y enums
│   └── sample-data.ts       # Datos de ejemplo
├── table-per-hierarchy/
│   └── entities.ts          # Implementación TPH
├── table-per-class/
│   └── entities.ts          # Implementación TPC
├── joined-table/
│   └── entities.ts          # Implementación JT
├── example.ts               # Demostración completa
└── README.md               # Esta documentación
```

## 🔧 Implementaciones

### 1. Table Per Hierarchy (TPH)

**Concepto**: Una sola tabla `vehicles` contiene todos los tipos de vehículos con una columna discriminadora.

```typescript
@Entity("vehicles")
@TableInheritance({ column: { type: "varchar", name: "type", length: 20 } })
export abstract class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  brand!: string;

  // ... propiedades comunes
}

@ChildEntity("Car")
export class Car extends Vehicle {
  @Column({ type: "int", nullable: true })
  doors!: number;

  @Column({ type: "varchar", length: 20, nullable: true })
  transmission!: TransmissionType;

  // ... propiedades específicas (todas nullable)
}
```

**Ventajas**:

- ✅ Consultas polimórficas muy eficientes
- ✅ Esquema simple y unificado
- ✅ Rendimiento excelente para consultas mixtas

**Desventajas**:

- ❌ Muchas columnas nullable
- ❌ Potencial desperdicio de espacio
- ❌ Complejidad con muchas subclases

### 2. Table Per Class (TPC)

**Concepto**: Cada clase concreta tiene su propia tabla completa.

```typescript
@Entity("cars")
export class Car extends Vehicle {
  @Column({ type: "int" })
  doors!: number;

  @Column({ type: "varchar", length: 20 })
  transmission!: TransmissionType;

  // ... todas las propiedades (base + específicas)
}

@Entity("motorcycles")
export class Motorcycle extends Vehicle {
  @Column({ type: "int" })
  engineSize!: number;

  // ... propiedades específicas
}
```

**Ventajas**:

- ✅ Esquema normalizado por clase
- ✅ No hay columnas nullable
- ✅ Evolución independiente de esquemas
- ✅ Consultas específicas eficientes

**Desventajas**:

- ❌ Consultas polimórficas complejas (UNION)
- ❌ Duplicación de propiedades comunes
- ❌ Mantenimiento de múltiples esquemas

### 3. Joined Table (JT)

**Concepto**: Tabla base con propiedades comunes, tablas derivadas con propiedades específicas.

```typescript
@Entity("vehicles")
export class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  brand!: string;

  // ... solo propiedades comunes
}

@Entity("car_details")
export class CarDetail {
  @PrimaryColumn()
  vehicleId!: number;

  @Column({ type: "int" })
  doors!: number;

  @JoinColumn({ name: "vehicleId" })
  vehicle!: Vehicle;

  // ... solo propiedades específicas
}
```

**Ventajas**:

- ✅ Normalización completa
- ✅ Eficiencia máxima de espacio
- ✅ Estructura lógica clara
- ✅ Escalabilidad excelente

**Desventajas**:

- ❌ Consultas requieren JOINs
- ❌ Complejidad de esquema
- ❌ Rendimiento menor para consultas simples

## 📊 Comparación de Estrategias

| Aspecto                    | TPH    | TPC    | JT     |
| -------------------------- | ------ | ------ | ------ |
| **Consultas Polimórficas** | ⭐⭐⭐ | ⭐⭐   | ⭐⭐   |
| **Normalización**          | ⭐     | ⭐⭐   | ⭐⭐⭐ |
| **Simplicidad Esquema**    | ⭐⭐⭐ | ⭐⭐   | ⭐     |
| **Eficiencia Espacio**     | ⭐     | ⭐⭐   | ⭐⭐⭐ |
| **Flexibilidad**           | ⭐⭐   | ⭐⭐⭐ | ⭐⭐⭐ |
| **Rendimiento**            | ⭐⭐⭐ | ⭐⭐   | ⭐⭐   |

## 🚀 Ejecución

### Prerequisitos

```bash
npm install
```

### Ejecutar Tests del Ejercicio

Implementá en `exercise.ts` y corré los tests:

```bash
npm run test:ej08
```

## 📝 Ejemplos de Uso

### Consultas Polimórficas (TPH)

```typescript
// Buscar todos los vehículos caros
const luxuryVehicles = await vehicleRepo
  .createQueryBuilder("vehicle")
  .where("vehicle.price > :price", { price: 50000 })
  .getMany();

// Estadísticas por tipo
const typeStats = await vehicleRepo
  .createQueryBuilder("vehicle")
  .select("vehicle.type", "type")
  .addSelect("COUNT(*)", "count")
  .addSelect("AVG(vehicle.price)", "avgPrice")
  .groupBy("vehicle.type")
  .getRawMany();
```

### Consultas Específicas (TPC)

```typescript
// Autos económicos
const economicalCars = await carRepo
  .createQueryBuilder("car")
  .where("car.mpg > :mpg", { mpg: 30 })
  .getMany();

// Motocicletas de alto rendimiento
const performanceBikes = await motorcycleRepo
  .createQueryBuilder("motorcycle")
  .where("motorcycle.motorcycleType = :type", { type: "sport" })
  .andWhere("motorcycle.engineSize >= :size", { size: 600 })
  .getMany();
```

### Consultas con JOINs (JT)

```typescript
// Autos con sus detalles
const carsWithDetails = await vehicleRepo
  .createQueryBuilder("vehicle")
  .leftJoinAndSelect("car_details", "car", "car.vehicleId = vehicle.id")
  .where("vehicle.vehicleType = :type", { type: "car" })
  .getRawMany();

// Camiones de trabajo
const workTrucks = await vehicleRepo
  .createQueryBuilder("vehicle")
  .leftJoinAndSelect("truck_details", "truck", "truck.vehicleId = vehicle.id")
  .where("vehicle.vehicleType = :type", { type: "truck" })
  .andWhere("truck.cabType = :cabType", { cabType: "regular" })
  .getRawMany();
```

## 🎯 Cuándo Usar Cada Estrategia

### Table Per Hierarchy (TPH)

**Usar cuando**:

- Pocas diferencias entre subclases
- Consultas polimórficas frecuentes
- Rendimiento es crítico
- Jerarquía simple y estable

**Evitar cuando**:

- Muchas propiedades específicas
- Jerarquías complejas
- Normalización estricta requerida

### Table Per Class (TPC)

**Usar cuando**:

- Clases muy diferentes
- Consultas específicas por tipo dominan
- Evolución independiente necesaria
- Esquemas específicos por dominio

**Evitar cuando**:

- Consultas polimórficas frecuentes
- Propiedades comunes extensas
- Mantenimiento unificado preferido

### Joined Table (JT)

**Usar cuando**:

- Normalización completa requerida
- Propiedades comunes extensas
- Eficiencia de espacio crítica
- Jerarquías complejas y profundas

**Evitar cuando**:

- Consultas simples frecuentes
- Rendimiento crítico
- Simplicidad preferida

## 🎓 Ejercicios Propuestos

### Ejercicio 1: Extensión de Jerarquía

1. Agregar una nueva clase `ElectricCar` que herede de `Car`
2. Implementar en las tres estrategias
3. Agregar propiedades específicas: `batteryCapacity`, `chargingTime`, `range`

### Ejercicio 2: Consultas Avanzadas

1. Implementar búsqueda por rango de precios
2. Crear consultas de agregación por marca
3. Implementar filtros combinados por tipo y características

### Ejercicio 3: Rendimiento

1. Comparar tiempos de consulta entre estrategias
2. Analizar espacio utilizado en cada implementación
3. Optimizar consultas específicas

### Ejercicio 4: Migración

1. Crear script para migrar datos entre estrategias
2. Implementar validación de integridad
3. Documentar proceso de migración

## 📚 Recursos Adicionales

- [TypeORM Inheritance Documentation](https://typeorm.io/entity-inheritance)
- [Database Inheritance Patterns](https://martinfowler.com/eaaCatalog/index.html)
- [Performance Comparison of Inheritance Strategies](https://hibernate.org/orm/inheritance/)

## 🔍 Próximos Pasos

1. Ejecutar el ejemplo completo
2. Experimentar con diferentes consultas
3. Implementar los ejercicios propuestos
4. Comparar rendimiento entre estrategias
5. Elegir la estrategia más adecuada para tu caso de uso

---

**¡Explora las diferentes estrategias y encuentra la más adecuada para tu aplicación!**
