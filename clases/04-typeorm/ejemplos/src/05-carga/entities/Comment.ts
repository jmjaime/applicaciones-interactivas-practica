import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Post } from "./Post";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  content!: string;

  @Column()
  authorName!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  // Relación Many-to-One con Post (LAZY por defecto)
  @ManyToOne(() => Post, (post) => post.comments)
  post!: Post;

  // Método para mostrar información del comentario
  displayInfo(): string {
    return `${this.authorName}: "${this.content.substring(0, 50)}..."`;
  }
}
