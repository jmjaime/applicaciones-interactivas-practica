import Database from "better-sqlite3";

// Ejercicio: One-to-One (1:1)
// Objetivo: tabla principal 'user' + tabla dependiente 'user_profile' (FK UNIQUE)
// Instrucciones: completar los TODO con SQL para crear tablas e insertar datos.

export type User = {
  id?: number;
  username: string;
  email: string;
  isActive: boolean;
};

export type UserProfile = {
  id?: number;
  userId: number; // 1:1 con user.id
  firstName: string;
  lastName: string;
  city?: string;
  country?: string;
};

// Instancias para persistir
export const users: User[] = [
  { id: 1, username: "ana_garcia", email: "ana@example.com", isActive: true },
  {
    id: 2,
    username: "carlos_ruiz",
    email: "carlos@example.com",
    isActive: true,
  },
];

export const profiles: UserProfile[] = [
  {
    id: 1,
    userId: 1,
    firstName: "Ana",
    lastName: "García",
    city: "Madrid",
    country: "España",
  },
  {
    id: 2,
    userId: 2,
    firstName: "Carlos",
    lastName: "Ruiz",
    city: "Buenos Aires",
    country: "Argentina",
  },
];

export class OneToOneExercise {
  private db: Database.Database;

  constructor() {
    this.db = new Database("ejercicio-one-to-one.sqlite");
  }

  async run(): Promise<void> {
    try {
      await this.createSchema();
      await this.insertData();
      console.log("✅ 1:1: datos listos. Agregá consultas si querés.");
    } finally {
      this.db.close();
    }
  }

  async createSchema(): Promise<void> {
    console.log("🔧 TODO: Crear tablas 'user' y 'user_profile' (FK UNIQUE)");
    // TODO: Crear 'user' y 'user_profile' con UNIQUE(user_id) para garantizar 1:1
  }

  async insertData(): Promise<void> {
    console.log("📝 TODO: Insertar 'users' y 'profiles' (respetando FK)");
    // TODO: Insertar primero en 'user', luego en 'user_profile'
  }

  // Consultas (a implementar como parte del ejercicio)
  async getAll(): Promise<Array<UserProfile>> {
    // TODO: SELECT JOIN user ↔ user_profile devolviendo campos mapeados
    return [];
  }

  async getByActive(
    isActive: boolean
  ): Promise<Array<User>> {
    // TODO: SELECT filtrando por u.is_active
    return [];
  }

  async filterByCountry(country: string): Promise<
    Array<UserProfile>
  > {
    // TODO: SELECT JOIN filtrando por p.country
    return [];
  }
}

if (require.main === module) {
  new OneToOneExercise().run().catch(console.error);
}
