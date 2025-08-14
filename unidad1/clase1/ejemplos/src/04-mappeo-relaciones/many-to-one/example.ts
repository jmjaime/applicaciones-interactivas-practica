import Database from "better-sqlite3";

function main() {
  const db = new Database("rel-many-to-one.sqlite");
  db.pragma("foreign_keys = ON");

  try {
    console.log("📙 RELACIÓN N:1 (Libros → Autor) - SQL PURO\n");

    // Esquema (igual que 1:N visto desde el lado muchos)
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

    // Datos
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

    console.log("🏗️ Esquema creado y datos insertados\n");

    // Consulta N:1: Libro con su Autor
    const rows = db
      .prepare(
        `SELECT b.title, a.first_name || ' ' || a.last_name AS author
         FROM books b JOIN authors a ON a.id = b.author_id ORDER BY b.title`
      )
      .all();
    console.log("📄 Libros con su autor:");
    rows.forEach((r: any) => console.log(`- ${r.title} → ${r.author}`));
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
