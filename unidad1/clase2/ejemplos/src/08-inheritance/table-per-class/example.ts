import "reflect-metadata";
import { DataSource } from "typeorm";
import { Employee, Developer, Manager, Designer, SalesRep } from "./entities";

// ============================================================================
// TABLE PER CLASS (TPC) - TYPEORM EXAMPLE
// Herencia verdadera con cada clase concreta extendiendo Employee
// ============================================================================

class TablePerClassORM {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: "sqlite",
      database: "table-per-class-orm.sqlite",
      entities: [Developer, Manager, Designer, SalesRep],
      synchronize: true,
      logging: false,
    });
  }

  async initialize(): Promise<void> {
    console.log("🔧 Inicializando Table Per Class con TypeORM...");
    await this.dataSource.initialize();
    console.log("✅ Conexión establecida y esquema sincronizado");
  }

  async insertSampleData(): Promise<void> {
    console.log("📊 Insertando datos de ejemplo...");

    // Developer 1
    const developer = new Developer();
    developer.firstName = "Ana";
    developer.lastName = "García";
    developer.email = "ana.garcia@company.com";
    developer.salary = 75000;
    developer.hireDate = new Date("2019-03-15");
    developer.programmingLanguages = ["TypeScript", "React", "Node.js"];
    developer.experienceYears = 5;
    developer.framework = "Next.js";

    // Developer 2
    const developer2 = new Developer();
    developer2.firstName = "Carlos";
    developer2.lastName = "López";
    developer2.email = "carlos.lopez@company.com";
    developer2.salary = 68000;
    developer2.hireDate = new Date("2020-01-10");
    developer2.programmingLanguages = ["Python", "Django", "PostgreSQL"];
    developer2.experienceYears = 3;
    developer2.framework = "FastAPI";

    // Manager
    const manager = new Manager();
    manager.firstName = "Roberto";
    manager.lastName = "Martínez";
    manager.email = "roberto.martinez@company.com";
    manager.salary = 95000;
    manager.hireDate = new Date("2015-09-01");
    manager.department = "Engineering";
    manager.teamSize = 12;
    manager.budget = 500000;

    // Designer
    const designer = new Designer();
    designer.firstName = "Diego";
    designer.lastName = "Sánchez";
    designer.email = "diego.sanchez@company.com";
    designer.salary = 70000;
    designer.hireDate = new Date("2018-05-20");
    designer.designTools = ["Figma", "Adobe XD", "Sketch"];
    designer.specialization = "UI/UX";
    designer.portfolioUrl = "https://diegosanchez.design";

    // Sales Rep
    const salesRep = new SalesRep();
    salesRep.firstName = "Carmen";
    salesRep.lastName = "Vega";
    salesRep.email = "carmen.vega@company.com";
    salesRep.salary = 55000;
    salesRep.hireDate = new Date("2020-06-30");
    salesRep.territory = "Europe";
    salesRep.commissionRate = 0.04;
    salesRep.salesTarget = 800000;

    // Guardar directamente en cada repositorio
    await this.dataSource
      .getRepository(Developer)
      .save([developer, developer2]);
    await this.dataSource.getRepository(Manager).save(manager);
    await this.dataSource.getRepository(Designer).save(designer);
    await this.dataSource.getRepository(SalesRep).save(salesRep);

    console.log(`✅ 5 empleados insertados correctamente`);
  }

  async demonstrateQueries(): Promise<void> {
    console.log("\n" + "=".repeat(70));
    console.log("🔍 CONSULTAS TABLE PER CLASS VERDADERO - TYPEORM");
    console.log("=".repeat(70));

    // 1. Consulta polimórfica manual (TPC verdadero requiere esto)
    console.log(
      "\n📋 1. TODOS LOS EMPLEADOS (consulta polimórfica manual en TPC):"
    );
    const developers = await this.dataSource.getRepository(Developer).find();
    const managers = await this.dataSource.getRepository(Manager).find();
    const designers = await this.dataSource.getRepository(Designer).find();
    const salesReps = await this.dataSource.getRepository(SalesRep).find();

    const allEmployees: Employee[] = [
      ...developers,
      ...managers,
      ...designers,
      ...salesReps,
    ];
    allEmployees.sort((a, b) => b.salary - a.salary);

    allEmployees.forEach((emp, index) => {
      console.log(
        `   ${
          index + 1
        }. ${emp.getDisplayInfo()} ($${emp.salary.toLocaleString()})`
      );
    });

    // 2. Solo desarrolladores (acceso directo a tabla específica)
    console.log("\n💻 2. DESARROLLADORES (acceso directo a tabla específica):");
    const devs = await this.dataSource.getRepository(Developer).find({
      order: { experienceYears: "DESC" },
    });
    devs.forEach((dev, index) => {
      console.log(`   ${index + 1}. ${dev.getDisplayInfo()}`);
      console.log(`      🛠️ Framework: ${dev.framework || "N/A"}`);
      console.log(`      💰 Salario: $${dev.salary.toLocaleString()}`);
    });

    // 3. Solo managers (acceso directo a tabla específica)
    console.log("\n👔 3. MANAGERS (acceso directo a tabla específica):");
    const mgrs = await this.dataSource.getRepository(Manager).find({
      order: { budget: "DESC" },
    });
    mgrs.forEach((mgr, index) => {
      console.log(`   ${index + 1}. ${mgr.getDisplayInfo()}`);
      console.log(`      💼 Presupuesto: $${mgr.budget.toLocaleString()}`);
      console.log(`      💰 Salario: $${mgr.salary.toLocaleString()}`);
    });

    // 4. Búsqueda polimórfica con criterios
    console.log("\n💰 4. EMPLEADOS CON SALARIO > $70,000 (búsqueda manual):");
    const highSalaryEmployees = allEmployees.filter(
      (emp) => emp.salary > 70000
    );
    highSalaryEmployees.forEach((emp, index) => {
      console.log(
        `   ${
          index + 1
        }. ${emp.getDisplayInfo()} ($${emp.salary.toLocaleString()})`
      );
    });

    // 5. Estadísticas calculadas manualmente
    console.log("\n📊 5. ESTADÍSTICAS (calculadas manualmente):");
    const stats = [
      {
        type: "Developer",
        count: developers.length,
        avgSalary:
          developers.reduce((sum, emp) => sum + emp.salary, 0) /
          developers.length,
      },
      {
        type: "Manager",
        count: managers.length,
        avgSalary:
          managers.reduce((sum, emp) => sum + emp.salary, 0) / managers.length,
      },
      {
        type: "Designer",
        count: designers.length,
        avgSalary:
          designers.reduce((sum, emp) => sum + emp.salary, 0) /
          designers.length,
      },
      {
        type: "SalesRep",
        count: salesReps.length,
        avgSalary:
          salesReps.reduce((sum, emp) => sum + emp.salary, 0) /
          salesReps.length,
      },
    ].sort((a, b) => b.avgSalary - a.avgSalary);

    stats.forEach((stat) => {
      console.log(
        `   ${stat.type}: ${stat.count} empleados (Promedio: $${Math.round(
          stat.avgSalary
        ).toLocaleString()})`
      );
    });

    // 6. Demostración de herencia (polimorfismo en código)
    console.log("\n🧬 6. DEMOSTRACIÓN DE HERENCIA (polimorfismo):");
    const employeeReferences: Employee[] = [
      developers[0],
      managers[0],
      designers[0],
    ];
    employeeReferences.forEach((emp, index) => {
      console.log(`   ${index + 1}. ${emp.getDisplayInfo()}`);
      console.log(`      Tipo: ${emp.constructor.name}`);
    });
  }

  showStructure(): void {
    console.log("\n" + "=".repeat(70));
    console.log("🏗️ ESTRUCTURA TABLE PER CLASS VERDADERO - TYPEORM");
    console.log("=".repeat(70));
    console.log("📋 Estrategia utilizada:");
    console.log("   • abstract class Employee - NO se mapea a tabla");
    console.log("   • class Developer extends Employee - herencia verdadera");
    console.log(
      "   • @Entity('table_name') - cada clase concreta tiene su tabla"
    );
    console.log(
      "   • Cada tabla tiene TODOS los campos (heredados + específicos)"
    );
    console.log("");
    console.log("📋 Tablas generadas:");
    console.log(
      "   ├── developers (id, firstName, lastName, email, salary, hireDate + programmingLanguages, experienceYears, framework)"
    );
    console.log(
      "   ├── managers (id, firstName, lastName, email, salary, hireDate + department, teamSize, budget)"
    );
    console.log(
      "   ├── designers (id, firstName, lastName, email, salary, hireDate + designTools, specialization, portfolioUrl)"
    );
    console.log(
      "   └── sales_reps (id, firstName, lastName, email, salary, hireDate + territory, commissionRate, salesTarget)"
    );
    console.log("");
    console.log("✅ CARACTERÍSTICAS TPC VERDADERO:");
    console.log("   • ✅ Herencia real en código: extends Employee");
    console.log("   • ✅ Sin tabla base: Employee es abstract");
    console.log("   • ✅ Cada tabla independiente y completa");
    console.log("   • ✅ Sin relaciones entre tablas");
    console.log("   • ✅ Polimorfismo a nivel de código");
    console.log("");
    console.log("⚠️ LIMITACIONES TPC:");
    console.log("   • ❌ No hay consultas polimórficas automáticas");
    console.log("   • ❌ Necesita consultas manuales a cada repositorio");
    console.log("   • ❌ Duplicación de estructura en cada tabla");
    console.log("   • ❌ Estadísticas requieren lógica manual");
    console.log("");
    console.log("🎯 ESTO ES TABLE PER CLASS PURO:");
    console.log("   • Una tabla por cada clase concreta");
    console.log("   • Herencia solo en el código, no en BD");
    console.log("   • Máximo rendimiento para consultas específicas");
  }

  async close(): Promise<void> {
    await this.dataSource.destroy();
    console.log("🔌 Conexión cerrada");
  }
}

async function main() {
  const example = new TablePerClassORM();

  try {
    await example.initialize();
    await example.insertSampleData();
    await example.demonstrateQueries();
    example.showStructure();
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await example.close();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { TablePerClassORM };
