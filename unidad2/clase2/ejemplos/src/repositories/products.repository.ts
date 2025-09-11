import { Product } from "../types";

const productsStore: Map<string, Product> = new Map();
const productTagsStore: Map<string, Set<string>> = new Map();

export class ProductsRepository {
  findAll(): Product[] {
    return Array.from(productsStore.values());
  }
  findById(id: string): Product | null {
    return productsStore.get(id) || null;
  }
  save(product: Product): void {
    productsStore.set(product.id, product);
  }
  delete(id: string): boolean {
    return productsStore.delete(id);
  }
  listTags(productId: string): string[] {
    return Array.from(productTagsStore.get(productId) || new Set<string>());
  }
  linkTag(productId: string, tagId: string): void {
    const set = productTagsStore.get(productId) || new Set<string>();
    set.add(tagId);
    productTagsStore.set(productId, set);
  }
  unlinkTag(productId: string, tagId: string): void {
    const set = productTagsStore.get(productId) || new Set<string>();
    set.delete(tagId);
    productTagsStore.set(productId, set);
  }
}

export const productsRepository = new ProductsRepository();
