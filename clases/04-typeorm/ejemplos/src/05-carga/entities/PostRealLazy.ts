import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserRealLazy } from "./UserRealLazy";

@Entity()
export class PostRealLazy {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @ManyToOne(() => UserRealLazy, (user) => user.posts)
  user!: UserRealLazy;
}
