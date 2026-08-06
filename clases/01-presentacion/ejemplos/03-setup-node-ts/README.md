# Setup: un proyecto Node + TypeScript desde cero

Primer paso de la Parte 2 de Clase 1: armar un proyecto Node + TypeScript vacío, terminando
en un script mínimo que imprime `Hello, world!`. Todo lo que sigue se hace **dentro de esta
carpeta** (`cd clases/01-presentacion/ejemplos/03-setup-node-ts` si estás en la raíz del repo).

Después de este setup, el resto de la Parte 2 sigue en `ejemplos/04-cli-ts-intro/`, que ya
viene armado de la misma manera para no repetir estos pasos.

## 1. Inicializar el proyecto

```bash
npm init -y
npm install typescript@^5.5.0 --save-dev
npm install @types/node --save-dev
npm install ts-node --save-dev
```

(`typescript@^5.5.0`, no la última versión: al momento de escribir esto, la versión más
nueva de TypeScript rompe `ts-node@10` — instalarla sin fijar versión da un error críptico
al correr cualquier script.)

## 2. `tsconfig.json`

```bash
./node_modules/.bin/tsc --init | cat
```

Editar para que quede así:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src"]
}
```

## 3. Hello world

Crear `src/index.ts`:

```ts
console.log("Hello, world!");
```

Agregar en `package.json`, dentro de `"scripts"`:

```json
"hello": "ts-node src/index.ts"
```

Correr:

```bash
npm run hello
```

Debería imprimir `Hello, world!`.
