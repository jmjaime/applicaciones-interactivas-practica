import { Column } from "typeorm";

export class Address {
  @Column()
  street!: string;

  @Column()
  city!: string;

  @Column()
  zipCode!: string;

  @Column()
  country!: string;

  // Método para mostrar la dirección completa
  getFullAddress(): string {
    return `${this.street}, ${this.city}, ${this.zipCode}, ${this.country}`;
  }

  // Método para verificar si es una dirección válida
  isValid(): boolean {
    return !!(this.street && this.city && this.zipCode && this.country);
  }

  // Método para obtener la dirección corta
  getShortAddress(): string {
    return `${this.city}, ${this.country}`;
  }
}
