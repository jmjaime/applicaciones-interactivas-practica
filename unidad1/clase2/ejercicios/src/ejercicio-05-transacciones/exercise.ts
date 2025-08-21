import "reflect-metadata";
import { AppDataSource } from "../common/data-source";
import { Member } from "./entities/Member";
import { Book } from "./entities/Book";
import { Loan, ReturnCondition } from "./entities/Loan";
import { Fine } from "./entities/Fine";
import { Payment } from "./entities/Payment";

// Ejercicio 05 – Transacciones
// Instrucciones: Implementá las funciones TODO usando transacciones de TypeORM (queryRunner/manager).
// No modifiques las entidades. Podés agregar helpers privados si lo necesitás.

export async function clearTransactionsData(): Promise<void> {
  const paymentRepo = AppDataSource.getRepository(Payment);
  const fineRepo = AppDataSource.getRepository(Fine);
  const loanRepo = AppDataSource.getRepository(Loan);
  const bookRepo = AppDataSource.getRepository(Book);
  const memberRepo = AppDataSource.getRepository(Member);

  await paymentRepo.clear();
  await fineRepo.clear();
  await loanRepo.clear();
  await bookRepo.clear();
  await memberRepo.clear();
}

export async function createLoanTransactional(
  memberId: number,
  bookId: number
): Promise<Loan> {
  // TODO: crear un préstamo en una transacción atómica
  // - Validar miembro elegible y libro disponible
  // - Crear Loan, actualizar contadores de Member y estado de Book
  // - Confirmar transacción
  throw new Error("TODO: Implement createLoanTransactional");
}

export async function returnLoanTransactional(
  loanId: number,
  condition: ReturnCondition,
  processedBy?: string
): Promise<Loan> {
  // TODO: procesar la devolución en una transacción atómica
  // - Marcar Loan como devuelto con condición
  // - Actualizar Book y Member
  // - Generar multas si corresponde (overdue/damaged)
  throw new Error("TODO: Implement returnLoanTransactional");
}

export async function payFineTransactional(
  memberId: number,
  fineId: number,
  amount: number
): Promise<Payment> {
  // TODO: registrar el pago de una multa en una transacción atómica
  // - Crear Payment, actualizar Fine (amountPaid, status) y Member (totalFinesOwed/paid)
  throw new Error("TODO: Implement payFineTransactional");
}
