import Database from "better-sqlite3";

// Ejercicio: Table Per Hierarchy (TPH)
// Objetivo: una sola tabla 'vehicles' con discriminador 'vehicle_type'
// Instrucciones: completar los TODO con SQL para crear tabla e insertar datos.

export type VehicleBase = {
  brand: string;
  model: string;
  year: number;
  price: number;
  color: string;
};

export type Car = VehicleBase & {
  type: "Car";
  doors: number;
  fuelType: string;
  transmission: string;
};

export type Motorcycle = VehicleBase & {
  type: "Motorcycle";
  engineCc: number;
  bikeType: string; // sport, cruiser, etc.
};

export type Truck = VehicleBase & {
  type: "Truck";
  cargoCapacityTons: number;
  axles: number;
  truckType: string; // pickup, semi, etc.
};

export type Vehicle = Car | Motorcycle | Truck;

// Instancias para persistir
export const vehicles: Vehicle[] = [
  {
    type: "Car",
    brand: "Toyota",
    model: "Camry",
    year: 2023,
    price: 28000,
    color: "Silver",
    doors: 4,
    fuelType: "Gasoline",
    transmission: "Automatic",
  },
  {
    type: "Motorcycle",
    brand: "Yamaha",
    model: "YZF-R1",
    year: 2024,
    price: 18000,
    color: "Red",
    engineCc: 1000,
    bikeType: "Sport",
  },
  {
    type: "Truck",
    brand: "Ford",
    model: "F-150",
    year: 2023,
    price: 35000,
    color: "Gray",
    cargoCapacityTons: 1.5,
    axles: 2,
    truckType: "Pickup",
  },
];

export class TablePerHierarchyExercise {
  private db: Database.Database;

  constructor() {
    this.db = new Database("ejercicio-tph.sqlite");
  }

  async run(): Promise<void> {
    try {
      await this.createSchema();
      await this.insertData();
      console.log("✅ TPH: datos listos. Agregá consultas si querés.");
    } finally {
      this.db.close();
    }
  }

  async createSchema(): Promise<void> {
    console.log(
      "🔧 TODO: Crear tabla única 'vehicles' con discriminador 'vehicle_type'"
    );
    // TODO: Crear tabla 'vehicles' con columnas para campos comunes y específicos
    // Sugerencia: this.db.exec(`CREATE TABLE IF NOT EXISTS vehicles ( ... )`)
  }

  async insertData(): Promise<void> {
    console.log(
      "📝 TODO: Insertar arreglo 'vehicles' mapeando cada tipo a sus columnas"
    );
    // TODO: Preparar INSERT parametrizado y recorrer 'vehicles'
    // Sugerencia: const tx = this.db.transaction(() => { ... }); tx();
  }

  // Consultas (a implementar como parte del ejercicio)
  async getAll(): Promise<Vehicle[]> {
    // TODO: Implementar consulta SELECT * mapeando columnas a Vehicle
    return [];
  }

  async getByType(type: Vehicle["type"]): Promise<Vehicle[]> {
    // TODO: Implementar SELECT con filtro por discriminador
    return [];
  }

  async filterByBrand(brand: string): Promise<Vehicle[]> {
    // TODO: Implementar SELECT filtrando por brand
    return [];
  }
}

if (require.main === module) {
  new TablePerHierarchyExercise().run().catch(console.error);
}
