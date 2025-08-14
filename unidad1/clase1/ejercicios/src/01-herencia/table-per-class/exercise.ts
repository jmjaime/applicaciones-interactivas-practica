import Database from "better-sqlite3";

// Ejercicio: Table Per Class (TPC)
// Objetivo: crear UNA tabla por cada clase concreta (sin tabla base)
// Instrucciones: completar los TODO con SQL para crear tablas e insertar datos.

export type ProductBase = {
  name: string;
  description?: string;
  price: number;
  category: string;
  brand?: string;
};

export type Book = ProductBase & {
  author: string;
  isbn: string;
  publisher: string;
  publicationDate: string; // YYYY-MM-DD
  pages: number;
  language: string;
  genre: string;
  format: "Paperback" | "Hardcover" | "Ebook";
};

export type Electronics = ProductBase & {
  model: string;
  warrantyMonths: number;
  powerConsumptionWatts?: number;
  dimensions?: string;
  weightKg?: number;
  color?: string;
};

export type Clothing = ProductBase & {
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL";
  color: string;
  material: string;
  gender: "Men" | "Women" | "Unisex" | "Kids";
  season: "Spring" | "Summer" | "Fall" | "Winter" | "All";
};

export type Product = Book | Electronics | Clothing;

// Instancias para persistir
export const sampleBooks: Book[] = [
  {
    name: "Clean Code",
    description: "A handbook of agile software craftsmanship",
    price: 45.99,
    category: "Programming",
    brand: "Prentice Hall",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    publisher: "Prentice Hall",
    publicationDate: "2008-08-01",
    pages: 464,
    language: "English",
    genre: "Programming",
    format: "Paperback",
  },
];

export const sampleElectronics: Electronics[] = [
  {
    name: "iPhone 15 Pro",
    description: "Latest Apple smartphone with A17 Pro chip",
    price: 1199.99,
    category: "Smartphone",
    brand: "Apple",
    model: "iPhone 15 Pro",
    warrantyMonths: 12,
    powerConsumptionWatts: 15,
    dimensions: "14.67x7.04x0.83 cm",
    weightKg: 0.187,
    color: "Natural Titanium",
  },
];

export const sampleClothing: Clothing[] = [
  {
    name: "Classic Blue Jeans",
    description: "Premium denim jeans with classic fit",
    price: 79.99,
    category: "Pants",
    brand: "Levi's",
    size: "L",
    color: "Blue",
    material: "100% Cotton",
    gender: "Unisex",
    season: "All",
  },
];

export class TablePerClassExercise {
  private db: Database.Database;

  constructor() {
    this.db = new Database("ejercicio-tpc.sqlite");
  }

  async run(): Promise<void> {
    try {
      await this.createSchema();
      await this.insertData();
      console.log(
        "✅ TPC: datos de ejemplo listos. Agregá consultas si querés."
      );
    } finally {
      this.db.close();
    }
  }

  async createSchema(): Promise<void> {
    console.log(
      "🔧 TODO: Crear esquema TPC (tablas book, electronics, clothing)"
    );
    // TODO: Escribir SQL de creación de tablas con columnas de cada tipo concreto
    // Sugerencia:
    // this.db.exec(`CREATE TABLE IF NOT EXISTS book ( ... )`);
    // this.db.exec(`CREATE TABLE IF NOT EXISTS electronics ( ... )`);
    // this.db.exec(`CREATE TABLE IF NOT EXISTS clothing ( ... )`);
  }

  async insertData(): Promise<void> {
    console.log(
      "📝 TODO: Insertar sampleBooks, sampleElectronics y sampleClothing"
    );
    // TODO: Preparar INSERTs para cada tabla y ejecutar dentro de una transacción
    // const tx = this.db.transaction(() => { ... });
    // tx();
  }

  // Consultas (a implementar como parte del ejercicio)
  async getAll(): Promise<Array<Product>> {
    // TODO: Implementar UNION de las 3 tablas devolviendo {type, name, category, price}
    return [];
  }

  async getByType(
    type: "Book" | "Electronics" | "Clothing"
  ): Promise<Array<Product>> {
    // TODO: Implementar SELECT de la tabla correspondiente por tipo
    return [];
  }

  async filterByCategory(category: string): Promise<Array<Product>> {
    // TODO: Implementar SELECT filtrando por category en las tres tablas
    return [];
  }
}

if (require.main === module) {
  new TablePerClassExercise().run().catch(console.error);
}
