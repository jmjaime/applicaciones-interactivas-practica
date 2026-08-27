import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserRealLazy } from "./entities/UserRealLazy";
import { PostRealLazy } from "./entities/PostRealLazy";

// Relaciones lazy reales de TypeORM: la propiedad se tipa como
// Promise<Entity[]> y TypeORM la resuelve recién al hacer `await` sobre
// ella — no hace falta pedirla con `relations` ni marcarla `eager`. No se
// usa en el resto de la materia; este ejemplo es solo para conocer que
// existe.
const AppDataSource = new DataSource({
  type: "sqljs",
  autoSave: false,
  location: "lazy-relations-example.sqlite",
  synchronize: true,
  logging: false,
  entities: [UserRealLazy, PostRealLazy],
});

async function main() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(UserRealLazy);
  const postRepo = AppDataSource.getRepository(PostRealLazy);

  const user = await userRepo.save(userRepo.create({ name: "Ana" }));
  await postRepo.save([
    postRepo.create({ title: "Primer post", user }),
    postRepo.create({ title: "Segundo post", user }),
  ]);

  const found = await userRepo.findOne({ where: { id: user.id } });
  if (!found) throw new Error("no se encontró el usuario recién creado");

  console.log("found.posts es una Promise:", found.posts instanceof Promise);

  const posts = await found.posts; // acá se dispara el SELECT, recién ahora
  console.log(`Se resolvió al hacer await: ${posts.length} posts`);
  posts.forEach((p) => console.log(`  • ${p.title}`));

  await AppDataSource.destroy();
}

main().catch(console.error);
