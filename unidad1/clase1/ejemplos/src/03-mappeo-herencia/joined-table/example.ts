import Database from "better-sqlite3";

// ============================================================================
// JOINED TABLE (TABLE PER SUBCLASS) - SQL PLANO
// Tabla base + tablas específicas con JOINs
// ============================================================================

class JoinedTableSQL {
  private db: Database.Database;

  constructor() {
    this.db = new Database("joined-table.sqlite");
  }

  async initialize(): Promise<void> {
    console.log("🔧 Inicializando Joined Table con SQL...");
    this.createSchema();
    console.log("✅ Esquema creado");
  }

  private createSchema(): void {
    // Tabla base con campos comunes
    const createEmployeesSQL = `
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        salary DECIMAL(10,2) NOT NULL,
        hire_date DATE NOT NULL,
        employee_type VARCHAR(20) NOT NULL
      )
    `;

    // Tabla para detalles específicos de Developer
    const createDeveloperDetailsSQL = `
      CREATE TABLE IF NOT EXISTS developer_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employee_id INTEGER NOT NULL,
        programming_languages JSON NOT NULL,
        experience_years INTEGER NOT NULL,
        framework VARCHAR(100),
        FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
      )
    `;

    // Tabla para detalles específicos de Manager
    const createManagerDetailsSQL = `
      CREATE TABLE IF NOT EXISTS manager_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employee_id INTEGER NOT NULL,
        department VARCHAR(100) NOT NULL,
        team_size INTEGER NOT NULL,
        budget DECIMAL(12,2) NOT NULL,
        FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
      )
    `;

    // Tabla para detalles específicos de Designer
    const createDesignerDetailsSQL = `
      CREATE TABLE IF NOT EXISTS designer_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employee_id INTEGER NOT NULL,
        design_tools JSON NOT NULL,
        specialization VARCHAR(100) NOT NULL,
        portfolio_url VARCHAR(500),
        FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
      )
    `;

    // Tabla para detalles específicos de Sales Rep
    const createSalesRepDetailsSQL = `
      CREATE TABLE IF NOT EXISTS sales_rep_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employee_id INTEGER NOT NULL,
        territory VARCHAR(100) NOT NULL,
        commission_rate DECIMAL(5,4) NOT NULL,
        sales_target DECIMAL(12,2) NOT NULL,
        FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
      )
    `;

    this.db.exec(createEmployeesSQL);
    this.db.exec(createDeveloperDetailsSQL);
    this.db.exec(createManagerDetailsSQL);
    this.db.exec(createDesignerDetailsSQL);
    this.db.exec(createSalesRepDetailsSQL);

    // Índices para optimizar JOINs
    this.db.exec(
      `CREATE INDEX IF NOT EXISTS idx_employees_email ON employees(email)`
    );
    this.db.exec(
      `CREATE INDEX IF NOT EXISTS idx_employees_type ON employees(employee_type)`
    );
    this.db.exec(
      `CREATE INDEX IF NOT EXISTS idx_developer_details_employee_id ON developer_details(employee_id)`
    );
    this.db.exec(
      `CREATE INDEX IF NOT EXISTS idx_manager_details_employee_id ON manager_details(employee_id)`
    );
    this.db.exec(
      `CREATE INDEX IF NOT EXISTS idx_designer_details_employee_id ON designer_details(employee_id)`
    );
    this.db.exec(
      `CREATE INDEX IF NOT EXISTS idx_sales_rep_details_employee_id ON sales_rep_details(employee_id)`
    );
  }

