export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
};

const products: Product[] = [
  { id: "1", name: "Notebook 14", price: 799.99, category: "electronics" },
  { id: "2", name: "Mouse inalámbrico", price: 19.99, category: "electronics" },
  { id: "3", name: "Teclado mecánico", price: 89.9, category: "electronics" },
  { id: "4", name: "Silla ergonómica", price: 249.0, category: "furniture" },
  { id: "5", name: "Escritorio", price: 199.99, category: "furniture" },
  { id: "6", name: "Taza térmica", price: 14.5, category: "kitchen" },
  { id: "7", name: "Auriculares", price: 59.99, category: "electronics" },
  { id: "8", name: "Lámpara LED", price: 29.99, category: "home" },
];

export function listAllProducts(filter?: {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}): Product[] {
  let result = products.slice();
  if (filter?.name) {
    const needle = filter.name.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(needle));
  }
  if (filter?.category) {
    const cat = filter.category.toLowerCase();
    result = result.filter((p) => p.category.toLowerCase() === cat);
  }
  if (typeof filter?.minPrice === "number") {
    result = result.filter((p) => p.price >= (filter.minPrice as number));
  }
  if (typeof filter?.maxPrice === "number") {
    result = result.filter((p) => p.price <= (filter.maxPrice as number));
  }
  return result;
}

export function findProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function saveProduct(input: {
  name: string;
  price: number;
  category: string;
}): Product {
  const nextId = String(
    products.length > 0 ? Number(products[products.length - 1].id) + 1 : 1
  );
  const product: Product = { id: nextId, ...input };
  products.push(product);
  return product;
}

export function deleteProduct(id: string): boolean {
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  products.splice(idx, 1);
  return true;
}
