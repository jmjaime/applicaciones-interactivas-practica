import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import { Comment } from "./entities/Comment";
import { UserEager } from "./entities/UserEager";
import { PostEager } from "./entities/PostEager";
import { CommentEager } from "./entities/CommentEager";

// DataSource específico para este ejemplo
const AppDataSource = new DataSource({
  type: "sqlite",
  database: "lazy-eager-example.sqlite",
  synchronize: true,
  logging: true,
  entities: [User, Post, Comment, UserEager, PostEager, CommentEager],
});

// Clase para contar queries SQL
class QueryCounter {
  private count = 0;
  private queries: string[] = [];

  reset() {
    this.count = 0;
    this.queries = [];
  }

  increment(query: string) {
    this.count++;
    this.queries.push(query);
  }

  getCount(): number {
    return this.count;
  }

  getQueries(): string[] {
    return this.queries;
  }

  showSummary(title: string) {
    console.log(`\n📊 ${title}`);
    console.log(`🔍 Total queries ejecutadas: ${this.count}`);
    console.log("📝 Queries SQL:");
    this.queries.forEach((query, index) => {
      console.log(`   ${index + 1}. ${query.replace(/\s+/g, " ").trim()}`);
    });
  }
}

const queryCounter = new QueryCounter();

// Configurar intercepción de queries
function setupQueryInterception() {
  // Interceptar queries usando logger personalizado
  const originalQuery = AppDataSource.driver.escapeQueryWithParameters;

  AppDataSource.driver.escapeQueryWithParameters = function (
    sql: string,
    parameters: any[],
    nativeParameters: any
  ) {
    const result = originalQuery.call(this, sql, parameters, nativeParameters);

    // Filtrar queries de sistema/setup
    if (
      !sql.includes("sqlite_master") &&
      !sql.includes("PRAGMA") &&
      !sql.includes("CREATE TABLE")
    ) {
      queryCounter.increment(sql);
    }

    return result;
  };
}

async function createSampleData() {
  console.log("📝 Creando datos de ejemplo...\n");

  // Crear usuarios LAZY
  const userRepo = AppDataSource.getRepository(User);
  const postRepo = AppDataSource.getRepository(Post);
  const commentRepo = AppDataSource.getRepository(Comment);

  // Crear usuarios EAGER
  const userEagerRepo = AppDataSource.getRepository(UserEager);
  const postEagerRepo = AppDataSource.getRepository(PostEager);
  const commentEagerRepo = AppDataSource.getRepository(CommentEager);

  // Limpiar datos previos
  await commentRepo.clear();
  await postRepo.clear();
  await userRepo.clear();
  await commentEagerRepo.clear();
  await postEagerRepo.clear();
  await userEagerRepo.clear();

  // Crear usuarios LAZY
  const users = await userRepo.save([
    { name: "Ana García", email: "ana@email.com" },
    { name: "Carlos López", email: "carlos@email.com" },
    { name: "María Rodríguez", email: "maria@email.com" },
  ]);

  // Crear posts LAZY
  const posts = await postRepo.save([
    {
      title: "Mi primer post",
      content: "Contenido del primer post",
      user: users[0],
    },
    {
      title: "Consejos de programación",
      content: "Algunos consejos útiles",
      user: users[0],
    },
    {
      title: "Experiencias viajando",
      content: "Mis aventuras por el mundo",
      user: users[1],
    },
    {
      title: "Recetas saludables",
      content: "Comida nutritiva y deliciosa",
      user: users[1],
    },
    {
      title: "Reflexiones personales",
      content: "Pensamientos sobre la vida",
      user: users[2],
    },
  ]);

  // Crear comentarios LAZY
  const comments = [];
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    for (let j = 0; j < 3; j++) {
      comments.push({
        content: `Comentario ${j + 1} para el post "${
          post.title
        }". Gran contenido!`,
        authorName: `Usuario${j + 1}`,
        post: post,
      });
    }
  }
  await commentRepo.save(comments);

  // Crear usuarios EAGER (mismos datos)
  const usersEager = await userEagerRepo.save([
    { name: "Ana García", email: "ana@email.com" },
    { name: "Carlos López", email: "carlos@email.com" },
    { name: "María Rodríguez", email: "maria@email.com" },
  ]);

  // Crear posts EAGER
  const postsEager = await postEagerRepo.save([
    {
      title: "Mi primer post",
      content: "Contenido del primer post",
      user: usersEager[0],
    },
    {
      title: "Consejos de programación",
      content: "Algunos consejos útiles",
      user: usersEager[0],
    },
    {
      title: "Experiencias viajando",
      content: "Mis aventuras por el mundo",
      user: usersEager[1],
    },
    {
      title: "Recetas saludables",
      content: "Comida nutritiva y deliciosa",
      user: usersEager[1],
    },
    {
      title: "Reflexiones personales",
      content: "Pensamientos sobre la vida",
      user: usersEager[2],
    },
  ]);

  // Crear comentarios EAGER
  const commentsEager = [];
  for (let i = 0; i < postsEager.length; i++) {
    const post = postsEager[i];
    for (let j = 0; j < 3; j++) {
      commentsEager.push({
        content: `Comentario ${j + 1} para el post "${
          post.title
        }". Gran contenido!`,
        authorName: `Usuario${j + 1}`,
        post: post,
      });
    }
  }
  await commentEagerRepo.save(commentsEager);

  console.log("✅ Datos de ejemplo creados exitosamente!");
}

