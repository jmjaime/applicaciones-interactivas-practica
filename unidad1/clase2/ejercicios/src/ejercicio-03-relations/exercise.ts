import "reflect-metadata";
import { AppDataSource } from "../common/data-source";
import { Chef } from "./entities/Chef";
import { Restaurant } from "./entities/Restaurant";
import { Menu } from "./entities/Menu";
import { Dish } from "./entities/Dish";
import { Ingredient } from "./entities/Ingredient";

// Ejercicio 03 – Relaciones (1:1, 1:N, N:M)
// Instrucciones: Implementá las funciones TODO usando repositorios y relaciones.
// No modifiques las entidades. Podés agregar helpers privados si lo necesitás.

export async function clearRelationsData(): Promise<void> {
  const dishRepo = AppDataSource.getRepository(Dish);
  const menuRepo = AppDataSource.getRepository(Menu);
  const ingredientRepo = AppDataSource.getRepository(Ingredient);
  const restaurantRepo = AppDataSource.getRepository(Restaurant);
  const chefRepo = AppDataSource.getRepository(Chef);

  await dishRepo.clear();
  await ingredientRepo.clear();
  await menuRepo.clear();
  await restaurantRepo.clear();
  await chefRepo.clear();
}

export async function createChefWithRestaurant(input: {
  chef: Partial<Chef>;
  restaurant: Partial<Restaurant>;
}): Promise<{ chef: Chef; restaurant: Restaurant }> {
  // TODO: crear un Chef y un Restaurant relacionados (1:1 o 1:N según la entidad)
  // Guardar y devolver ambos
  throw new Error("TODO: Implement createChefWithRestaurant");
}

export async function addMenuWithDishes(
  restaurantId: number,
  menuData: Partial<Menu>,
  dishes: Array<Partial<Dish>>
): Promise<Menu> {
  // TODO: crear un Menu asociado a Restaurant (1:N) y sus Dish (1:N)
  // Retornar el Menu con dishes cargados
  throw new Error("TODO: Implement addMenuWithDishes");
}

export async function attachIngredients(
  dishId: number,
  ingredientNames: string[]
): Promise<Dish> {
  // TODO: asociar N:M Dish ↔ Ingredient. Crear ingredientes si no existen
  // Devolver Dish con sus ingredients cargados
  throw new Error("TODO: Implement attachIngredients");
}

export async function listRestaurantMenus(
  restaurantId: number
): Promise<Menu[]> {
  // TODO: listar menús de un restaurante con sus dishes (usar relations)
  throw new Error("TODO: Implement listRestaurantMenus");
}

export async function findDishesByIngredient(name: string): Promise<Dish[]> {
  // TODO: devolver platos que utilizan determinado ingrediente (QueryBuilder o relations.where)
  throw new Error("TODO: Implement findDishesByIngredient");
}
