# 🚀 Guía Rápida de Inicio

## Configuración Inicial

```bash
# 1. Instalar dependencias
npm install

# 2. Ver opciones disponibles
npm run dev
```

## 🎯 Ejecutar Ejemplos por Categoría

### Mapeo Básico (Recomendado para empezar)

```bash
npm run mapeo-basico-sql
```

### Mappeo Embebido

```bash
npm run mappeo-embebido
```

**Incluye**: Multiple columns, comma-separated, JSON mapping

### Mappeo de Herencia

```bash
npm run mappeo-herencia
```

**Incluye**: Table per hierarchy, table per class, joined table

### Mappeo de Relaciones

```bash
npm run mappeo-relaciones
```

**Incluye**: Relaciones 1:1, 1:N, N:1 y N:M

También puedes ejecutar cada ejemplo individualmente:

```bash
npm run one-to-one-sql   # 1:1 (usuario ↔ perfil)
npm run one-to-many-sql  # 1:N (autor → libros)
npm run many-to-one-sql  # N:1 (libro → autor)
npm run many-to-many-sql # N:M (curso ↔ estudiante)
```

## 🔥 Comandos Más Útiles

```bash
# Ejecutar TODOS los ejemplos
npm run all-sql

# (comparación ORM vs SQL removida en esta clase; ver Clase II)
```

## 📂 Explorar Código

```
src/
├── 01-mapeo-basico/        ← Empezar aquí
├── 02-mappeo-embebido/     ← Luego
├── 03-mappeo-herencia/     ← Después
└── 04-mappeo-relaciones/   ← Finalmente
```

## 🎓 Orden de Aprendizaje

1. **Mapeo Básico**: `npm run mapeo-basico-sql`
2. **Mappeo Embebido**: `npm run mappeo-embebido`
3. **Mappeo de Herencia**: `npm run mappeo-herencia`
4. **Mappeo de Relaciones**: `npm run mappeo-relaciones`

## 🔧 Comandos de Desarrollo

```bash
# Limpiar archivos generados
npm run clean

# Compilar TypeScript
npm run build

# Modo desarrollo con watch
npm run dev:watch
```

## 📊 Bases de Datos Generadas

Cada ejemplo crea archivos `.sqlite` en la raíz del proyecto. Por ejemplo, en relaciones:

- 1:1 → `rel-one-to-one.sqlite`
- 1:N → `rel-one-to-many.sqlite`
- N:1 → `rel-many-to-one.sqlite`
- N:M → `rel-many-to-many.sqlite`

## 💡 Consejos

- Cada ejemplo genera output detallado en la consola
- Revisa los archivos `.sqlite` generados
- Lee los README.md de cada carpeta para más detalles

---

**¡Empieza con `npm run mappeo-embebido` y sigue el orden recomendado!**
