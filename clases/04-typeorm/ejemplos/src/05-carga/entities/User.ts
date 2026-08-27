import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  // Por defecto es LAZY LOADING
  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];

  // Método para mostrar información del usuario
  displayInfo(): string {
    return `${this.name} (${this.email})`;
  }
}
