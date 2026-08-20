import Database from "better-sqlite3";

// Ejercicio 1.1: One-to-One (1:1) — ver README.md de esta carpeta.

export type Product = {
  id?: number;
  sku: string;
  name: string;
  price: number;
};

export type Inventory = {
  id?: number;
  productId: number; // 1:1 con product.id
  quantity: number;
  warehouse: string;
};

export type ProductWithInventory = Product & { inventory: Inventory };

export class ProductInventoryExercise {
  private db: Database.Database;

  constructor(dbPath: string = "ejercicio-product-inventory.sqlite") {
    this.db = new Database(dbPath);
  }

  close(): void {
    this.db.close();
  }

  async createSchema(): Promise<void> {
    // TODO: crear 'product' y 'inventory' con UNIQUE(product_id) en
    // 'inventory' para garantizar la relación 1:1
  }

  async insertProduct(product: Product): Promise<Product> {
    // TODO: insertar en 'product' y devolver el objeto con el id generado
    throw new Error("TODO: Implement insertProduct");
  }

  async insertInventory(inventory: Inventory): Promise<Inventory> {
    // TODO: insertar en 'inventory' y devolver el objeto con el id generado
    throw new Error("TODO: Implement insertInventory");
  }

  async getProductWithInventory(
    productId: number
  ): Promise<ProductWithInventory | null> {
    // TODO: SELECT JOIN product ↔ inventory por product.id; null si no existe
    throw new Error("TODO: Implement getProductWithInventory");
  }

  async getByWarehouse(warehouse: string): Promise<Product[]> {
    // TODO: SELECT JOIN filtrando por inventory.warehouse
    throw new Error("TODO: Implement getByWarehouse");
  }
}

if (require.main === module) {
  (async () => {
    const ex = new ProductInventoryExercise();
    await ex.createSchema();
    const product = await ex.insertProduct({
      sku: "TEC-001",
      name: "Teclado mecánico",
      price: 45000,
    });
    await ex.insertInventory({
      productId: product.id!,
      quantity: 120,
      warehouse: "CABA",
    });
    console.log(
      "Producto con inventario:",
      await ex.getProductWithInventory(product.id!)
    );
    ex.close();
  })().catch(console.error);
}
