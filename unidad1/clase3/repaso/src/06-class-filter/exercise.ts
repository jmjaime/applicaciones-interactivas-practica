/*
Enunciado: clases y filtrado de listas

Objetivo
- Crear una clase `Student` con al menos: `name: string` y `score: number`.
- Implementar la función `findTopStudent(students: Student[], minScore?: number): Student | null`
  que devuelva el estudiante con mayor `score`.
- Si se pasa `minScore`, primero filtrar por `score >= minScore`.
- Si la lista está vacía o no hay coincidencias, devolver `null`.

Pistas (JS/TS)
- Podés usar `Array.prototype.filter` y luego `Array.prototype.reduce` para
  quedarte con el de mayor puntaje.
- Alternativa: hacer un bucle `for` y llevar un seguimiento del mejor hasta el
  momento.

Referencias
- TypeScript - Clases: https://www.typescriptlang.org/docs/handbook/2/classes.html
- MDN - Array.filter: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
- MDN - Array.reduce: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

Tareas del alumno
1. Completar la clase `Student` con propiedades y constructor adecuados.
2. Implementar `findTopStudent`.
*/

// TODO: Implementar la clase con propiedades y constructor
export class Student {}

// TODO: Implementar la función
export function findTopStudent(
  _students: Student[],
  _minScore?: number
): Student | null {
  throw new Error("Not implemented");
}