  async insertSampleData(): Promise<void> {
    console.log("📊 Insertando datos de ejemplo...");

    const transaction = this.db.transaction(() => {
      // Developer 1
      const devResult1 = this.db
        .prepare(
          `
        INSERT INTO employees (first_name, last_name, email, salary, hire_date, employee_type)
        VALUES (?, ?, ?, ?, ?, ?)
      `
        )
        .run(
          "Ana",
          "García",
          "ana.garcia@company.com",
          75000,
          "2019-03-15",
          "Developer"
        );

      this.db
        .prepare(
          `
        INSERT INTO developer_details (employee_id, programming_languages, experience_years, framework)
        VALUES (?, ?, ?, ?)
      `
        )
        .run(
          devResult1.lastInsertRowid,
          JSON.stringify(["TypeScript", "React", "Node.js"]),
          5,
          "Next.js"
        );

      // Developer 2
      const devResult2 = this.db
        .prepare(
          `
        INSERT INTO employees (first_name, last_name, email, salary, hire_date, employee_type)
        VALUES (?, ?, ?, ?, ?, ?)
      `
        )
        .run(
          "Carlos",
          "López",
          "carlos.lopez@company.com",
          68000,
          "2020-01-10",
          "Developer"
        );

      this.db
        .prepare(
          `
        INSERT INTO developer_details (employee_id, programming_languages, experience_years, framework)
        VALUES (?, ?, ?, ?)
      `
        )
        .run(
          devResult2.lastInsertRowid,
          JSON.stringify(["Python", "Django", "PostgreSQL"]),
          3,
          "FastAPI"
        );

      // Manager
      const mgrResult = this.db
        .prepare(
          `
        INSERT INTO employees (first_name, last_name, email, salary, hire_date, employee_type)
        VALUES (?, ?, ?, ?, ?, ?)
      `
        )
        .run(
          "Roberto",
          "Martínez",
          "roberto.martinez@company.com",
          95000,
          "2015-09-01",
          "Manager"
        );

      this.db
        .prepare(
          `
        INSERT INTO manager_details (employee_id, department, team_size, budget)
        VALUES (?, ?, ?, ?)
      `
        )
        .run(mgrResult.lastInsertRowid, "Engineering", 12, 500000);

      // Designer
      const desResult = this.db
        .prepare(
          `
        INSERT INTO employees (first_name, last_name, email, salary, hire_date, employee_type)
        VALUES (?, ?, ?, ?, ?, ?)
      `
        )
        .run(
          "Diego",
          "Sánchez",
          "diego.sanchez@company.com",
          70000,
          "2018-05-20",
          "Designer"
        );

      this.db
        .prepare(
          `
        INSERT INTO designer_details (employee_id, design_tools, specialization, portfolio_url)
        VALUES (?, ?, ?, ?)
      `
        )
        .run(
          desResult.lastInsertRowid,
          JSON.stringify(["Figma", "Adobe XD", "Sketch"]),
          "UI/UX",
          "https://diegosanchez.design"
        );

      // Sales Rep
      const salesResult = this.db
        .prepare(
          `
        INSERT INTO employees (first_name, last_name, email, salary, hire_date, employee_type)
        VALUES (?, ?, ?, ?, ?, ?)
      `
        )
        .run(
          "Carmen",
          "Vega",
          "carmen.vega@company.com",
          55000,
          "2020-06-30",
          "SalesRep"
        );

      this.db
        .prepare(
          `
        INSERT INTO sales_rep_details (employee_id, territory, commission_rate, sales_target)
        VALUES (?, ?, ?, ?)
      `
        )
        .run(salesResult.lastInsertRowid, "Europe", 0.04, 800000);
    });

    transaction();
    console.log(`✅ 5 empleados insertados correctamente`);
  }

