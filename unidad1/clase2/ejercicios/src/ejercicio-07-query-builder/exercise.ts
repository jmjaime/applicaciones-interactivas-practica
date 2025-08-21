import "reflect-metadata";
import { AppDataSource } from "../common/data-source";
import { Department } from "./entities/Department";
import { Employee } from "./entities/Employee";
import { Project } from "./entities/Project";
import { Skill } from "./entities/Skill";
import { Task } from "./entities/Task";

// Ejercicio 07 – Query Builder
// Implementá las funciones TODO usando QueryBuilder (joins, agregaciones, ordering, pagination).

export async function clearQBData(): Promise<void> {
  await AppDataSource.getRepository(Task).clear();
  await AppDataSource.getRepository(Project).clear();
  await AppDataSource.getRepository(Skill).clear();
  await AppDataSource.getRepository(Employee).clear();
  await AppDataSource.getRepository(Department).clear();
}

export async function listEmployeesWithDepartment(): Promise<
  Array<{
    id: number;
    employeeId: string;
    fullName: string;
    department: string;
  }>
> {
  // TODO: usar leftJoin para traer employees con department y mapear campos seleccionados
  throw new Error("TODO: Implement listEmployeesWithDepartment");
}

export async function topDepartmentsByAvgSalary(limit: number = 3): Promise<
  Array<{
    departmentId: number;
    department: string;
    avgSalary: number;
    employees: number;
  }>
> {
  // TODO: agrupar por department y calcular AVG(salary), COUNT(*) con order DESC y limit
  throw new Error("TODO: Implement topDepartmentsByAvgSalary");
}

export async function findEmployeesBySkill(
  skillName: string
): Promise<
  Array<{ id: number; employeeId: string; fullName: string; skills: string[] }>
> {
  // TODO: join con skills y filtrar por nombre de skill
  throw new Error("TODO: Implement findEmployeesBySkill");
}

export async function paginateEmployees(
  page: number,
  pageSize: number
): Promise<{
  data: Array<{ id: number; employeeId: string; fullName: string }>;
  total: number;
}> {
  // TODO: construir paginación con skip/take y devolver total
  throw new Error("TODO: Implement paginateEmployees");
}
