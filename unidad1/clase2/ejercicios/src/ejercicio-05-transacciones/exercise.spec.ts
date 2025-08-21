import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../common/data-source";
import { Member, MemberType } from "./entities/Member";
import { Book, BookStatus } from "./entities/Book";
import { Loan, ReturnCondition } from "./entities/Loan";
import { Fine, FineStatus } from "./entities/Fine";
import { Payment, PaymentMethod } from "./entities/Payment";
import {
  clearTransactionsData,
  createLoanTransactional,
  returnLoanTransactional,
  payFineTransactional,
} from "./exercise";

describe("Ejercicio 05 - Transacciones", () => {
  beforeAll(async () => {
    await initializeDatabase("ej05");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearTransactionsData();
  });

  it("crea un préstamo en transacción atomica", async () => {
    const memberRepo = (await import("./entities/Member")).Member;
    const bookRepo = (await import("./entities/Book")).Book;
    const m = await (await import("typeorm")).getRepository(Member, "default");
    const b = await (await import("typeorm")).getRepository(Book, "default");

    const member = await m.save(
      Object.assign(new Member("Ana", "García", "ana@lib.test"), {
        type: MemberType.PUBLIC,
      })
    );
    const book = await b.save(
      Object.assign(new Book("Libro A", "Autor", "ISBN-1"), {
        status: BookStatus.AVAILABLE,
      })
    );

    const loan = await createLoanTransactional(member.id, book.id);
    expect(loan.id).toBeDefined();
  });

  it("devuelve un préstamo y genera multas si corresponde", async () => {
    await expect(
      returnLoanTransactional(1, ReturnCondition.GOOD, "librarian")
    ).resolves.toBeTruthy();
  });

  it("registra pago de multa en transacción", async () => {
    await expect(payFineTransactional(1, 1, 100)).resolves.toBeTruthy();
  });
});
