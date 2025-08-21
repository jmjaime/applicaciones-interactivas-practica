# Mapeo de Herencia con TypeORM

Este módulo demuestra dos estrategias de mapeo de herencia soportadas por TypeORM.

## 🎯 Estrategias Implementadas

### 1. 📋 Table Per Hierarchy (TPH)

- **Concepto**: Una sola tabla para toda la jerarquía de herencia
- **Discriminador**: Columna que identifica el tipo de cada registro
- **Ventajas**: Consultas polimórficas eficientes, esquema simple
- **Desventajas**: Muchas columnas nullable, potencial desperdicio de espacio

### 2. 🗂️ Table Per Class (TPC)

- **Concepto**: Una tabla separada para cada clase concreta
- **Duplicación**: Columnas comunes se repiten en cada tabla
- **Ventajas**: Esquema normalizado por clase, no hay columnas nullable
- **Desventajas**: Consultas polimórficas complejas, duplicación de esquema

<!-- Joined Table (JT) removido: no está soportado por TypeORM en esta versión -->

## 🚀 Uso

### Ejecutar todos los ejemplos

```bash
npm run inheritance
```

### Ejecutar ejemplos específicos

```bash
npm run table-per-hierarchy    # TPH - Una tabla para toda la jerarquía
npm run table-per-class        # TPC - Una tabla por clase concreta
```

## 📊 Modelo de Datos

Los ejemplos utilizan una jerarquía de **empleados** con diferentes tipos:

```
Employee (base)
├── Manager
├── Developer
├── Designer
└── SalesRep
```

### Propiedades por Tipo

- **Employee**: id, name, email, salary, type
- **Manager**: department, teamSize
- **Developer**: languages, experience, framework
- **Designer**: tools, portfolioUrl
- **SalesRep**: region, salesTarget

## 🛠️ Decoradores TypeORM

### Clase Base

```typescript
@Entity()
@TableInheritance({
  column: { type: "varchar", name: "type" },
})
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  // ... más propiedades
}
```

### Clases Derivadas

```typescript
@ChildEntity()
export class Manager extends Employee {
  @Column()
  department!: string;

  @Column()
  teamSize!: number;
}
```

## 📈 Comparación de Estrategias

| Aspecto                | TPH    | TPC  |
| ---------------------- | ------ | ---- |
| Rendimiento Consultas  | ⭐⭐⭐ | ⭐⭐ |
| Normalización          | ⭐     | ⭐⭐ |
| Simplicidad Esquema    | ⭐⭐⭐ | ⭐⭐ |
| Consultas Polimórficas | ⭐⭐⭐ | ⭐   |
| Eficiencia Espacio     | ⭐     | ⭐⭐ |

## 🎓 Conceptos Demostrados

### Decoradores TypeORM

- `@Entity()` - Definición de entidad base
- `@TableInheritance()` - Configuración de herencia
- `@ChildEntity()` - Clases derivadas
- `@Column()` - Mapeo de propiedades

### Funcionalidades

- Creación automática de discriminador
- Consultas polimórficas transparentes
- Persistencia de objetos derivados
- Consultas específicas por tipo

### Ventajas del ORM

- Mapeo automático de herencia
- Polimorfismo transparente
- Generación automática de esquema
- Abstracción de la complejidad SQL

## 📚 Archivos Incluidos

```
08-inheritance/
├── table-per-hierarchy/
│   └── entities.ts          # Entidades TPH
│   └── example.ts           # Ejemplo TPH
├── table-per-class/
│   └── entities.ts          # Entidades TPC
│   └── example.ts           # Ejemplo TPC
├── common/
│   └── entities.ts          # Entidades base
│   └── sample-data.ts       # Datos de ejemplo
├── example.ts               # Ejemplo principal
└── README.md               # Esta documentación
```

## 🔍 Próximos Pasos

1. Ejecuta `npm run inheritance` para ver todos los ejemplos
2. Revisa el código de cada estrategia
3. Compara los esquemas generados
4. Analiza el rendimiento de las consultas

---

**¡Explora las diferentes estrategias y elige la más adecuada para tu caso de uso!**
