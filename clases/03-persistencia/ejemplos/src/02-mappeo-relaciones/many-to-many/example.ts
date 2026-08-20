import Database from "better-sqlite3";
import { paso } from "../../utils/demo";

// N:M (Students ↔ Courses) — versión acotada a propósito.
//
// N:M es el tema del ejercicio integrador de la clase (dominio distinto:
// Recipe/Ingredient, ver ejercicios/02-relaciones/many-to-many — no se pisan
// entre sí, pero tampoco tiene sentido resolver acá lo que el ejercicio
// pide). Este ejemplo se queda solo con el esquema y la inserción — muestra
// CÓMO se arma la tabla puente, no cómo se consulta.

async function main() {
  const db = new Database("rel-many-to-many.sqlite");
  db.pragma("foreign_keys = ON");

  try {
    console.log("=== RELACIÓN N:M (Cursos ↔ Estudiantes) - SQL PURO ===");

    await paso("Esquema con tabla puente 'enrollments'", () => {
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
    });

    await paso("Insertar estudiantes, cursos e inscripciones", () => {
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

      console.table(db.prepare(`SELECT * FROM enrollments`).all());
      console.log(
        "(el ejercicio integrador pide las consultas — ver ejercicios/02-relaciones/many-to-many)"
      );
    });
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    db.close();
  }
}

if (require.main === module) {
  main();
}

export { main };
