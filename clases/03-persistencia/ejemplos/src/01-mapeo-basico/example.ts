import Database from "better-sqlite3";
import { paso } from "../utils/demo";

type Person = {
  id?: number;
  name: string;
  lastName: string;
  age: number;
};

function initializeDatabase(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS person (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      lastName TEXT NOT NULL,
      age INTEGER NOT NULL
    );
  `);
}

function insertPeople(db: Database.Database, people: Person[]): number[] {
  const insert = db.prepare(
    `INSERT INTO person (name, lastName, age) VALUES (@name, @lastName, @age)`
  );
  const transaction = db.transaction((rows: Person[]) => {
    return rows.map((row) => insert.run(row).lastInsertRowid as number);
  });
  return transaction(people);
}

function listPeople(db: Database.Database): Person[] {
  const rows = db
    .prepare(`SELECT id, name, lastName, age FROM person ORDER BY id`)
    .all();
  return rows as Person[];
}

function findAdults(db: Database.Database, minAge: number): Person[] {
  const rows = db
    .prepare(
      `SELECT id, name, lastName, age FROM person WHERE age >= ? ORDER BY age DESC`
    )
    .all(minAge);
  return rows as Person[];
}

async function main(): Promise<void> {
  console.log("=== MAPEO BÁSICO SQL: CLASE → COLUMNAS ===");

  const db = new Database("mapeo-basico.sqlite");
  try {
    await paso("Esquema: CREATE TABLE person (id PK, name, lastName, age)", () => {
      initializeDatabase(db);
    });

    await paso("Insertar personas", () => {
      const ids = insertPeople(db, [
        { name: "Juan", lastName: "Pérez", age: 25 },
        { name: "María", lastName: "García", age: 30 },
        { name: "Carlos", lastName: "López", age: 28 },
      ]);
      console.log(`Insertadas con IDs: [${ids.join(", ")}]`);
    });

    await paso("Listado completo", () => {
      console.table(listPeople(db));
    });

    await paso("Mayores o iguales a 28 años", () => {
      console.table(findAdults(db, 28));
    });

    await paso("Mapeo objeto → tabla", () => {
      console.log(
        "Person.name → person.name | Person.lastName → person.lastName | Person.age → person.age"
      );
    });
  } finally {
    db.close();
  }
}

main();
