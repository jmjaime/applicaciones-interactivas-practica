import Database from "better-sqlite3";

export interface Specification {
  key: string;
  value: string;
  unit?: string;
}

export interface Dimension {
  length: number;
  width: number;
  height: number;
  unit: string;
}

export interface Warranty {
  duration: number;
  unit: string;
  type: string;
}

export interface MetadataData {
  specifications: Specification[];
  dimensions?: Dimension;
  color?: string;
  material?: string;
  warranty?: Warranty;
  customAttributes?: { [key: string]: any };
}

export interface ProductData {
  id?: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  categoria: string;
  metadata: MetadataData;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}

export interface ProductWithJSONMetadata {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  categoria: string;
  metadata: string; // Stored as JSON string
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export class ProductSQLPersistence {
  private db: Database.Database;

  constructor(dbPath: string = "json-mapping-sql.sqlite") {
    this.db = new Database(dbPath);
    this.db.pragma("foreign_keys = ON");
  }

  async initialize(): Promise<void> {
    console.log("🔧 Inicializando cliente SQL para mapeo JSON...");
    await this.createDatabaseStructure();
    console.log("✅ Cliente SQL inicializado correctamente");
  }

  private async createDatabaseStructure(): Promise<void> {
    console.log("🏗️ Creando estructura de base de datos...");

    // Limpiar tabla existente
    this.db.exec(`DROP TABLE IF EXISTS productos`);

    // Crear tabla productos con metadatos como JSON
    this.db.exec(`
            CREATE TABLE productos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                descripcion TEXT,
                precio DECIMAL(10,2) NOT NULL,
                categoria TEXT NOT NULL,
                metadata JSON NOT NULL,
                fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
                fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

    // Crear índices para búsquedas
    this.db.exec(`
            CREATE INDEX idx_productos_nombre ON productos(nombre);
            CREATE INDEX idx_productos_categoria ON productos(categoria);
            CREATE INDEX idx_productos_precio ON productos(precio);
            CREATE INDEX idx_productos_fecha ON productos(fecha_creacion);
        `);

    console.log("✅ Estructura de base de datos creada");
  }

  async createProduct(productData: ProductData): Promise<number> {
    const stmt = this.db.prepare(`
            INSERT INTO productos (nombre, descripcion, precio, categoria, metadata)
            VALUES (?, ?, ?, ?, ?)
        `);

    const metadataJSON = JSON.stringify(productData.metadata);
    const result = stmt.run(
      productData.nombre,
      productData.descripcion || null,
      productData.precio,
      productData.categoria,
      metadataJSON
    );

    return result.lastInsertRowid as number;
  }

  async createProducts(productsData: ProductData[]): Promise<number[]> {
    const productIds: number[] = [];

    const transaction = this.db.transaction((products: ProductData[]) => {
      const stmt = this.db.prepare(`
                INSERT INTO productos (nombre, descripcion, precio, categoria, metadata)
                VALUES (?, ?, ?, ?, ?)
            `);

      for (const product of products) {
        const metadataJSON = JSON.stringify(product.metadata);
        const result = stmt.run(
          product.nombre,
          product.descripcion || null,
          product.precio,
          product.categoria,
          metadataJSON
        );
        productIds.push(result.lastInsertRowid as number);
      }
    });

    transaction(productsData);
    return productIds;
  }

  getAllProducts(): ProductData[] {
    const stmt = this.db.prepare(`
            SELECT id, nombre, descripcion, precio, categoria, metadata, fecha_creacion, fecha_actualizacion
            FROM productos
            ORDER BY fecha_creacion DESC
        `);

    const rows = stmt.all() as ProductWithJSONMetadata[];
    return rows.map(this.mapToProductData);
  }

  getProductById(id: number): ProductData | null {
    const stmt = this.db.prepare(`
            SELECT id, nombre, descripcion, precio, categoria, metadata, fecha_creacion, fecha_actualizacion
            FROM productos
            WHERE id = ?
        `);

    const row = stmt.get(id) as ProductWithJSONMetadata | undefined;
    return row ? this.mapToProductData(row) : null;
  }

  getProductsByCategory(categoria: string): ProductData[] {
    const stmt = this.db.prepare(`
            SELECT id, nombre, descripcion, precio, categoria, metadata, fecha_creacion, fecha_actualizacion
            FROM productos
            WHERE categoria = ?
            ORDER BY nombre
        `);

    const rows = stmt.all(categoria) as ProductWithJSONMetadata[];
    return rows.map(this.mapToProductData);
  }

  // Buscar productos por color usando JSON_EXTRACT
  getProductsByColor(color: string): ProductData[] {
    const stmt = this.db.prepare(`
            SELECT id, nombre, descripcion, precio, categoria, metadata, fecha_creacion, fecha_actualizacion
            FROM productos
            WHERE JSON_EXTRACT(metadata, '$.color') = ?
            ORDER BY nombre
        `);

    const rows = stmt.all(color) as ProductWithJSONMetadata[];
    return rows.map(this.mapToProductData);
  }

  // Buscar productos por material
  getProductsByMaterial(material: string): ProductData[] {
    const stmt = this.db.prepare(`
            SELECT id, nombre, descripcion, precio, categoria, metadata, fecha_creacion, fecha_actualizacion
            FROM productos
            WHERE JSON_EXTRACT(metadata, '$.material') = ?
            ORDER BY nombre
        `);

    const rows = stmt.all(material) as ProductWithJSONMetadata[];
    return rows.map(this.mapToProductData);
  }

  // Buscar productos por duración de garantía
  getProductsByWarrantyDuration(minDuration: number): ProductData[] {
    const stmt = this.db.prepare(`
            SELECT id, nombre, descripcion, precio, categoria, metadata, fecha_creacion, fecha_actualizacion
            FROM productos
            WHERE JSON_EXTRACT(metadata, '$.warranty.duration') >= ?
            ORDER BY JSON_EXTRACT(metadata, '$.warranty.duration') DESC
        `);

    const rows = stmt.all(minDuration) as ProductWithJSONMetadata[];
    return rows.map(this.mapToProductData);
  }

  // Buscar productos que tengan una especificación específica
  getProductsBySpecification(key: string, value?: string): ProductData[] {
    let query: string;
    let params: any[];

    if (value) {
      // Buscar especificación con clave y valor específicos
      query = `
                SELECT p.id, p.nombre, p.descripcion, p.precio, p.categoria, p.metadata, p.fecha_creacion, p.fecha_actualizacion
                FROM productos AS p
                JOIN JSON_EACH(JSON_EXTRACT(p.metadata, '$.specifications')) AS spec
                WHERE JSON_EXTRACT(spec.value, '$.key') = ? 
                  AND JSON_EXTRACT(spec.value, '$.value') = ?
                ORDER BY p.nombre
            `;
      params = [key, value];
    } else {
      // Buscar solo por clave de especificación
      query = `
                SELECT p.id, p.nombre, p.descripcion, p.precio, p.categoria, p.metadata, p.fecha_creacion, p.fecha_actualizacion
                FROM productos AS p
                JOIN JSON_EACH(JSON_EXTRACT(p.metadata, '$.specifications')) AS spec
                WHERE JSON_EXTRACT(spec.value, '$.key') = ?
                ORDER BY p.nombre
            `;
      params = [key];
    }

    const stmt = this.db.prepare(query);
    const rows = stmt.all(...params) as ProductWithJSONMetadata[];
    return rows.map(this.mapToProductData);
  }

  // Buscar productos por atributo personalizado
  getProductsByCustomAttribute(key: string, value: any): ProductData[] {
    const jsonPath = `$.customAttributes.${key}`;
    const stmt = this.db.prepare(`
            SELECT id, nombre, descripcion, precio, categoria, metadata, fecha_creacion, fecha_actualizacion
            FROM productos
            WHERE JSON_EXTRACT(metadata, ?) = ?
            ORDER BY nombre
        `);

    const rows = stmt.all(jsonPath, value) as ProductWithJSONMetadata[];
    return rows.map(this.mapToProductData);
  }

  // Buscar productos por rango de precios
  getProductsByPriceRange(minPrice: number, maxPrice: number): ProductData[] {
    const stmt = this.db.prepare(`
            SELECT id, nombre, descripcion, precio, categoria, metadata, fecha_creacion, fecha_actualizacion
            FROM productos
            WHERE precio BETWEEN ? AND ?
            ORDER BY precio
        `);

    const rows = stmt.all(minPrice, maxPrice) as ProductWithJSONMetadata[];
    return rows.map(this.mapToProductData);
  }

  // Actualizar metadatos de un producto
  updateProductMetadata(id: number, metadata: MetadataData): boolean {
    const stmt = this.db.prepare(`
            UPDATE productos 
            SET metadata = ?, fecha_actualizacion = CURRENT_TIMESTAMP
            WHERE id = ?
        `);

    const metadataJSON = JSON.stringify(metadata);
    const result = stmt.run(metadataJSON, id);
    return result.changes > 0;
  }

  // Actualizar solo el color de un producto
  updateProductColor(id: number, color: string): boolean {
    const stmt = this.db.prepare(`
            UPDATE productos 
            SET metadata = JSON_SET(metadata, '$.color', ?),
                fecha_actualizacion = CURRENT_TIMESTAMP
            WHERE id = ?
        `);

    const result = stmt.run(color, id);
    return result.changes > 0;
  }

  // Agregar una especificación a un producto
  addSpecificationToProduct(id: number, specification: Specification): boolean {
    const product = this.getProductById(id);
    if (!product) return false;

    product.metadata.specifications.push(specification);
    return this.updateProductMetadata(id, product.metadata);
  }

  // Obtener estadísticas de productos
  getProductStats(): {
    totalProducts: number;
    categoriesCounts: Array<{ categoria: string; count: number }>;
    colorCounts: Array<{ color: string; count: number }>;
    avgPrice: number;
  } {
    const totalStmt = this.db.prepare(
      "SELECT COUNT(*) as count FROM productos"
    );
    const totalResult = totalStmt.get() as { count: number };

    const categoriesStmt = this.db.prepare(`
            SELECT categoria, COUNT(*) as count 
            FROM productos 
            GROUP BY categoria 
            ORDER BY count DESC
        `);
    const categoriesCounts = categoriesStmt.all() as Array<{
      categoria: string;
      count: number;
    }>;

    const colorsStmt = this.db.prepare(`
            SELECT JSON_EXTRACT(metadata, '$.color') as color, COUNT(*) as count 
            FROM productos 
            WHERE JSON_EXTRACT(metadata, '$.color') IS NOT NULL
            GROUP BY JSON_EXTRACT(metadata, '$.color')
            ORDER BY count DESC
        `);
    const colorCounts = colorsStmt.all() as Array<{
      color: string;
      count: number;
    }>;

    const avgPriceStmt = this.db.prepare(
      "SELECT AVG(precio) as avg FROM productos"
    );
    const avgPriceResult = avgPriceStmt.get() as { avg: number };

    return {
      totalProducts: totalResult.count,
      categoriesCounts,
      colorCounts,
      avgPrice: Math.round(avgPriceResult.avg * 100) / 100,
    };
  }

  // Método privado para mapear filas de DB a objetos ProductData
  private mapToProductData(row: ProductWithJSONMetadata): ProductData {
    return {
      id: row.id,
      nombre: row.nombre,
      descripcion: row.descripcion || undefined,
      precio: row.precio,
      categoria: row.categoria,
      metadata: JSON.parse(row.metadata) as MetadataData,
      fechaCreacion: new Date(row.fecha_creacion),
      fechaActualizacion: new Date(row.fecha_actualizacion),
    };
  }

  async close(): Promise<void> {
    this.db.close();
    console.log("🔒 Conexión SQL cerrada");
  }
}
