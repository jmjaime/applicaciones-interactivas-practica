import Database from "better-sqlite3";

function main() {
  const db = new Database("rel-many-to-many.sqlite");
  db.pragma("foreign_keys = ON");

  try {
    console.log("📕 RELACIÓN N:M (Cursos ↔ Estudiantes) - SQL PURO\n");

    // Esquema con tabla puente
    db.exec(`
      DROP TABLE IF EXISTS enrollments;
      DROP TABLE IF EXISTS students;
      DROP TABLE IF EXISTS courses;

      CREATE TABLE students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );

      CREATE TABLE courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL
      );

      CREATE TABLE enrollments (
        student_id INTEGER NOT NULL,
        course_id INTEGER NOT NULL,
        enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (student_id, course_id),
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
      );
    `);

    // Datos
    const insertStudent = db.prepare(`INSERT INTO students (name) VALUES (?)`);
    const insertCourse = db.prepare(`INSERT INTO courses (title) VALUES (?)`);
    const insertEnrollment = db.prepare(
      `INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)`
    );

    const trx = db.transaction(() => {
      const ana = insertStudent.run("Ana").lastInsertRowid as number;
      const lucas = insertStudent.run("Lucas").lastInsertRowid as number;

      const sql = insertCourse.run("SQL Intermedio").lastInsertRowid as number;
      const ts = insertCourse.run("TypeScript Avanzado")
        .lastInsertRowid as number;

      insertEnrollment.run(ana, sql);
      insertEnrollment.run(ana, ts);
      insertEnrollment.run(lucas, sql);
    });
    trx();

    console.log("🏗️ Esquema creado y datos insertados\n");

    // Consulta: Cursos por estudiante
    console.log("📄 Cursos por estudiante:");
    const coursesByStudent = db
      .prepare(
        `SELECT s.name, GROUP_CONCAT(c.title, ', ') AS courses
         FROM students s
         LEFT JOIN enrollments e ON e.student_id = s.id
         LEFT JOIN courses c ON c.id = e.course_id
         GROUP BY s.id`
      )
      .all();
    coursesByStudent.forEach((r: any) =>
      console.log(`- ${r.name}: ${r.courses || "(sin cursos)"}`)
    );

    // Consulta: Estudiantes por curso
    console.log("\n📄 Estudiantes por curso:");
    const studentsByCourse = db
      .prepare(
        `SELECT c.title, GROUP_CONCAT(s.name, ', ') AS students
         FROM courses c
         LEFT JOIN enrollments e ON e.course_id = c.id
         LEFT JOIN students s ON s.id = e.student_id
         GROUP BY c.id`
      )
      .all();
    studentsByCourse.forEach((r: any) =>
      console.log(`- ${r.title}: ${r.students || "(sin alumnos)"}`)
    );
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    db.close();
    console.log("\n🔌 Conexión cerrada");
  }
}

if (require.main === module) {
  main();
}

export { main };
