import "reflect-metadata";
import { createDataSource } from "../common/data-source";
import { Author } from "./entities/Author";
import { Book } from "./entities/Book";
import { Student } from "./entities/Student";
import { Course } from "./entities/Course";

async function runSimpleRelationsExample() {
  console.log("🔗 Ejemplo Simple de Relaciones TypeORM\n");

  const dataSource = createDataSource("simple-relations.sqlite", [
    Author,
    Book,
    Student,
    Course,
  ]);

  try {
    await dataSource.initialize();
    console.log("✅ Base de datos conectada\n");

    const authorRepo = dataSource.getRepository(Author);
    const bookRepo = dataSource.getRepository(Book);
    const studentRepo = dataSource.getRepository(Student);
    const courseRepo = dataSource.getRepository(Course);

    // === ONE-TO-MANY: Autor → Libros ===
    console.log("📚 One-to-Many: Autor → Libros");
    console.log("-".repeat(40));

    const author = authorRepo.create({
      firstName: "Gabriel",
      lastName: "García Márquez",
      email: "gabriel@books.com",
      nationality: "Colombiana",
    });
    await authorRepo.save(author);

    const book1 = bookRepo.create({
      title: "Cien años de soledad",
      description: "Realismo mágico",
      isbn: "123456789",
      price: 25.99,
      pages: 400,
      isPublished: true,
      author: author,
    });

    const book2 = bookRepo.create({
      title: "El amor en los tiempos del cólera",
      description: "Romance épico",
      isbn: "987654321",
      price: 22.5,
      pages: 350,
      isPublished: true,
      author: author,
    });

    await bookRepo.save([book1, book2]);

    // Consultar autor con libros
    const authorWithBooks = await authorRepo.findOne({
      where: { id: author.id },
      relations: ["books"],
    });

    console.log(`Autor: ${authorWithBooks?.getFullName()}`);
    console.log(`Libros: ${authorWithBooks?.getBookCount()}`);
    authorWithBooks?.books.forEach((book) => {
      console.log(`  - ${book.title} (${book.getFormattedPrice()})`);
    });

    // === MANY-TO-MANY: Estudiantes ↔ Cursos ===
    console.log("\n🎓 Many-to-Many: Estudiantes ↔ Cursos");
    console.log("-".repeat(40));

    // Crear cursos
    const course1 = courseRepo.create({
      title: "Programación I",
      code: "PROG1",
      description: "Fundamentos de programación",
      credits: 4,
      department: "Sistemas",
      year: 2024,
      semester: "fall",
    });

    const course2 = courseRepo.create({
      title: "Base de Datos",
      code: "BD1",
      description: "Introducción a bases de datos",
      credits: 3,
      department: "Sistemas",
      year: 2024,
      semester: "fall",
    });

    await courseRepo.save([course1, course2]);

    // Crear estudiantes y asignar cursos
    const student1 = studentRepo.create({
      firstName: "Ana",
      lastName: "García",
      email: "ana@uni.edu",
      studentId: "EST001",
      enrollmentDate: new Date(),
      major: "Sistemas",
      year: 1,
      gpa: 3.8,
      courses: [course1, course2], // Ana toma ambos cursos
    });

    const student2 = studentRepo.create({
      firstName: "Carlos",
      lastName: "López",
      email: "carlos@uni.edu",
      studentId: "EST002",
      enrollmentDate: new Date(),
      major: "Sistemas",
      year: 2,
      gpa: 3.5,
      courses: [course1], // Carlos solo toma PROG1
    });

    await studentRepo.save([student1, student2]);

    // Consultar estudiantes con cursos
    const studentsWithCourses = await studentRepo.find({
      relations: ["courses"],
    });

    studentsWithCourses.forEach((student) => {
      console.log(`${student.getFullName()} (${student.studentId})`);
      console.log(`  Cursos: ${student.getCourseCount()}`);
      student.courses?.forEach((course) => {
        console.log(`    - ${course.getFullCode()}: ${course.title}`);
      });
    });

    // Consultar cursos con estudiantes
    const coursesWithStudents = await courseRepo.find({
      relations: ["students"],
    });

    console.log("\nCursos y matriculados:");
    coursesWithStudents.forEach((course) => {
      console.log(`${course.getFullCode()}: ${course.title}`);
      console.log(
        `  Matriculados: ${course.getEnrollmentCount()}/${course.maxCapacity}`
      );
      course.students?.forEach((student) => {
        console.log(`    - ${student.getFullName()}`);
      });
    });

    console.log("\n✅ Ejemplo completado!");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await dataSource.destroy();
  }
}

runSimpleRelationsExample().catch(console.error);
