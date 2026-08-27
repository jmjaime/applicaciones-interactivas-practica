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

### Ver la introducción

```bash
npm run herencia
```

### Ejecutar ejemplos específicos

```bash
npm run herencia:tph    # TPH - Una tabla para toda la jerarquía
npm run herencia:tpc    # TPC - Una tabla por clase concreta
```

## 📊 Modelo de Datos

Los ejemplos utilizan una jerarquía de **tracks** con diferentes tipos —
la misma que usa `ejercicios/07-herencia`:

```
Track (base)
├── Song
├── Podcast
└── Audiobook
```

### Propiedades por Tipo

- **Track**: id, title, durationSeconds
- **Song**: albumTitle, trackNumber
- **Podcast**: hostName, episodeNumber
- **Audiobook**: narrator, chapterCount

## 🛠️ Decoradores TypeORM

### Clase Base

```typescript
@Entity()
@TableInheritance({
  column: { type: "varchar", name: "type" },
})
export abstract class Track {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  // ... más propiedades
}
```

### Clases Derivadas

```typescript
@ChildEntity("song")
export class Song extends Track {
  @Column()
  albumTitle!: string;

  @Column()
  trackNumber!: number;
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
07-herencia/
├── table-per-hierarchy/
│   └── entities.ts          # Entidades TPH
│   └── example.ts           # Ejemplo TPH
├── table-per-class/
│   └── entities.ts          # Entidades TPC
│   └── example.ts           # Ejemplo TPC
├── example.ts               # Ejemplo principal
└── README.md               # Esta documentación
```

## 🔍 Próximos Pasos

1. Correr `npm run herencia:tph` y `npm run herencia:tpc` para ver los ejemplos
2. Revisar el código de cada estrategia
3. Comparar los esquemas generados
4. Analizar el rendimiento de las consultas

---

**Cada estrategia tiene su caso de uso — la comparación de arriba ayuda a elegir la más adecuada según el escenario.**
