import { ProductSQLPersistence, ProductData } from "./product-persistence";

async function main() {
  const persistence = new ProductSQLPersistence();

  try {
    await persistence.initialize();
    console.log("=== MAPEO EMBEBIDO SQL: MAPEO JSON ===\n");

    // Datos de ejemplo con metadatos complejos
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

    // Crear productos
    console.log("📝 Creando productos...");
    const productIds = await persistence.createProducts(productsData);
    console.log(
      `✅ ${productIds.length} productos creados con IDs: [${productIds.join(
        ", "
      )}]\n`
    );

    // Obtener todos los productos
    console.log("🛍️ Obteniendo todos los productos:");
    const allProducts = persistence.getAllProducts();
    allProducts.forEach((product) => {
      console.log(`ID: ${product.id} | ${product.nombre} - $${product.precio}`);
      console.log(
        `   🎨 Color: ${product.metadata.color} | Material: ${product.metadata.material}`
      );
      console.log(
        `   📐 Especificaciones: ${product.metadata.specifications.length}`
      );
      console.log(
        `   🛡️ Garantía: ${product.metadata.warranty?.duration} ${product.metadata.warranty?.unit}`
      );
    });

    // Buscar productos por categoría
    console.log("\n💻 Productos en categoría 'Computadoras':");
    const computadoras = persistence.getProductsByCategory("Computadoras");
    computadoras.forEach((product) => {
      console.log(`   • ${product.nombre} - $${product.precio}`);
    });

    // Buscar productos por color usando JSON_EXTRACT
    console.log("\n🎨 Productos de color 'Plata':");
    const productosPlata = persistence.getProductsByColor("Plata");
    productosPlata.forEach((product) => {
      console.log(`   • ${product.nombre} - ${product.metadata.color}`);
    });

    // Buscar productos por material
    console.log("\n🔧 Productos de material 'Aluminio':");
    const productosAluminio = persistence.getProductsByMaterial("Aluminio");
    productosAluminio.forEach((product) => {
      console.log(`   • ${product.nombre} - ${product.metadata.material}`);
    });

    // Buscar productos por duración de garantía
    console.log("\n🛡️ Productos con garantía >= 2 años:");
    const productosGarantia = persistence.getProductsByWarrantyDuration(2);
    productosGarantia.forEach((product) => {
      console.log(
        `   • ${product.nombre} - ${product.metadata.warranty?.duration} ${product.metadata.warranty?.unit}`
      );
    });

    // Buscar productos por especificación
    console.log("\n🔍 Productos con especificación 'RAM':");
    const productosRAM = persistence.getProductsBySpecification("RAM");
    productosRAM.forEach((product) => {
      const ramSpec = product.metadata.specifications.find(
        (spec) => spec.key === "RAM"
      );
      console.log(
        `   • ${product.nombre} - RAM: ${ramSpec?.value} ${ramSpec?.unit || ""}`
      );
    });

    // Buscar productos por rango de precios
    console.log("\n💰 Productos entre $300 y $1000:");
    const productosRangoPrecio = persistence.getProductsByPriceRange(300, 1000);
    productosRangoPrecio.forEach((product) => {
      console.log(`   • ${product.nombre} - $${product.precio}`);
    });

    // Obtener producto específico
    console.log("\n👤 Obteniendo producto con ID 1:");
    const product1 = persistence.getProductById(1);
    if (product1) {
      console.log(`   ${product1.nombre} - ${product1.metadata.color}`);
      console.log(
        `   Dimensiones: ${product1.metadata.dimensions?.length}x${product1.metadata.dimensions?.width}x${product1.metadata.dimensions?.height} ${product1.metadata.dimensions?.unit}`
      );
    }

    // Actualizar color de un producto
    console.log("\n✏️ Actualizando color del producto con ID 1 a 'Azul':");
    const colorUpdated = persistence.updateProductColor(1, "Azul");
    if (colorUpdated) {
      console.log("   ✅ Color actualizado exitosamente");
      const updatedProduct = persistence.getProductById(1);
      if (updatedProduct) {
        console.log(`   Nuevo color: ${updatedProduct.metadata.color}`);
      }
    }

    // Agregar especificación a un producto
    console.log(
      "\n✏️ Agregando especificación 'Teclado' al producto con ID 1:"
    );
    const specAdded = persistence.addSpecificationToProduct(1, {
      key: "Teclado",
      value: "Retroiluminado",
    });
    if (specAdded) {
      console.log("   ✅ Especificación agregada exitosamente");
      const updatedProduct = persistence.getProductById(1);
      if (updatedProduct) {
        console.log(
          `   Total especificaciones: ${updatedProduct.metadata.specifications.length}`
        );
      }
    }

    // Estadísticas de productos
    console.log("\n📊 Estadísticas de productos:");
    const stats = persistence.getProductStats();
    console.log(`   Total de productos: ${stats.totalProducts}`);
    console.log(`   Precio promedio: $${stats.avgPrice}`);
    console.log("   Productos por categoría:");
    stats.categoriesCounts.forEach((cat) => {
      console.log(`     - ${cat.categoria}: ${cat.count}`);
    });
    console.log("   Productos por color:");
    stats.colorCounts.forEach((color) => {
      console.log(`     - ${color.color}: ${color.count}`);
    });

    console.log("\n=== DETALLES TÉCNICOS ===");
    console.log("🏗️ Estructura de la tabla SQL:");
    console.log("CREATE TABLE productos (");
    console.log("    id INTEGER PRIMARY KEY AUTOINCREMENT,");
    console.log("    nombre TEXT NOT NULL,");
    console.log("    descripcion TEXT,");
    console.log("    precio DECIMAL(10,2) NOT NULL,");
    console.log("    categoria TEXT NOT NULL,");
    console.log("    metadata JSON NOT NULL,");
    console.log("    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,");
    console.log("    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP");
    console.log(");");

    console.log("\n📋 Características del mapeo JSON:");
    console.log(
      "• Los objetos complejos se almacenan como JSON en una columna"
    );
    console.log(
      "• Consultas usando JSON_EXTRACT() para acceder a propiedades específicas"
    );
    console.log("• JSON_SET() para actualizaciones parciales");
    console.log("• JSON_EACH() para consultas sobre arrays dentro del JSON");
    console.log("• Prepared statements para mejor performance y seguridad");

    console.log("\n🔍 Ventajas del mapeo JSON:");
    console.log("• Flexibilidad máxima para estructuras de datos complejas");
    console.log("• Consultas poderosas usando funciones JSON de SQLite");
    console.log("• Actualizaciones parciales sin necesidad de reescribir todo");
    console.log("• Ideal para metadatos dinámicos y configuraciones");
    console.log("• Soporte nativo para arrays y objetos anidados");

    console.log("\n⚠️ Consideraciones:");
    console.log(
      "• Las consultas JSON pueden ser más lentas que columnas normales"
    );
    console.log("• Indexación limitada en contenido JSON");
    console.log("• Validación de estructura JSON requerida en aplicación");
    console.log("• Debugging más complejo con estructuras JSON grandes");

    console.log("\n📦 Ejemplo de consultas JSON avanzadas:");
    console.log("-- Buscar productos con touchscreen:");
    console.log(
      "SELECT * FROM productos WHERE JSON_EXTRACT(metadata, '$.customAttributes.touchscreen') = true;"
    );
    console.log("-- Actualizar solo el peso:");
    console.log(
      "UPDATE productos SET metadata = JSON_SET(metadata, '$.customAttributes.peso', 1.5) WHERE id = 1;"
    );
    console.log("-- Contar especificaciones por producto:");
    console.log(
      "SELECT nombre, JSON_ARRAY_LENGTH(metadata, '$.specifications') FROM productos;"
    );
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await persistence.close();
  }
}

main();
