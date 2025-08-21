import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {
  VehicleType,
  FuelType,
  TransmissionType,
  MotorcycleType,
  TruckCabType,
  DriveType,
} from "../common/entities";

/**
 * ESTRATEGIA: TABLE PER CLASS (TPC)
 * - Una tabla separada para cada clase concreta
 * - Propiedades base se duplican en cada tabla
 * - No hay tabla base en la DB
 * - Consultas polimórficas requieren UNION
 */

// Clase base abstracta - NO se mapea a tabla
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

// Cada clase concreta tiene su propia tabla
@Entity("cars")
export class Car extends Vehicle {
  @Column({ type: "int" })
  doors!: number;

  @Column({ type: "varchar", length: 20 })
  transmission!: TransmissionType;

  @Column({ type: "varchar", length: 20 })
  fuelType!: FuelType;

  @Column({ type: "decimal", precision: 3, scale: 1 })
  engineSize!: number;

  @Column({ type: "int" })
  mpg!: number;

  @Column({ type: "int", default: 5 })
  seats!: number;

  @Column({ type: "boolean", default: true })
  hasAirConditioning!: boolean;

  @Column({ type: "boolean", default: false })
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

  isCompact(): boolean {
    return this.doors <= 2 && this.seats <= 2;
  }
}

@Entity("motorcycles")
export class Motorcycle extends Vehicle {
  @Column({ type: "int" })
  engineSize!: number; // en cc

  @Column({ type: "varchar", length: 20 })
  motorcycleType!: MotorcycleType;

  @Column({ type: "boolean", default: false })
  hasWindshield!: boolean;

  @Column({ type: "boolean", default: false })
  hasSaddlebags!: boolean;

  @Column({ type: "int" })
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

  isTouringBike(): boolean {
    return this.motorcycleType === MotorcycleType.TOURING;
  }

  isBeginnerFriendly(): boolean {
    return (
      this.engineSize <= 300 || this.motorcycleType === MotorcycleType.SCOOTER
    );
  }
}

@Entity("trucks")
export class Truck extends Vehicle {
  @Column({ type: "int" })
  payloadCapacity!: number; // en libras

  @Column({ type: "varchar", length: 20 })
  cabType!: TruckCabType;

  @Column({ type: "varchar", length: 20 })
  driveType!: DriveType;

  @Column({ type: "decimal", precision: 3, scale: 1 })
  bedLength!: number; // en pies

  @Column({ type: "int" })
  towingCapacity!: number; // en libras

  @Column({ type: "varchar", length: 20 })
  fuelType!: FuelType;

  @Column({ type: "decimal", precision: 3, scale: 1 })
  engineSize!: number;

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
