import "reflect-metadata";
import { DataSource } from "typeorm";

// Crear DataSource base - las entidades se configurarán específicamente por ejemplo
export const createDataSource = (database: string, entities: any[]) => {
  return new DataSource({
    type: "sqlite",
    database,
    synchronize: true,
    logging: true,
    entities,
  });
};

// DataSource por defecto para ejemplos generales
export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "typeorm-examples.sqlite",
  synchronize: true,
  logging: true,
  entities: [], // Se configurará dinámicamente
});

export const initializeDataSource = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ DataSource inicializado correctamente");
  } catch (error) {
    console.error("❌ Error al inicializar DataSource:", error);
  }
};

export const closeDataSource = async () => {
  try {
    await AppDataSource.destroy();
    console.log("✅ DataSource cerrado correctamente");
  } catch (error) {
    console.error("❌ Error al cerrar DataSource:", error);
  }
};
