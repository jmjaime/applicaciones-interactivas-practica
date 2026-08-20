import Database from "better-sqlite3";

// Ejercicio 1.3: Many-to-Many (N:M) — ver README.md de esta carpeta.

export type Recipe = {
  id?: number;
  name: string;
  servings: number;
};

export type Ingredient = {
  id?: number;
  name: string;
  unit: string; // "g", "ml", "unidades"
};

export type RecipeWithIngredients = Recipe & {
  ingredients: Array<Ingredient & { quantity: number }>;
};

export class RecipeIngredientExercise {
  private db: Database.Database;

  constructor(dbPath: string = "ejercicio-recipe-ingredient.sqlite") {
    this.db = new Database(dbPath);
  }

  close(): void {
    this.db.close();
  }

  async createSchema(): Promise<void> {
    // TODO: crear 'recipe', 'ingredient' y 'recipe_ingredient' (junction,
    // con recipe_id, ingredient_id, quantity y UNIQUE(recipe_id, ingredient_id))
  }

  async insertRecipe(recipe: Recipe): Promise<Recipe> {
    // TODO: insertar en 'recipe' y devolver el objeto con el id generado
    throw new Error("TODO: Implement insertRecipe");
  }

  async insertIngredient(ingredient: Ingredient): Promise<Ingredient> {
    // TODO: insertar en 'ingredient' y devolver el objeto con el id generado
    throw new Error("TODO: Implement insertIngredient");
  }

  async addIngredientToRecipe(
    recipeId: number,
    ingredientId: number,
    quantity: number
  ): Promise<void> {
    // TODO: insertar la fila en 'recipe_ingredient'
    throw new Error("TODO: Implement addIngredientToRecipe");
  }

  async getRecipeWithIngredients(
    recipeId: number
  ): Promise<RecipeWithIngredients | null> {
    // TODO: SELECT JOIN recipe/recipe_ingredient/ingredient; null si no existe
    throw new Error("TODO: Implement getRecipeWithIngredients");
  }

  async getRecipesByIngredient(ingredientId: number): Promise<Recipe[]> {
    // TODO: SELECT JOIN filtrando por ingredient_id — qué recetas lo usan
    throw new Error("TODO: Implement getRecipesByIngredient");
  }
}

if (require.main === module) {
  (async () => {
    const ex = new RecipeIngredientExercise();
    await ex.createSchema();
    const recipe = await ex.insertRecipe({ name: "Tortilla de papas", servings: 4 });
    const eggs = await ex.insertIngredient({ name: "Huevo", unit: "unidades" });
    const potatoes = await ex.insertIngredient({ name: "Papa", unit: "g" });
    await ex.addIngredientToRecipe(recipe.id!, eggs.id!, 6);
    await ex.addIngredientToRecipe(recipe.id!, potatoes.id!, 500);
    console.log(
      "Receta con ingredientes:",
      await ex.getRecipeWithIngredients(recipe.id!)
    );
    ex.close();
  })().catch(console.error);
}