  async demonstrateQueries(): Promise<void> {
    console.log("\n" + "=".repeat(70));
    console.log("🔍 CONSULTAS JOINED TABLE");
    console.log("=".repeat(70));

    // 1. CONSULTA POLIMÓRFICA desde tabla base (¡la ventaja principal!)
    console.log(
      "\n📋 1. TODOS LOS EMPLEADOS (consulta polimórfica desde tabla base):"
    );
    const allEmployeesSQL = `
      SELECT id, first_name, last_name, employee_type, salary
      FROM employees
      ORDER BY salary DESC
    `;
    const allEmployees = this.db.prepare(allEmployeesSQL).all();
    allEmployees.forEach((emp: any, index: number) => {
      console.log(
        `   ${index + 1}. ${emp.first_name} ${emp.last_name} - ${
          emp.employee_type
        } ($${emp.salary.toLocaleString()})`
      );
    });

    // 2. Desarrolladores con JOIN
    console.log("\n💻 2. DESARROLLADORES (con JOIN automático):");
    const developersSQL = `
      SELECT e.first_name, e.last_name, e.salary,
             d.programming_languages, d.experience_years, d.framework
      FROM employees e
      INNER JOIN developer_details d ON e.id = d.employee_id
      WHERE e.employee_type = 'Developer'
      ORDER BY d.experience_years DESC
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
      console.log(`      Framework: ${dev.framework || "N/A"}`);
      console.log(`      Salario: $${dev.salary.toLocaleString()}`);
    });

    // 3. Managers con JOIN
    console.log("\n👔 3. MANAGERS (con JOIN automático):");
    const managersSQL = `
      SELECT e.first_name, e.last_name, e.salary,
             m.department, m.team_size, m.budget
      FROM employees e
      INNER JOIN manager_details m ON e.id = m.employee_id
      WHERE e.employee_type = 'Manager'
      ORDER BY m.budget DESC
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
      console.log(`      Salario: $${mgr.salary.toLocaleString()}`);
    });

    // 4. Búsqueda polimórfica con filtros
    console.log(
      "\n💰 4. EMPLEADOS CON SALARIO > $70,000 (consulta polimórfica):"
    );
    const highSalarySQL = `
      SELECT first_name, last_name, employee_type, salary
      FROM employees
      WHERE salary > 70000
      ORDER BY salary DESC
    `;
    const highSalaryEmployees = this.db.prepare(highSalarySQL).all();
    highSalaryEmployees.forEach((emp: any, index: number) => {
      console.log(
        `   ${index + 1}. ${emp.first_name} ${emp.last_name} - ${
          emp.employee_type
        } ($${emp.salary.toLocaleString()})`
      );
    });

    // 5. Estadísticas usando tabla base
    console.log("\n📊 5. ESTADÍSTICAS (usando tabla base employees):");
    const statsSQL = `
      SELECT employee_type, COUNT(*) as count, AVG(salary) as avg_salary
      FROM employees
      GROUP BY employee_type
      ORDER BY avg_salary DESC
    `;
    const stats = this.db.prepare(statsSQL).all();
    stats.forEach((stat: any) => {
      console.log(
        `   ${stat.employee_type}: ${
          stat.count
        } empleados (Promedio: $${Math.round(
          stat.avg_salary
        ).toLocaleString()})`
      );
    });

    // 6. Consulta compleja con JOIN a múltiples tablas
    console.log("\n🔗 6. VISTA COMPLETA POR TIPO (JOINs específicos):");

    // Desarrolladores con detalles
    const devDetailsSQL = `
      SELECT e.first_name, e.last_name, e.salary, d.experience_years, d.framework
      FROM employees e
      INNER JOIN developer_details d ON e.id = d.employee_id
      WHERE e.employee_type = 'Developer'
      ORDER BY d.experience_years DESC
    `;
    const devDetails = this.db.prepare(devDetailsSQL).all();
    console.log("   🔹 Desarrolladores:");
    devDetails.forEach((dev: any, index: number) => {
      console.log(
        `     ${index + 1}. ${dev.first_name} ${dev.last_name} - ${
          dev.experience_years
        }a - ${dev.framework || "N/A"}`
      );
    });

    // Managers con detalles
    const mgrDetailsSQL = `
      SELECT e.first_name, e.last_name, e.salary, m.department, m.team_size
      FROM employees e
      INNER JOIN manager_details m ON e.id = m.employee_id
      WHERE e.employee_type = 'Manager'
    `;
    const mgrDetails = this.db.prepare(mgrDetailsSQL).all();
    console.log("   🔹 Managers:");
    mgrDetails.forEach((mgr: any, index: number) => {
      console.log(
        `     ${index + 1}. ${mgr.first_name} ${mgr.last_name} - ${
          mgr.department
        } (${mgr.team_size} personas)`
      );
    });
  }

  showStructure(): void {
    console.log("\n" + "=".repeat(70));
    console.log("🏗️ ESTRUCTURA JOINED TABLE");
    console.log("=".repeat(70));
    console.log("📋 Estrategia utilizada:");
    console.log("   • Tabla base 'employees' con campos comunes");
    console.log("   • Tablas '*_details' con solo campos específicos");
    console.log("   • FOREIGN KEY constraints entre tablas");
    console.log("   • JOINs para obtener datos completos");
    console.log("");
    console.log("📋 Tablas generadas:");
    console.log(
      "   ├── employees (id, first_name, last_name, email, salary, hire_date, employee_type)"
    );
    console.log(
      "   ├── developer_details (id, employee_id*, programming_languages, experience_years, framework)"
    );
    console.log(
      "   ├── manager_details (id, employee_id*, department, team_size, budget)"
    );
    console.log(
      "   ├── designer_details (id, employee_id*, design_tools, specialization, portfolio_url)"
    );
    console.log(
      "   └── sales_rep_details (id, employee_id*, territory, commission_rate, sales_target)"
    );
    console.log("   (* = Foreign Key)");
    console.log("");
    console.log("✅ VENTAJAS JOINED TABLE:");
    console.log(
      "   • ✅ Consultas polimórficas simples: SELECT * FROM employees"
    );
    console.log("   • ✅ Sin duplicación de campos comunes");
    console.log("   • ✅ Integridad referencial automática");
    console.log("   • ✅ Normalización perfecta");
    console.log("   • ✅ Fácil agregar nuevos tipos");
    console.log("");
    console.log("⚠️ CONSIDERACIONES:");
    console.log("   • Necesita JOINs para datos completos");
    console.log("   • Rendimiento depende de índices");
    console.log("   • Consultas específicas más complejas");
    console.log("");
    console.log("🎯 IDEAL PARA:");
    console.log("   • Aplicaciones con consultas polimórficas frecuentes");
    console.log("   • Esquemas con muchos campos comunes");
    console.log("   • Sistemas que priorizan normalización");
  }

  close(): void {
    this.db.close();
    console.log("🔌 Conexión cerrada");
  }
}

async function main() {
  const example = new JoinedTableSQL();

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

export { JoinedTableSQL };
