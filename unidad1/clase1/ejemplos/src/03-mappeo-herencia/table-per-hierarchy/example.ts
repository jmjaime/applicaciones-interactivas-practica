import Database from "better-sqlite3";

// Table Per Hierarchy - Una sola tabla con discriminador
class TablePerHierarchySQL {
  private db: Database.Database;

  constructor() {
    this.db = new Database("table-per-hierarchy.sqlite");
  }

  async initialize(): Promise<void> {
    console.log("🔧 Inicializando Table Per Hierarchy con SQL...");
    this.createSchema();
    console.log("✅ Esquema creado");
  }

  private createSchema(): void {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type VARCHAR(20) NOT NULL,  -- Discriminador: 'Developer', 'Manager', etc.
        
        -- Campos comunes
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        salary DECIMAL(10,2) NOT NULL,
        hire_date DATE NOT NULL,
        
        -- Campos específicos (pueden ser NULL según el tipo)
        programming_languages JSON,      -- Solo Developer
        experience_years INTEGER,        -- Solo Developer
        framework VARCHAR(100),          -- Solo Developer
        department VARCHAR(100),         -- Solo Manager
        team_size INTEGER,               -- Solo Manager
        budget DECIMAL(12,2),            -- Solo Manager
        design_tools JSON,               -- Solo Designer
        specialization VARCHAR(100),     -- Solo Designer
        territory VARCHAR(100),          -- Solo SalesRep
        commission_rate DECIMAL(5,4),    -- Solo SalesRep
        
        CHECK (type IN ('Developer', 'Manager', 'Designer', 'SalesRep'))
      )
    `;

    this.db.exec(createTableSQL);
    this.db.exec(`CREATE INDEX IF NOT EXISTS idx_employees_type ON employees(type)`);
  }

  async insertSampleData(): Promise<void> {
    console.log("📊 Insertando datos de ejemplo...");

    const employees = [
      // Developer
      ['Developer', 'Ana', 'García', 'ana.garcia@company.com', 75000, '2019-03-15',
       JSON.stringify(['TypeScript', 'React', 'Node.js']), 5, 'Next.js',
       null, null, null, null, null, null, null],
      
      // Manager  
      ['Manager', 'Roberto', 'Martínez', 'roberto.martinez@company.com', 95000, '2015-09-01',
       null, null, null, 'Engineering', 12, 500000, null, null, null, null],
      
      // Designer
      ['Designer', 'Diego', 'Sánchez', 'diego.sanchez@company.com', 70000, '2018-05-20',
       null, null, null, null, null, null, JSON.stringify(['Figma', 'Adobe XD']), 'UI/UX', null, null],
      
      // SalesRep
      ['SalesRep', 'Carmen', 'Vega', 'carmen.vega@company.com', 55000, '2020-06-30',
       null, null, null, null, null, null, null, null, 'Europe', 0.04]
    ];

    const insertSQL = `
      INSERT INTO employees (
        type, first_name, last_name, email, salary, hire_date,
        programming_languages, experience_years, framework,
        department, team_size, budget, design_tools, specialization,
        territory, commission_rate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const stmt = this.db.prepare(insertSQL);
    const transaction = this.db.transaction(() => {
      employees.forEach(emp => stmt.run(...emp));
    });
    
    transaction();
    console.log(`✅ ${employees.length} empleados insertados`);
  }

  async demonstrateQueries(): Promise<void> {
    console.log("\n" + "=".repeat(60));
    console.log("🔍 CONSULTAS TABLE PER HIERARCHY");
    console.log("=".repeat(60));

    // 1. Todos los empleados
    console.log("\n📋 1. TODOS LOS EMPLEADOS:");
    const allEmployees = this.db.prepare(`
      SELECT id, type, first_name, last_name, salary 
      FROM employees ORDER BY salary DESC
    `).all();
    
    allEmployees.forEach((emp: any, index) => {
      console.log(`   ${index + 1}. ${emp.first_name} ${emp.last_name} - ${emp.type} ($${emp.salary.toLocaleString()})`);
    });

    // 2. Solo desarrolladores con sus campos específicos
    console.log("\n💻 2. DESARROLLADORES:");
    const developers = this.db.prepare(`
      SELECT first_name, last_name, programming_languages, experience_years, framework
      FROM employees WHERE type = 'Developer'
    `).all();
    
    developers.forEach((dev: any, index) => {
      const languages = JSON.parse(dev.programming_languages);
      console.log(`   ${index + 1}. ${dev.first_name} ${dev.last_name} - ${dev.experience_years} años`);
      console.log(`      Lenguajes: ${languages.join(', ')}`);
      console.log(`      Framework: ${dev.framework}`);
    });

    // 3. Estadísticas por tipo
    console.log("\n📊 3. ESTADÍSTICAS:");
    const stats = this.db.prepare(`
      SELECT type, COUNT(*) as count, AVG(salary) as avg_salary
      FROM employees GROUP BY type ORDER BY avg_salary DESC
    `).all();
    
    stats.forEach((stat: any) => {
      console.log(`   ${stat.type}: ${stat.count} empleados (Promedio: $${Math.round(stat.avg_salary).toLocaleString()})`);
    });
  }

  showStructure(): void {
    console.log("\n" + "=".repeat(60));
    console.log("🏗️ ESTRUCTURA TABLE PER HIERARCHY");
    console.log("=".repeat(60));
    console.log("📋 Una sola tabla 'employees':");
    console.log("   • Columna 'type' como discriminador");
    console.log("   • Campos comunes: id, first_name, last_name, email, salary");
    console.log("   • Campos específicos: pueden ser NULL según el tipo");
    console.log("");
    console.log("✅ VENTAJAS:");
    console.log("   • Consultas rápidas (sin JOINs)");
    console.log("   • Polimorfismo simple");
    console.log("   • Una sola tabla para mantener");
    console.log("");
    console.log("⚠️ DESVENTAJAS:");
    console.log("   • Muchos campos NULL");
    console.log("   • Tabla puede volverse muy ancha");
    console.log("   • Pérdida de integridad específica por tipo");
  }

  close(): void {
    this.db.close();
    console.log("🔌 Conexión cerrada");
  }
}

// Ejecutar ejemplo
async function main() {
  const example = new TablePerHierarchySQL();
  
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

export { TablePerHierarchySQL };
