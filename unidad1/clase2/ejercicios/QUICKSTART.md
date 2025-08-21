# 🚀 QUICKSTART - Ejercicios TypeORM Clase II

## ⚡ Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Cómo ejecutar

Usá los scripts de test por ejercicio. Implementá en `exercise.ts` y corré su suite:

Para trabajar cada ejercicio, implementá las funciones en `exercise.ts` y corré sus tests:

```bash
# Ejercicio 1
npm run test:ej01

# Ejercicio 2
npm run test:ej02

# Ejercicio 3
npm run test:ej03

# Ejercicio 4
npm run test:ej04

# Ejercicio 5
npm run test:ej05

# Ejercicio 6
npm run test:ej06

# Ejercicio 7
npm run test:ej07

# Ejercicio 8
npm run test:ej08

# Ejercicio 9
npm run test:ej09
```

### 3. Scripts útiles

```bash
# Ver todos los tests
npm run test

# Modo watch
npm run test:watch

# Entorno CI
npm run test:ci

# Limpiar build y bases de datos
npm run clean

# Build y arranque (si tu ejercicio lo requiere)
npm run build && npm start
```

## 📋 Lista de Ejercicios

| #   | Tema                             | Contexto                 | Comando             |
| --- | -------------------------------- | ------------------------ | ------------------- |
| 1   | **Entidades Básicas**            | Sistema de biblioteca    | `npm run test:ej01` |
| 2   | **Restricciones y Validaciones** | Sistema de hospital      | `npm run test:ej02` |
| 3   | **Relaciones**                   | Sistema de restaurante   | `npm run test:ej03` |
| 4   | **Lazy vs Eager Loading**        | Sistema de eventos       | `npm run test:ej04` |
| 5   | **Transacciones**                | Sistema de inventario    | `npm run test:ej05` |
| 6   | **Objetos Embebidos**            | Sistema inmobiliario     | `npm run test:ej06` |
| 7   | **Query Builder**                | Sistema de cursos online | `npm run test:ej07` |
| 8   | **Herencia**                     | Sistema de vehículos     | `npm run test:ej08` |
| 9   | **Optimización**                 | Sistema de e-commerce    | `npm run test:ej09` |

## 🛠️ Estructura del Proyecto

```
ejercicios/
├── src/
│   ├── common/
│   │   └── data-source.ts        # Configuración de BD
│   ├── ejercicio-01-entities/    # Ejercicio 1
│   │   ├── entities/
│   │   │   ├── Library.ts
│   │   │   └── BookGenre.ts
│   │   └── example.ts
│   ├── ejercicio-02-restrictions/  # Ejercicio 2
│   │   └── ... (por implementar)
│   └── ... (resto de ejercicios)
├── package.json
├── tsconfig.json
├── README.md
└── QUICKSTART.md
```

## 🎯 Qué Aprenderás

### Ejercicio 1: Entidades Básicas

- ✅ **Completado** - Implementación completa disponible
- Decoradores `@Entity`, `@Column`, `@PrimaryGeneratedColumn`
- Tipos de datos específicos (decimal, datetime, enum)
- Restricciones de longitud y valores por defecto
- Timestamps automáticos

### Ejercicios 2-9: Por Implementar

- 🔄 **Pendientes** - Implementar en `src/ejercicio-0X-*/exercise.ts`
- Ver especificaciones en el `README.md` de cada ejercicio
- Ejecutar los tests con `npm run test:ej0X`

## 🎓 Recomendaciones

1. **Comenzar con el Ejercicio 1** - Está completamente implementado como ejemplo
2. **Seguir el orden secuencial** - Cada ejercicio construye sobre conceptos previos
3. **Leer los comentarios** - El código incluye explicaciones detalladas
4. **Experimentar** - Modificar las entidades y consultas para entender mejor
5. **Consultar documentación** - Revisar la documentación oficial de TypeORM

## 📚 Recursos Adicionales

- [Documentación oficial de TypeORM](https://typeorm.io/)
- [Guía de decoradores](https://typeorm.io/decorator-reference)
- [Ejemplos oficiales](https://github.com/typeorm/typeorm/tree/master/sample)
- [Archivo clase2.md](../clase2.md) - Contenido teórico de la clase

## 🐛 Troubleshooting

### Error: "Cannot find module"

```bash
npm install
npm run build
```

### Error de base de datos

```bash
# Limpiar base de datos
npm run clean
npm run start:ejercicio1
```

### Error de TypeScript

```bash
# Verificar configuración
npx tsc --noEmit
```

## 💡 Consejos

- La base de datos SQLite se crea automáticamente al ejecutar cualquier ejercicio
- Los logs están habilitados para ver las queries SQL generadas
- Cada ejercicio usa una base de datos limpia (synchronize: true)
- Las entidades están diseñadas para ser diferentes a los ejemplos oficiales

## 🏆 Próximos Pasos

1. Implementar los ejercicios 2-9 siguiendo el patrón del ejercicio 1
2. Crear casos de prueba para cada ejercicio
3. Agregar más ejemplos de uso práctico
4. Documentar patrones y mejores prácticas específicas

---

**¡Comienza ahora con `npm run start:ejercicio1`!** 🚀
