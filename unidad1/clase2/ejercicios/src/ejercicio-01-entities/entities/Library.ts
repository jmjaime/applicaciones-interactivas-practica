import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Library {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ length: 200, nullable: false })
  address: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ type: "int", unsigned: true })
  maxCapacity: number;

  @Column({ type: "date" })
  foundationDate: Date;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  budget: number;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({
    type: "varchar",
    length: 20,
    default: "public",
  })
  type: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  website?: string;

  @Column({ type: "time", default: "09:00:00" })
  openingTime: string;

  @Column({ type: "time", default: "18:00:00" })
  closingTime: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    name?: string,
    address?: string,
    email?: string,
    maxCapacity?: number,
    foundationDate?: Date
  ) {
    this.name = name || "";
    this.address = address || "";
    this.email = email || "";
    this.maxCapacity = maxCapacity || 0;
    this.foundationDate = foundationDate || new Date();
  }
}
