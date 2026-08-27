import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { UserEager } from "./UserEager";
import { CommentEager } from "./CommentEager";

@Entity()
export class PostEager {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text")
  content!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  // Relación Many-to-One con User (LAZY por defecto)
  @ManyToOne(() => UserEager, (user) => user.posts)
  user!: UserEager;

  // EAGER LOADING - Los comentarios se cargan automáticamente
  @OneToMany(() => CommentEager, (comment) => comment.post, { eager: true })
  comments!: CommentEager[];

  // Método para mostrar información del post
  displayInfo(): string {
    return `"${this.title}" (${
      this.comments?.length || 0
    } comentarios cargados)`;
  }
}
