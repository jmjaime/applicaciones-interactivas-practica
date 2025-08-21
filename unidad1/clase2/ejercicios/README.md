# Ejercicios Clase II - TypeORM

## Ejercicio 1: Entidades Básicas

**Tema**: Definición de entidades y decoradores básicos

**Contexto**: Sistema de gestión de biblioteca

**Entidades a crear**:

- **Library**: Representa una biblioteca con campos como nombre, dirección, teléfono, email, capacidad máxima, fecha de fundación
- **BookGenre**: Representa un género literario con nombre, descripción, código único, popularidad (1-5), activo/inactivo

**Requisitos**:

1. Usar decoradores apropiados para cada tipo de dato
2. Implementar restricciones de longitud en campos de texto
3. Usar tipos específicos (decimal, datetime, enum, etc.)
4. Incluir campos opcionales y con valores por defecto
5. Agregar campos de timestamp (createdAt, updatedAt)

---

## Ejercicio 2: Restricciones y Validaciones

**Tema**: Restricciones de BD y validaciones con class-validator

**Contexto**: Sistema de gestión de hospital

**Entidades a crear**:

- **Doctor**: Con especialidad, número de matrícula único, años de experiencia, disponible (boolean)
- **Patient**: Con número de documento único, obra social, tipo de sangre, fecha de nacimiento

**Requisitos**:

1. Implementar restricciones UNIQUE en campos clave
2. Usar CHECK constraints (ej: años experiencia >= 0)
3. Crear índices simples y compuestos
4. Agregar validaciones con class-validator
5. Implementar enums para especialidad médica y tipo de sangre
6. Usar restricciones de edad mínima/máxima

---

## Ejercicio 3: Relaciones

**Tema**: Relaciones One-to-One, One-to-Many, Many-to-Many

**Contexto**: Sistema de gestión de restaurante

**Entidades a crear**:

- **Chef**: Información del chef
- **Restaurant**: Información del restaurante
- **Menu**: Menús del restaurante
- **Dish**: Platos individuales
- **Ingredient**: Ingredientes para los platos

**Relaciones a implementar**:

1. **One-to-One**: Chef ↔ Restaurant (un chef principal por restaurante)
2. **One-to-Many**: Restaurant → Menu (un restaurante tiene varios menús)
3. **One-to-Many**: Menu → Dish (un menú tiene varios platos)
4. **Many-to-Many**: Dish ↔ Ingredient (un plato tiene varios ingredientes, un ingrediente puede estar en varios platos)

**Requisitos**:

- Implementar todas las relaciones bidireccionales
- Usar JoinColumn y JoinTable apropiadamente
- Configurar cascade operations donde sea necesario

---

## Ejercicio 4: Lazy vs Eager Loading

**Tema**: Estrategias de carga de relaciones

**Contexto**: Sistema de gestión de eventos

**Entidades a crear**:

- **Event**: Evento con información básica
- **Venue**: Lugar donde se realiza el evento
- **Attendee**: Personas que asisten al evento
- **Ticket**: Boletos para el evento

**Requisitos**:

1. Crear dos versiones de las entidades: una con lazy loading y otra con eager loading
2. **Lazy**: Event, Venue, Attendee, Ticket (versión por defecto)
3. **Eager**: EventEager, VenueEager, AttendeeEager, TicketEager
4. Implementar las siguientes relaciones:
   - Event ↔ Venue (One-to-One)
   - Event → Ticket (One-to-Many)
   - Attendee ↔ Ticket (One-to-Many)
5. Crear ejemplos de consultas mostrando la diferencia entre lazy y eager loading

---

## Ejercicio 5: Transacciones

**Tema**: Manejo de transacciones para operaciones complejas

**Contexto**: Sistema de gestión de inventario y ventas

**Entidades a crear**:

- **Customer**: Cliente que realiza compras
- **Inventory**: Inventario de productos
- **Sale**: Venta realizada
- **SaleItem**: Ítems individuales de una venta
- **PaymentLog**: Registro de pagos

**Operaciones transaccionales a implementar**:

1. **Procesar Venta**:

   - Crear registro de venta
   - Crear ítems de venta
   - Reducir inventario
   - Registrar pago
   - Todo debe ser atómico (rollback si falla cualquier paso)

2. **Transferir Inventario**:
   - Reducir stock en ubicación origen
   - Aumentar stock en ubicación destino
   - Crear registro de transferencia

**Requisitos**:

- Implementar usando QueryRunner
- Incluir manejo de errores con try-catch
- Agregar logging de transacciones

---

## Ejercicio 6: Objetos Embebidos

**Tema**: Uso de objetos embebidos para estructuras complejas

**Contexto**: Sistema de gestión de propiedades inmobiliarias

**Entidades a crear**:

- **Property**: Propiedad inmobiliaria
- **PropertyAgent**: Agente inmobiliario

**Objetos embebidos a crear**:

- **Location**: Dirección completa (calle, número, ciudad, provincia, código postal, país)
- **Dimensions**: Dimensiones de la propiedad (área total, área cubierta, número de habitaciones, número de baños)
- **ContactInfo**: Información de contacto (teléfono, email, horarios de atención)

**Requisitos**:

1. Property debe tener Location y Dimensions embebidos
2. PropertyAgent debe tener ContactInfo embebido
3. Crear prefijos personalizados para las columnas embebidas
4. Implementar validaciones en los objetos embebidos

