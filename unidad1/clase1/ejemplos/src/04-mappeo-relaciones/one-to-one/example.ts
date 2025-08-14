import Database from "better-sqlite3";

function main() {
  const db = new Database("rel-one-to-one.sqlite");
  db.pragma("foreign_keys = ON");

  try {
    console.log("📘 RELACIÓN 1:1 (Usuario ↔ Perfil) - SQL PURO\n");

    // Esquema
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

    // Datos
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

    console.log("🏗️ Esquema creado y datos insertados\n");

    // Consulta 1: Listado 1:1
    console.log("📄 Usuarios con su perfil:");
    const rows = db
      .prepare(
        `SELECT u.name, p.bio FROM users u JOIN profiles p ON p.user_id = u.id`
      )
      .all();
    rows.forEach((r: any) => console.log(`- ${r.name} → ${r.bio}`));

    // Consulta 2: Obtener perfil por usuario
    const alice = db
      .prepare(
        `SELECT u.name, p.bio FROM users u JOIN profiles p ON p.user_id = u.id WHERE u.name = ?`
      )
      .get("Alice");
    console.log("\n🔍 Perfil de Alice:", alice);

    // Consulta 3: Verificar unicidad (un perfil por usuario)
    console.log(
      "\n🔒 Restricción: 'profiles.user_id' es UNIQUE para forzar 1:1"
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
