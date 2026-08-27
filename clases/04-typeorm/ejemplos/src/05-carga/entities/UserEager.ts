import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PostEager } from "./PostEager";

@Entity()
export class UserEager {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  // EAGER LOADING - Los posts se cargan automáticamente
  @OneToMany(() => PostEager, (post) => post.user, { eager: true })
  posts!: PostEager[];

  // Método para mostrar información del usuario
  displayInfo(): string {
    return `${this.name} (${this.email}) - ${this.posts?.length || 0} posts`;
  }
}
