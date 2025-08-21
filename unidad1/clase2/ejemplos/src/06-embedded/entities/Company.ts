import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Address } from "./Address";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column({ nullable: true })
  website?: string;

  // Dirección principal embebida
  @Column(() => Address, { prefix: "main_address_" })
  mainAddress!: Address;

  // Dirección de facturación embebida
  @Column(() => Address, { prefix: "billing_address_" })
  billingAddress!: Address;

  // Lista de tags como string separado por comas
  @Column({
    type: "text",
    transformer: {
      to: (value: string[]) => (value ? value.join(",") : ""),
      from: (value: string) =>
        value ? value.split(",").filter((tag) => tag.trim()) : [],
    },
  })
  tags!: string[];

  // Configuración como JSON
  @Column({
    type: "text",
    transformer: {
      to: (value: any) => JSON.stringify(value),
      from: (value: string) => JSON.parse(value || "{}"),
    },
  })
  settings!: {
    theme: string;
    notifications: boolean;
    language: string;
    timezone: string;
  };

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Métodos de negocio
  getDisplayName(): string {
    return this.name;
  }

  hasValidAddresses(): boolean {
    return this.mainAddress.isValid() && this.billingAddress.isValid();
  }

  getMainLocation(): string {
    return this.mainAddress.getShortAddress();
  }

  getBillingLocation(): string {
    return this.billingAddress.getShortAddress();
  }

  hasSameAddresses(): boolean {
    return (
      JSON.stringify(this.mainAddress) === JSON.stringify(this.billingAddress)
    );
  }

  addTag(tag: string): void {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter((t) => t !== tag);
  }

  hasTag(tag: string): boolean {
    return this.tags.includes(tag);
  }

  getTagsDisplay(): string {
    return this.tags.join(", ");
  }

  updateSetting(key: string, value: any): void {
    this.settings = { ...this.settings, [key]: value };
  }
}
