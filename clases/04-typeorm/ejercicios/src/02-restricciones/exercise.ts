import "reflect-metadata";
import { AppDataSource } from "../common/data-source";
import { User, PlanType } from "./entities/User";

// Ejercicio 02 – Restricciones de base de datos con TypeORM
// Instrucciones: implementar las funciones marcadas con TODO. Las
// restricciones (`unique`, `@Check`, `@Index`) ya están declaradas en la
// entidad — el trabajo acá es usarlas, no agregar más.

export async function clearAll(): Promise<void> {
  await AppDataSource.getRepository(User).clear();
}

export async function createUser(data: Partial<User>): Promise<User> {
  // TODO: crear y guardar un usuario. Si viola una restricción de la
  // entidad (email/username duplicado, age fuera de rango), dejar que el
  // error de TypeORM se propague — no capturarlo acá.
  throw new Error("TODO: Implement createUser");
}

export async function findUsersByPlan(plan: PlanType): Promise<User[]> {
  // TODO: devolver los usuarios activos de un plan, ordenados por
  // lastName ASC
  throw new Error("TODO: Implement findUsersByPlan");
}

export async function countUsersByPlan(): Promise<Record<PlanType, number>> {
  // TODO: contar cuántos usuarios hay por cada valor de PlanType
  // (incluir los planes sin usuarios con 0, no omitirlos)
  throw new Error("TODO: Implement countUsersByPlan");
}

export async function upgradeToPremium(username: string): Promise<User | null> {
  // TODO: buscar por username y cambiar plan a PREMIUM; devolver null si
  // no existe
  throw new Error("TODO: Implement upgradeToPremium");
}
