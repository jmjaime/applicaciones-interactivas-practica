#### Ejercicio 1.3: Relación N:M — Recipe ↔ Ingredient

**Objetivo**: mapear `recipe` ↔ `ingredient` con tabla intermedia
`recipe_ingredient` (que además guarda un dato propio de la relación: la
cantidad de ese ingrediente en esa receta). Integrador del bloque de
Relaciones (ver la slide "Relaciones · N:M"), pensado para resolver en
parejas.

**Requisitos**:

- [ ] `createSchema()`: tablas `recipe`, `ingredient` y
      `recipe_ingredient` (junction) con constraint
      `UNIQUE(recipe_id, ingredient_id)`.
- [ ] `insertRecipe(recipe)`: inserta una receta y devuelve el objeto con
      el id generado.
- [ ] `insertIngredient(ingredient)`: inserta un ingrediente y devuelve el
      objeto con el id generado.
- [ ] `addIngredientToRecipe(recipeId, ingredientId, quantity)`: crea la
      fila en `recipe_ingredient`.
- [ ] `getRecipeWithIngredients(recipeId)`: la receta con la lista de sus
      ingredientes (cada uno con su `quantity`), o `null` si no existe.
- [ ] `getRecipesByIngredient(ingredientId)`: qué recetas usan un
      ingrediente dado (la consulta "del otro lado" de la relación).

`exercise.spec.ts` construye sus propios `Recipe`/`Ingredient`, los
inserta y valida los objetos tipados que devuelven las consultas — no
depende del SQL interno, solo de lo que entra y lo que sale.
