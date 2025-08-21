import {
  Vehicle,
  Car,
  Motorcycle,
  Truck,
  VehicleType,
  FuelType,
  TransmissionType,
  MotorcycleType,
  TruckCabType,
  DriveType,
} from "./entities";

/**
 * DATOS DE EJEMPLO PARA HERENCIA DE VEHÍCULOS
 * Utilizados en las tres estrategias de herencia
 */

// ============================================================================
// DATOS DE AUTOS
// ============================================================================

export const sampleCars: Car[] = [
  new Car(
    "Toyota",
    "Camry",
    2023,
    28000,
    "Blue",
    "1HGCM82633A004352",
    4,
    TransmissionType.AUTOMATIC,
    FuelType.GASOLINE,
    2.5,
    32,
    5,
    1200,
    true,
    false
  ),
  new Car(
    "Honda",
    "Civic",
    2022,
    24000,
    "Red",
    "2HGFC2F59MH567890",
    4,
    TransmissionType.MANUAL,
    FuelType.GASOLINE,
    2.0,
    35,
    5,
    8500,
    true,
    true
  ),
  new Car(
    "Tesla",
    "Model 3",
    2023,
    45000,
    "White",
    "5YJ3E1EA1KF123456",
    4,
    TransmissionType.AUTOMATIC,
    FuelType.ELECTRIC,
    0.0, // Los autos eléctricos no tienen motor tradicional
    120, // Equivalente en MPG
    5,
    500,
    true,
    true
  ),
  new Car(
    "BMW",
    "330i",
    2022,
    42000,
    "Black",
    "WBA5R1C07JA789012",
    4,
    TransmissionType.AUTOMATIC,
    FuelType.GASOLINE,
    2.0,
    26,
    5,
    15000,
    true,
    true
  ),
  new Car(
    "Ford",
    "Mustang",
    2023,
    36000,
    "Yellow",
    "1FA6P8TH8J5345678",
    2,
    TransmissionType.MANUAL,
    FuelType.GASOLINE,
    5.0,
    16,
    4,
    2500,
    true,
    false
  ),
  new Car(
    "Audi",
    "A4",
    2021,
    38000,
    "Gray",
    "WAUFFAFL9GN901234",
    4,
    TransmissionType.AUTOMATIC,
    FuelType.GASOLINE,
    2.0,
    28,
    5,
    22000,
    true,
    true
  ),
  new Car(
    "Volkswagen",
    "Golf",
    2022,
    25000,
    "Green",
    "3VWD17AJ1EM567890",
    4,
    TransmissionType.MANUAL,
    FuelType.GASOLINE,
    1.4,
    30,
    5,
    12000,
    true,
    false
  ),
  new Car(
    "Chevrolet",
    "Malibu",
    2020,
    22000,
    "Silver",
    "1G1ZD5ST4LF123456",
    4,
    TransmissionType.AUTOMATIC,
    FuelType.GASOLINE,
    1.5,
    29,
    5,
    35000,
    true,
    false
  ),
];

// ============================================================================
// DATOS DE MOTOCICLETAS
// ============================================================================

