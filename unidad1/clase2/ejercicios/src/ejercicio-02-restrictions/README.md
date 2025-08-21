# Ejercicio 2: Restricciones y Validaciones

## 🎯 Objetivo

Implementar restricciones de base de datos y validaciones con `class-validator` en un sistema de gestión hospitalaria.

## 📋 Entidades Implementadas

### 👨‍⚕️ Doctor

Sistema completo de gestión de médicos con todas las restricciones y validaciones.

#### Características principales:

- **Restricciones UNIQUE**: `licenseNumber`, `email`
- **Restricciones CHECK**:
  - `yearsOfExperience >= 0 AND <= 60`
  - `consultationFee >= 0`
- **Índices simples**: `specialty`, `isAvailable`
- **Índices compuestos**:
  - `[specialty, isAvailable]` - Para búsquedas frecuentes
  - `[hospital, department]` - Para organización
- **Validaciones class-validator**: Email, teléfono, longitud de campos, enums

#### Enums implementados:

- `MedicalSpecialty`: 10 especialidades médicas
- `DoctorStatus`: Estados del médico (activo, inactivo, licencia, jubilado)

#### Métodos utilitarios:

- `getFullName()`: Nombre completo con título
- `getSpecialtyDisplayName()`: Nombre de especialidad en español
- `getExperienceLevel()`: Nivel de experiencia (Junior/Intermedio/Senior/Experto)
- `isHighlyRated()`: Verificar si tiene alta calificación
- `canTakePatients()`: Verificar disponibilidad para pacientes

### 👥 Patient

Sistema completo de gestión de pacientes con validaciones médicas.

#### Características principales:

- **Restricciones UNIQUE**: `documentNumber`, `email`
- **Restricciones CHECK**:
  - `age >= 0 AND <= 150`
  - `weight > 0`
  - `height > 0`
- **Índices simples**: `bloodType`, `isActive`
- **Índices compuestos**:
  - `[bloodType]` - Para compatibilidad sanguínea
  - `[insuranceType, insuranceNumber]` - Para verificación de seguro
  - `[status, isActive]` - Para filtros de estado
- **Validaciones class-validator**: Email, teléfono, longitud de campos, enums

#### Enums implementados:

- `BloodType`: 8 tipos sanguíneos (A+, A-, B+, B-, AB+, AB-, O+, O-)
- `Gender`: Género (masculino, femenino, otro)
- `InsuranceType`: 10 tipos de obras sociales argentinas
- `PatientStatus`: Estados del paciente (activo, inactivo, fallecido, transferido)

#### Métodos utilitarios:

- `calculateAge()`: Calcular edad automáticamente
- `getBloodTypeCompatibility()`: Tipos de sangre compatibles
- `getInsuranceDisplayName()`: Nombre de obra social en español
- `getBMI()`: Calcular índice de masa corporal
- `getBMICategory()`: Categoría de IMC
- `isAdult()`, `isChild()`, `isElderly()`: Verificaciones de edad
- `hasChronicCondition()`: Verificar condiciones crónicas

## 🔍 Restricciones Implementadas

### 1. Restricciones UNIQUE

```typescript
@Unique(["licenseNumber"])  // Doctor
@Unique(["email"])          // Doctor y Patient
@Unique(["documentNumber"]) // Patient
```

### 2. Restricciones CHECK

```typescript
@Check(`"yearsOfExperience" >= 0`)
@Check(`"yearsOfExperience" <= 60`)
@Check(`"consultationFee" >= 0`)
@Check(`"age" >= 0`)
@Check(`"age" <= 150`)
@Check(`"weight" > 0`)
@Check(`"height" > 0`)
```

### 3. Índices Simples

```typescript
@Index() // En campos de búsqueda frecuente
```

### 4. Índices Compuestos

```typescript
@Index(["specialty", "isAvailable"])
@Index(["hospital", "department"])
@Index(["insuranceType", "insuranceNumber"])
@Index(["status", "isActive"])
```

## ✅ Validaciones Implementadas

### 1. Validaciones de Longitud

```typescript
@Length(2, 100, { message: "El nombre debe tener entre 2 y 100 caracteres" })
@Length(5, 20, { message: "El número de matrícula debe tener entre 5 y 20 caracteres" })
@Length(7, 20, { message: "El número de documento debe tener entre 7 y 20 caracteres" })
```

### 2. Validaciones de Email

```typescript
@IsEmail({}, { message: "Debe proporcionar un email válido" })
```

### 3. Validaciones de Teléfono

```typescript
@IsPhoneNumber("AR", { message: "Debe proporcionar un número de teléfono argentino válido" })
```

### 4. Validaciones de Rango

```typescript
@Min(0, { message: "Los años de experiencia no pueden ser negativos" })
@Max(60, { message: "Los años de experiencia no pueden exceder 60 años" })
@Min(0, { message: "La edad no puede ser negativa" })
@Max(150, { message: "La edad no puede exceder 150 años" })
```

