import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// ============================================================================
// TABLE PER CLASS (TPC) - TYPEORM ENTITIES
// Herencia verdadera: cada clase tiene su tabla completa
// ============================================================================

// Clase base abstracta (no se mapea a tabla)
export abstract class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  salary!: number;

  @Column()
  hireDate!: Date;

  abstract getDisplayInfo(): string;
}

@Entity("developers")
export class Developer extends Employee {
  @Column("simple-json")
  programmingLanguages!: string[];

  @Column()
  experienceYears!: number;

  @Column({ nullable: true })
  framework?: string;

  getDisplayInfo(): string {
    return `${this.firstName} ${
      this.lastName
    } - Developer (${this.programmingLanguages.join(", ")}) - ${
      this.experienceYears
    } years`;
  }
}

@Entity("managers")
export class Manager extends Employee {
  @Column()
  department!: string;

  @Column()
  teamSize!: number;

  @Column("decimal", { precision: 12, scale: 2 })
  budget!: number;

  getDisplayInfo(): string {
    return `${this.firstName} ${this.lastName} - Manager of ${this.department} (${this.teamSize} team members)`;
  }
}

@Entity("designers")
export class Designer extends Employee {
  @Column("simple-json")
  designTools!: string[];

  @Column()
  specialization!: string;

  @Column({ nullable: true })
  portfolioUrl?: string;

  getDisplayInfo(): string {
    return `${this.firstName} ${this.lastName} - ${
      this.specialization
    } Designer (${this.designTools.join(", ")})`;
  }
}

@Entity("sales_reps")
export class SalesRep extends Employee {
  @Column()
  territory!: string;

  @Column("decimal", { precision: 5, scale: 4 })
  commissionRate!: number;

  @Column("decimal", { precision: 12, scale: 2 })
  salesTarget!: number;

  getDisplayInfo(): string {
    return `${this.firstName} ${this.lastName} - Sales Rep (${this.territory}) - Target: $${this.salesTarget}`;
  }
}
