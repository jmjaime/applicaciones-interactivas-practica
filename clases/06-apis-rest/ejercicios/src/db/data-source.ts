import "reflect-metadata";
import path from "path";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

// Glob en vez de listar cada entidad a mano (mismo criterio que
// `migrations: ["src/migrations/*.ts"]` en cli-data-source.ts): agregar
// una entidad nueva a `entities/` alcanza, no hay que acordarse de
// importarla y sumarla acá.
const entitiesGlob = path.join(__dirname, "../entities/*.{ts,js}");

export let AppDataSource: DataSource;

// Dos modos, igual que clases/04-typeorm/ejercicios/src/common/data-source.ts:
// - "app": entidades mapeadas + synchronize (CRUD, service, paginación).
// - "migrations": sin entidades, synchronize:false — se trabaja directo
//   con QueryRunner y SQL crudo, como en una migración real.
type Mode = "app" | "migrations";

export const initializeDatabase = async (mode: Mode = "app") => {
  AppDataSource = new DataSource(
    mode === "app"
      ? {
          type: "sqljs",
          synchronize: true,
          logging: false,
          entities: [entitiesGlob],
          namingStrategy: new SnakeNamingStrategy(),
        }
      : {
          type: "sqljs",
          synchronize: false,
          logging: false,
          entities: [],
        }
  );
  await AppDataSource.initialize();
};

export const closeDatabase = async () => {
  if (AppDataSource && AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
};
