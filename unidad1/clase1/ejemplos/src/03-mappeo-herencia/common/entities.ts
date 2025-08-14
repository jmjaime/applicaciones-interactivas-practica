// ============================================================================
// ENTIDADES BASE PARA DEMOSTRAR MAPEO DE HERENCIA
// ============================================================================

/**
 * Clase base abstracta para todos los empleados
 */
export abstract class Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  salary: number;
  hireDate: Date;
  
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    salary: number,
    hireDate: Date = new Date()
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.salary = salary;
    this.hireDate = hireDate;
  }

  abstract getEmployeeType(): string;
  abstract getDisplayInfo(): string;
}

/**
 * Desarrollador - hereda de Employee
 */
export class Developer extends Employee {
  programmingLanguages: string[];
  experienceYears: number;
  framework?: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    salary: number,
    programmingLanguages: string[],
    experienceYears: number,
    framework?: string,
    hireDate: Date = new Date()
  ) {
    super(firstName, lastName, email, salary, hireDate);
    this.programmingLanguages = programmingLanguages;
    this.experienceYears = experienceYears;
    this.framework = framework;
  }

  getEmployeeType(): string {
    return "Developer";
  }

  getDisplayInfo(): string {
    return `${this.firstName} ${this.lastName} - Developer (${this.programmingLanguages.join(", ")}) - ${this.experienceYears} years`;
  }
}

/**
 * Manager - hereda de Employee
 */
export class Manager extends Employee {
  department: string;
  teamSize: number;
  budget: number;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    salary: number,
    department: string,
    teamSize: number,
    budget: number,
    hireDate: Date = new Date()
  ) {
    super(firstName, lastName, email, salary, hireDate);
    this.department = department;
    this.teamSize = teamSize;
    this.budget = budget;
  }

  getEmployeeType(): string {
    return "Manager";
  }

  getDisplayInfo(): string {
    return `${this.firstName} ${this.lastName} - Manager of ${this.department} (${this.teamSize} team members)`;
  }
}

/**
 * Designer - hereda de Employee
 */
export class Designer extends Employee {
  designTools: string[];
  specialization: string;
  portfolioUrl?: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    salary: number,
    designTools: string[],
    specialization: string,
    portfolioUrl?: string,
    hireDate: Date = new Date()
  ) {
    super(firstName, lastName, email, salary, hireDate);
    this.designTools = designTools;
    this.specialization = specialization;
    this.portfolioUrl = portfolioUrl;
  }

  getEmployeeType(): string {
    return "Designer";
  }

  getDisplayInfo(): string {
    return `${this.firstName} ${this.lastName} - ${this.specialization} Designer (${this.designTools.join(", ")})`;
  }
}

/**
 * Sales Representative - hereda de Employee
 */
export class SalesRep extends Employee {
  territory: string;
  commissionRate: number;
  salesTarget: number;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    salary: number,
    territory: string,
    commissionRate: number,
    salesTarget: number,
    hireDate: Date = new Date()
  ) {
    super(firstName, lastName, email, salary, hireDate);
    this.territory = territory;
    this.commissionRate = commissionRate;
    this.salesTarget = salesTarget;
  }

  getEmployeeType(): string {
    return "SalesRep";
  }

  getDisplayInfo(): string {
    return `${this.firstName} ${this.lastName} - Sales Rep (${this.territory}) - Target: $${this.salesTarget}`;
  }
}

// ============================================================================
// TIPOS UTILITARIOS Y INTERFACES
// ============================================================================

export type EmployeeType = 'Developer' | 'Manager' | 'Designer' | 'SalesRep';

export interface EmployeeStats {
  totalEmployees: number;
  byType: Record<EmployeeType, number>;
  averageSalary: number;
  totalSalaries: number;
}