export const sampleMotorcycles: Motorcycle[] = [
  new Motorcycle(
    "Harley-Davidson",
    "Street Glide",
    2023,
    28000,
    "Black",
    "1HD1KB4197Y789012",
    1868,
    MotorcycleType.CRUISER,
    110,
    2500,
    true,
    true
  ),
  new Motorcycle(
    "Yamaha",
    "YZF-R1",
    2022,
    17000,
    "Blue",
    "JYARN23E7MA345678",
    998,
    MotorcycleType.SPORT,
    186,
    5000,
    true,
    false
  ),
  new Motorcycle(
    "Honda",
    "Gold Wing",
    2023,
    24000,
    "Red",
    "1HFSC47A3KA901234",
    1833,
    MotorcycleType.TOURING,
    125,
    1500,
    true,
    true
  ),
  new Motorcycle(
    "Kawasaki",
    "Ninja ZX-10R",
    2022,
    16000,
    "Green",
    "JKAZX1016MA567890",
    998,
    MotorcycleType.SPORT,
    186,
    8000,
    true,
    false
  ),
  new Motorcycle(
    "Ducati",
    "Monster 821",
    2021,
    12000,
    "Red",
    "ZDM12AKS1LB123456",
    821,
    MotorcycleType.SPORT,
    140,
    15000,
    false,
    false
  ),
  new Motorcycle(
    "Indian",
    "Chief Classic",
    2022,
    20000,
    "Black",
    "56KMJ5JT5NE789012",
    1811,
    MotorcycleType.CRUISER,
    110,
    3500,
    true,
    true
  ),
  new Motorcycle(
    "BMW",
    "R1250GS",
    2023,
    18000,
    "White",
    "WB10A2101LZ345678",
    1254,
    MotorcycleType.TOURING,
    125,
    1200,
    true,
    true
  ),
  new Motorcycle(
    "Vespa",
    "Primavera 150",
    2022,
    4500,
    "Blue",
    "ZAPM15100MF901234",
    150,
    MotorcycleType.SCOOTER,
    65,
    2000,
    true,
    false
  ),
];

// ============================================================================
// DATOS DE CAMIONES
// ============================================================================

export const sampleTrucks: Truck[] = [
  new Truck(
    "Ford",
    "F-150",
    2023,
    35000,
    "Blue",
    "1FTFW1ET9JFC56789",
    2320,
    TruckCabType.CREW,
    DriveType.FOUR_WD,
    6.5,
    11400,
    FuelType.GASOLINE,
    3.5,
    5000
  ),
  new Truck(
    "Chevrolet",
    "Silverado 1500",
    2022,
    33000,
    "Red",
    "1GCRYDED7NZ123456",
    2280,
    TruckCabType.CREW,
    DriveType.RWD,
    6.6,
    11600,
    FuelType.GASOLINE,
    5.3,
    12000
  ),
  new Truck(
    "Ram",
    "1500",
    2023,
    38000,
    "Black",
    "1C6SRFFT3NN789012",
    2300,
    TruckCabType.CREW,
    DriveType.FOUR_WD,
    6.4,
    12750,
    FuelType.GASOLINE,
    5.7,
    3500
  ),
  new Truck(
    "Toyota",
    "Tacoma",
    2022,
    32000,
    "Gray",
    "3TMCZ5AN4NM345678",
    1620,
    TruckCabType.EXTENDED,
    DriveType.FOUR_WD,
    6.1,
    6800,
    FuelType.GASOLINE,
    3.5,
    18000
  ),
  new Truck(
    "Ford",
    "F-250 Super Duty",
    2021,
    45000,
    "White",
    "1FT7W2BT7MEA90123",
    4260,
    TruckCabType.CREW,
    DriveType.FOUR_WD,
    8.0,
    15000,
    FuelType.DIESEL,
    6.7,
    25000
  ),
  new Truck(
    "Chevrolet",
    "Silverado 2500HD",
    2023,
    48000,
    "Silver",
    "1GC4YPEY0PF456789",
    3979,
    TruckCabType.CREW,
    DriveType.FOUR_WD,
    8.0,
    18500,
    FuelType.DIESEL,
    6.6,
    8000
  ),
  new Truck(
    "GMC",
    "Sierra 1500",
    2022,
    36000,
    "Blue",
    "1GTU9EED1NZ012345",
    2280,
    TruckCabType.REGULAR,
    DriveType.RWD,
    8.0,
    11600,
    FuelType.GASOLINE,
    5.3,
    15000
  ),
  new Truck(
    "Nissan",
    "Frontier",
    2023,
    30000,
    "Orange",
    "1N6AD0CW4PN678901",
    1610,
    TruckCabType.CREW,
    DriveType.RWD,
    6.0,
    6720,
    FuelType.GASOLINE,
    3.8,
    7500
  ),
];

// ============================================================================
// ARRAY COMBINADO DE TODOS LOS VEHÍCULOS
// ============================================================================

