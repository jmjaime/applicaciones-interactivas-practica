import "reflect-metadata";
import { createDataSource } from "../common/data-source";
import { User } from "../01-entities/entities/User";
import { Author } from "./entities/Author";
import { Book } from "./entities/Book";
import { Profile } from "./entities/Profile";
import { Student } from "./entities/Student";
import { Course } from "./entities/Course";

async function runRelationsExample() {
  console.log("🔗 Iniciando ejemplo de Relaciones...\n");

  // Crear DataSource específico para este ejemplo
  const dataSource = createDataSource("relations-example.sqlite", [
    User,
    Author,
    Book,
    Profile,
    Student,
    Course,
  ]);

  try {
    // Inicializar DataSource
    await dataSource.initialize();
    console.log("✅ Conexión a la base de datos establecida\n");

    // Limpiar datos previos para evitar conflictos de UNIQUE/FOREIGN KEY
    await dataSource.query("DELETE FROM student_courses");
    await dataSource.getRepository(Book).clear();
    await dataSource.getRepository(Profile).clear();
    await dataSource.getRepository(Student).clear();
    await dataSource.getRepository(Course).clear();
    await dataSource.getRepository(Author).clear();
    await dataSource.getRepository(User).clear();

    // Obtener repositorios
    const userRepository = dataSource.getRepository(User);
    const authorRepository = dataSource.getRepository(Author);
    const bookRepository = dataSource.getRepository(Book);
    const profileRepository = dataSource.getRepository(Profile);
    const studentRepository = dataSource.getRepository(Student);
    const courseRepository = dataSource.getRepository(Course);

    // === EJEMPLO 1: RELACIÓN ONE-TO-ONE ===
    console.log("👤 Relación One-to-One (Usuario ↔ Perfil):");
    console.log("=".repeat(50));

    // Crear usuarios
    const user1 = userRepository.create({
      firstName: "Ana",
      lastName: "García",
      email: "ana@example.com",
      age: 28,
      role: "user",
    });

    const user2 = userRepository.create({
      firstName: "Luis",
      lastName: "Martínez",
      email: "luis@example.com",
      age: 35,
      role: "admin",
    });

    await userRepository.save([user1, user2]);
    console.log("✅ Usuarios creados");

    // Crear perfiles asociados
    const profile1 = profileRepository.create({
      bio: "Desarrolladora full-stack apasionada por la tecnología",
      avatar: "https://example.com/ana-avatar.jpg",
      website: "https://ana-garcia.dev",
      location: "Buenos Aires, Argentina",
      profession: "Full Stack Developer",
      birthDate: new Date("1995-06-15"),
      gender: "female",
      phone: "11-1234-5678",
      socialLinks: {
        twitter: "@ana_garcia_dev",
        linkedin: "linkedin.com/in/ana-garcia",
        github: "github.com/ana-garcia",
      },
      user: user1,
    });

    const profile2 = profileRepository.create({
      bio: "Arquitecto de software con 10 años de experiencia",
      location: "Córdoba, Argentina",
      profession: "Software Architect",
      birthDate: new Date("1988-03-22"),
      gender: "male",
      phone: "351-9876-5432",
      socialLinks: {
        linkedin: "linkedin.com/in/luis-martinez",
        github: "github.com/luis-martinez",
      },
      user: user2,
    });

    await profileRepository.save([profile1, profile2]);
    console.log("✅ Perfiles creados y asociados a usuarios");

    // Consultar usuarios con perfiles
    const usersWithProfiles = await userRepository.find({
      relations: ["profile"],
    });

    console.log("\n📋 Usuarios con perfiles:");
    usersWithProfiles.forEach((user) => {
      console.log(`  • ${user.getFullName()} (${user.email})`);
      if (user.profile) {
        console.log(`    📍 ${user.profile.getDisplayLocation()}`);
        console.log(`    💼 ${user.profile.getDisplayProfession()}`);
        console.log(`    🎂 ${user.profile.getAge()} años`);
        console.log(
          `    📱 ${
            user.profile.hasSocialLinks()
              ? "Con redes sociales"
              : "Sin redes sociales"
          }`
        );
        console.log(
          `    ✅ Perfil completo: ${user.profile.isComplete() ? "Sí" : "No"}`
        );
      }
      console.log("");
    });

    // === EJEMPLO 2: RELACIÓN ONE-TO-MANY ===
    console.log("📚 Relación One-to-Many (Autor → Libros):");
    console.log("=".repeat(50));

    // Crear autores
    const author1 = authorRepository.create({
      firstName: "Gabriel",
      lastName: "García Márquez",
      email: "gabriel@example.com",
      biography: "Escritor colombiano, premio Nobel de Literatura",
      birthDate: new Date("1927-03-06"),
      nationality: "Colombiana",
    });

    const author2 = authorRepository.create({
      firstName: "Isabel",
      lastName: "Allende",
      email: "isabel@example.com",
      biography: "Escritora chilena de renombre internacional",
      birthDate: new Date("1942-08-02"),
      nationality: "Chilena",
    });

    await authorRepository.save([author1, author2]);
    console.log("✅ Autores creados");

    // Crear libros asociados a autores
    const book1 = bookRepository.create({
      title: "Cien años de soledad",
      description: "Obra maestra del realismo mágico",
      isbn: "978-0-06-088328-7",
      price: 25.99,
      pages: 417,
      publishedDate: new Date("1967-06-05"),
      isPublished: true,
      genre: "Realismo mágico",
      publisher: "Editorial Sudamericana",
      stock: 50,
      author: author1,
    });

    const book2 = bookRepository.create({
      title: "El amor en los tiempos del cólera",
      description: "Historia de amor que trasciende el tiempo",
      isbn: "978-0-14-018646-4",
      price: 22.5,
      pages: 348,
      publishedDate: new Date("1985-09-05"),
      isPublished: true,
      genre: "Romance",
      publisher: "Editorial Sudamericana",
      stock: 30,
      author: author1,
    });

    const book3 = bookRepository.create({
      title: "La casa de los espíritus",
      description: "Saga familiar épica",
      isbn: "978-0-55-327391-3",
      price: 28.99,
      pages: 433,
      publishedDate: new Date("1982-10-01"),
      isPublished: true,
      genre: "Realismo mágico",
      publisher: "Plaza & Janés",
      stock: 25,
      author: author2,
    });

    await bookRepository.save([book1, book2, book3]);
    console.log("✅ Libros creados y asociados a autores");

    // Consultar autores con libros
    const authorsWithBooks = await authorRepository.find({
      relations: ["books"],
    });

    console.log("\n📋 Autores con libros:");
    authorsWithBooks.forEach((author) => {
      console.log(`  • ${author.getFullName()} (${author.nationality})`);
      console.log(`    📖 ${author.getBookCount()} libros`);
      console.log(`    🎂 ${author.getAge()} años`);
      console.log(`    ✍️  Publicado: ${author.isPublished() ? "Sí" : "No"}`);

      if (author.books && author.books.length > 0) {
        console.log("    📚 Libros:");
        author.books.forEach((book) => {
          console.log(`      - ${book.title} (${book.getYearPublished()})`);
          console.log(
            `        ${book.getFormattedPrice()} - ${book.stock} en stock`
          );
          console.log(`        📖 ${book.pages} páginas - ${book.genre}`);
          console.log(
            `        ${book.isNewRelease() ? "🆕 Nuevo" : "📖 Clásico"}`
          );
        });
      }
      console.log("");
    });

    // === EJEMPLO 3: RELACIÓN MANY-TO-MANY ===
    console.log("🎓 Relación Many-to-Many (Estudiantes ↔ Cursos):");
    console.log("=".repeat(50));

    // Crear estudiantes
    const student1 = studentRepository.create({
      firstName: "María",
      lastName: "Rodríguez",
      email: "maria.rodriguez@university.edu",
      studentId: "STU001",
      enrollmentDate: new Date("2022-02-15"),
      major: "Computer Science",
      year: 2,
      gpa: 3.8,
      phone: "11-5555-1234",
      address: "Av. Corrientes 1234, Buenos Aires",
    });

    const student2 = studentRepository.create({
      firstName: "Carlos",
      lastName: "López",
      email: "carlos.lopez@university.edu",
      studentId: "STU002",
      enrollmentDate: new Date("2021-08-20"),
      major: "Computer Science",
      year: 3,
      gpa: 3.5,
      phone: "11-5555-5678",
      address: "San Martín 567, Buenos Aires",
    });

    const student3 = studentRepository.create({
      firstName: "Ana",
      lastName: "Fernández",
      email: "ana.fernandez@university.edu",
      studentId: "STU003",
      enrollmentDate: new Date("2023-02-10"),
      major: "Mathematics",
      year: 1,
      gpa: 3.9,
      phone: "11-5555-9012",
      address: "Rivadavia 890, Buenos Aires",
    });

    await studentRepository.save([student1, student2, student3]);
    console.log("✅ Estudiantes creados");

    // Crear cursos
    const course1 = courseRepository.create({
      title: "Introducción a la Programación",
      code: "CS101",
      description: "Fundamentos de programación usando Python",
      credits: 4,
      department: "Computer Science",
      instructor: "Prof. Juan Pérez",
      maxCapacity: 30,
      fee: 1500.0,
      semester: "fall",
      year: 2024,
      location: "Aula 101",
      schedule: {
        days: ["Monday", "Wednesday", "Friday"],
        startTime: "09:00",
        endTime: "10:30",
      },
    });

    const course2 = courseRepository.create({
      title: "Estructuras de Datos",
      code: "CS201",
      description: "Estructuras de datos y algoritmos avanzados",
      credits: 4,
      department: "Computer Science",
      instructor: "Prof. María González",
      maxCapacity: 25,
      fee: 1800.0,
      semester: "fall",
      year: 2024,
      location: "Aula 205",
      schedule: {
        days: ["Tuesday", "Thursday"],
        startTime: "14:00",
        endTime: "16:00",
      },
    });

    const course3 = courseRepository.create({
      title: "Cálculo I",
      code: "MATH101",
      description: "Introducción al cálculo diferencial e integral",
      credits: 3,
      department: "Mathematics",
      instructor: "Prof. Roberto Silva",
      maxCapacity: 40,
      fee: 1200.0,
      semester: "fall",
      year: 2024,
      location: "Aula 301",
      schedule: {
        days: ["Monday", "Wednesday", "Friday"],
        startTime: "11:00",
        endTime: "12:00",
      },
    });

    await courseRepository.save([course1, course2, course3]);
    console.log("✅ Cursos creados");

    // Establecer relaciones Many-to-Many
    student1.courses = [course1, course3]; // María toma CS101 y MATH101
    student2.courses = [course1, course2]; // Carlos toma CS101 y CS201
    student3.courses = [course1, course2, course3]; // Ana toma todos los cursos

    await studentRepository.save([student1, student2, student3]);
    console.log("✅ Inscripciones realizadas");

    // Consultar estudiantes con cursos
    const studentsWithCourses = await studentRepository.find({
      relations: ["courses"],
    });

    console.log("\n📋 Estudiantes con cursos:");
    studentsWithCourses.forEach((student) => {
      console.log(`  • ${student.getFullName()} (${student.studentId})`);
      console.log(`    🎓 ${student.getAcademicLevel()} - ${student.major}`);
      console.log(`    📊 GPA: ${student.gpa} (${student.getGpaCategory()})`);
      console.log(`    📅 ${student.getYearsEnrolled()} años inscrito`);
      console.log(`    📚 ${student.getCourseCount()} cursos:`);

      if (student.courses && student.courses.length > 0) {
        student.courses.forEach((course) => {
          console.log(`      - ${course.getFullCode()}: ${course.title}`);
          console.log(
            `        🏫 ${course.instructor} - ${course.getFormattedFee()}`
          );
          console.log(`        📅 ${course.getScheduleDisplay()}`);
          console.log(
            `        📍 ${course.location} - ${course.credits} créditos`
          );
        });
      }
      console.log("");
    });

    // Consultar cursos con estudiantes
    const coursesWithStudents = await courseRepository.find({
      relations: ["students"],
    });

    console.log("\n📋 Cursos con estudiantes:");
    coursesWithStudents.forEach((course) => {
      console.log(`  • ${course.getFullCode()}: ${course.title}`);
      console.log(`    👨‍🏫 ${course.instructor} - ${course.department}`);
      console.log(
        `    💰 ${course.getFormattedFee()} - ${course.credits} créditos`
      );
      console.log(
        `    📊 ${course.getEnrollmentCount()}/${
          course.maxCapacity
        } estudiantes (${course.getEnrollmentPercentage().toFixed(1)}%)`
      );
      console.log(`    🎯 ${course.getAvailableSpots()} cupos disponibles`);
      console.log(`    📅 ${course.getSemesterDisplay()}`);
      console.log(`    🕒 ${course.getScheduleDisplay()}`);

      if (course.students && course.students.length > 0) {
        console.log("    👥 Estudiantes:");
        course.students.forEach((student) => {
          console.log(
            `      - ${student.getFullName()} (${student.studentId})`
          );
          console.log(
            `        GPA: ${student.gpa} - ${student.getAcademicLevel()}`
          );
        });
      }
      console.log("");
    });

    // === CONSULTAS AVANZADAS CON RELACIONES ===
    console.log("🔍 Consultas avanzadas con relaciones:");
    console.log("=".repeat(50));

    // Buscar libros por autor
    const garciaMarquezBooks = await bookRepository.find({
      relations: ["author"],
      where: {
        author: {
          lastName: "García Márquez",
        },
      },
    });
    console.log(`📚 Libros de García Márquez: ${garciaMarquezBooks.length}`);

    // Buscar estudiantes por curso
    const cs101Students = await studentRepository.find({
      relations: ["courses"],
      where: {
        courses: {
          code: "CS101",
        },
      },
    });
    console.log(`🎓 Estudiantes en CS101: ${cs101Students.length}`);

    // Buscar autores con libros publicados
    const publishedAuthors = await authorRepository
      .createQueryBuilder("author")
      .leftJoinAndSelect("author.books", "book")
      .where("book.isPublished = :isPublished", { isPublished: true })
      .getMany();
    console.log(
      `✍️  Autores con libros publicados: ${publishedAuthors.length}`
    );

    // Estadísticas finales
    console.log("\n📊 Estadísticas finales:");
    console.log("=".repeat(50));

    const totalUsers = await userRepository.count();
    const totalAuthors = await authorRepository.count();
    const totalBooks = await bookRepository.count();
    const totalProfiles = await profileRepository.count();
    const totalStudents = await studentRepository.count();
    const totalCourses = await courseRepository.count();

    console.log(`👥 Total usuarios: ${totalUsers}`);
    console.log(`📝 Total perfiles: ${totalProfiles}`);
    console.log(`✍️  Total autores: ${totalAuthors}`);
    console.log(`📚 Total libros: ${totalBooks}`);
    console.log(`🎓 Total estudiantes: ${totalStudents}`);
    console.log(`📖 Total cursos: ${totalCourses}`);

    // Valor total del inventario de libros
    const totalInventoryValue = await bookRepository
      .createQueryBuilder("book")
      .select("SUM(book.price * book.stock)", "total")
      .getRawOne();
    console.log(
      `💰 Valor total del inventario: $${parseFloat(
        totalInventoryValue.total || 0
      ).toFixed(2)}`
    );

    console.log("\n✅ Ejemplo de relaciones completado exitosamente!");
  } catch (error) {
    console.error("❌ Error ejecutando el ejemplo:", error);
  } finally {
    // Cerrar conexión
    await dataSource.destroy();
    console.log("🔐 Conexión cerrada");
  }
}

// Ejecutar el ejemplo
runRelationsExample().catch(console.error);
