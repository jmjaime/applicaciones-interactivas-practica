import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text")
  content!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  // Relación Many-to-One con User (LAZY por defecto)
  @ManyToOne(() => User, (user) => user.posts)
  user!: User;

  // Relación One-to-Many con Comments (LAZY por defecto)
  @OneToMany(() => Comment, (comment) => comment.post)
  comments!: Comment[];

  // Método para mostrar información del post
  displayInfo(): string {
    return `"${this.title}" (${this.comments?.length || 0} comentarios)`;
  }
}
