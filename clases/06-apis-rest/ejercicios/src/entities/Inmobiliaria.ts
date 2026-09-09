import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// Perfil del vendedor dueño de las propiedades (ver TPO/tpo.md § Inmobiliaria).
// Entidad de apoyo: ya viene resuelta, el foco del ejercicio es Propiedad.
@Entity("inmobiliarias")
export class Inmobiliaria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 100 })
  nombreFantasia!: string;

  @Column({ length: 30 })
  telefono!: string;

  @Column({ length: 255 })
  email!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
