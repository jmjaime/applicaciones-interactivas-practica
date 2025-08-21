# Ejercicio 6: Objetos Embebidos en TypeORM

## 🎯 Objetivo

Aprender a implementar y utilizar **objetos embebidos** en TypeORM para mapear estructuras de datos complejas a columnas de base de datos, incluyendo el uso de **transformers** para arrays y objetos JSON.

## 📚 Conceptos Clave

### 🏗️ ¿Qué son los Objetos Embebidos?

Los objetos embebidos son clases que se "aplanan" en la tabla de la entidad principal, permitiendo organizar la lógica de negocio sin crear relaciones entre tablas separadas.

### 🔧 Técnicas Implementadas

| Técnica                 | Descripción                | Ejemplo                            |
| ----------------------- | -------------------------- | ---------------------------------- |
| **Objetos Embebidos**   | `@Column(() => Class)`     | PersonalInfo, ContactInfo, Address |
| **Transformers Arrays** | Conversión string ↔ array  | `interests: string[]`              |
| **Transformers JSON**   | Conversión string ↔ object | `preferences: {...}`               |
| **Prefijos**            | Prefijos para columnas     | `{ prefix: "contact_" }`           |

## 🚀 Ejecutar el Ejercicio

```bash
# Desde el directorio raíz del proyecto
npm run embedded

# O específicamente
npx ts-node src/ejercicio-06-embedded/example.ts
```

## 🏗️ Estructura del Proyecto

```
ejercicio-06-embedded/
├── entities/
│   ├── PersonalInfo.ts      # Información personal embebida
│   ├── ContactInfo.ts       # Información de contacto embebida
│   ├── Address.ts           # Dirección embebida
│   ├── Student.ts           # Entidad principal con objetos embebidos
│   └── Course.ts            # Entidad de curso con contenido embebido
├── example.ts               # Ejemplo principal
└── README.md               # Este archivo
```

## 📋 Entidades y Objetos Embebidos

### 1. PersonalInfo (Objeto Embebido)

```typescript
export class PersonalInfo {
  @Column({ length: 100, nullable: false })
  firstName: string;

  @Column({ length: 100, nullable: false })
  lastName: string;

  @Column({ type: "date", nullable: true })
  birthDate?: Date;

  @Column({ type: "enum", enum: Gender, nullable: true })
  gender?: Gender;

  // Métodos de negocio
  getFullName(): string;
  getAge(): number | null;
  isAdult(): boolean;
}
```

### 2. ContactInfo (Objeto Embebido)

```typescript
export class ContactInfo {
  @Column({ length: 255, nullable: false })
  email: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({
    type: "enum",
    enum: ContactPreference,
    default: ContactPreference.EMAIL,
  })
  preferredContactMethod: ContactPreference;

  @Column({ type: "boolean", default: true })
  isEmailVerified: boolean;

  // Métodos de negocio
  isValidEmail(): boolean;
  canBeContacted(): boolean;
  getContactScore(): number;
}
```

### 3. Address (Objeto Embebido)

```typescript
export class Address {
  @Column({ length: 200, nullable: true })
  street?: string;

  @Column({ length: 100, nullable: true })
  city?: string;

  @Column({ length: 100, nullable: true })
  state?: string;

  @Column({ length: 100, nullable: true })
  country?: string;

  @Column({ type: "decimal", precision: 10, scale: 8, nullable: true })
  latitude?: number;

  @Column({ type: "decimal", precision: 11, scale: 8, nullable: true })
  longitude?: number;

  // Métodos de negocio
  getFullAddress(): string;
  hasCoordinates(): boolean;
  getDistanceFrom(other: Address): number | null;
}
```

### 4. Student (Entidad Principal)

```typescript
@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true, nullable: false })
  studentId: string;

  // Objetos embebidos con prefijos
  @Column(() => PersonalInfo, { prefix: "personal_" })
  personalInfo: PersonalInfo;

  @Column(() => ContactInfo, { prefix: "contact_" })
  contactInfo: ContactInfo;

  @Column(() => Address, { prefix: "address_" })
  address: Address;

  // Arrays con transformers
  @Column({
    type: "text",
    transformer: {
      to: (value: string[]) => (value ? value.join(",") : ""),
      from: (value: string) =>
        value ? value.split(",").filter((v) => v.trim() !== "") : [],
    },
  })
  interests: string[];

  // JSON con transformers
  @Column({
    type: "text",
    transformer: {
      to: (value: any) => JSON.stringify(value),
      from: (value: string) => JSON.parse(value || "{}"),
    },
  })
  preferences: {
    theme?: string;
    notifications?: boolean;
    accessibility?: {
      screenReader?: boolean;
      fontSize?: "small" | "medium" | "large";
    };
  };
}
```

