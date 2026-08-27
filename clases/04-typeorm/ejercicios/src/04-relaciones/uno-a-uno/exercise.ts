import "reflect-metadata";
import { AppDataSource } from "../../common/data-source";
import { User } from "./entities/User";
import { Subscription, PlanType } from "./entities/Subscription";

// Ejercicio 4.1 – Relación 1:1 — User ↔ Subscription
// Instrucciones: implementar las funciones marcadas con TODO usando
// repositorios de TypeORM.

export async function clearAll(): Promise<void> {
  await AppDataSource.getRepository(Subscription).clear();
  await AppDataSource.getRepository(User).clear();
}

export async function createUserWithSubscription(
  userData: Partial<User>,
  subscriptionData: Omit<Partial<Subscription>, "user">
): Promise<User> {
  // TODO: crear y guardar el User, después crear y guardar la
  // Subscription asociada (subscription.user = el usuario recién creado).
  // Devolver el User con su subscription cargada.
  throw new Error("TODO: Implement createUserWithSubscription");
}

export async function getUserSubscription(
  username: string
): Promise<Subscription | null> {
  // TODO: buscar el usuario por username y devolver su Subscription
  // (usar `relations: ["subscription"]` en el find). Null si no existe
  // usuario o no tiene subscription.
  throw new Error("TODO: Implement getUserSubscription");
}

export async function upgradePlan(
  username: string,
  newPlan: PlanType,
  newPrice: number
): Promise<Subscription | null> {
  // TODO: cambiar el plan y el precio de la Subscription de un usuario;
  // null si no existe usuario o subscription
  throw new Error("TODO: Implement upgradePlan");
}