export const sampleVehicles: Vehicle[] = [
  ...sampleCars,
  ...sampleMotorcycles,
  ...sampleTrucks,
];

// ============================================================================
// FUNCIONES UTILITARIAS PARA GENERAR DATOS
// ============================================================================

/**
 * Genera VIN aleatorio (simplificado para demo)
 */
export function generateVIN(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let vin = "";
  for (let i = 0; i < 17; i++) {
    vin += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return vin;
}

/**
 * Genera un auto aleatorio
 */
export function generateRandomCar(): Car {
  const brands = [
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
    "BMW",
    "Audi",
    "Volkswagen",
  ];
  const models = ["Sedan", "Hatchback", "SUV", "Wagon", "Coupe"];
  const colors = ["Red", "Blue", "Black", "White", "Silver", "Gray", "Green"];
  const transmissions = [
    TransmissionType.AUTOMATIC,
    TransmissionType.MANUAL,
    TransmissionType.CVT,
  ];
  const fuels = [FuelType.GASOLINE, FuelType.HYBRID, FuelType.ELECTRIC];

  const brand = brands[Math.floor(Math.random() * brands.length)];
  const model = models[Math.floor(Math.random() * models.length)];
  const year = 2020 + Math.floor(Math.random() * 4);
  const price = 20000 + Math.floor(Math.random() * 50000);
  const color = colors[Math.floor(Math.random() * colors.length)];
  const vin = generateVIN();
  const doors = Math.random() < 0.7 ? 4 : 2;
  const transmission =
    transmissions[Math.floor(Math.random() * transmissions.length)];
  const fuelType = fuels[Math.floor(Math.random() * fuels.length)];
  const engineSize = 1.0 + Math.random() * 4.0;
  const mpg = 20 + Math.floor(Math.random() * 30);
  const mileage = Math.floor(Math.random() * 50000);

  return new Car(
    brand,
    model,
    year,
    price,
    color,
    vin,
    doors,
    transmission,
    fuelType,
    engineSize,
    mpg,
    5,
    mileage
  );
}

/**
 * Genera una motocicleta aleatoria
 */
export function generateRandomMotorcycle(): Motorcycle {
  const brands = [
    "Harley-Davidson",
    "Yamaha",
    "Honda",
    "Kawasaki",
    "Ducati",
    "BMW",
    "Suzuki",
  ];
  const models = [
    "Sportster",
    "Cruiser",
    "Ninja",
    "CBR",
    "Monster",
    "R-Series",
  ];
  const colors = ["Black", "Red", "Blue", "White", "Orange", "Green"];
  const types = [
    MotorcycleType.SPORT,
    MotorcycleType.CRUISER,
    MotorcycleType.TOURING,
    MotorcycleType.SCOOTER,
  ];

  const brand = brands[Math.floor(Math.random() * brands.length)];
  const model = models[Math.floor(Math.random() * models.length)];
  const year = 2020 + Math.floor(Math.random() * 4);
  const price = 5000 + Math.floor(Math.random() * 25000);
  const color = colors[Math.floor(Math.random() * colors.length)];
  const vin = generateVIN();
  const engineSize = 125 + Math.floor(Math.random() * 1500);
  const motorcycleType = types[Math.floor(Math.random() * types.length)];
  const topSpeed = 60 + Math.floor(Math.random() * 120);
  const mileage = Math.floor(Math.random() * 30000);

  return new Motorcycle(
    brand,
    model,
    year,
    price,
    color,
    vin,
    engineSize,
    motorcycleType,
    topSpeed,
    mileage
  );
}

/**
 * Genera un camión aleatorio
 */
export function generateRandomTruck(): Truck {
  const brands = ["Ford", "Chevrolet", "Ram", "Toyota", "Nissan", "GMC"];
  const models = ["F-150", "Silverado", "1500", "Tacoma", "Frontier", "Sierra"];
  const colors = ["Blue", "Red", "Black", "White", "Silver", "Gray"];
  const cabTypes = [
    TruckCabType.REGULAR,
    TruckCabType.EXTENDED,
    TruckCabType.CREW,
  ];
  const driveTypes = [DriveType.RWD, DriveType.FOUR_WD, DriveType.AWD];
  const fuels = [FuelType.GASOLINE, FuelType.DIESEL];

  const brand = brands[Math.floor(Math.random() * brands.length)];
  const model = models[Math.floor(Math.random() * models.length)];
  const year = 2020 + Math.floor(Math.random() * 4);
  const price = 30000 + Math.floor(Math.random() * 40000);
  const color = colors[Math.floor(Math.random() * colors.length)];
  const vin = generateVIN();
  const payloadCapacity = 1500 + Math.floor(Math.random() * 3000);
  const cabType = cabTypes[Math.floor(Math.random() * cabTypes.length)];
  const driveType = driveTypes[Math.floor(Math.random() * driveTypes.length)];
  const bedLength = 5.5 + Math.random() * 2.5;
  const towingCapacity = 5000 + Math.floor(Math.random() * 15000);
  const fuelType = fuels[Math.floor(Math.random() * fuels.length)];
  const engineSize = 3.0 + Math.random() * 4.0;
  const mileage = Math.floor(Math.random() * 40000);

  return new Truck(
    brand,
    model,
    year,
    price,
    color,
    vin,
    payloadCapacity,
    cabType,
    driveType,
    bedLength,
    towingCapacity,
    fuelType,
    engineSize,
    mileage
  );
}

/**
 * Genera un set de vehículos aleatorios
 */
export function generateRandomVehicles(count: number): Vehicle[] {
  const vehicles: Vehicle[] = [];

  for (let i = 0; i < count; i++) {
    const rand = Math.random();
    if (rand < 0.5) {
      vehicles.push(generateRandomCar());
    } else if (rand < 0.8) {
      vehicles.push(generateRandomMotorcycle());
    } else {
      vehicles.push(generateRandomTruck());
    }
  }

  return vehicles;
}

/**
 * Filtra vehículos por tipo
 */
export function filterVehiclesByType(
  vehicles: Vehicle[],
  type: VehicleType
): Vehicle[] {
  return vehicles.filter((vehicle) => vehicle.getVehicleType() === type);
}

/**
 * Filtra vehículos por rango de precio
 */
export function filterVehiclesByPriceRange(
  vehicles: Vehicle[],
  minPrice: number,
  maxPrice: number
): Vehicle[] {
  return vehicles.filter(
    (vehicle) => vehicle.price >= minPrice && vehicle.price <= maxPrice
  );
}

/**
 * Filtra vehículos por año
 */
export function filterVehiclesByYear(
  vehicles: Vehicle[],
  year: number
): Vehicle[] {
  return vehicles.filter((vehicle) => vehicle.year === year);
}

/**
 * Filtra vehículos por marca
 */
export function filterVehiclesByBrand(
  vehicles: Vehicle[],
  brand: string
): Vehicle[] {
  return vehicles.filter(
    (vehicle) => vehicle.brand.toLowerCase() === brand.toLowerCase()
  );
}

/**
 * Ordena vehículos por precio
 */
export function sortVehiclesByPrice(
  vehicles: Vehicle[],
  ascending: boolean = true
): Vehicle[] {
  return [...vehicles].sort((a, b) => {
    return ascending ? a.price - b.price : b.price - a.price;
  });
}

/**
 * Ordena vehículos por año
 */
export function sortVehiclesByYear(
  vehicles: Vehicle[],
  ascending: boolean = true
): Vehicle[] {
  return [...vehicles].sort((a, b) => {
    return ascending ? a.year - b.year : b.year - a.year;
  });
}

/**
 * Ordena vehículos por millaje
 */
export function sortVehiclesByMileage(
  vehicles: Vehicle[],
  ascending: boolean = true
): Vehicle[] {
  return [...vehicles].sort((a, b) => {
    return ascending ? a.mileage - b.mileage : b.mileage - a.mileage;
  });
}
