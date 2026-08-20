import fs from "node:fs";
import initSqlJs, { Database as RawDatabase, SqlJsStatic, SqlValue } from "sql.js";

/**
 * Wrapper sobre sql.js (SQLite compilado a WebAssembly) con una API
 * síncrona calcada de better-sqlite3 (exec/prepare/run/all/get/pragma/
 * transaction), para no depender de compilar un binario nativo (y por lo
 * tanto no requerir Python/build tools para instalar). El único paso
 * async es cargar el módulo WASM una vez por proceso: llamar
 * `await preloadSqlJs()` antes del primer `new Database(...)`.
 */

let sqlJsPromise: Promise<SqlJsStatic> | null = null;
let SQL: SqlJsStatic | null = null;

export function preloadSqlJs(): Promise<void> {
  if (!sqlJsPromise) {
    sqlJsPromise = initSqlJs().then((loaded) => {
      SQL = loaded;
      return loaded;
    });
  }
  return sqlJsPromise.then(() => undefined);
}

type NamedParams = Record<string, SqlValue>;

function isPlainObject(value: unknown): value is NamedParams {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// sql.js solo bindea parámetros nombrados si la clave incluye el prefijo
// (@/:/ $) del placeholder en el SQL. Como acá se escriben los params como
// objetos "pelados" ({ name: ... }, igual que en better-sqlite3), hay que
// agregar el prefijo antes de bindear — si no, sql.js no tira error, pero
// inserta NULL en cada columna nombrada.
function toBindParams(args: unknown[]): SqlValue[] | NamedParams | undefined {
  if (args.length === 0) return undefined;
  if (args.length === 1 && isPlainObject(args[0])) {
    const prefixed: NamedParams = {};
    for (const [key, value] of Object.entries(args[0])) {
      const hasPrefix = key.startsWith("@") || key.startsWith(":") || key.startsWith("$");
      prefixed[hasPrefix ? key : `@${key}`] = value;
    }
    return prefixed;
  }
  return args as SqlValue[];
}

export class Statement {
  constructor(private raw: RawDatabase, private sql: string) {}

  run(...args: unknown[]): { changes: number; lastInsertRowid: number } {
    const stmt = this.raw.prepare(this.sql);
    try {
      stmt.bind(toBindParams(args));
      stmt.step();
    } finally {
      stmt.free();
    }
    const changes = this.raw.getRowsModified();
    const result = this.raw.exec("SELECT last_insert_rowid() AS id");
    const lastInsertRowid = Number(result[0]?.values[0]?.[0] ?? 0);
    return { changes, lastInsertRowid };
  }

  all<T = unknown>(...args: unknown[]): T[] {
    const stmt = this.raw.prepare(this.sql);
    const rows: T[] = [];
    try {
      stmt.bind(toBindParams(args));
      while (stmt.step()) rows.push(stmt.getAsObject() as T);
    } finally {
      stmt.free();
    }
    return rows;
  }

  get<T = unknown>(...args: unknown[]): T | undefined {
    const stmt = this.raw.prepare(this.sql);
    try {
      stmt.bind(toBindParams(args));
      if (stmt.step()) return stmt.getAsObject() as T;
      return undefined;
    } finally {
      stmt.free();
    }
  }
}

export class Database {
  private raw: RawDatabase;

  constructor(private path?: string) {
    if (!SQL) {
      throw new Error(
        "sql.js no fue inicializado: llamá `await preloadSqlJs()` antes de crear un Database."
      );
    }
    this.raw = path && fs.existsSync(path) ? new SQL.Database(fs.readFileSync(path)) : new SQL.Database();
  }

  exec(sql: string): void {
    this.raw.exec(sql);
  }

  prepare(sql: string): Statement {
    return new Statement(this.raw, sql);
  }

  pragma(pragma: string): void {
    this.raw.run(`PRAGMA ${pragma}`);
  }

  transaction<Args extends unknown[], R>(fn: (...args: Args) => R): (...args: Args) => R {
    return (...args: Args): R => {
      this.raw.run("BEGIN");
      try {
        const result = fn(...args);
        this.raw.run("COMMIT");
        return result;
      } catch (err) {
        this.raw.run("ROLLBACK");
        throw err;
      }
    };
  }

  close(): void {
    if (this.path) {
      fs.writeFileSync(this.path, Buffer.from(this.raw.export()));
    }
    this.raw.close();
  }
}

export default Database;
