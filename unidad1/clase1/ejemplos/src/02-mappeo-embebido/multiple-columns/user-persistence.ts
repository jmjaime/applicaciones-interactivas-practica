import Database from "better-sqlite3";

export interface UserData {
  id?: number;
  nombre: string;
  email: string;
  direccion: {
    calle: string;
    ciudad: string;
    codigoPostal: string;
    pais: string;
  };
}

export interface UserWithEmbeddedAddress {
  id: number;
  nombre: string;
  email: string;
  direccion_calle: string;
  direccion_ciudad: string;
  direccion_codigo_postal: string;
  direccion_pais: string;
}

export class UserSQLPersistence {
  private db: Database.Database;

  constructor(dbPath: string = "multiple-columns-sql.sqlite") {
    this.db = new Database(dbPath);
    this.db.pragma("foreign_keys = ON");
  }

  async initialize(): Promise<void> {
    console.log("🔧 Inicializando cliente SQL para múltiples columnas...");
    await this.createDatabaseStructure();
    console.log("✅ Cliente SQL inicializado correctamente");
  }

  private async createDatabaseStructure(): Promise<void> {
    console.log("🏗️ Creando estructura de base de datos...");

    // Limpiar tabla existente
    this.db.exec(`DROP TABLE IF EXISTS usuarios`);

    // Crear tabla usuarios con direcciones embebidas como columnas separadas
    this.db.exec(`
            CREATE TABLE usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                direccion_calle TEXT NOT NULL,
                direccion_ciudad TEXT NOT NULL,
                direccion_codigo_postal TEXT NOT NULL,
                direccion_pais TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

    // Crear índices para búsquedas por elementos de dirección
    this.db.exec(`
            CREATE INDEX idx_usuarios_email ON usuarios(email);
            CREATE INDEX idx_usuarios_ciudad ON usuarios(direccion_ciudad);
            CREATE INDEX idx_usuarios_pais ON usuarios(direccion_pais);
            CREATE INDEX idx_usuarios_codigo_postal ON usuarios(direccion_codigo_postal);
        `);

    console.log("✅ Estructura de base de datos creada");
  }

  async createUser(userData: UserData): Promise<number> {
    const stmt = this.db.prepare(`
            INSERT INTO usuarios (
                nombre, 
                email, 
                direccion_calle, 
                direccion_ciudad, 
                direccion_codigo_postal, 
                direccion_pais
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `);

    const result = stmt.run(
      userData.nombre,
      userData.email,
      userData.direccion.calle,
      userData.direccion.ciudad,
      userData.direccion.codigoPostal,
      userData.direccion.pais
    );

    return result.lastInsertRowid as number;
  }

  async createUsers(usersData: UserData[]): Promise<number[]> {
    const userIds: number[] = [];

    const transaction = this.db.transaction((users: UserData[]) => {
      const stmt = this.db.prepare(`
                INSERT INTO usuarios (
                    nombre, 
                    email, 
                    direccion_calle, 
                    direccion_ciudad, 
                    direccion_codigo_postal, 
                    direccion_pais
                )
                VALUES (?, ?, ?, ?, ?, ?)
            `);

      for (const user of users) {
        const result = stmt.run(
          user.nombre,
          user.email,
          user.direccion.calle,
          user.direccion.ciudad,
          user.direccion.codigoPostal,
          user.direccion.pais
        );
        userIds.push(result.lastInsertRowid as number);
      }
    });

    transaction(usersData);
    return userIds;
  }

  getAllUsers(): UserData[] {
    const stmt = this.db.prepare(`
            SELECT 
                id,
                nombre,
                email,
                direccion_calle,
                direccion_ciudad,
                direccion_codigo_postal,
                direccion_pais
            FROM usuarios
            ORDER BY id
        `);

    const rows = stmt.all() as UserWithEmbeddedAddress[];
    return rows.map(this.mapToUserData);
  }

  getUserById(id: number): UserData | null {
    const stmt = this.db.prepare(`
            SELECT 
                id,
                nombre,
                email,
                direccion_calle,
                direccion_ciudad,
                direccion_codigo_postal,
                direccion_pais
            FROM usuarios
            WHERE id = ?
        `);

    const row = stmt.get(id) as UserWithEmbeddedAddress | undefined;
    return row ? this.mapToUserData(row) : null;
  }

  getUsersByCity(ciudad: string): UserData[] {
    const stmt = this.db.prepare(`
            SELECT 
                id,
                nombre,
                email,
                direccion_calle,
                direccion_ciudad,
                direccion_codigo_postal,
                direccion_pais
            FROM usuarios
            WHERE direccion_ciudad = ?
            ORDER BY nombre
        `);

    const rows = stmt.all(ciudad) as UserWithEmbeddedAddress[];
    return rows.map(this.mapToUserData);
  }

  getUsersByCountry(pais: string): UserData[] {
    const stmt = this.db.prepare(`
            SELECT 
                id,
                nombre,
                email,
                direccion_calle,
                direccion_ciudad,
                direccion_codigo_postal,
                direccion_pais
            FROM usuarios
            WHERE direccion_pais = ?
            ORDER BY direccion_ciudad, nombre
        `);

    const rows = stmt.all(pais) as UserWithEmbeddedAddress[];
    return rows.map(this.mapToUserData);
  }

  searchUsersByAddress(searchTerm: string): UserData[] {
    const stmt = this.db.prepare(`
            SELECT 
                id,
                nombre,
                email,
                direccion_calle,
                direccion_ciudad,
                direccion_codigo_postal,
                direccion_pais
            FROM usuarios
            WHERE direccion_calle LIKE ? 
               OR direccion_ciudad LIKE ?
               OR direccion_codigo_postal LIKE ?
               OR direccion_pais LIKE ?
            ORDER BY nombre
        `);

    const searchPattern = `%${searchTerm}%`;
    const rows = stmt.all(
      searchPattern,
      searchPattern,
      searchPattern,
      searchPattern
    ) as UserWithEmbeddedAddress[];
    return rows.map(this.mapToUserData);
  }

  updateUserAddress(id: number, direccion: UserData["direccion"]): boolean {
    const stmt = this.db.prepare(`
            UPDATE usuarios 
            SET direccion_calle = ?,
                direccion_ciudad = ?,
                direccion_codigo_postal = ?,
                direccion_pais = ?
            WHERE id = ?
        `);

    const result = stmt.run(
      direccion.calle,
      direccion.ciudad,
      direccion.codigoPostal,
      direccion.pais,
      id
    );

    return result.changes > 0;
  }

  // Consulta para obtener estadísticas por ciudad
  getCityStats(): Array<{ ciudad: string; pais: string; count: number }> {
    const stmt = this.db.prepare(`
            SELECT 
                direccion_ciudad as ciudad,
                direccion_pais as pais,
                COUNT(*) as count
            FROM usuarios
            GROUP BY direccion_ciudad, direccion_pais
            ORDER BY count DESC, ciudad
        `);

    return stmt.all() as Array<{ ciudad: string; pais: string; count: number }>;
  }

  // Método privado para mapear filas de DB a objetos UserData
  private mapToUserData(row: UserWithEmbeddedAddress): UserData {
    return {
      id: row.id,
      nombre: row.nombre,
      email: row.email,
      direccion: {
        calle: row.direccion_calle,
        ciudad: row.direccion_ciudad,
        codigoPostal: row.direccion_codigo_postal,
        pais: row.direccion_pais,
      },
    };
  }

  async close(): Promise<void> {
    this.db.close();
    console.log("🔒 Conexión SQL cerrada");
  }
}
