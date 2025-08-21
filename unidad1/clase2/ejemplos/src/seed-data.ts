import "reflect-metadata";
import { createDataSource } from "./common/data-source";
import { User } from "./01-entities/entities/User";
import { Product } from "./01-entities/entities/Product";
import {
  UserWithRestrictions,
  UserRole,
} from "./02-restrictions/entities/UserWithRestrictions";
import { CategoryEntity } from "./02-restrictions/entities/CategoryEntity";
import { Author } from "./03-relations/entities/Author";
import { Book } from "./03-relations/entities/Book";
import { Student } from "./03-relations/entities/Student";
import { Course } from "./03-relations/entities/Course";

async function seedData() {
  console.log("🌱 Sembrando datos de ejemplo...");

  try {
    // Crear DataSource con todas las entidades
    const dataSource = createDataSource("typeorm-examples.sqlite", [
      User,
      Product,
      UserWithRestrictions,
      CategoryEntity,
      Author,
      Book,
      Student,
      Course,
    ]);

    // Inicializar DataSource
    await dataSource.initialize();
    console.log("✅ Conexión establecida");

    // Obtener repositorios
    const userRepository = dataSource.getRepository(User);
    const productRepository = dataSource.getRepository(Product);
    const userRestrictionsRepository =
      dataSource.getRepository(UserWithRestrictions);
    const categoryRepository = dataSource.getRepository(CategoryEntity);
    const authorRepository = dataSource.getRepository(Author);
    const bookRepository = dataSource.getRepository(Book);
    const studentRepository = dataSource.getRepository(Student);
    const courseRepository = dataSource.getRepository(Course);

    // === SEMBRAR USUARIOS BÁSICOS ===
    console.log("👥 Creando usuarios básicos...");
    const users = [
      {
        firstName: "Ana",
        lastName: "García",
        email: "ana@example.com",
        age: 28,
        role: "user" as const,
        salary: 50000,
      },
      {
        firstName: "Carlos",
        lastName: "López",
        email: "carlos@example.com",
        age: 35,
        role: "admin" as const,
        salary: 75000,
      },
      {
        firstName: "María",
        lastName: "Rodríguez",
        email: "maria@example.com",
        age: 30,
        role: "user" as const,
        salary: 60000,
      },
    ];

    for (const userData of users) {
      const user = userRepository.create(userData);
      await userRepository.save(user);
    }
    console.log(`✅ ${users.length} usuarios creados`);

    // === SEMBRAR PRODUCTOS ===
    console.log("📦 Creando productos...");
    const products = [
      {
        name: "Laptop Gaming",
        description: "Laptop de alta gama para gaming",
        price: 1500,
        stock: 10,
        category: "Electronics",
      },
      {
        name: "Mouse Inalámbrico",
        description: "Mouse ergonómico inalámbrico",
        price: 45.99,
        stock: 50,
        category: "Accessories",
      },
      {
        name: "Teclado Mecánico",
        description: "Teclado mecánico RGB",
        price: 120,
        stock: 25,
        category: "Accessories",
      },
    ];

    for (const productData of products) {
      const product = productRepository.create(productData);
      await productRepository.save(product);
    }
    console.log(`✅ ${products.length} productos creados`);

    // === SEMBRAR USUARIOS CON RESTRICCIONES ===
    console.log("🔒 Creando usuarios con restricciones...");
    const restrictedUsers = [
      {
        firstName: "Pedro",
        lastName: "Martínez",
        username: "pedro_martinez",
        email: "pedro@example.com",
        age: 25,
        salary: 45000,
        role: UserRole.USER,
        phone: "11-1234-5678",
      },
      {
        firstName: "Laura",
        lastName: "González",
        username: "laura_admin",
        email: "laura@example.com",
        age: 32,
        salary: 80000,
        role: UserRole.ADMIN,
        phone: "11-9876-5432",
      },
    ];

    for (const userData of restrictedUsers) {
      const user = userRestrictionsRepository.create(userData);
      await userRestrictionsRepository.save(user);
    }
    console.log(
      `✅ ${restrictedUsers.length} usuarios con restricciones creados`
    );

    // === SEMBRAR CATEGORÍAS ===
    console.log("📂 Creando categorías...");
    const categories = [
      {
        name: "Electrónicos",
        description: "Dispositivos y gadgets electrónicos",
        color: "#FF5733",
        priority: 9,
        discountPercentage: 15,
        isFeatured: true,
      },
      {
        name: "Accesorios",
        description: "Accesorios para computadoras",
        color: "#33FF57",
        priority: 7,
        discountPercentage: 10,
        isFeatured: false,
      },
    ];

    for (const categoryData of categories) {
      const category = categoryRepository.create(categoryData);
      await categoryRepository.save(category);
    }
    console.log(`✅ ${categories.length} categorías creadas`);

    // === SEMBRAR AUTORES Y LIBROS ===
    console.log("📚 Creando autores y libros...");

    // Crear autor
    const author = authorRepository.create({
      firstName: "Gabriel",
      lastName: "García Márquez",
      email: "gabriel@example.com",
      biography: "Escritor colombiano, premio Nobel de Literatura",
      birthDate: new Date("1927-03-06"),
      nationality: "Colombiana",
    });
    await authorRepository.save(author);

    // Crear libros del autor
    const books = [
      {
        title: "Cien años de soledad",
        description: "Obra maestra del realismo mágico",
        isbn: "978-0-06-088328-7",
        price: 25.99,
        pages: 417,
        publishedDate: new Date("1967-06-05"),
        isPublished: true,
        genre: "Realismo mágico",
        stock: 50,
        author: author,
      },
      {
        title: "El amor en los tiempos del cólera",
        description: "Historia de amor que trasciende el tiempo",
        isbn: "978-0-14-018646-4",
        price: 22.5,
        pages: 348,
        publishedDate: new Date("1985-09-05"),
        isPublished: true,
        genre: "Romance",
        stock: 30,
        author: author,
      },
    ];

    for (const bookData of books) {
      const book = bookRepository.create(bookData);
      await bookRepository.save(book);
    }
    console.log(`✅ 1 autor y ${books.length} libros creados`);

    // === SEMBRAR ESTUDIANTES Y CURSOS ===
    console.log("🎓 Creando estudiantes y cursos...");

    // Crear cursos
    const courses = [
      {
        title: "Introducción a la Programación",
        code: "CS101",
        description: "Fundamentos de programación",
        credits: 4,
        department: "Computer Science",
        instructor: "Prof. Juan Pérez",
        maxCapacity: 30,
        semester: "fall" as const,
        year: 2024,
      },
      {
        title: "Estructuras de Datos",
        code: "CS201",
        description: "Estructuras de datos avanzadas",
        credits: 4,
        department: "Computer Science",
        instructor: "Prof. María González",
        maxCapacity: 25,
        semester: "fall" as const,
        year: 2024,
      },
    ];

    const savedCourses = [];
    for (const courseData of courses) {
      const course = courseRepository.create(courseData);
      const savedCourse = await courseRepository.save(course);
      savedCourses.push(savedCourse);
    }

    // Crear estudiantes
    const students = [
      {
        firstName: "María",
        lastName: "Rodríguez",
        email: "maria.rodriguez@university.edu",
        studentId: "STU001",
        enrollmentDate: new Date("2022-02-15"),
        major: "Computer Science",
        year: 2,
        gpa: 3.8,
      },
      {
        firstName: "Carlos",
        lastName: "López",
        email: "carlos.lopez@university.edu",
        studentId: "STU002",
        enrollmentDate: new Date("2021-08-20"),
        major: "Computer Science",
        year: 3,
        gpa: 3.5,
      },
    ];

    for (let i = 0; i < students.length; i++) {
      const student = studentRepository.create(students[i]);
      // Asignar cursos a estudiantes
      student.courses = i === 0 ? [savedCourses[0]] : savedCourses; // María toma 1 curso, Carlos toma 2
      await studentRepository.save(student);
    }

    console.log(
      `✅ ${students.length} estudiantes y ${courses.length} cursos creados`
    );

    // === ESTADÍSTICAS FINALES ===
    console.log("\n📊 Resumen de datos sembrados:");
    console.log("=".repeat(40));

    const totalUsers = await userRepository.count();
    const totalProducts = await productRepository.count();
    const totalRestrictedUsers = await userRestrictionsRepository.count();
    const totalCategories = await categoryRepository.count();
    const totalAuthors = await authorRepository.count();
    const totalBooks = await bookRepository.count();
    const totalStudents = await studentRepository.count();
    const totalCourses = await courseRepository.count();

    console.log(`👥 Usuarios básicos: ${totalUsers}`);
    console.log(`📦 Productos: ${totalProducts}`);
    console.log(`🔒 Usuarios con restricciones: ${totalRestrictedUsers}`);
    console.log(`📂 Categorías: ${totalCategories}`);
    console.log(`✍️  Autores: ${totalAuthors}`);
    console.log(`📚 Libros: ${totalBooks}`);
    console.log(`🎓 Estudiantes: ${totalStudents}`);
    console.log(`📖 Cursos: ${totalCourses}`);

    console.log("\n✅ Datos sembrados exitosamente!");

    // Cerrar conexión
    await dataSource.destroy();
    console.log("🔐 Conexión cerrada");
  } catch (error) {
    console.error("❌ Error sembrando datos:", error);
    process.exit(1);
  }
}

seedData();
