import { Category } from "../types";

const categoriesStore: Map<string, Category> = new Map();

export class CategoriesRepository {
  findAll(): Category[] {
    return Array.from(categoriesStore.values());
  }
  findById(id: string): Category | null {
    return categoriesStore.get(id) || null;
  }
  save(category: Category): void {
    categoriesStore.set(category.id, category);
  }
}

export const categoriesRepository = new CategoriesRepository();
