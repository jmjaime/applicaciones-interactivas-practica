// ============================================================================
// ENTIDADES BASE PARA DEMOSTRAR MAPEO DE HERENCIA
// Sistema de Gestión de Vehículos
// ============================================================================

export enum VehicleType {
  CAR = "car",
  MOTORCYCLE = "motorcycle",
  TRUCK = "truck",
}

export enum FuelType {
  GASOLINE = "gasoline",
  DIESEL = "diesel",
  ELECTRIC = "electric",
  HYBRID = "hybrid",
}

export enum TransmissionType {
  MANUAL = "manual",
  AUTOMATIC = "automatic",
  CVT = "cvt",
}

export enum MotorcycleType {
  SPORT = "sport",
  CRUISER = "cruiser",
  TOURING = "touring",
  DIRT = "dirt",
  SCOOTER = "scooter",
}

export enum TruckCabType {
  REGULAR = "regular",
  EXTENDED = "extended",
  CREW = "crew",
}

export enum DriveType {
  FWD = "fwd",
  RWD = "rwd",
  AWD = "awd",
  FOUR_WD = "4wd",
}

/**
 * Clase base abstracta para todos los vehículos
 */
export abstract class Vehicle {
  id?: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  color: string;
  mileage: number;
  vin: string;
  isAvailable: boolean;
  description?: string;

  constructor(
    brand: string,
    model: string,
    year: number,
    price: number,
    color: string,
    vin: string,
    mileage: number = 0,
    isAvailable: boolean = true
  ) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.price = price;
    this.color = color;
    this.vin = vin;
    this.mileage = mileage;
    this.isAvailable = isAvailable;
  }

  abstract getVehicleType(): VehicleType;
  abstract getDisplayInfo(): string;
  abstract getSpecifications(): string;

  getBasicInfo(): string {
    return `${this.year} ${this.brand} ${this.model} (${this.color})`;
  }

  getAge(): number {
    return new Date().getFullYear() - this.year;
  }

  isNew(): boolean {
    return this.getAge() <= 1 && this.mileage < 1000;
  }

  isUsed(): boolean {
    return !this.isNew();
  }

  getCondition(): string {
    if (this.isNew()) return "New";
    if (this.mileage < 50000) return "Excellent";
    if (this.mileage < 100000) return "Good";
    if (this.mileage < 150000) return "Fair";
    return "High Mileage";
  }

  getPriceFormatted(): string {
    return `$${this.price.toLocaleString()}`;
  }

  getMileageFormatted(): string {
    return `${this.mileage.toLocaleString()} miles`;
  }
}

/**
 * Car - hereda de Vehicle
 */
export class Car extends Vehicle {
  doors: number;
  transmission: TransmissionType;
  fuelType: FuelType;
  engineSize: number; // en litros
  mpg: number; // millas por galón
  seats: number;
  hasAirConditioning: boolean;
  hasSunroof: boolean;

  constructor(
    brand: string,
    model: string,
    year: number,
    price: number,
    color: string,
    vin: string,
    doors: number,
    transmission: TransmissionType,
    fuelType: FuelType,
    engineSize: number,
    mpg: number,
    seats: number = 5,
    mileage: number = 0,
    hasAirConditioning: boolean = true,
    hasSunroof: boolean = false
  ) {
    super(brand, model, year, price, color, vin, mileage);
    this.doors = doors;
    this.transmission = transmission;
    this.fuelType = fuelType;
    this.engineSize = engineSize;
    this.mpg = mpg;
    this.seats = seats;
    this.hasAirConditioning = hasAirConditioning;
    this.hasSunroof = hasSunroof;
  }

  getVehicleType(): VehicleType {
    return VehicleType.CAR;
  }

  getDisplayInfo(): string {
    return `${this.getBasicInfo()} - ${this.doors}-door ${this.transmission} (${
      this.mpg
    } MPG)`;
  }

  getSpecifications(): string {
    const features = [];
    if (this.hasAirConditioning) features.push("A/C");
    if (this.hasSunroof) features.push("Sunroof");

    return (
      `Engine: ${this.engineSize}L ${this.fuelType} | ` +
      `${this.transmission} transmission | ` +
      `${this.seats} seats | ` +
      `${this.mpg} MPG | ` +
      `Features: ${features.length > 0 ? features.join(", ") : "Standard"}`
    );
  }

  isEconomical(): boolean {
    return this.mpg >= 30;
  }

  isLuxury(): boolean {
    return this.price >= 50000;
  }

  isCompact(): boolean {
    return this.doors <= 2 && this.seats <= 2;
  }
}

/**
 * Motorcycle - hereda de Vehicle
 */
export class Motorcycle extends Vehicle {
  engineSize: number; // en cc
  motorcycleType: MotorcycleType;
  hasWindshield: boolean;
  hasSaddlebags: boolean;
  topSpeed: number; // mph

  constructor(
    brand: string,
    model: string,
    year: number,
    price: number,
    color: string,
    vin: string,
    engineSize: number,
    motorcycleType: MotorcycleType,
    topSpeed: number,
    mileage: number = 0,
    hasWindshield: boolean = false,
    hasSaddlebags: boolean = false
  ) {
    super(brand, model, year, price, color, vin, mileage);
    this.engineSize = engineSize;
    this.motorcycleType = motorcycleType;
    this.topSpeed = topSpeed;
    this.hasWindshield = hasWindshield;
    this.hasSaddlebags = hasSaddlebags;
  }

