import { Database, preloadSqlJs } from "../../utils/sqlite";
import { paso } from "../../utils/demo";

async function main() {
  await preloadSqlJs();
  const db = new Database("rel-one-to-many.sqlite");
  db.pragma("foreign_keys = ON");

  try {
    console.log("=== RELACIÓN 1:N (Autor → Libros) - SQL PURO ===");

    await paso("Esquema: authors (1) → (N) books", () => {
      db.exec(`
        DROP TABLE IF EXISTS books;
        DROP TABLE IF EXISTS authors;

        CREATE TABLE authors (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL
        );

        CREATE TABLE books (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          author_id INTEGER NOT NULL,
          FOREIGN KEY (author_id) REFERENCES authors(id)
        );
      `);
    });

    await paso("Insertar autores y libros", () => {
      const insertAuthor = db.prepare(
        `INSERT INTO authors (first_name, last_name) VALUES (?, ?)`
      );
      const insertBook = db.prepare(
        `INSERT INTO books (title, author_id) VALUES (?, ?)`
      );

      const trx = db.transaction(() => {
        const gabo = insertAuthor.run("Gabriel", "García Márquez")
          .lastInsertRowid as number;
        const borges = insertAuthor.run("Jorge Luis", "Borges")
          .lastInsertRowid as number;

        insertBook.run("Cien años de soledad", gabo);
        insertBook.run("El amor en los tiempos del cólera", gabo);
        insertBook.run("Ficciones", borges);
        insertBook.run("El Aleph", borges);
      });
      trx();
    });

    await paso("Autores y sus libros (GROUP_CONCAT)", () => {
      const rows = db
        .prepare(
          `SELECT a.first_name || ' ' || a.last_name AS author, GROUP_CONCAT(b.title, ', ') AS books
           FROM authors a LEFT JOIN books b ON b.author_id = a.id
           GROUP BY a.id ORDER BY a.last_name`
        )
        .all();
      console.table(rows);
    });

    await paso("Libros de un autor específico", () => {
      const gaboBooks = db
        .prepare(
          `SELECT b.title FROM books b JOIN authors a ON a.id = b.author_id WHERE a.last_name = ?`
        )
        .all("García Márquez");
      console.table(gaboBooks);
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
