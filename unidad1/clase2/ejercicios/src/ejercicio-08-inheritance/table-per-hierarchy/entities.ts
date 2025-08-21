import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  ChildEntity,
} from "typeorm";
import {
  VehicleType,
  FuelType,
  TransmissionType,
  MotorcycleType,
  TruckCabType,
  DriveType,
} from "../common/entities";

/**
 * ESTRATEGIA: TABLE PER HIERARCHY (TPH)
 * - Una sola tabla 'vehicles' para toda la jerarquía
 * - Columna discriminadora 'type' identifica el tipo de vehículo
 * - Todas las propiedades específicas son nullable
 * - Consultas polimórficas muy eficientes
 */

@Entity("vehicles")
@TableInheritance({ column: { type: "varchar", name: "type", length: 20 } })
export abstract class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  brand!: string;

  @Column({ length: 50 })
  model!: string;

  @Column({ type: "int" })
  year!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;

  @Column({ length: 30 })
  color!: string;

  @Column({ type: "int", default: 0 })
  mileage!: number;

  @Column({ length: 17, unique: true })
  vin!: string;

  @Column({ type: "boolean", default: true })
  isAvailable!: boolean;

  @Column({ type: "text", nullable: true })
  description?: string;

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
}

@ChildEntity("Car")
export class Car extends Vehicle {
  @Column({ type: "int", nullable: true })
  doors!: number;

  @Column({ type: "varchar", length: 20, nullable: true })
  transmission!: TransmissionType;

  @Column({ type: "varchar", length: 20, nullable: true })
  fuelType!: FuelType;

  @Column({ type: "decimal", precision: 3, scale: 1, nullable: true })
  engineSize!: number;

  @Column({ type: "int", nullable: true })
  mpg!: number;

  @Column({ type: "int", nullable: true, default: 5 })
  seats!: number;

  @Column({ type: "boolean", nullable: true, default: true })
  hasAirConditioning!: boolean;

  @Column({ type: "boolean", nullable: true, default: false })
  hasSunroof!: boolean;

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
}

@ChildEntity("Motorcycle")
export class Motorcycle extends Vehicle {
  @Column({ type: "int", nullable: true })
  engineSize!: number; // en cc

  @Column({ type: "varchar", length: 20, nullable: true })
  motorcycleType!: MotorcycleType;

  @Column({ type: "boolean", nullable: true, default: false })
  hasWindshield!: boolean;

  @Column({ type: "boolean", nullable: true, default: false })
  hasSaddlebags!: boolean;

  @Column({ type: "int", nullable: true })
  topSpeed!: number;

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

  isBeginnerFriendly(): boolean {
    return (
      this.engineSize <= 300 || this.motorcycleType === MotorcycleType.SCOOTER
    );
  }
}

@ChildEntity("Truck")
export class Truck extends Vehicle {
  @Column({ type: "int", nullable: true })
  payloadCapacity!: number; // en libras

  @Column({ type: "varchar", length: 20, nullable: true })
  cabType!: TruckCabType;

  @Column({ type: "varchar", length: 20, nullable: true })
  driveType!: DriveType;

  @Column({ type: "decimal", precision: 3, scale: 1, nullable: true })
  bedLength!: number; // en pies

  @Column({ type: "int", nullable: true })
  towingCapacity!: number; // en libras

  @Column({ type: "varchar", length: 20, nullable: true })
  truckFuelType!: FuelType; // Renombrado para evitar conflicto

  @Column({ type: "decimal", precision: 3, scale: 1, nullable: true })
  truckEngineSize!: number; // Renombrado para evitar conflicto

  getVehicleType(): VehicleType {
    return VehicleType.TRUCK;
  }

  getDisplayInfo(): string {
    return `${this.getBasicInfo()} - ${
      this.cabType
    } cab, ${this.driveType?.toUpperCase()} (${this.payloadCapacity?.toLocaleString()} lbs payload)`;
  }

  getSpecifications(): string {
    return (
      `Engine: ${this.truckEngineSize}L ${this.truckFuelType} | ` +
      `Cab: ${this.cabType} | ` +
      `Drive: ${this.driveType?.toUpperCase()} | ` +
      `Bed: ${this.bedLength}' | ` +
      `Payload: ${this.payloadCapacity?.toLocaleString()} lbs | ` +
      `Towing: ${this.towingCapacity?.toLocaleString()} lbs`
    );
  }

  isHeavyDuty(): boolean {
    return this.payloadCapacity >= 3000 && this.towingCapacity >= 10000;
  }

  canTow(weight: number): boolean {
    return this.towingCapacity >= weight;
  }
}
