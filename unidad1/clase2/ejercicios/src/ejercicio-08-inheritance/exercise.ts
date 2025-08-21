import "reflect-metadata";
import { AppDataSource } from "../common/data-source";
import * as TPH from "./table-per-hierarchy/entities";
import * as TPC from "./table-per-class/entities";
import * as JT from "./joined-table/entities";

// Ejercicio 08 – Herencia (TPH, TPC, JT)
// Implementá las funciones TODO creando datos mínimos y haciendo consultas por cada estrategia.

export async function clearInheritanceData(): Promise<void> {
  // Nota: cada estrategia usa sus propias tablas; limpiamos lo que exista.
  // Al estar separadas por nombres, simplemente intentamos clear en las que estén presentes.
  const manager = AppDataSource.manager;
  try {
    await manager.getRepository(JT.TruckDetail).clear();
    await manager.getRepository(JT.MotorcycleDetail).clear();
    await manager.getRepository(JT.CarDetail).clear();
    await manager.getRepository(JT.Vehicle).clear();
  } catch {}
  try {
    await manager.getRepository(TPC.Truck).clear();
    await manager.getRepository(TPC.Motorcycle).clear();
    await manager.getRepository(TPC.Car).clear();
  } catch {}
  try {
    await manager.getRepository(TPH.Truck).clear();
    await manager.getRepository(TPH.Motorcycle).clear();
    await manager.getRepository(TPH.Car).clear();
  } catch {}
}

export async function seedTPHMinimal(): Promise<void> {
  // TODO: crear 1 Car, 1 Motorcycle y 1 Truck usando entidades TPH y persistirlos
  // - Luego devolver sin retornar datos
  throw new Error("TODO: Implement seedTPHMinimal");
}

export async function listTPHVehicles(): Promise<
  Array<{ id: number; type: string; info: string }>
> {
  // TODO: consultar todos los vehicles (polimórficamente) y mapear a {id, type, info}
  // - type debería ser el discriminador inferido (Car/Motorcycle/Truck)
  throw new Error("TODO: Implement listTPHVehicles");
}

export async function seedTPCMinimal(): Promise<void> {
  // TODO: crear 1 Car, 1 Motorcycle y 1 Truck usando tablas separadas TPC y persistirlos
  throw new Error("TODO: Implement seedTPCMinimal");
}

export async function listTPCCars(): Promise<
  Array<{ id: number; info: string }>
> {
  // TODO: traer solo autos (tabla cars) y mapear info legible
  throw new Error("TODO: Implement listTPCCars");
}

export async function seedJTMinimal(): Promise<void> {
  // TODO: crear un Vehicle base y su detalle correspondiente (CarDetail/MotorcycleDetail/TruckDetail)
  // - Guardar en el orden correcto para respetar las FKs
  throw new Error("TODO: Implement seedJTMinimal");
}

export async function listJTJoinedCars(): Promise<
  Array<{ id: number; info: string }>
> {
  // TODO: hacer join manual (QueryBuilder) entre vehicles y car_details y mapear los resultados
  throw new Error("TODO: Implement listJTJoinedCars");
}
