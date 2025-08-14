# 🚀 Quick Start - Ejercicios Clase 1

## Instalación Rápida

```bash
npm install
```

## Ejecución

### Menú Principal Interactivo

```bash
npm run dev
```

### Ejercicios Específicos

#### Herencia (SQL plano)

```bash
npm run herencia        # Todos los ejercicios de herencia
npm run tph-sql         # Table-Per-Hierarchy
npm run tpt-sql         # Table-Per-Type
npm run tpc-sql         # Table-Per-Class
```

#### Relaciones (SQL plano)

```bash
npm run relaciones      # Todos los ejercicios de relaciones
npm run one-to-one-sql  # Relación 1:1
npm run one-to-many-sql # Relación 1:N
npm run many-to-many-sql # Relación N:M
```

#### Todos los ejercicios

```bash
npm run all-sql
```

## Estructura de Ejercicios

### 🏗️ Herencia

- **TPH**: Vehículos en una tabla con discriminador
- **TPT**: Empleados con tabla base + específicas
- **TPC**: Productos en tablas separadas

### 🔗 Relaciones

- **1:1**: Usuario ↔ Perfil
- **1:N**: Cliente → Órdenes
- **N:M**: Estudiantes ↔ Cursos

## Tecnologías

- **SQLite**: Base de datos embebida
- **better-sqlite3**: Driver optimizado
- **TypeScript**: Tipado estático
- **SQL plano**: Sin ORM, consultas directas

## Archivos Generados

Los ejercicios crean archivos `.sqlite` automáticamente:

- `ejercicio-tph.sqlite`
- `ejercicio-tpt.sqlite`
- `ejercicio-tpc.sqlite`
- `ejercicio-one-to-one.sqlite`
- `ejercicio-one-to-many.sqlite`
- `ejercicio-many-to-many.sqlite`

## Limpieza

```bash
npm run clean    # Elimina archivos generados
```

## Navegación

El menú interactivo permite:

1. Seleccionar tipo de ejercicio (Herencia/Relaciones)
2. Ejecutar ejercicios específicos
3. Ver análisis y conclusiones
4. Comparar diferentes enfoques

## Tests (Jest)

Los tests están junto a cada ejercicio con el sufijo `exercise.spec.ts` y usan `describe/it`.

```bash
npm test                                        # Ejecutar todos
npm run test -- src/02-relaciones/many-to-many/exercise.spec.ts  # Un archivo
npm run test -- -t "getAllEnrollments"          # Un test por nombre
```

Notas:

- Las consultas forman parte del ejercicio: las firmas están tipadas y no incluyen SQL de ejemplo.
- Varios tests comparan cantidades exactas basadas en los datasets exportados.

¡Listo para empezar! 🎯
