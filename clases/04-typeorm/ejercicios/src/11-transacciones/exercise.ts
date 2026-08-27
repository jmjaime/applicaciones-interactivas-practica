import "reflect-metadata";
import { AppDataSource } from "../common/data-source";
import { User } from "./entities/User";
import { Subscription } from "./entities/Subscription";

// Ejercicio 6 – Transacciones con QueryRunner (práctica en casa)
// Instrucciones: implementar purchaseSubscription usando un QueryRunner
// manual (startTransaction/commitTransaction/rollbackTransaction), NO el
// repositorio default de AppDataSource — la operación tiene que ser
// atómica: o se debita el saldo Y se crea la Subscription, o ninguna de
// las dos.

export async function clearAll(): Promise<void> {
  await AppDataSource.getRepository(Subscription).clear();
  await AppDataSource.getRepository(User).clear();
}

export async function createUser(
  username: string,
  walletBalance: number
): Promise<User> {
  const repo = AppDataSource.getRepository(User);
  return repo.save(repo.create({ username, walletBalance }));
}

export async function purchaseSubscription(
  username: string,
  plan: string,
  price: number
): Promise<Subscription> {
  // TODO: usar AppDataSource.createQueryRunner(), connect() y
  // startTransaction(). Dentro de la transacción: buscar el User (con
  // queryRunner.manager, no con AppDataSource.getRepository); si
  // walletBalance < price, lanzar `new Error("Saldo insuficiente")` y
  // hacer rollbackTransaction() antes de relanzar; si alcanza, restar
  // price de walletBalance, guardar el User y crear+guardar la
  // Subscription, todo con queryRunner.manager. Si todo sale bien,
  // commitTransaction() y devolver la Subscription. En cualquier caso,
  // queryRunner.release() al final (en un finally).
  throw new Error("TODO: Implement purchaseSubscription");
}
