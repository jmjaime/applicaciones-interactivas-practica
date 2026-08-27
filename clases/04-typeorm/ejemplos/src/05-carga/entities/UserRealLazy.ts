import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PostRealLazy } from "./PostRealLazy";

// Relación lazy REAL de TypeORM: la propiedad se tipa como
// Promise<Entity[]>, no como Entity[]. A diferencia de `User.posts`
// (User.ts, comentado como "LAZY" pero en realidad solo no eager por
// defecto), esta sí usa el mecanismo de Lazy relations de TypeORM: la
// consulta se dispara recién al hacer `await` sobre la propiedad.
@Entity()
export class UserRealLazy {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => PostRealLazy, (post) => post.user)
  posts!: Promise<PostRealLazy[]>;
}
