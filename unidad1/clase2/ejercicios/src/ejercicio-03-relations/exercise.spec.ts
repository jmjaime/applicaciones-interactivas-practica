import "reflect-metadata";
import { initializeDatabase, closeDatabase } from "../common/data-source";
import {
  clearRelationsData,
  createChefWithRestaurant,
  addMenuWithDishes,
  attachIngredients,
  listRestaurantMenus,
  findDishesByIngredient,
} from "./exercise";

describe("Ejercicio 03 - Relaciones", () => {
  beforeAll(async () => {
    await initializeDatabase("ej03");
  });

  afterAll(async () => {
    await closeDatabase();
  });

  beforeEach(async () => {
    await clearRelationsData();
  });

  it("crea chef y restaurant relacionados", async () => {
    const { chef, restaurant } = await createChefWithRestaurant({
      chef: { firstName: "Ana", lastName: "García", email: "ana@chef.test" },
      restaurant: { name: "La Cocina de Ana", address: "Av. 1", capacity: 50 },
    });
    expect(chef.id).toBeDefined();
    expect(restaurant.id).toBeDefined();
  });

  it("agrega menú con platos a un restaurante", async () => {
    const { restaurant } = await createChefWithRestaurant({
      chef: { firstName: "Carlos", lastName: "Ruiz", email: "c@chef.test" },
      restaurant: { name: "Sabores", address: "Calle 2", capacity: 30 },
    });
    const menu = await addMenuWithDishes(restaurant.id, { name: "Almuerzo" }, [
      { name: "Pasta", price: 10 },
      { name: "Ensalada", price: 7 },
    ]);
    expect(menu.id).toBeDefined();
  });

  it("asocia ingredientes a un plato y permite buscar por ingrediente", async () => {
    const { restaurant } = await createChefWithRestaurant({
      chef: { firstName: "Laura", lastName: "Sánchez", email: "l@chef.test" },
      restaurant: { name: "Delicias", address: "Av. 3", capacity: 40 },
    });
    const menu = await addMenuWithDishes(restaurant.id, { name: "Cena" }, [
      { name: "Pizza Margarita", price: 12 },
    ]);
    const dish = menu.dishes[0];
    const updated = await attachIngredients(dish.id, [
      "Tomate",
      "Mozzarella",
      "Albahaca",
    ]);
    expect(updated.ingredients.length).toBe(3);

    const withTomato = await findDishesByIngredient("Tomate");
    expect(withTomato.some((d) => d.id === updated.id)).toBe(true);
  });

  it("lista menús de un restaurante con platos", async () => {
    const { restaurant } = await createChefWithRestaurant({
      chef: { firstName: "Miguel", lastName: "Pérez", email: "m@chef.test" },
      restaurant: { name: "Rincón", address: "Calle 4", capacity: 20 },
    });
    await addMenuWithDishes(restaurant.id, { name: "Desayuno" }, [
      { name: "Café", price: 3 },
      { name: "Medialunas", price: 4 },
    ]);
    const menus = await listRestaurantMenus(restaurant.id);
    expect(menus.length).toBeGreaterThanOrEqual(1);
    expect(menus[0].dishes.length).toBeGreaterThanOrEqual(1);
  });
});
