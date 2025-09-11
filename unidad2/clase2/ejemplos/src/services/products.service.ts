import { v4 as uuidv4 } from "uuid";
import { Category, Product, Tag } from "../types";
import { productsRepository } from "../repositories/products.repository";
import { categoriesRepository } from "../repositories/categories.repository";
import { tagsRepository } from "../repositories/tags.repository";

export interface ProductsQuery {
  page?: string;
  limit?: string;
  sort?: string;
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  status?: string;
  tags?: string; // CSV
}

function paginate<T>(array: T[], page?: string, limit?: string) {
  const p = Math.max(1, Number(page ?? 1) || 1);
  const l = Math.min(100, Math.max(1, Number(limit ?? 10) || 10));
  const start = (p - 1) * l;
  const items = array.slice(start, start + l);
  const total = array.length;
  const totalPages = Math.max(1, Math.ceil(total / l));
  return { items, page: p, limit: l, total, totalPages };
}

function applyBasicFilters(list: Product[], q: ProductsQuery) {
  let result = list;
  if (q.status) {
    result = result.filter(() => true);
  }
  if (q.categoryId) {
    result = result.filter((p) => p.categoryId === q.categoryId);
  }
  if (q.minPrice) {
    result = result.filter((p) => Number(p.price) >= Number(q.minPrice));
  }
  if (q.maxPrice) {
    result = result.filter((p) => Number(p.price) <= Number(q.maxPrice));
  }
  if (q.tags) {
    const tagList = String(q.tags).split(",").filter(Boolean);
    result = result.filter((p) => {
      const set = new Set(productsRepository.listTags(p.id));
      return tagList.every((t) => set.has(t));
    });
  }
  return result;
}

function applySort<T>(list: T[], sort?: string) {
  if (!sort) return list;
  const fields = String(sort).split(",").filter(Boolean);
  const copy = [...(list as any[])];
  copy.sort((a, b) => {
    for (const f of fields) {
      const desc = f.startsWith("-");
      const key = desc ? f.slice(1) : f;
      const av = (a as any)[key];
      const bv = (b as any)[key];
      if (av === bv) continue;
      return (av > bv ? 1 : -1) * (desc ? -1 : 1);
    }
    return 0;
  });
  return copy as T[];
}

export const productsService = {
  seed() {
    const catPeripherals: Category = {
      id: "cat_peripherals",
      name: "Periféricos",
    };
    categoriesRepository.save(catPeripherals);
    const tGaming: Tag = { id: "tag_gaming", name: "Gaming" };
    const tWireless: Tag = { id: "tag_wireless", name: "Wireless" };
    tagsRepository.save(tGaming);
    tagsRepository.save(tWireless);
    const p1: Product = {
      id: `prod_${uuidv4().slice(0, 8)}`,
      name: "Teclado",
      price: 19999,
      currency: "ARS",
      categoryId: catPeripherals.id,
      createdAt: new Date().toISOString(),
    };
    const p2: Product = {
      id: `prod_${uuidv4().slice(0, 8)}`,
      name: "Mouse",
      price: 14999,
      currency: "ARS",
      categoryId: catPeripherals.id,
      createdAt: new Date().toISOString(),
    };
    productsRepository.save(p1);
    productsRepository.save(p2);
    productsRepository.linkTag(p1.id, tGaming.id);
    productsRepository.linkTag(p2.id, tWireless.id);
  },

  list(query: ProductsQuery) {
    let list = productsRepository.findAll();
    list = applyBasicFilters(list, query);
    list = applySort(list, query.sort || "createdAt");
    return paginate(list, query.page, query.limit);
  },

  create(data: {
    name: string;
    price: number;
    currency: string;
    categoryId?: string | null;
  }): Product {
    const { name, price, currency, categoryId } = data;
    const prod: Product = {
      id: `prod_${uuidv4().slice(0, 8)}`,
      name,
      price,
      currency,
      categoryId: categoryId || null,
      createdAt: new Date().toISOString(),
    };
    productsRepository.save(prod);
    return prod;
  },

  get(id: string) {
    return productsRepository.findById(id);
  },

  updatePartial(
    id: string,
    patch: Partial<Pick<Product, "name" | "price" | "currency" | "categoryId">>
  ) {
    const prod = productsRepository.findById(id);
    if (!prod) return null;
    const updated: Product = { ...prod, ...patch } as Product;
    if (updated.price != null) updated.price = Number(updated.price);
    productsRepository.save(updated);
    return updated;
  },

  replace(
    id: string,
    data: {
      name: string;
      price: number;
      currency: string;
      categoryId?: string | null;
    }
  ) {
    const old = productsRepository.findById(id);
    const existed = Boolean(old);
    const prod: Product = {
      id,
      name: data.name,
      price: Number(data.price),
      currency: data.currency,
      categoryId: data.categoryId || null,
      createdAt: old ? old.createdAt : new Date().toISOString(),
    };
    productsRepository.save(prod);
    return { prod, existed };
  },

  remove(id: string) {
    return productsRepository.delete(id);
  },

  listByCategory(categoryId: string, page?: string, limit?: string) {
    const list = productsRepository
      .findAll()
      .filter((p) => p.categoryId === categoryId);
    return paginate(list, page, limit);
  },

  getCategoryOfProduct(productId: string) {
    const prod = productsRepository.findById(productId);
    if (!prod) return null;
    if (!prod.categoryId) return null;
    return categoriesRepository.findById(prod.categoryId);
  },

  listTags(productId: string) {
    const ids = productsRepository.listTags(productId);
    return ids
      .map((tid) => tagsRepository.findById(tid))
      .filter((t): t is Tag => Boolean(t));
  },

  linkTag(productId: string, tagId: string) {
    productsRepository.linkTag(productId, tagId);
  },

  unlinkTag(productId: string, tagId: string) {
    productsRepository.unlinkTag(productId, tagId);
  },
};
