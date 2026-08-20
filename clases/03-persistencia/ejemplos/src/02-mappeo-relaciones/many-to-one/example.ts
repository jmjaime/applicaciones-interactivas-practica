import { Database, preloadSqlJs } from "../../utils/sqlite";
import { paso } from "../../utils/demo";

async function main() {
  await preloadSqlJs();
  const db = new Database("rel-many-to-one.sqlite");
  db.pragma("foreign_keys = ON");

  try {
    console.log("=== RELACIÓN N:1 (Libros → Autor) - SQL PURO ===");

    await paso("Esquema (igual que 1:N, visto desde el lado 'muchos')", () => {
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

    await paso("Insertar autora y libros", () => {
      const insertAuthor = db.prepare(
        `INSERT INTO authors (first_name, last_name) VALUES (?, ?)`
      );
      const insertBook = db.prepare(
        `INSERT INTO books (title, author_id) VALUES (?, ?)`
      );

      const trx = db.transaction(() => {
        const allende = insertAuthor.run("Isabel", "Allende")
          .lastInsertRowid as number;
        insertBook.run("La casa de los espíritus", allende);
        insertBook.run("Eva Luna", allende);
      });
      trx();
    });

    await paso("Cada libro con su autor (N:1)", () => {
      const rows = db
        .prepare(
          `SELECT b.title, a.first_name || ' ' || a.last_name AS author
           FROM books b JOIN authors a ON a.id = b.author_id ORDER BY b.title`
        )
        .all();
      console.table(rows);
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