---

## Ejercicio 7: Query Builder

**Tema**: Consultas avanzadas con QueryBuilder

**Contexto**: Sistema de gestión de cursos online

**Entidades a crear**:

- **Instructor**: Instructores de cursos
- **Course**: Cursos disponibles
- **Student**: Estudiantes inscriptos
- **Enrollment**: Inscripciones de estudiantes a cursos
- **Review**: Reseñas de cursos

**Consultas a implementar**:

1. **Consulta básica**: Cursos activos ordenados por fecha de creación
2. **Consulta con JOIN**: Cursos con información del instructor
3. **Consulta con agregaciones**: Promedio de calificaciones por curso
4. **Consulta compleja**: Instructores con más de X cursos y rating promedio mayor a Y
5. **Consulta con subquery**: Estudiantes que no han completado ningún curso
6. **Consulta con paginación**: Cursos con paginación y filtros

**Requisitos**:

- Usar diversos tipos de JOIN (INNER, LEFT, RIGHT)
- Implementar GROUP BY y HAVING
- Usar parámetros en las consultas
- Incluir ordenamiento y paginación

---

## Ejercicio 8: Herencia

**Tema**: Estrategias de herencia en TypeORM

**Contexto**: Sistema de gestión de vehículos

**Entidades base**:

- **Vehicle**: Clase base con marca, modelo, año, precio

**Entidades derivadas**:

- **Car**: Automóvil (número de puertas, tipo de combustible)
- **Motorcycle**: Motocicleta (cilindrada, tipo de motor)
- **Truck**: Camión (capacidad de carga, tipo de carga)

**Implementar tres estrategias**:

1. **Table per Hierarchy (Single Table)**:

   - Una sola tabla con columna discriminadora
   - Archivo: `table-per-hierarchy/entities.ts`

2. **Table per Class (Concrete Table)**:

   - Tabla separada para cada clase concreta
   - Archivo: `table-per-class/entities.ts`

3. **Table per Type (Joined Table)**:
   - Tabla base + tablas para cada subclase
   - Archivo: `joined-table/entities.ts`

**Requisitos**:

- Implementar las tres estrategias
- Crear ejemplos de uso para cada una
- Documentar ventajas y desventajas de cada estrategia

---

## Ejercicio 9: Optimización de Performance

**Tema**: Técnicas de optimización y mejores prácticas

**Contexto**: Sistema de e-commerce

**Entidades a crear**:

- **Supplier**: Proveedor de productos
- **ProductCategory**: Categoría de productos
- **Product**: Productos del catálogo
- **CustomerOrder**: Pedidos de clientes
- **OrderLine**: Líneas de pedido

**Problemas de performance a solucionar**:

1. **Problema N+1**:

   - Crear consulta problemática que genere N+1 queries
   - Optimizar usando relaciones y JOINs

2. **Consultas ineficientes**:

   - Seleccionar solo campos necesarios
   - Implementar paginación eficiente
   - Usar índices apropiados

3. **Bulk Operations**:
   - Operaciones masivas de inserción/actualización
   - Usar QueryBuilder para operaciones bulk

**Requisitos**:

- Documentar el problema antes de la optimización
- Implementar la solución optimizada
- Comparar performance usando timing
- Incluir índices estratégicos
- Implementar repositorio personalizado con métodos optimizados

---

## Configuración del Proyecto

### Archivos base necesarios:

1. **package.json**: Dependencias del proyecto
2. **tsconfig.json**: Configuración de TypeScript
3. **data-source.ts**: Configuración de la base de datos
4. **setup-database.ts**: Script para inicializar la BD

### Comandos útiles:

```bash
# Instalar dependencias
npm install

# Ejecutar tests de un ejercicio específico
npm run test:ej01   # Ejercicio 1
npm run test:ej02   # Ejercicio 2
...
npm run test:ej09   # Ejercicio 9
```

### Estructura de archivos

```
ejercicios/
├── src/
│   ├── ejercicio-01-entities/
│   │   ├── entities/
│   │   │   ├── Library.ts
│   │   │   └── BookGenre.ts
│   │   └── example.ts
│   ├── ejercicio-02-restrictions/
│   │   ├── entities/
│   │   │   ├── Doctor.ts
│   │   │   └── Patient.ts
│   │   ├── exercise.ts
│   │   └── exercise.spec.ts
│   └── ... (resto de ejercicios)
├── package.json
├── tsconfig.json
└── README.md
```

---

## Criterios de Evaluación

Cada ejercicio será evaluado según:

1. **Correctitud**: Implementación correcta de los conceptos
2. **Buenas prácticas**: Uso apropiado de decoradores y patrones
3. **Código limpio**: Nombres descriptivos y estructura clara
4. **Documentación**: Comentarios explicativos donde sea necesario
5. **Funcionalidad**: El código debe ejecutar sin errores
6. **Creatividad**: Uso apropiado del contexto propuesto

---

## Notas Importantes

- Las soluciones van en `exercise.ts` y se validan con `exercise.spec.ts`.
- Incluir validaciones apropiadas en cada entidad.
- Usar tipos de datos específicos según el contexto.
- Implementar manejo de errores donde sea necesario.
- Documentar las decisiones de diseño importantes.
