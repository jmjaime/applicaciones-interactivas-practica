import "reflect-metadata";
import { DataSource } from "typeorm";
import { Employee, Developer, Manager, Designer, SalesRep } from "./entities";

class TablePerHierarchyORM {
  private dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: "sqlite",
      database: "table-per-hierarchy-orm.sqlite",
      entities: [Employee, Developer, Manager, Designer, SalesRep],
      synchronize: true,
      logging: false,
    });
  }

  async initialize(): Promise<void> {
    console.log("🔧 Inicializando Table Per Hierarchy con TypeORM...");
    await this.dataSource.initialize();
    console.log("✅ Conexión establecida y esquema sincronizado");
  }

  async insertSampleData(): Promise<void> {
    console.log("📊 Insertando datos de ejemplo...");
    
    const employees: Employee[] = [
      Object.assign(new Developer(), {
        firstName: "Ana",
        lastName: "García",
        email: "ana.garcia@company.com",
        salary: 75000,
        hireDate: new Date("2019-03-15"),
        programmingLanguages: ["TypeScript", "React", "Node.js"],
        experienceYears: 5,
        framework: "Next.js",
      }),
      
      Object.assign(new Manager(), {
        firstName: "Roberto",
        lastName: "Martínez",
        email: "roberto.martinez@company.com",
        salary: 95000,
        hireDate: new Date("2015-09-01"),
        department: "Engineering",
        teamSize: 12,
        budget: 500000,
      }),

      Object.assign(new Designer(), {
        firstName: "Diego",
        lastName: "Sánchez",
        email: "diego.sanchez@company.com",
        salary: 70000,
        hireDate: new Date("2018-05-20"),
        designTools: ["Figma", "Adobe XD", "Sketch"],
        specialization: "UI/UX",
        portfolioUrl: "https://diegosanchez.design",
      }),

      Object.assign(new SalesRep(), {
        firstName: "Carmen",
        lastName: "Vega",
        email: "carmen.vega@company.com",
        salary: 55000,
        hireDate: new Date("2020-06-30"),
        territory: "Europe",
        commissionRate: 0.04,
        salesTarget: 800000,
      }),
    ];

    const employeeRepository = this.dataSource.getRepository(Employee);
    await employeeRepository.save(employees);
    
    console.log(`✅ ${employees.length} empleados insertados correctamente`);
  }

  async demonstrateQueries(): Promise<void> {
    console.log("\n" + "=".repeat(70));
    console.log("🔍 DEMOSTRANDO CONSULTAS CON TABLE PER HIERARCHY - TYPEORM");
    console.log("=".repeat(70));

    const employeeRepository = this.dataSource.getRepository(Employee);
    const developerRepository = this.dataSource.getRepository(Developer);

    // 1. Todos los empleados (polimórfico)
    console.log("\n📋 1. TODOS LOS EMPLEADOS:");
    const allEmployees = await employeeRepository.find({
      order: { salary: "DESC" }
    });
    allEmployees.forEach((emp, index) => {
      console.log(`   ${index + 1}. ${emp.getDisplayInfo()}`);
      console.log(`      📧 ${emp.email} | 💰 $${emp.salary.toLocaleString()}`);
    });

    // 2. Solo desarrolladores
    console.log("\n💻 2. SOLO DESARROLLADORES:");
    const developers = await developerRepository.find();
    developers.forEach((dev, index) => {
      console.log(`   ${index + 1}. ${dev.getDisplayInfo()}`);
      console.log(`      🛠️ Framework: ${dev.framework || "N/A"}`);
    });

    // 3. Estadísticas por tipo
    console.log("\n📊 3. ESTADÍSTICAS POR TIPO:");
    const stats = await employeeRepository
      .createQueryBuilder("employee")
      .select("employee.type", "type")
      .addSelect("COUNT(*)", "count")
      .addSelect("AVG(employee.salary)", "avgSalary")
      .groupBy("employee.type")
      .orderBy("avgSalary", "DESC")
      .getRawMany();
    
    stats.forEach((stat) => {
      console.log(`   ${stat.type}: ${stat.count} empleados (Promedio: $${Math.round(stat.avgSalary).toLocaleString()})`);
    });
  }

  showStructure(): void {
    console.log("\n" + "=".repeat(70));
    console.log("🏗️ ESTRUCTURA TPH - TYPEORM");
    console.log("=".repeat(70));
    console.log("📋 Decoradores utilizados:");
    console.log("   • @Entity() en clase base");
    console.log("   • @TableInheritance() - Discriminador automático");
    console.log("   • @ChildEntity() - Clases derivadas");
    console.log("   • @Column('simple-json') - Arrays como JSON");
    console.log("");
    console.log("✅ VENTAJAS TYPEORM:");
    console.log("   • Mapeo automático de herencia");
    console.log("   • Polimorfismo transparente");
    console.log("   • Generación automática de esquema");
  }

  async close(): Promise<void> {
    await this.dataSource.destroy();
    console.log("🔌 Conexión cerrada");
  }
}

async function main() {
  const example = new TablePerHierarchyORM();

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

export { TablePerHierarchyORM };