  getVehicleType(): VehicleType {
    return VehicleType.MOTORCYCLE;
  }

  getDisplayInfo(): string {
    return `${this.getBasicInfo()} - ${this.engineSize}cc ${
      this.motorcycleType
    } (${this.topSpeed} mph)`;
  }

  getSpecifications(): string {
    const features = [];
    if (this.hasWindshield) features.push("Windshield");
    if (this.hasSaddlebags) features.push("Saddlebags");

    return (
      `Engine: ${this.engineSize}cc | ` +
      `Type: ${this.motorcycleType} | ` +
      `Top Speed: ${this.topSpeed} mph | ` +
      `Features: ${features.length > 0 ? features.join(", ") : "Standard"}`
    );
  }

  isHighPerformance(): boolean {
    return (
      this.motorcycleType === MotorcycleType.SPORT && this.engineSize >= 600
    );
  }

  isTouringBike(): boolean {
    return this.motorcycleType === MotorcycleType.TOURING;
  }

  isBeginnerFriendly(): boolean {
    return (
      this.engineSize <= 300 || this.motorcycleType === MotorcycleType.SCOOTER
    );
  }
}

/**
 * Truck - hereda de Vehicle
 */
export class Truck extends Vehicle {
  payloadCapacity: number; // en libras
  cabType: TruckCabType;
  driveType: DriveType;
  bedLength: number; // en pies
  towingCapacity: number; // en libras
  fuelType: FuelType;
  engineSize: number; // en litros

  constructor(
    brand: string,
    model: string,
    year: number,
    price: number,
    color: string,
    vin: string,
    payloadCapacity: number,
    cabType: TruckCabType,
    driveType: DriveType,
    bedLength: number,
    towingCapacity: number,
    fuelType: FuelType,
    engineSize: number,
    mileage: number = 0
  ) {
    super(brand, model, year, price, color, vin, mileage);
    this.payloadCapacity = payloadCapacity;
    this.cabType = cabType;
    this.driveType = driveType;
    this.bedLength = bedLength;
    this.towingCapacity = towingCapacity;
    this.fuelType = fuelType;
    this.engineSize = engineSize;
  }

  getVehicleType(): VehicleType {
    return VehicleType.TRUCK;
  }

  getDisplayInfo(): string {
    return `${this.getBasicInfo()} - ${
      this.cabType
    } cab, ${this.driveType.toUpperCase()} (${this.payloadCapacity.toLocaleString()} lbs payload)`;
  }

  getSpecifications(): string {
    return (
      `Engine: ${this.engineSize}L ${this.fuelType} | ` +
      `Cab: ${this.cabType} | ` +
      `Drive: ${this.driveType.toUpperCase()} | ` +
      `Bed: ${this.bedLength}' | ` +
      `Payload: ${this.payloadCapacity.toLocaleString()} lbs | ` +
      `Towing: ${this.towingCapacity.toLocaleString()} lbs`
    );
  }

  isHeavyDuty(): boolean {
    return this.payloadCapacity >= 3000 && this.towingCapacity >= 10000;
  }

  isWorkTruck(): boolean {
    return this.cabType === TruckCabType.REGULAR && this.bedLength >= 6;
  }

  isFamilyTruck(): boolean {
    return this.cabType === TruckCabType.CREW;
  }

  canTow(weight: number): boolean {
    return this.towingCapacity >= weight;
  }

  canCarry(weight: number): boolean {
    return this.payloadCapacity >= weight;
  }
}

// ============================================================================
// TIPOS UTILITARIOS Y INTERFACES
// ============================================================================

export interface VehicleStats {
  totalVehicles: number;
  byType: Record<VehicleType, number>;
  averagePrice: number;
  totalValue: number;
  averageMileage: number;
  byBrand: Record<string, number>;
}

export interface VehicleSummary {
  id: number;
  type: VehicleType;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: string;
  displayInfo: string;
}

/**
 * Utilidad para crear resúmenes de vehículos
 */
export function createVehicleSummary(vehicle: Vehicle): VehicleSummary {
  return {
    id: vehicle.id || 0,
    type: vehicle.getVehicleType(),
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    price: vehicle.price,
    mileage: vehicle.mileage,
    condition: vehicle.getCondition(),
    displayInfo: vehicle.getDisplayInfo(),
  };
}

/**
 * Utilidad para generar estadísticas de vehículos
 */
export function generateVehicleStats(vehicles: Vehicle[]): VehicleStats {
  const stats: VehicleStats = {
    totalVehicles: vehicles.length,
    byType: {
      [VehicleType.CAR]: 0,
      [VehicleType.MOTORCYCLE]: 0,
      [VehicleType.TRUCK]: 0,
    },
    averagePrice: 0,
    totalValue: 0,
    averageMileage: 0,
    byBrand: {},
  };

  if (vehicles.length === 0) return stats;

  // Calcular estadísticas
  vehicles.forEach((vehicle) => {
    stats.byType[vehicle.getVehicleType()]++;
    stats.totalValue += vehicle.price;
    stats.averageMileage += vehicle.mileage;

    stats.byBrand[vehicle.brand] = (stats.byBrand[vehicle.brand] || 0) + 1;
  });

  stats.averagePrice = Math.round(stats.totalValue / vehicles.length);
  stats.averageMileage = Math.round(stats.averageMileage / vehicles.length);

  return stats;
}
