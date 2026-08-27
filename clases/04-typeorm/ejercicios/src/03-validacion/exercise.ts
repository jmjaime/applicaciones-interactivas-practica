import "reflect-metadata";
import { validate } from "class-validator";
import { AppDataSource } from "../common/data-source";
import { User } from "./entities/User";

// Ejercicio 03 – Validación de aplicación con class-validator
// Construye sobre 02-restricciones: misma entidad `User`, ahora con
// decoradores de class-validator. La validación acá pasa ANTES de tocar
// la base de datos — nada de esto dispara una consulta SQL.

export async function clearAll(): Promise<void> {
  await AppDataSource.getRepository(User).clear();
}

export async function validateUser(data: Partial<User>): Promise<string[]> {
  // TODO: crear una instancia de User con Object.assign(new User(), data),
  // correr validate() de class-validator, y devolver los mensajes de
  // error (uno por cada constraint violada) como array de strings. Si es
  // válido, devolver un array vacío.
  throw new Error("TODO: Implement validateUser");
}

export async function createValidUser(data: Partial<User>): Promise<User> {
  // TODO: validar con validateUser(); si hay errores, lanzar un Error con
  // los mensajes unidos por ", " SIN guardar nada en la base. Si es
  // válido, recién ahí guardar con el repositorio y devolver el usuario.
  throw new Error("TODO: Implement createValidUser");
}

export async function countInvalid(
  usersData: Array<Partial<User>>
): Promise<number> {
  // TODO: contar cuántos de los usuarios en usersData fallarían la
  // validación, SIN guardar ninguno en la base
  throw new Error("TODO: Implement countInvalid");
}
