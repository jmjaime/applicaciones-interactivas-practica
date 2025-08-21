import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { PostEager } from "./PostEager";

@Entity()
export class CommentEager {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  content!: string;

  @Column()
  authorName!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  // Relación Many-to-One con PostEager (LAZY por defecto)
  @ManyToOne(() => PostEager, (post) => post.comments)
  post!: PostEager;

  // Método para mostrar información del comentario
  displayInfo(): string {
    return `${this.authorName}: "${this.content.substring(0, 50)}..."`;
  }
}
