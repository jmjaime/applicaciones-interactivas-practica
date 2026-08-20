import fs from "fs";
import {
  ProductInventoryExercise,
  Product,
  Inventory,
} from "./exercise";

const DB_PATH = "test-product-inventory.sqlite";

function removeDbFile(): void {
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
}

describe("One-to-One (product/inventory)", () => {
  let ex: ProductInventoryExercise;

  beforeEach(async () => {
    removeDbFile();
    ex = new ProductInventoryExercise(DB_PATH);
    await ex.createSchema();
  });

  afterEach(() => {
    ex.close();
  });

  it("guarda un producto con su inventario y lo recupera con los mismos datos", async () => {
    const product: Product = {
      sku: "TEC-001",
      name: "Teclado mecánico",
      price: 45000,
    };
    const savedProduct = await ex.insertProduct(product);
    expect(savedProduct.id).toBeDefined();

    const inventory: Inventory = {
      productId: savedProduct.id!,
      quantity: 120,
      warehouse: "CABA",
    };
    await ex.insertInventory(inventory);

    const result = await ex.getProductWithInventory(savedProduct.id!);

    expect(result).toMatchObject({
      sku: "TEC-001",
      name: "Teclado mecánico",
      price: 45000,
      inventory: {
        quantity: 120,
        warehouse: "CABA",
      },
    });
  });

  it("devuelve null si el producto no existe", async () => {
    const result = await ex.getProductWithInventory(999);
    expect(result).toBeNull();
  });

  it("filtra productos por depósito", async () => {
    const mouse = await ex.insertProduct({
      sku: "MOU-001",
      name: "Mouse óptico",
      price: 8000,
    });
    await ex.insertInventory({
      productId: mouse.id!,
      quantity: 50,
      warehouse: "CABA",
    });

    const monitor = await ex.insertProduct({
      sku: "MON-001",
      name: "Monitor 24''",
      price: 90000,
    });
    await ex.insertInventory({
      productId: monitor.id!,
      quantity: 10,
      warehouse: "Córdoba",
    });

    const enCaba = await ex.getByWarehouse("CABA");

    expect(enCaba).toHaveLength(1);
    expect(enCaba[0]).toMatchObject({ sku: "MOU-001" });
  });
});