## 🗄️ Esquema de Base de Datos

### Tabla: student

```sql
CREATE TABLE student (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    studentId VARCHAR(50) UNIQUE NOT NULL,

    -- Campos de PersonalInfo (prefijo: personal_)
    personal_firstName VARCHAR(100) NOT NULL,
    personal_lastName VARCHAR(100) NOT NULL,
    personal_birthDate DATE,
    personal_gender VARCHAR(20),
    personal_nationality VARCHAR(50),
    personal_documentType VARCHAR(20),
    personal_documentNumber VARCHAR(50),
    personal_biography VARCHAR(200),
    personal_profilePicture VARCHAR(255),
    personal_preferredLanguage VARCHAR(20),
    personal_timezone VARCHAR(50),

    -- Campos de ContactInfo (prefijo: contact_)
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20),
    contact_alternativePhone VARCHAR(20),
    contact_alternativeEmail VARCHAR(255),
    contact_preferredContactMethod VARCHAR(20) DEFAULT 'email',
    contact_isEmailVerified BOOLEAN DEFAULT TRUE,
    contact_isPhoneVerified BOOLEAN DEFAULT FALSE,

    -- Campos de Address (prefijo: address_)
    address_street VARCHAR(200),
    address_streetNumber VARCHAR(50),
    address_apartment VARCHAR(50),
    address_city VARCHAR(100),
    address_state VARCHAR(100),
    address_zipCode VARCHAR(20),
    address_country VARCHAR(100),
    address_latitude DECIMAL(10,8),
    address_longitude DECIMAL(11,8),
    address_type VARCHAR(20) DEFAULT 'home',

    -- Arrays como texto (transformers)
    interests TEXT,
    skills TEXT,
    languages TEXT,

    -- JSON como texto (transformers)
    preferences TEXT,
    academicHistory TEXT,
    progress TEXT,

    -- Otros campos
    status VARCHAR(20) DEFAULT 'active',
    educationLevel VARCHAR(20) DEFAULT 'undergraduate',
    gpa DECIMAL(4,2) DEFAULT 0.00,
    totalCredits INTEGER DEFAULT 0,
    completedCredits INTEGER DEFAULT 0,

    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 📊 Casos de Uso Demostrados

### 1. **Creación de Estudiantes con Objetos Embebidos**

```typescript
// Crear información personal
const personalInfo = new PersonalInfo(
  "María",
  "González",
  new Date("1995-03-15"),
  Gender.FEMALE
);
personalInfo.nationality = "Argentina";
personalInfo.documentType = "DNI";
personalInfo.documentNumber = "42.123.456";

// Crear información de contacto
const contactInfo = new ContactInfo(
  "maria.gonzalez@email.com",
  "+54 11 1234-5678"
);
contactInfo.verifyEmail();

// Crear dirección
const address = new Address(
  "Av. Corrientes",
  "Buenos Aires",
  "CABA",
  "Argentina"
);
address.streetNumber = "1234";
address.setCoordinates(-34.6037, -58.3816);

// Crear estudiante
const student = new Student("STU2024001", personalInfo, contactInfo, address);
```

### 2. **Manipulación de Arrays con Transformers**

```typescript
// Agregar intereses (se almacenan como "AI,Web,ML,DB")
student.addInterest("Inteligencia Artificial");
student.addInterest("Desarrollo Web");
student.addInterest("Machine Learning");

// Agregar habilidades
student.addSkill("JavaScript");
student.addSkill("Python");
student.addSkill("TypeScript");

console.log(student.getInterestsList()); // "AI, Web, ML"
```

### 3. **Manipulación de JSON con Transformers**

```typescript
// Configurar preferencias (se almacenan como JSON string)
student.updatePreferences({
  theme: "dark",
  notifications: true,
  language: "es",
  accessibility: {
    fontSize: "large",
    screenReader: false,
  },
});

// Se almacena como: '{"theme":"dark","notifications":true,...}'
```

### 4. **Consultas con Campos Embebidos**

```typescript
// Buscar por ciudad (campo embebido)
const studentsInBA = await studentRepository
  .createQueryBuilder("student")
  .where("student.address_city = :city", { city: "Buenos Aires" })
  .getMany();

// Buscar por email verificado
const verifiedStudents = await studentRepository
  .createQueryBuilder("student")
  .where("student.contact_isEmailVerified = :verified", { verified: true })
  .getMany();
```

### 5. **Validación de Datos Embebidos**

```typescript
const validation = student.validateStudentData();
if (!validation.isValid) {
  console.log("Errores encontrados:", validation.errors);
}
```

## 🔍 Análisis de Resultados

### Salida del Ejemplo:

```
🚀 Iniciando ejemplo de Objetos Embebidos en TypeORM
============================================================

