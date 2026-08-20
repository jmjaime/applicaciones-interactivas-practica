import { ProductSQLPersistence, ProductData } from "./product-persistence";
import { paso } from "../../utils/demo";
import { preloadSqlJs } from "../../utils/sqlite";

function tabla(products: ProductData[]) {
  console.table(
    products.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      precio: p.precio,
      color: p.metadata.color,
      material: p.metadata.material,
      specs: p.metadata.specifications.length,
    }))
  );
}

async function main() {
  await preloadSqlJs();
  const persistence = new ProductSQLPersistence();

  try {
    await persistence.initialize();
    console.log("=== MAPEO EMBEBIDO SQL: MAPEO JSON ===");

    const productsData: ProductData[] = [
      {
        nombre: "Laptop Dell XPS 13",
        descripcion: "Laptop ultrabook de alta gama",
        precio: 1299.99,
        categoria: "Computadoras",
        metadata: {
          specifications: [
            { key: "Procesador", value: "Intel Core i7-1165G7" },
            { key: "RAM", value: "16", unit: "GB" },
            { key: "Almacenamiento", value: "512", unit: "GB SSD" },
            { key: "Pantalla", value: "13.3", unit: "pulgadas" },
          ],
          dimensions: { length: 30.2, width: 19.9, height: 1.48, unit: "cm" },
          color: "Plata",
          material: "Aluminio",
          warranty: {
            duration: 2,
            unit: "años",
            type: "Garantía limitada del fabricante",
          },
          customAttributes: {
            touchscreen: true,
            peso: 1.27,
            sistemaOperativo: "Windows 11",
          },
        },
      },
      {
        nombre: "iPhone 14 Pro",
        descripcion: "Smartphone de última generación",
        precio: 999.99,
        categoria: "Móviles",
        metadata: {
          specifications: [
            { key: "Procesador", value: "A16 Bionic" },
            { key: "Almacenamiento", value: "128", unit: "GB" },
            { key: "Pantalla", value: "6.1", unit: "pulgadas" },
            { key: "Cámara", value: "48", unit: "MP" },
          ],
          dimensions: { length: 14.75, width: 7.15, height: 0.78, unit: "cm" },
          color: "Morado Intenso",
          material: "Titanio",
          warranty: {
            duration: 1,
            unit: "año",
            type: "Garantía limitada de Apple",
          },
          customAttributes: {
            resistenciaAgua: "IP68",
            cargaInalámbrica: true,
            sistemaOperativo: "iOS 16",
          },
        },
      },
      {
        nombre: "Sony WH-1000XM4",
        descripcion: "Auriculares con cancelación de ruido",
        precio: 349.99,
        categoria: "Audio",
        metadata: {
          specifications: [
            { key: "Tipo", value: "Over-ear" },
            { key: "Conectividad", value: "Bluetooth 5.0" },
            { key: "Batería", value: "30", unit: "horas" },
          ],
          color: "Negro",
          material: "Plástico y metal",
          warranty: {
            duration: 1,
            unit: "año",
            type: "Garantía del fabricante",
          },
          customAttributes: {
            cancelaciónRuido: true,
            asistente: ["Google Assistant", "Alexa"],
            peso: 254,
          },
        },
      },
      {
        nombre: "MacBook Pro 16",
        descripcion: "Laptop profesional para creativos",
        precio: 2399.99,
        categoria: "Computadoras",
        metadata: {
          specifications: [
            { key: "Procesador", value: "Apple M2 Pro" },
            { key: "RAM", value: "16", unit: "GB" },
            { key: "Almacenamiento", value: "1", unit: "TB SSD" },
            { key: "Pantalla", value: "16.2", unit: "pulgadas" },
          ],
          dimensions: { length: 35.57, width: 24.81, height: 1.68, unit: "cm" },
          color: "Gris Espacial",
          material: "Aluminio",
          warranty: {
            duration: 1,
            unit: "año",
            type: "Garantía limitada de Apple",
          },
          customAttributes: {
            touchscreen: false,
            peso: 2.15,
            sistemaOperativo: "macOS",
          },
        },
      },
    ];

    await paso("Crear productos (metadata compleja → una columna JSON)", async () => {
      const productIds = await persistence.createProducts(productsData);
      console.log(`Creados con IDs: [${productIds.join(", ")}]`);
    });

    await paso("Todos los productos", () => {
      tabla(persistence.getAllProducts());
    });

    await paso("Productos en categoría 'Computadoras'", () => {
      tabla(persistence.getProductsByCategory("Computadoras"));
    });

    await paso("Productos de color 'Plata' (JSON_EXTRACT sobre metadata)", () => {
      tabla(persistence.getProductsByColor("Plata"));
    });

    await paso("Productos de material 'Aluminio'", () => {
      tabla(persistence.getProductsByMaterial("Aluminio"));
    });

    await paso("Productos con garantía >= 2 años", () => {
      tabla(persistence.getProductsByWarrantyDuration(2));
    });

    await paso("Productos con especificación 'RAM' (JSON_EACH sobre el array)", () => {
      tabla(persistence.getProductsBySpecification("RAM"));
    });

    await paso("Productos entre $300 y $1000", () => {
      tabla(persistence.getProductsByPriceRange(300, 1000));
    });

    await paso("Actualizar color y agregar especificación al producto 1 (JSON_SET)", () => {
      persistence.updateProductColor(1, "Azul");
      persistence.addSpecificationToProduct(1, { key: "Teclado", value: "Retroiluminado" });
      const updated = persistence.getProductById(1);
      if (updated) tabla([updated]);
    });

    await paso("Estadísticas de productos", () => {
      const stats = persistence.getProductStats();
      console.log(`Total: ${stats.totalProducts} | Precio promedio: $${stats.avgPrice}`);
      console.table(stats.categoriesCounts);
      console.table(stats.colorCounts);
    });

    await paso("Trade-offs del mapeo JSON", () => {
      console.log("✅ Flexibilidad máxima para estructuras dinámicas");
      console.log("✅ JSON_EXTRACT/JSON_SET/JSON_EACH para consultar y actualizar sin reescribir todo");
      console.log("⚠️ Consultas más lentas que columnas normales, indexación limitada");
      console.log("⚠️ Validación de estructura queda en la aplicación");
    });
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await persistence.close();
  }
}

main();
