import "reflect-metadata";
import { createDataSource } from "../common/data-source";
import { Company } from "./entities/Company";
import { Employee, ContactInfo, WorkInfo } from "./entities/Employee";
import { Address } from "./entities/Address";

async function runEmbeddedExample() {
  console.log("📦 Iniciando ejemplo de Objetos Embebidos...\n");

  // Crear DataSource específico para este ejemplo
  const dataSource = createDataSource("embedded-example.sqlite", [
    Company,
    Employee,
  ]);

  try {
    // Inicializar DataSource
    await dataSource.initialize();
    console.log("✅ Conexión a la base de datos establecida\n");

    // Obtener repositorios
    const companyRepository = dataSource.getRepository(Company);
    const employeeRepository = dataSource.getRepository(Employee);

    // === EJEMPLO 1: OBJETOS EMBEBIDOS BÁSICOS ===
    console.log("🏢 Ejemplo 1: Direcciones Embebidas en Empresas");
    console.log("=".repeat(60));

    // Crear dirección principal
    const mainAddress = new Address();
    mainAddress.street = "Av. Corrientes 1234";
    mainAddress.city = "Buenos Aires";
    mainAddress.zipCode = "C1043AAZ";
    mainAddress.country = "Argentina";

    // Crear dirección de facturación
    const billingAddress = new Address();
    billingAddress.street = "San Martín 567";
    billingAddress.city = "Córdoba";
    billingAddress.zipCode = "X5000";
    billingAddress.country = "Argentina";

    // Crear empresa con direcciones embebidas
    const company1 = companyRepository.create({
      name: "TechCorp SA",
      email: "contact@techcorp.com",
      phone: "+54 11 1234-5678",
      website: "https://techcorp.com",
      mainAddress: mainAddress,
      billingAddress: billingAddress,
      tags: ["technology", "software", "innovation"],
      settings: {
        theme: "dark",
        notifications: true,
        language: "es",
        timezone: "America/Argentina/Buenos_Aires",
      },
    });

    await companyRepository.save(company1);
    console.log(`✅ Empresa creada: ${company1.getDisplayName()}`);
    console.log(`📍 Ubicación principal: ${company1.getMainLocation()}`);
    console.log(`📄 Facturación: ${company1.getBillingLocation()}`);
    console.log(`🏷️  Tags: ${company1.getTagsDisplay()}`);
    console.log(
      `⚙️  Configuración: Tema ${company1.settings.theme}, Idioma ${company1.settings.language}`
    );
    console.log(
      `🔄 Misma dirección: ${company1.hasSameAddresses() ? "Sí" : "No"}`
    );

    // Crear segunda empresa con direcciones iguales
    const sameAddress = new Address();
    sameAddress.street = "Florida 1000";
    sameAddress.city = "Buenos Aires";
    sameAddress.zipCode = "C1005AAP";
    sameAddress.country = "Argentina";

    const company2 = companyRepository.create({
      name: "StartupHub",
      email: "hello@startuphub.com",
      phone: "+54 11 9876-5432",
      mainAddress: sameAddress,
      billingAddress: sameAddress, // Misma dirección
      tags: ["startup", "incubator", "coworking"],
      settings: {
        theme: "light",
        notifications: false,
        language: "en",
        timezone: "UTC",
      },
    });

    await companyRepository.save(company2);
    console.log(`\n✅ Empresa creada: ${company2.getDisplayName()}`);
    console.log(`📍 Ubicación: ${company2.getMainLocation()}`);
    console.log(
      `🔄 Misma dirección: ${company2.hasSameAddresses() ? "Sí" : "No"}`
    );

    // === EJEMPLO 2: OBJETOS EMBEBIDOS COMPLEJOS ===
    console.log("\n👥 Ejemplo 2: Información Embebida en Empleados");
    console.log("=".repeat(60));

    // Crear empleado con información embebida compleja
    const employeeAddress = new Address();
    employeeAddress.street = "Libertador 2345";
    employeeAddress.city = "Buenos Aires";
    employeeAddress.zipCode = "C1425";
    employeeAddress.country = "Argentina";

    const employee1 = new Employee();
    employee1.firstName = "María";
    employee1.lastName = "González";
    employee1.documentNumber = "12.345.678";
    employee1.homeAddress = employeeAddress;

    // Información de contacto embebida
    const contactInfo = new ContactInfo();
    contactInfo.email = "maria.gonzalez@techcorp.com";
    contactInfo.phone = "+54 11 5555-1234";
    contactInfo.emergencyContact = "Juan González";
    contactInfo.emergencyPhone = "+54 11 5555-9999";
    employee1.contactInfo = contactInfo;

    // Información laboral embebida
    const workInfo = new WorkInfo();
    workInfo.department = "Engineering";
    workInfo.position = "Senior Developer";
    workInfo.salary = 150000;
    workInfo.hireDate = new Date("2020-03-15");
    workInfo.manager = "Carlos Rodriguez";
    employee1.workInfo = workInfo;

    // Skills y performance como JSON
    employee1.skills = [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "PostgreSQL",
    ];
    employee1.performance = {
      lastReview: new Date("2024-01-15"),
      rating: 4.5,
      goals: [
        "Lead junior developers",
        "Complete certification",
        "Improve system architecture",
      ],
      feedback:
        "Excellent performance, strong technical skills and great team collaboration",
    };

    await employeeRepository.save(employee1);
    console.log(`✅ Empleado creado: ${employee1.getDisplayInfo()}`);
    console.log(`📍 Ubicación: ${employee1.getLocation()}`);
    console.log(`📞 Contacto: ${employee1.contactInfo.getPrimaryContact()}`);
    console.log(
      `🆘 Emergencia: ${
        employee1.hasCompleteContactInfo() ? "Configurado" : "Pendiente"
      }`
    );
    console.log(
      `💼 Experiencia: ${employee1.workInfo.getYearsOfService()} años (${
        employee1.isSeniorEmployee() ? "Senior" : "Junior"
      })`
    );
    console.log(`🎯 Skills: ${employee1.getSkillsDisplay()}`);
    console.log(`⭐ Rating: ${employee1.getPerformanceRating()}/5`);

    // Crear empleado junior
    const employee2Address = new Address();
    employee2Address.street = "Belgrano 890";
    employee2Address.city = "Rosario";
    employee2Address.zipCode = "S2000";
    employee2Address.country = "Argentina";

    const employee2 = new Employee();
    employee2.firstName = "Pedro";
    employee2.lastName = "Martínez";
    employee2.documentNumber = "87.654.321";
    employee2.homeAddress = employee2Address;

    const contactInfo2 = new ContactInfo();
    contactInfo2.email = "pedro.martinez@techcorp.com";
    contactInfo2.phone = "+54 341 5555-5678";
    contactInfo2.emergencyContact = undefined;
    contactInfo2.emergencyPhone = undefined;
    employee2.contactInfo = contactInfo2;

    const workInfo2 = new WorkInfo();
    workInfo2.department = "Engineering";
    workInfo2.position = "Junior Developer";
    workInfo2.salary = 80000;
    workInfo2.hireDate = new Date("2023-06-01");
    workInfo2.manager = "María González";
    employee2.workInfo = workInfo2;

    employee2.skills = ["JavaScript", "React", "HTML", "CSS"];
    employee2.performance = {
      lastReview: new Date("2024-01-15"),
      rating: 3.8,
      goals: [
        "Learn TypeScript",
        "Complete onboarding",
        "First project delivery",
      ],
      feedback: "Great potential, eager to learn and improve",
    };

    await employeeRepository.save(employee2);
    console.log(`\n✅ Empleado creado: ${employee2.getDisplayInfo()}`);
    console.log(`📍 Ubicación: ${employee2.getLocation()}`);
    console.log(
      `🆘 Emergencia: ${
        employee2.hasCompleteContactInfo() ? "Configurado" : "Pendiente"
      }`
    );
    console.log(
      `💼 Experiencia: ${employee2.workInfo.getYearsOfService()} años (${
        employee2.isSeniorEmployee() ? "Senior" : "Junior"
      })`
    );

    // === EJEMPLO 3: CONSULTAS CON OBJETOS EMBEBIDOS ===
    console.log("\n🔍 Ejemplo 3: Consultas con Objetos Embebidos");
    console.log("=".repeat(60));

    // Buscar empresas por ciudad (campo embebido)
    const companiesInBuenosAires = await companyRepository
      .createQueryBuilder("company")
      .where("company.mainAddress_City = :city", { city: "Buenos Aires" })
      .getMany();

    console.log(
      `🏢 Empresas en Buenos Aires: ${companiesInBuenosAires.length}`
    );
    companiesInBuenosAires.forEach((company) => {
      console.log(`  • ${company.name} - ${company.getMainLocation()}`);
    });

    // Buscar empleados por departamento (campo embebido)
    const engineeringEmployees = await employeeRepository
      .createQueryBuilder("employee")
      .where("employee.workInfo_Department = :dept", { dept: "Engineering" })
      .getMany();

    console.log(
      `\n👨‍💻 Empleados de Engineering: ${engineeringEmployees.length}`
    );
    engineeringEmployees.forEach((employee) => {
      console.log(`  • ${employee.getDisplayInfo()}`);
      console.log(
        `    💰 Salario: $${employee.workInfo.salary.toLocaleString()}`
      );
      console.log(`    📊 Rating: ${employee.getPerformanceRating()}/5`);
    });

    // Buscar empleados senior (usando método de negocio)
    const allEmployees = await employeeRepository.find();
    const seniorEmployees = allEmployees.filter((emp) =>
      emp.isSeniorEmployee()
    );

    console.log(`\n🎖️  Empleados Senior: ${seniorEmployees.length}`);
    seniorEmployees.forEach((employee) => {
      console.log(
        `  • ${employee.getFullName()} - ${employee.workInfo.getYearsOfService()} años`
      );
    });

    // === EJEMPLO 4: MANIPULACIÓN DINÁMICA ===
    console.log("\n⚙️  Ejemplo 4: Manipulación Dinámica de Objetos Embebidos");
    console.log("=".repeat(60));

    // Agregar skills a empleado
    employee2.addSkill("TypeScript");
    employee2.addSkill("Node.js");
    console.log(
      `📚 Skills actualizadas para ${employee2.getFullName()}: ${employee2.getSkillsDisplay()}`
    );

    // Actualizar performance
    employee2.updatePerformance(
      4.2,
      "Excellent progress in learning new technologies",
      [
        "Master TypeScript",
        "Build first full-stack project",
        "Mentor new interns",
      ]
    );
    console.log(
      `⭐ Performance actualizada: ${employee2.getPerformanceRating()}/5`
    );

    // Actualizar configuración de empresa
    company1.updateSetting("theme", "light");
    company1.addTag("fintech");
    console.log(
      `🏷️  Tags actualizados para ${
        company1.name
      }: ${company1.getTagsDisplay()}`
    );

    // Guardar cambios
    await employeeRepository.save(employee2);
    await companyRepository.save(company1);
    console.log("✅ Cambios guardados");

    // === ESTADÍSTICAS FINALES ===
    console.log("\n📊 Estadísticas Finales");
    console.log("=".repeat(60));

    const totalCompanies = await companyRepository.count();
    const totalEmployees = await employeeRepository.count();

    const companiesWithSameAddress =
      allEmployees.length > 0
        ? (await companyRepository.find()).filter((c) => c.hasSameAddresses())
            .length
        : 0;

    const employeesWithEmergencyContact = allEmployees.filter((e) =>
      e.hasCompleteContactInfo()
    ).length;

    const avgSalary =
      allEmployees.length > 0
        ? allEmployees.reduce((sum, emp) => sum + emp.workInfo.salary, 0) /
          allEmployees.length
        : 0;

    console.log(`🏢 Total empresas: ${totalCompanies}`);
    console.log(`👥 Total empleados: ${totalEmployees}`);
    console.log(`📍 Empresas con misma dirección: ${companiesWithSameAddress}`);
    console.log(
      `🆘 Empleados con contacto de emergencia: ${employeesWithEmergencyContact}/${totalEmployees}`
    );
    console.log(`💰 Salario promedio: $${avgSalary.toLocaleString()}`);

    console.log("\n✅ Ejemplo de objetos embebidos completado exitosamente!");
  } catch (error) {
    console.error("❌ Error ejecutando el ejemplo:", error);
  } finally {
    // Cerrar conexión
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log("🔐 Conexión cerrada");
    }
  }
}

// Ejecutar el ejemplo
runEmbeddedExample().catch(console.error);