📝 CASO 1: Crear estudiantes con objetos embebidos
--------------------------------------------------
✅ Estudiante creado:
🎓 STU2024001: María González | Licenciatura | Activo | GPA: 3.80 (Muy bueno) | Progreso: 50%
👤 María González | 29 años | Argentina | Femenino
📞 📧 maria.gonzalez@email.com | 📞 +54 11 1234-5678
🏠 Av. Corrientes 1234, Buenos Aires, CABA
📚 Nivel: Licenciatura | Estado: Activo | GPA: 3.80 | Créditos: 120/240 | Cursos: 15/30
🎯 Intereses: Inteligencia Artificial, Desarrollo Web, Machine Learning, Bases de Datos
💪 Habilidades: JavaScript, Python, TypeScript, React, Node.js
🌍 Idiomas: Español, Inglés, Portugués

📍 Estudiantes en Buenos Aires: 2
  - María González: Av. Corrientes 1234, Buenos Aires, CABA
  - Juan Carlos Pérez: Av. Santa Fe 3456, Buenos Aires, CABA

✅ Estudiantes con email verificado: 2
  - María González: maria.gonzalez@email.com
  - Juan Carlos Pérez: juan.perez@email.com

📚 Cursos más populares:
  1. Desarrollo Web Moderno con TypeScript: 95 inscripciones
  2. Introducción a la Inteligencia Artificial: 45 inscripciones
```

## 💡 Ventajas de los Objetos Embebidos

### ✅ Beneficios:

1. **Organización**: Agrupan lógica relacionada
2. **Reutilización**: Pueden usarse en múltiples entidades
3. **Mantenibilidad**: Cambios centralizados
4. **Performance**: Sin JOINs innecesarios
5. **Validación**: Validaciones específicas por objeto
6. **Métodos de negocio**: Lógica encapsulada

### ⚠️ Consideraciones:

1. **Duplicación**: Los mismos campos en múltiples tablas
2. **Consultas complejas**: Filtros en campos embebidos
3. **Normalización**: Puede violar principios de normalización
4. **Tamaño de tabla**: Tablas más anchas

## 🛠️ Transformers: Arrays y JSON

### Array Transformer

```typescript
@Column({
  type: "text",
  transformer: {
    to: (value: string[]) => value ? value.join(',') : '',
    from: (value: string) => value ? value.split(',').filter(v => v.trim() !== '') : []
  }
})
interests: string[];
```

### JSON Transformer

```typescript
@Column({
  type: "text",
  transformer: {
    to: (value: any) => JSON.stringify(value),
    from: (value: string) => {
      try {
        return JSON.parse(value || '{}');
      } catch {
        return {};
      }
    }
  }
})
preferences: {
  theme?: string;
  notifications?: boolean;
};
```

## 🎮 Ejercicios Propuestos

### Ejercicio Básico

1. Crear un objeto embebido `PaymentInfo` con:
   - Método de pago preferido
   - Información de tarjeta (encriptada)
   - Configuración de facturación

### Ejercicio Intermedio

2. Implementar un sistema de `NotificationSettings` embebido con:
   - Preferencias por canal (email, SMS, push)
   - Horarios de notificación
   - Tipos de notificación permitidos

### Ejercicio Avanzado

3. Crear un objeto embebido `PerformanceMetrics` con:
   - Estadísticas de rendimiento
   - Historial de calificaciones
   - Métricas de engagement

## 🔧 Comandos Útiles

```bash
# Ejecutar el ejemplo
npm run embedded

# Ejecutar con logs SQL
TYPEORM_LOGGING=true npm run embedded

# Ejecutar solo casos específicos
npm run embedded -- --case=1,2,3
```

## 🎯 Puntos Clave Aprendidos

1. **Objetos Embebidos**: Organizan datos relacionados sin crear tablas separadas
2. **Prefijos**: Evitan colisiones de nombres de columnas
3. **Transformers**: Convierten tipos complejos a/desde la base de datos
4. **Consultas**: Usar nombres de columnas "aplanados" en QueryBuilder
5. **Validación**: Implementar validaciones específicas por objeto
6. **Métodos de Negocio**: Encapsular lógica en los objetos embebidos

## 📚 Recursos Adicionales

- [TypeORM Embedded Entities](https://typeorm.io/embedded-entities)
- [Column Transformers](https://typeorm.io/entities#column-types-for-postgres)
- [Custom Column Types](https://typeorm.io/custom-column-types)
- [Query Builder](https://typeorm.io/select-query-builder)

---

**Ejercicio 6 completo** - Objetos Embebidos en TypeORM con transformers para arrays y JSON, consultas avanzadas y validación de datos.
