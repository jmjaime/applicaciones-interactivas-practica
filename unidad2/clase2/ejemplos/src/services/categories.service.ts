import { Category } from "../types";
import { categoriesRepository } from "../repositories/categories.repository";
import { productsService } from "../services/products.service";

export const categoriesService = {
  list(): Category[] {
    return categoriesRepository.findAll();
  },
  get(id: string): Category | null {
    return categoriesRepository.findById(id);
  },
  products(categoryId: string, page?: string, limit?: string) {
    return productsService.listByCategory(categoryId, page, limit);
  },
};