async function demonstrateLazyLoading() {
  console.log("\n" + "=".repeat(60));
  console.log("🐌 LAZY LOADING DEMO");
  console.log("=".repeat(60));

  queryCounter.reset();

  const userRepo = AppDataSource.getRepository(User);

  console.log("1️⃣ Obteniendo usuarios (sin relaciones)...");
  const users = await userRepo.find();

  console.log(`   ✅ ${users.length} usuarios encontrados`);
  users.forEach((user) => {
    console.log(`   👤 ${user.displayInfo()}`);
  });

  queryCounter.showSummary("Fase 1: Obtener usuarios");

  console.log("\n2️⃣ Accediendo a los posts de cada usuario...");
  console.log("   ⚠️  PROBLEMA N+1: Se ejecutará 1 query por usuario");

  for (const user of users) {
    console.log(`\n   🔍 Cargando posts de ${user.name}...`);

    // Acceder a posts (esto dispara queries adicionales)
    const posts = await AppDataSource.getRepository(Post).find({
      where: { user: { id: user.id } },
    });

    console.log(`   📝 ${posts.length} posts encontrados:`);
    posts.forEach((post) => {
      console.log(`      • ${post.displayInfo()}`);
    });
  }

  queryCounter.showSummary("Fase 2: Problema N+1 con Lazy Loading");

  console.log("\n3️⃣ Solución con relations (carga manual)...");
  queryCounter.reset();

  const usersWithPosts = await userRepo.find({
    relations: ["posts"],
  });

  console.log(`   ✅ ${usersWithPosts.length} usuarios con posts cargados`);
  usersWithPosts.forEach((user) => {
    console.log(`   👤 ${user.displayInfo()}`);
    console.log(`   📝 ${user.posts.length} posts:`);
    user.posts.forEach((post) => {
      console.log(`      • ${post.displayInfo()}`);
    });
  });

  queryCounter.showSummary("Fase 3: Solución con relations");
}

async function demonstrateEagerLoading() {
  console.log("\n" + "=".repeat(60));
  console.log("🏃 EAGER LOADING DEMO");
  console.log("=".repeat(60));

  queryCounter.reset();

  const userEagerRepo = AppDataSource.getRepository(UserEager);

  console.log("1️⃣ Obteniendo usuarios (con eager loading)...");
  const users = await userEagerRepo.find();

  console.log(
    `   ✅ ${users.length} usuarios encontrados CON sus posts y comentarios`
  );
  users.forEach((user) => {
    console.log(`   👤 ${user.displayInfo()}`);
    user.posts.forEach((post) => {
      console.log(`      📝 ${post.displayInfo()}`);
      post.comments.forEach((comment) => {
        console.log(`         💬 ${comment.displayInfo()}`);
      });
    });
  });

  queryCounter.showSummary("Eager Loading: Todo en una sola operación");
}

