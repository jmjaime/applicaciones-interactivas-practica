import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Inmobiliaria } from "./Inmobiliaria";

// Publicación central del dominio (ver TPO/tpo.md § Propiedad). Entidad ya
// resuelta: el foco de este ejercicio está en las capas de arriba
// (repository/service/controller), no en el mapeo de columnas — eso ya se
// practicó en la Clase 4.

export enum TipoPropiedad {
  CASA = "CASA",
  DEPARTAMENTO = "DEPARTAMENTO",
  TERRENO = "TERRENO",
  LOCAL = "LOCAL",
}

export enum Operacion {
  VENTA = "VENTA",
  ALQUILER = "ALQUILER",
}

export enum Moneda {
  ARS = "ARS",
  USD = "USD",
}

export enum EstadoPropiedad {
  BORRADOR = "BORRADOR",
  PUBLICADA = "PUBLICADA",
  PAUSADA = "PAUSADA",
  RESERVADA = "RESERVADA",
  VENDIDA = "VENDIDA",
  ALQUILADA = "ALQUILADA",
  CANCELADA = "CANCELADA",
}

@Entity("propiedades")
export class Propiedad {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  titulo!: string;

  @Column({ type: "text", nullable: true })
  descripcion?: string;

  @Column({ type: "text" })
  tipo!: TipoPropiedad;

  @Column({ type: "text" })
  operacion!: Operacion;

  @Column({ type: "float" })
  precio!: number;

  @Column({ type: "text" })
  moneda!: Moneda;

  @Column({ length: 200 })
  direccion!: string;

  @Column({ length: 100 })
  zona!: string;

  @Column({ type: "float", nullable: true })
  superficieCubierta?: number;

  @Column({ type: "float" })
  superficieTotal!: number;

  @Column({ type: "int", nullable: true })
  ambientes?: number;

  @Column({ type: "int", nullable: true })
  dormitorios?: number;

  @Column({ type: "int", nullable: true })
  banios?: number;

  @Column({ type: "int", nullable: true })
  antiguedad?: number;

  @Column({ type: "text", default: EstadoPropiedad.BORRADOR })
  estado!: EstadoPropiedad;

  // Sin constraint de FK a nivel DB (createForeignKeyConstraints: false):
  // SQLite no soporta ALTER TABLE ADD CONSTRAINT, así que agregar una FK
  // real generaba una migración con recreate-table (crear tabla temporal,
  // copiar filas, dropear, renombrar) — ruido que no aporta a esta
  // práctica. TypeORM sigue resolviendo la relación en queries igual.
  //
  // Sin `name` explícito en @JoinColumn: lo resuelve el naming strategy
  // (SnakeNamingStrategy, ver db/data-source.ts) igual que la columna de
  // abajo — las dos terminan mapeando a la misma columna `inmobiliaria_id`.
  @ManyToOne(() => Inmobiliaria, { createForeignKeyConstraints: false })
  @JoinColumn()
  inmobiliaria!: Inmobiliaria;

  @Column()
  inmobiliariaId!: number;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
