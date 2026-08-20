import fs from "fs";
import {
  RecipeIngredientExercise,
  Recipe,
  Ingredient,
} from "./exercise";
import { preloadSqlJs } from "../../utils/sqlite";

const DB_PATH = "test-recipe-ingredient.sqlite";

function removeDbFile(): void {
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
}

describe("Many-to-Many (recipe/ingredient)", () => {
  let ex: RecipeIngredientExercise;

  beforeEach(async () => {
    await preloadSqlJs();
    removeDbFile();
    ex = new RecipeIngredientExercise(DB_PATH);
    await ex.createSchema();
  });

  afterEach(() => {
    ex.close();
  });

  it("arma una receta con varios ingredientes y la recupera con sus cantidades", async () => {
    const recipe: Recipe = { name: "Tortilla de papas", servings: 4 };
    const savedRecipe = await ex.insertRecipe(recipe);

    const eggs: Ingredient = { name: "Huevo", unit: "unidades" };
    const savedEggs = await ex.insertIngredient(eggs);
    const potatoes: Ingredient = { name: "Papa", unit: "g" };
    const savedPotatoes = await ex.insertIngredient(potatoes);

    await ex.addIngredientToRecipe(savedRecipe.id!, savedEggs.id!, 6);
    await ex.addIngredientToRecipe(savedRecipe.id!, savedPotatoes.id!, 500);

    const result = await ex.getRecipeWithIngredients(savedRecipe.id!);

    expect(result).not.toBeNull();
    expect(result!.name).toBe("Tortilla de papas");
    expect(result!.ingredients).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Huevo", quantity: 6 }),
        expect.objectContaining({ name: "Papa", quantity: 500 }),
      ])
    );
    expect(result!.ingredients).toHaveLength(2);
  });

  it("devuelve null si la receta no existe", async () => {
    const result = await ex.getRecipeWithIngredients(999);
    expect(result).toBeNull();
  });

  it("encuentra qué recetas usan un ingrediente dado", async () => {
    const omelette = await ex.insertRecipe({ name: "Omelette", servings: 1 });
    const tortilla = await ex.insertRecipe({
      name: "Tortilla de papas",
      servings: 4,
    });
    const salad = await ex.insertRecipe({ name: "Ensalada", servings: 2 });

    const eggs = await ex.insertIngredient({ name: "Huevo", unit: "unidades" });

    await ex.addIngredientToRecipe(omelette.id!, eggs.id!, 3);
    await ex.addIngredientToRecipe(tortilla.id!, eggs.id!, 6);

    const recipesWithEggs = await ex.getRecipesByIngredient(eggs.id!);

    expect(recipesWithEggs.map((r) => r.name).sort()).toEqual([
      "Omelette",
      "Tortilla de papas",
    ]);
    expect(recipesWithEggs.map((r) => r.name)).not.toContain(salad.name);
  });
});
