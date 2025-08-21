import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../common/data-source";
import {
  clearQBData,
  listEmployeesWithDepartment,
  topDepartmentsByAvgSalary,
  findEmployeesBySkill,
  paginateEmployees,
} from "./exercise";

describe("Ejercicio 07 - Query Builder", () => {
  beforeAll(async () => {
    await initializeDatabase("ej07");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearQBData();
  });

  it("lista empleados con su departamento", async () => {
    const rows = await listEmployeesWithDepartment();
    expect(Array.isArray(rows)).toBe(true);
  });

  it("top departamentos por salario promedio", async () => {
    const rows = await topDepartmentsByAvgSalary(3);
    expect(Array.isArray(rows)).toBe(true);
  });

  it("busca empleados por skill", async () => {
    const rows = await findEmployeesBySkill("Node.js");
    expect(Array.isArray(rows)).toBe(true);
  });

  it("paginación de empleados", async () => {
    const res = await paginateEmployees(1, 10);
    expect(res).toHaveProperty("data");
    expect(res).toHaveProperty("total");
  });
});
