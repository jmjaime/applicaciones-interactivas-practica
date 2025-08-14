import Database from "better-sqlite3";

// Ejercicio: Table Per Type (TPT)
// Objetivo: una tabla base 'employee' + tablas específicas por tipo
// Instrucciones: completar los TODO con SQL para crear tablas e insertar datos.

export type EmployeeBase = {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  salary: number;
};

export type Developer = EmployeeBase & {
  type: "Developer";
  programmingLanguages: string[];
  experienceYears: number;
  seniority: "Junior" | "Mid" | "Senior" | "Lead";
};

export type Manager = EmployeeBase & {
  type: "Manager";
  teamSize: number;
  budget: number;
  level: "Team Lead" | "Manager" | "Director" | "VP";
};

export type Salesperson = EmployeeBase & {
  type: "Salesperson";
  territory: string;
  commissionRate: number; // 0..1
  yearlyQuota: number;
};

export type Employee = Developer | Manager | Salesperson;

// Instancias para persistir
export const employees: Employee[] = [
  {
    type: "Developer",
    firstName: "Ana",
    lastName: "García",
    email: "ana.garcia@company.com",
    department: "Engineering",
    salary: 85000,
    programmingLanguages: ["TypeScript", "Node.js"],
    experienceYears: 4,
    seniority: "Senior",
  },
  {
    type: "Manager",
    firstName: "Roberto",
    lastName: "Martínez",
    email: "roberto.martinez@company.com",
    department: "Engineering",
    salary: 120000,
    teamSize: 8,
    budget: 500000,
    level: "Manager",
  },
  {
    type: "Salesperson",
    firstName: "Laura",
    lastName: "Fernández",
    email: "laura.fernandez@company.com",
    department: "Sales",
    salary: 60000,
    territory: "Europe",
    commissionRate: 0.06,
    yearlyQuota: 600000,
  },
];

export class TablePerTypeExercise {
  private db: Database.Database;

  constructor() {
    this.db = new Database("ejercicio-tpt.sqlite");
  }

  async run(): Promise<void> {
    try {
      await this.createSchema();
      await this.insertData();
      console.log("✅ TPT: datos listos. Agregá consultas si querés.");
    } finally {
      this.db.close();
    }
  }

  async createSchema(): Promise<void> {
    console.log("🔧 TODO: Crear tabla base 'employee' + tablas 'developer', 'manager', 'salesperson'");
    // TODO: Crear tablas con FKs employee(id)
  }

  async insertData(): Promise<void> {
    console.log("📝 TODO: Insertar arreglo 'employees' en base + específicas");
    // TODO: Insertar primero en employee, luego en tabla específica según tipo
  }

  // Consultas (a implementar como parte del ejercicio)
  async getAll(): Promise<Employee[]> {
    // TODO: SELECT de employee (y opcionalmente JOINs por tipo si necesitás)
    return [];
  }

  async getByType(type: Employee["type"]): Promise<Employee[]> {
    // TODO: SELECT filtrando por employee_type
    return [];
  }

  async filterByDepartment(department: string): Promise<Employee[]> {
    // TODO: SELECT filtrando por department
    return [];
  }
}

if (require.main === module) {
  new TablePerTypeExercise().run().catch(console.error);
}