async function comparePerformance() {
  console.log("\n" + "=".repeat(60));
  console.log("⚡ COMPARACIÓN DE PERFORMANCE");
  console.log("=".repeat(60));

  // Test Lazy Loading
  console.log("🐌 Midiendo Lazy Loading...");
  queryCounter.reset();
  const startLazy = Date.now();

  const userRepo = AppDataSource.getRepository(User);
  const users = await userRepo.find();

  for (const user of users) {
    const posts = await AppDataSource.getRepository(Post).find({
      where: { user: { id: user.id } },
      relations: ["comments"],
    });
  }

  const endLazy = Date.now();
  const lazyTime = endLazy - startLazy;
  const lazyQueries = queryCounter.getCount();

  // Test Eager Loading
  console.log("\n🏃 Midiendo Eager Loading...");
  queryCounter.reset();
  const startEager = Date.now();

  const userEagerRepo = AppDataSource.getRepository(UserEager);
  const usersEager = await userEagerRepo.find();

  const endEager = Date.now();
  const eagerTime = endEager - startEager;
  const eagerQueries = queryCounter.getCount();

  // Mostrar comparación
  console.log("\n📊 RESULTADOS:");
  console.log("┌─────────────────────┬──────────────┬─────────────────┐");
  console.log("│ Estrategia          │ Queries      │ Tiempo (ms)     │");
  console.log("├─────────────────────┼──────────────┼─────────────────┤");
  console.log(
    `│ Lazy Loading        │ ${lazyQueries.toString().padEnd(12)} │ ${lazyTime
      .toString()
      .padEnd(15)} │`
  );
  console.log(
    `│ Eager Loading       │ ${eagerQueries.toString().padEnd(12)} │ ${eagerTime
      .toString()
      .padEnd(15)} │`
  );
  console.log("└─────────────────────┴──────────────┴─────────────────┘");

  console.log("\n🎯 CONCLUSIONES:");
  console.log(`• Lazy Loading: ${lazyQueries} queries, ${lazyTime}ms`);
  console.log(`• Eager Loading: ${eagerQueries} queries, ${eagerTime}ms`);
  console.log(
    `• Diferencia: ${Math.abs(
      lazyQueries - eagerQueries
    )} queries menos con eager loading`
  );

  if (lazyTime > eagerTime) {
    console.log(
      `• Eager loading fue ${Math.round(
        ((lazyTime - eagerTime) / lazyTime) * 100
      )}% más rápido`
    );
  } else {
    console.log(
      `• Lazy loading fue ${Math.round(
        ((eagerTime - lazyTime) / eagerTime) * 100
      )}% más rápido`
    );
  }
}

async function showBestPractices() {
  console.log("\n" + "=".repeat(60));
  console.log("💡 MEJORES PRÁCTICAS");
  console.log("=".repeat(60));

  console.log("✅ CUÁNDO USAR LAZY LOADING:");
  console.log("   • Cuando no siempre necesitas las relaciones");
  console.log("   • Para entidades con muchas relaciones opcionales");
  console.log("   • Cuando quieres control granular sobre las consultas");

  console.log("\n✅ CUÁNDO USAR EAGER LOADING:");
  console.log("   • Cuando SIEMPRE necesitas las relaciones");
  console.log("   • Para relaciones pequeñas y críticas");
  console.log("   • Cuando quieres evitar el problema N+1");

  console.log("\n⚠️ CUIDADO CON:");
  console.log("   • Eager loading puede cargar datos innecesarios");
  console.log("   • Lazy loading puede causar problema N+1");
  console.log("   • Usa 'relations' en find() para control específico");

  console.log("\n🔧 ALTERNATIVAS:");
  console.log("   • QueryBuilder para consultas optimizadas");
  console.log("   • Lazy loading con carga manual selectiva");
  console.log("   • Combinación de ambas estrategias según el caso");
}

async function main() {
  try {
    console.log("🚀 Iniciando demostración de Lazy vs Eager Loading\n");

    // Inicializar base de datos
    await AppDataSource.initialize();
    console.log("✅ Conexión a base de datos establecida");

    // Configurar intercepción de queries
    setupQueryInterception();

    // Sincronizar esquemas
    await AppDataSource.synchronize();

    // Crear datos de ejemplo
    await createSampleData();

    // Demostraciones
    await demonstrateLazyLoading();
    await demonstrateEagerLoading();
    await comparePerformance();
    await showBestPractices();

    console.log("\n🎉 Demostración completada exitosamente!");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

main();
