import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 60 })
  country!: string;

  @Column({ type: "int" })
  debutYear!: number;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
