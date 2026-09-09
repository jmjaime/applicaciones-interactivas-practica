import "reflect-metadata";
import path from "path";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

// DataSource para el CLI de TypeORM (`npm run migration:generate` /
// `npm run migration:run`) — separado del `data-source.ts` de runtime
// porque el CLI necesita un archivo persistente (no en memoria) para que
// el esquema sobreviva entre invocaciones y `migration:generate` pueda
// diffar contra las entidades.
export default new DataSource({
  type: "sqljs",
  location: "propiedades-tpo.sqlite",
  autoSave: true,
  synchronize: false,
  entities: [path.join(__dirname, "../entities/*.{ts,js}")],
  migrations: ["src/migrations/*.ts"],
  namingStrategy: new SnakeNamingStrategy(),
});
