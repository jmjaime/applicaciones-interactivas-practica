import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TableInheritance,
  ChildEntity,
} from "typeorm";

@Entity("employees")
@TableInheritance({ column: { type: "varchar", name: "type" } })
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

  abstract getEmployeeType(): string;
  abstract getDisplayInfo(): string;
}

@ChildEntity("Developer")
export class Developer extends Employee {
  @Column("simple-json")
  programmingLanguages!: string[];

  @Column()
  experienceYears!: number;

  @Column({ nullable: true })
  framework?: string;

  getEmployeeType(): string {
    return "Developer";
  }

  getDisplayInfo(): string {
    return `${this.firstName} ${this.lastName} - Developer (${this.programmingLanguages.join(", ")}) - ${this.experienceYears} years`;
  }
}

@ChildEntity("Manager")
export class Manager extends Employee {
  @Column()
  department!: string;

  @Column()
  teamSize!: number;

  @Column("decimal", { precision: 12, scale: 2 })
  budget!: number;

  getEmployeeType(): string {
    return "Manager";
  }

  getDisplayInfo(): string {
    return `${this.firstName} ${this.lastName} - Manager of ${this.department} (${this.teamSize} team members)`;
  }
}

@ChildEntity("Designer")
export class Designer extends Employee {
  @Column("simple-json")
  designTools!: string[];

  @Column()
  specialization!: string;

  @Column({ nullable: true })
  portfolioUrl?: string;

  getEmployeeType(): string {
    return "Designer";
  }

  getDisplayInfo(): string {
    return `${this.firstName} ${this.lastName} - ${this.specialization} Designer (${this.designTools.join(", ")})`;
  }
}

@ChildEntity("SalesRep")
export class SalesRep extends Employee {
  @Column()
  territory!: string;

  @Column("decimal", { precision: 5, scale: 4 })
  commissionRate!: number;

  @Column("decimal", { precision: 12, scale: 2 })
  salesTarget!: number;

  getEmployeeType(): string {
    return "SalesRep";
  }

  getDisplayInfo(): string {
    return `${this.firstName} ${this.lastName} - Sales Rep (${this.territory}) - Target: $${this.salesTarget}`;
  }
}
