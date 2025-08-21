import "reflect-metadata";
import { AppDataSource } from "../common/data-source";
import { User } from "./entities/User";
import { Category } from "./entities/Category";
import { Product, ProductStatus } from "./entities/Product";
import { Order, OrderStatus, PaymentStatus } from "./entities/Order";
import { OrderItem } from "./entities/OrderItem";
import { Review, ReviewStatus } from "./entities/Review";

// Ejercicio 09 – Optimización
// Implementá las funciones TODO enfocadas en: N+1, índices, SELECT específicos, joins, batch y paginación.

export async function clearOptimizationData(): Promise<void> {
  const manager = AppDataSource.manager;
  await manager.getRepository(OrderItem).clear();
  await manager.getRepository(Order).clear();
  await manager.getRepository(Review).clear();
  await manager.getRepository(Product).clear();
  await manager.getRepository(Category).clear();
  await manager.getRepository(User).clear();
}

export async function seedMinimalEcommerce(): Promise<void> {
  // TODO: crear algunos users, categories y products mínimos para pruebas
  // - Mantenerlo chico: 3 users, 2 categories, 5 products
  throw new Error("TODO: Implement seedMinimalEcommerce");
}

export async function demonstrateNPlusOne(): Promise<{
  slowCount: number;
  fastCount: number;
}> {
  // TODO: reproducir N+1 (find users y luego user.orders) y luego resolver con join
  // - Devolver conteos para comparar (pueden ser ficticios en esta etapa)
  throw new Error("TODO: Implement demonstrateNPlusOne");
}

export async function selectOnlyNeededFields(): Promise<
  Array<{ id: number; name: string; price: number }>
> {
  // TODO: consulta de products activos trayendo solo id, name, price
  throw new Error("TODO: Implement selectOnlyNeededFields");
}

export async function topSellingProducts(
  limit: number
): Promise<Array<{ id: number; name: string; totalSales: number }>> {
  // TODO: join category y ordenar por totalSales desc con limit
  throw new Error("TODO: Implement topSellingProducts");
}

export async function batchIncreasePrices(
  categoryId: number,
  percentage: number
): Promise<number> {
  // TODO: update masivo de price = price * (1 + percentage/100) para una categoría
  throw new Error("TODO: Implement batchIncreasePrices");
}

export async function paginateActiveProducts(
  page: number,
  pageSize: number
): Promise<{ data: Array<{ id: number; name: string }>; total: number }> {
  // TODO: paginar products activos por createdAt desc
  throw new Error("TODO: Implement paginateActiveProducts");
}
