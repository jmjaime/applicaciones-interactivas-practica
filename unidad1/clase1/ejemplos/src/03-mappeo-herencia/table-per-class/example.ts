import Database from "better-sqlite3";

// ============================================================================
// TABLE PER CLASS (TPC) - SQL PLANO
// Cada clase concreta tiene su propia tabla con TODOS los campos
// ============================================================================

class TablePerClassSQL {
  private db: Database.Database;

  constructor() {
    this.db = new Database("table-per-class.sqlite");
  }

  async initialize(): Promise<void> {
    console.log("🔧 Inicializando Table Per Class con SQL...");
    this.createSchema();
    console.log("✅ Esquema creado");
  }

  private createSchema(): void {
    // Cada tabla tiene TODOS los campos (heredados + específicos)

    const createDevelopersSQL = `
      CREATE TABLE IF NOT EXISTS developers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        salary DECIMAL(10,2) NOT NULL,
        hire_date DATE NOT NULL,
        programming_languages JSON NOT NULL,
        experience_years INTEGER NOT NULL,
        framework VARCHAR(100)
      )
    `;

    const createManagersSQL = `
      CREATE TABLE IF NOT EXISTS managers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        salary DECIMAL(10,2) NOT NULL,
        hire_date DATE NOT NULL,
        department VARCHAR(100) NOT NULL,
        team_size INTEGER NOT NULL,
        budget DECIMAL(12,2) NOT NULL
      )
    `;

    const createDesignersSQL = `
      CREATE TABLE IF NOT EXISTS designers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        salary DECIMAL(10,2) NOT NULL,
        hire_date DATE NOT NULL,
        design_tools JSON NOT NULL,
        specialization VARCHAR(100) NOT NULL,
        portfolio_url VARCHAR(500)
      )
    `;

    const createSalesRepsSQL = `
      CREATE TABLE IF NOT EXISTS sales_reps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        salary DECIMAL(10,2) NOT NULL,
        hire_date DATE NOT NULL,
        territory VARCHAR(100) NOT NULL,
        commission_rate DECIMAL(5,4) NOT NULL,
        sales_target DECIMAL(12,2) NOT NULL
      )
    `;

    this.db.exec(createDevelopersSQL);
    this.db.exec(createManagersSQL);
    this.db.exec(createDesignersSQL);
    this.db.exec(createSalesRepsSQL);

    // Índices para mejor performance
    this.db.exec(
      `CREATE INDEX IF NOT EXISTS idx_developers_email ON developers(email)`
    );
    this.db.exec(
      `CREATE INDEX IF NOT EXISTS idx_managers_email ON managers(email)`
    );
    this.db.exec(
      `CREATE INDEX IF NOT EXISTS idx_designers_email ON designers(email)`
    );
    this.db.exec(
      `CREATE INDEX IF NOT EXISTS idx_sales_reps_email ON sales_reps(email)`
    );
  }