### 5. Validaciones de Enum

```typescript
@IsEnum(MedicalSpecialty, { message: "Especialidad médica no válida" })
@IsEnum(BloodType, { message: "Tipo de sangre no válido" })
@IsEnum(InsuranceType, { message: "Tipo de obra social no válido" })
```

## 📊 Funcionalidades Destacadas

### 1. Compatibilidad Sanguínea

```typescript
getBloodTypeCompatibility(): BloodType[] {
  // Retorna tipos de sangre compatibles según reglas médicas
}
```

### 2. Cálculo Automático de Edad

```typescript
calculateAge(): number {
  // Calcula edad exacta considerando fecha actual
}
```

### 3. Cálculo de IMC

```typescript
getBMI(): number | null {
  // Calcula índice de masa corporal
}

getBMICategory(): string {
  // Categoriza IMC (Bajo peso, Normal, Sobrepeso, Obesidad)
}
```

### 4. Gestión de Condiciones Crónicas

```typescript
addChronicCondition(condition: string): void
removeChronicCondition(condition: string): void
hasChronicCondition(condition: string): boolean
```

## 🚀 Cómo Ejecutar

```bash
# Instalar dependencias
npm install

# Ejecutar el ejercicio 2
npm run start:ejercicio2
```

## 📝 Ejemplo de Uso

```typescript
// Crear doctor con validaciones
const doctor = new Doctor(
  "María Elena",
  "González",
  "MN-12345",
  MedicalSpecialty.CARDIOLOGY,
  "maria.gonzalez@hospital.com.ar"
);

// Configurar propiedades adicionales
doctor.yearsOfExperience = 15;
doctor.consultationFee = 8500.0;
doctor.hospital = "Hospital Italiano";

// Validar entidad
const errors = await validate(doctor);
if (errors.length > 0) {
  console.log("Errores de validación:", errors);
}

// Crear paciente con validaciones
const patient = new Patient(
  "Juan Carlos",
  "Pérez",
  "12345678",
  BloodType.A_POSITIVE,
  new Date("1985-03-15"),
  Gender.MALE
);

// Calcular edad automáticamente
patient.updateAge();

// Obtener compatibilidad sanguínea
const compatibleTypes = patient.getBloodTypeCompatibility();
```

## 🎯 Conceptos Demostrados

1. **Restricciones UNIQUE**: Prevenir duplicados en campos clave
2. **Restricciones CHECK**: Validar rangos y valores permitidos
3. **Índices**: Optimizar consultas frecuentes
4. **Validaciones class-validator**: Validación de datos en tiempo de ejecución
5. **Enums**: Restringir valores a opciones predefinidas
6. **Métodos utilitarios**: Lógica de negocio en las entidades
7. **Tipos de datos específicos**: Decimal, date, time, json
8. **Campos opcionales**: Flexibilidad en el modelo de datos

## 📈 Consultas Destacadas

### Doctores por especialidad

```typescript
const cardiologists = await doctorRepository.find({
  where: { specialty: MedicalSpecialty.CARDIOLOGY },
});
```

### Pacientes por tipo de sangre

```typescript
const oNegativePatients = await patientRepository.find({
  where: { bloodType: BloodType.O_NEGATIVE },
});
```

### Pacientes pediátricos

```typescript
const pediatricPatients = await patientRepository
  .createQueryBuilder("patient")
  .where("patient.age < :age", { age: 18 })
  .getMany();
```

## 🔧 Manejo de Errores

El ejemplo incluye manejo específico de errores de restricciones:

```typescript
try {
  await repository.save(entity);
} catch (error) {
  if (error.message.includes("UNIQUE constraint failed")) {
    console.error("Error de restricción UNIQUE - Valor duplicado");
  }
  if (error.message.includes("CHECK constraint failed")) {
    console.error("Error de restricción CHECK - Valor fuera del rango");
  }
}
```

## 🏥 Contexto Médico

El ejercicio simula un sistema hospitalario real con:

- Especialidades médicas argentinas
- Obras sociales locales
- Tipos sanguíneos y compatibilidad
- Validaciones médicas (IMC, edad, etc.)
- Gestión de condiciones crónicas
- Contactos de emergencia

## 💡 Mejores Prácticas Implementadas

1. **Validación en múltiples niveles**: Base de datos + aplicación
2. **Mensajes de error descriptivos**: En español para mejor UX
3. **Métodos utilitarios**: Encapsular lógica de negocio
4. **Enums tipados**: Type safety en tiempo de compilación
5. **Índices estratégicos**: Optimización de consultas frecuentes
6. **Campos opcionales**: Flexibilidad sin comprometer integridad
7. **Cálculos automáticos**: Edad, IMC, compatibilidad sanguínea
