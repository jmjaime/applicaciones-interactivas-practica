import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../common/data-source";
import { Student } from "./entities/Student";
import { Gender } from "./entities/PersonalInfo";
import {
  clearEmbeddedData,
  createStudentWithEmbedded,
  updateEmbeddedContact,
  findByCityAndGender,
  listWithPreferences,
} from "./exercise";

describe("Ejercicio 06 - Embebidos", () => {
  beforeAll(async () => {
    await initializeDatabase("ej06");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearEmbeddedData();
  });

  it("crea estudiante con embebidos", async () => {
    const student = await createStudentWithEmbedded({
      personal: { firstName: "Ana", lastName: "García" },
      contact: { email: "ana@student.test" },
      address: { street: "Calle 1", city: "CABA", country: "AR" },
    });
    expect(student.id).toBeDefined();
  });

  it("actualiza contact info embebido", async () => {
    await expect(
      updateEmbeddedContact(1, { phone: "+54 11 1234 5678" })
    ).resolves.toBeTruthy();
  });

  it("filtra por ciudad y género usando embebidos", async () => {
    const list = await findByCityAndGender("CABA", Gender.FEMALE);
    expect(Array.isArray(list)).toBe(true);
  });

  it("lista preferencias desde JSON transformer", async () => {
    const list = await listWithPreferences();
    expect(Array.isArray(list)).toBe(true);
  });
});