  async insertSampleData(): Promise<void> {
    console.log("📊 Insertando datos de ejemplo...");

    const transaction = this.db.transaction(() => {
      // Preparar statements para cada tabla
      const insertDeveloper = this.db.prepare(`
        INSERT INTO developers (first_name, last_name, email, salary, hire_date, programming_languages, experience_years, framework)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const insertManager = this.db.prepare(`
        INSERT INTO managers (first_name, last_name, email, salary, hire_date, department, team_size, budget)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const insertDesigner = this.db.prepare(`
        INSERT INTO designers (first_name, last_name, email, salary, hire_date, design_tools, specialization, portfolio_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const insertSalesRep = this.db.prepare(`
        INSERT INTO sales_reps (first_name, last_name, email, salary, hire_date, territory, commission_rate, sales_target)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      // Insertar datos
      insertDeveloper.run(
        "Ana",
        "García",
        "ana.garcia@company.com",
        75000,
        "2019-03-15",
        JSON.stringify(["TypeScript", "React", "Node.js"]),
        5,
        "Next.js"
      );

      insertDeveloper.run(
        "Carlos",
        "López",
        "carlos.lopez@company.com",
        68000,
        "2020-01-10",
        JSON.stringify(["Python", "Django", "PostgreSQL"]),
        3,
        "FastAPI"
      );

      insertManager.run(
        "Roberto",
        "Martínez",
        "roberto.martinez@company.com",
        95000,
        "2015-09-01",
        "Engineering",
        12,
        500000
      );

      insertDesigner.run(
        "Diego",
        "Sánchez",
        "diego.sanchez@company.com",
        70000,
        "2018-05-20",
        JSON.stringify(["Figma", "Adobe XD", "Sketch"]),
        "UI/UX",
        "https://diegosanchez.design"
      );

      insertSalesRep.run(
        "Carmen",
        "Vega",
        "carmen.vega@company.com",
        55000,
        "2020-06-30",
        "Europe",
        0.04,
        800000
      );
    });

    transaction();
    console.log(`✅ 5 empleados insertados correctamente`);
  }

  async demonstrateQueries(): Promise<void> {
    console.log("\n" + "=".repeat(70));
    console.log("🔍 CONSULTAS TABLE PER CLASS");
    console.log("=".repeat(70));

    // 1. Todos los empleados (requiere UNION de todas las tablas)
    console.log("\n📋 1. TODOS LOS EMPLEADOS (polimórfico con UNION):");
    const allEmployeesSQL = `
      SELECT id, first_name, last_name, 'Developer' as type, salary FROM developers
      UNION ALL
      SELECT id, first_name, last_name, 'Manager' as type, salary FROM managers
      UNION ALL
      SELECT id, first_name, last_name, 'Designer' as type, salary FROM designers
      UNION ALL
      SELECT id, first_name, last_name, 'SalesRep' as type, salary FROM sales_reps
      ORDER BY salary DESC
    `;
    const allEmployees = this.db.prepare(allEmployeesSQL).all();
    allEmployees.forEach((emp: any, index: number) => {
      console.log(
        `   ${index + 1}. ${emp.first_name} ${emp.last_name} - ${
          emp.type
        } ($${emp.salary.toLocaleString()})`
      );
    });

    // 2. Solo desarrolladores
    console.log("\n💻 2. DESARROLLADORES (acceso directo a tabla):");
    const developersSQL = `
      SELECT first_name, last_name, salary, programming_languages, experience_years, framework
      FROM developers
      ORDER BY experience_years DESC
    `;
    const developers = this.db.prepare(developersSQL).all();
    developers.forEach((dev: any, index: number) => {
      const languages = JSON.parse(dev.programming_languages);
      console.log(
        `   ${index + 1}. ${dev.first_name} ${dev.last_name} - ${
          dev.experience_years
        } años`
      );
      console.log(`      Lenguajes: ${languages.join(", ")}`);
      console.log(`      Framework: ${dev.framework}`);
      console.log(`      Salario: $${dev.salary.toLocaleString()}`);
    });

    // 3. Solo managers
    console.log("\n👔 3. MANAGERS (acceso directo a tabla):");
    const managersSQL = `
      SELECT first_name, last_name, salary, department, team_size, budget
      FROM managers
      ORDER BY budget DESC
    `;
    const managers = this.db.prepare(managersSQL).all();
    managers.forEach((mgr: any, index: number) => {
      console.log(
        `   ${index + 1}. ${mgr.first_name} ${mgr.last_name} - ${
          mgr.department
        }`
      );
      console.log(`      Equipo: ${mgr.team_size} personas`);
      console.log(`      Presupuesto: $${mgr.budget.toLocaleString()}`);
    });

    // 4. Estadísticas por tipo (usando UNION)
    console.log("\n📊 4. ESTADÍSTICAS:");
    const statsSQL = `
      SELECT 'Developer' as type, COUNT(*) as count, AVG(salary) as avg_salary FROM developers
      UNION ALL
      SELECT 'Manager' as type, COUNT(*) as count, AVG(salary) as avg_salary FROM managers
      UNION ALL
      SELECT 'Designer' as type, COUNT(*) as count, AVG(salary) as avg_salary FROM designers
      UNION ALL
      SELECT 'SalesRep' as type, COUNT(*) as count, AVG(salary) as avg_salary FROM sales_reps
      ORDER BY avg_salary DESC
    `;
    const stats = this.db.prepare(statsSQL).all();
    stats.forEach((stat: any) => {
      console.log(
        `   ${stat.type}: ${stat.count} empleados (Promedio: $${Math.round(
          stat.avg_salary
        ).toLocaleString()})`
      );
    });

    // 5. Búsqueda por salario en todas las tablas
    console.log("\n💰 5. EMPLEADOS CON SALARIO > $70,000:");
    const highSalarySQL = `
      SELECT first_name, last_name, 'Developer' as type, salary FROM developers WHERE salary > 70000
      UNION ALL
      SELECT first_name, last_name, 'Manager' as type, salary FROM managers WHERE salary > 70000
      UNION ALL
      SELECT first_name, last_name, 'Designer' as type, salary FROM designers WHERE salary > 70000
      UNION ALL
      SELECT first_name, last_name, 'SalesRep' as type, salary FROM sales_reps WHERE salary > 70000
      ORDER BY salary DESC
    `;
    const highSalaryEmployees = this.db.prepare(highSalarySQL).all();
    highSalaryEmployees.forEach((emp: any, index: number) => {
      console.log(
        `   ${index + 1}. ${emp.first_name} ${emp.last_name} - ${
          emp.type
        } ($${emp.salary.toLocaleString()})`
      );
    });
  }

  showStructure(): void {
    console.log("\n" + "=".repeat(70));
    console.log("🏗️ ESTRUCTURA TABLE PER CLASS VERDADERO");
    console.log("=".repeat(70));
    console.log("📋 Cada tabla contiene TODOS los campos:");
    console.log("");
    console.log("📋 developers:");
    console.log("   ├── id, first_name, last_name, email (campos heredados)");
    console.log("   ├── salary, hire_date (campos heredados)");
    console.log(
      "   └── programming_languages, experience_years, framework (campos específicos)"
    );
    console.log("");
    console.log("📋 managers:");
    console.log("   ├── id, first_name, last_name, email (campos heredados)");
    console.log("   ├── salary, hire_date (campos heredados)");
    console.log("   └── department, team_size, budget (campos específicos)");
    console.log("");
    console.log("📋 designers:");
    console.log("   ├── id, first_name, last_name, email (campos heredados)");
    console.log("   ├── salary, hire_date (campos heredados)");
    console.log(
      "   └── design_tools, specialization, portfolio_url (campos específicos)"
    );
    console.log("");
    console.log("📋 sales_reps:");
    console.log("   ├── id, first_name, last_name, email (campos heredados)");
    console.log("   ├── salary, hire_date (campos heredados)");
    console.log(
      "   └── territory, commission_rate, sales_target (campos específicos)"
    );
    console.log("");
    console.log("✅ VENTAJAS:");
    console.log("   • Acceso directo a cada tipo sin JOINs");
    console.log("   • Consultas específicas muy eficientes");
    console.log("   • Estructura clara por tipo");
    console.log("");
    console.log("⚠️ DESVENTAJAS:");
    console.log("   • Consultas polimórficas requieren UNIONs complejos");
    console.log("   • Duplicación de estructura de campos heredados");
    console.log("   • Mantenimiento de esquema más complejo");
  }

  close(): void {
    this.db.close();
    console.log("🔌 Conexión cerrada");
  }
}

async function main() {
  const example = new TablePerClassSQL();

  try {
    await example.initialize();
    await example.insertSampleData();
    await example.demonstrateQueries();
    example.showStructure();
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    example.close();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { TablePerClassSQL };
