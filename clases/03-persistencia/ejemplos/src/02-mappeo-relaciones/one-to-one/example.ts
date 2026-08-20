import { Database, preloadSqlJs } from "../../utils/sqlite";
import { paso } from "../../utils/demo";

async function main() {
  await preloadSqlJs();
  const db = new Database("rel-one-to-one.sqlite");
  db.pragma("foreign_keys = ON");

  try {
    console.log("=== RELACIÓN 1:1 (Usuario ↔ Perfil) - SQL PURO ===");

    await paso("Esquema: users (1) ↔ (1) profiles", () => {
      db.exec(`
        DROP TABLE IF EXISTS profiles;
        DROP TABLE IF EXISTS users;

        CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE
        );

        CREATE TABLE profiles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL UNIQUE,
          bio TEXT,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
      `);
    });

    await paso("Insertar usuarios y perfiles", () => {
      const insertUser = db.prepare(`INSERT INTO users (name) VALUES (?)`);
      const insertProfile = db.prepare(
        `INSERT INTO profiles (user_id, bio) VALUES (?, ?)`
      );

      const trx = db.transaction(() => {
        const aliceId = (insertUser.run("Alice").lastInsertRowid as number) || 0;
        const bobId = (insertUser.run("Bob").lastInsertRowid as number) || 0;

        insertProfile.run(aliceId, "Ingeniera de datos. Lectora ávida.");
        insertProfile.run(bobId, "Diseñador UX. Amante del café.");
      });
      trx();
    });

    await paso("Usuarios con su perfil (JOIN)", () => {
      const rows = db
        .prepare(
          `SELECT u.name, p.bio FROM users u JOIN profiles p ON p.user_id = u.id`
        )
        .all();
      console.table(rows);
    });

    await paso("Perfil de un usuario puntual", () => {
      const alice = db
        .prepare(
          `SELECT u.name, p.bio FROM users u JOIN profiles p ON p.user_id = u.id WHERE u.name = ?`
        )
        .get("Alice");
      console.log(alice);
    });

    await paso("Cómo se fuerza el 1:1", () => {
      console.log("'profiles.user_id' es UNIQUE → un solo perfil por usuario");
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
