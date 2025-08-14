import { Employee, Developer, Manager, Designer, SalesRep } from "./entities";

// ============================================================================
// DATOS DE EJEMPLO PARA DEMOSTRAR MAPEO DE HERENCIA
// ============================================================================

export const sampleEmployees: Employee[] = [
  // Developers
  new Developer(
    "Ana",
    "García",
    "ana.garcia@company.com",
    75000,
    ["TypeScript", "React", "Node.js"],
    5,
    "Next.js",
    new Date("2019-03-15")
  ),
  
  new Developer(
    "Carlos",
    "Rodríguez",
    "carlos.rodriguez@company.com",
    85000,
    ["Python", "Django", "PostgreSQL"],
    8,
    "FastAPI",
    new Date("2016-07-22")
  ),
  
  new Developer(
    "María",
    "López",
    "maria.lopez@company.com",
    65000,
    ["Java", "Spring", "MySQL"],
    3,
    "Spring Boot",
    new Date("2021-01-10")
  ),

  // Managers
  new Manager(
    "Roberto",
    "Martínez",
    "roberto.martinez@company.com",
    95000,
    "Engineering",
    12,
    500000,
    new Date("2015-09-01")
  ),
  
  new Manager(
    "Laura",
    "Fernández",
    "laura.fernandez@company.com",
    90000,
    "Product",
    8,
    300000,
    new Date("2017-11-15")
  ),

  // Designers
  new Designer(
    "Diego",
    "Sánchez",
    "diego.sanchez@company.com",
    70000,
    ["Figma", "Adobe XD", "Sketch"],
    "UI/UX",
    "https://diegosanchez.design",
    new Date("2018-05-20")
  ),
  
  new Designer(
    "Sofia",
    "Jiménez",
    "sofia.jimenez@company.com",
    68000,
    ["Photoshop", "Illustrator", "InDesign"],
    "Graphic",
    "https://sofiajimenez.portfolio",
    new Date("2019-08-12")
  ),

  // Sales Representatives
  new SalesRep(
    "Andrés",
    "Morales",
    "andres.morales@company.com",
    60000,
    "North America",
    0.05,
    1200000,
    new Date("2020-02-14")
  ),
  
  new SalesRep(
    "Carmen",
    "Vega",
    "carmen.vega@company.com",
    55000,
    "Europe",
    0.04,
    800000,
    new Date("2020-06-30")
  ),
  
  new SalesRep(
    "Luis",
    "Herrera",
    "luis.herrera@company.com",
    58000,
    "South America",
    0.045,
    900000,
    new Date("2021-04-18")
  ),
];

// ============================================================================
// UTILIDADES PARA TRABAJAR CON LOS DATOS
// ============================================================================

export function getEmployeesByType<T extends Employee>(
  employees: Employee[],
  type: new (...args: any[]) => T
): T[] {
  return employees.filter((emp) => emp instanceof type) as T[];
}

export function calculateStats(employees: Employee[]) {
  const stats = {
    totalEmployees: employees.length,
    byType: {
      Developer: 0,
      Manager: 0,
      Designer: 0,
      SalesRep: 0,
    },
    averageSalary: 0,
    totalSalaries: 0,
  };

  employees.forEach((emp) => {
    stats.totalSalaries += emp.salary;
    
    if (emp instanceof Developer) stats.byType.Developer++;
    else if (emp instanceof Manager) stats.byType.Manager++;
    else if (emp instanceof Designer) stats.byType.Designer++;
    else if (emp instanceof SalesRep) stats.byType.SalesRep++;
  });

  stats.averageSalary = stats.totalSalaries / stats.totalEmployees;
  
  return stats;
}

export function printEmployeeList(employees: Employee[], title: string = "Employee List") {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`📋 ${title}`);
  console.log(`${"=".repeat(60)}`);
  
  employees.forEach((emp, index) => {
    console.log(`${index + 1}. ${emp.getDisplayInfo()}`);
    console.log(`   📧 ${emp.email} | 💰 $${emp.salary.toLocaleString()}`);
  });
  
  const stats = calculateStats(employees);
  console.log(`\n📊 Estadísticas:`);
  console.log(`   Total: ${stats.totalEmployees} empleados`);
  console.log(`   Desarrolladores: ${stats.byType.Developer}`);
  console.log(`   Managers: ${stats.byType.Manager}`);
  console.log(`   Diseñadores: ${stats.byType.Designer}`);
  console.log(`   Ventas: ${stats.byType.SalesRep}`);
  console.log(`   Salario promedio: $${stats.averageSalary.toLocaleString()}`);
}
