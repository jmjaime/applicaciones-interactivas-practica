import "reflect-metadata";
import { createDataSource } from "../common/data-source";
import { User, UserRole, UserStatus } from "./entities/User";
import { Post, PostStatus } from "./entities/Post";
import { Comment, CommentStatus } from "./entities/Comment";
import { Category } from "./entities/Category";
import { Tag } from "./entities/Tag";

async function runQueryBuilderExample() {
  console.log("🔍 Iniciando ejemplo de Query Builder...\n");

  // Crear DataSource específico para este ejemplo
  const dataSource = createDataSource("query-builder-example.sqlite", [
    User,
    Post,
    Comment,
    Category,
    Tag,
  ]);

  try {
    // Inicializar DataSource
    await dataSource.initialize();
    console.log("✅ Conexión a la base de datos establecida\n");

    // Limpiar datos existentes
    await dataSource.query("DELETE FROM post_tags");
    await dataSource.query("DELETE FROM comments");
    await dataSource.query("DELETE FROM posts");
    await dataSource.query("DELETE FROM users");
    await dataSource.query("DELETE FROM categories");
    await dataSource.query("DELETE FROM tags");

    // === CREAR DATOS DE EJEMPLO ===
    console.log("📝 Creando datos de ejemplo...");
    await createSampleData(dataSource);
    console.log("✅ Datos de ejemplo creados\n");

    // === EJEMPLO 1: QUERY BUILDER BÁSICO ===
    console.log("🔍 EJEMPLO 1: Query Builder Básico");
    console.log("=".repeat(50));

    // Consulta simple con select, where, orderBy
    const activeUsers = await dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .select([
        "user.id",
        "user.firstName",
        "user.lastName",
        "user.email",
        "user.role",
      ])
      .where("user.isActive = :isActive", { isActive: true })
      .andWhere("user.status = :status", { status: UserStatus.ACTIVE })
      .orderBy("user.firstName", "ASC")
      .addOrderBy("user.lastName", "ASC")
      .getMany();

    console.log(`👥 Usuarios activos encontrados: ${activeUsers.length}`);
    activeUsers.forEach((user) => {
      console.log(
        `  • ${user.getFullName()} (${user.email}) - ${user.getRoleDisplay()}`
      );
    });

    // Consulta con LIMIT y OFFSET
    const recentUsers = await dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .select(["user.id", "user.firstName", "user.lastName", "user.createdAt"])
      .orderBy("user.createdAt", "DESC")
      .limit(3)
      .offset(0)
      .getMany();

    console.log(`\n📅 Últimos 3 usuarios registrados:`);
    recentUsers.forEach((user) => {
      console.log(
        `  • ${user.getFullName()} - ${user.createdAt.toLocaleDateString()}`
      );
    });

    // === EJEMPLO 2: JOINS ===
    console.log("\n🔗 EJEMPLO 2: Joins con Query Builder");
    console.log("=".repeat(50));

    // LEFT JOIN - Usuarios con conteo de categorías
    const usersWithCategories = await dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.category", "category")
      .orderBy("user.postCount", "DESC")
      .limit(5)
      .getMany();

    console.log("👥 Usuarios con categorías (LEFT JOIN):");
    usersWithCategories.forEach((user) => {
      console.log(`  • ${user.getFullName()} - ${user.postCount} posts`);
      console.log(
        `    📁 ${
          user.category?.name || "Sin categoría"
        } - ${user.getActivityLevel()}`
      );
      console.log(`    📍 ${user.getLocation()}`);
    });

    // === EJEMPLO 3: AGREGACIONES ===
    console.log("\n📊 EJEMPLO 3: Agregaciones");
    console.log("=".repeat(50));

    // Estadísticas por categoría
    const categoryStats = await dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .leftJoin("user.category", "category")
      .select([
        "category.name as categoryName",
        "COUNT(user.id) as userCount",
        "AVG(user.postCount) as avgPosts",
        "SUM(user.postCount) as totalPosts",
        "MAX(user.balance) as maxBalance",
      ])
      .groupBy("category.id")
      .having("COUNT(user.id) > :minUsers", { minUsers: 0 })
      .orderBy("userCount", "DESC")
      .getRawMany();

    console.log("📈 Estadísticas por categoría:");
    categoryStats.forEach((stat: any) => {
      console.log(`  📁 ${stat.categoryName || "Sin categoría"}:`);
      console.log(`    👥 ${stat.userCount} usuarios`);
      console.log(`    📝 ${Math.round(stat.avgPosts)} posts promedio`);
      console.log(`    📊 ${stat.totalPosts} posts totales`);
      console.log(
        `    💰 Balance máximo: $${parseFloat(stat.maxBalance).toFixed(2)}`
      );
    });

    // === EJEMPLO 4: SUBQUERIES ===
    console.log("\n🔍 EJEMPLO 4: Subqueries");
    console.log("=".repeat(50));

    // Usuarios con más posts que el promedio
    const usersAboveAverage = await dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select("AVG(u.postCount)")
          .from(User, "u")
          .getQuery();
        return "user.postCount > (" + subQuery + ")";
      })
      .orderBy("user.postCount", "DESC")
      .getMany();

    console.log("🌟 Usuarios con más posts que el promedio:");
    usersAboveAverage.forEach((user) => {
      console.log(
        `  • ${user.getFullName()} - ${
          user.postCount
        } posts (${user.getActivityLevel()})`
      );
    });

    // === EJEMPLO 5: CONSULTAS COMPLEJAS ===
    console.log("\n🔧 EJEMPLO 5: Consultas Complejas");
    console.log("=".repeat(50));

    // Búsqueda avanzada con múltiples condiciones
    const complexSearch = await dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.category", "category")
      .where("user.isActive = :isActive", { isActive: true })
      .andWhere(
        "(" +
          "LOWER(user.firstName) LIKE LOWER(:searchTerm) OR " +
          "LOWER(user.lastName) LIKE LOWER(:searchTerm) OR " +
          "LOWER(user.city) LIKE LOWER(:searchTerm)" +
          ")",
        { searchTerm: "%a%" }
      )
      .andWhere("user.postCount >= :minPosts", { minPosts: 8 })
      .andWhere("user.balance >= :minBalance", { minBalance: 80.0 })
      .orderBy("user.postCount", "DESC")
      .addOrderBy("user.balance", "DESC")
      .limit(10)
      .getMany();

    console.log(
      `🔍 Búsqueda compleja encontró: ${complexSearch.length} usuarios`
    );
    complexSearch.forEach((user) => {
      console.log(`  • ${user.getFullName()}`);
      console.log(
        `    📝 ${user.postCount} posts - ${user.getFormattedBalance()}`
      );
      console.log(`    📁 ${user.category?.name || "Sin categoría"}`);
      console.log(`    📍 ${user.getLocation()}`);
    });

    // === EJEMPLO 6: PAGINACIÓN AVANZADA ===
    console.log("\n📄 EJEMPLO 6: Paginación Avanzada");
    console.log("=".repeat(50));

    const pageSize = 2;
    const pageNumber = 1;

    // Obtener total de registros
    const totalActiveUsers = await dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.isActive = :isActive", { isActive: true })
      .getCount();

    // Obtener página específica
    const paginatedUsers = await dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.category", "category")
      .where("user.isActive = :isActive", { isActive: true })
      .orderBy("user.postCount", "DESC")
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .getMany();

    const totalPages = Math.ceil(totalActiveUsers / pageSize);

    console.log(
      `📖 Página ${pageNumber} de ${totalPages} (${totalActiveUsers} usuarios totales):`
    );
    paginatedUsers.forEach((user, index) => {
      const position = (pageNumber - 1) * pageSize + index + 1;
      console.log(`  ${position}. ${user.getFullName()}`);
      console.log(
        `     📝 ${user.postCount} posts - ${user.getActivityLevel()}`
      );
      console.log(`     📁 ${user.category?.name || "Sin categoría"}`);
    });

    // === EJEMPLO 7: CONSULTAS DINÁMICAS ===
    console.log("\n🔧 EJEMPLO 7: Consultas Dinámicas");
    console.log("=".repeat(50));

    // Función de búsqueda flexible
    async function searchUsers(filters: {
      name?: string;
      role?: UserRole;
      minPosts?: number;
      minBalance?: number;
      city?: string;
      isActive?: boolean;
    }) {
      let query = dataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.category", "category");

      if (filters.name) {
        query = query.andWhere(
          "(LOWER(user.firstName) LIKE LOWER(:name) OR LOWER(user.lastName) LIKE LOWER(:name))",
          { name: `%${filters.name}%` }
        );
      }

      if (filters.role) {
        query = query.andWhere("user.role = :role", { role: filters.role });
      }

      if (filters.minPosts !== undefined) {
        query = query.andWhere("user.postCount >= :minPosts", {
          minPosts: filters.minPosts,
        });
      }

      if (filters.minBalance !== undefined) {
        query = query.andWhere("user.balance >= :minBalance", {
          minBalance: filters.minBalance,
        });
      }

      if (filters.city) {
        query = query.andWhere("LOWER(user.city) LIKE LOWER(:city)", {
          city: `%${filters.city}%`,
        });
      }

      if (filters.isActive !== undefined) {
        query = query.andWhere("user.isActive = :isActive", {
          isActive: filters.isActive,
        });
      }

      return query.orderBy("user.postCount", "DESC").limit(5).getMany();
    }

    // Ejemplo de búsqueda dinámica - Autores activos
    const activeAuthors = await searchUsers({
      role: UserRole.AUTHOR,
      isActive: true,
      minPosts: 5,
    });

    console.log(
      `🔍 Búsqueda dinámica - Autores activos: ${activeAuthors.length}`
    );
    activeAuthors.forEach((user) => {
      console.log(`  • ${user.getFullName()} - ${user.postCount} posts`);
      console.log(
        `    ${user.getRoleDisplay()} - ${user.getFormattedBalance()}`
      );
    });

    // === EJEMPLO 8: CONSULTA RAW ===
    console.log("\n💻 EJEMPLO 8: Consulta Raw");
    console.log("=".repeat(50));

    // Consulta SQL raw para casos muy específicos
    const rawResults = await dataSource.query(`
      SELECT 
        u.firstName || ' ' || u.lastName as fullName,
        u.postCount,
        u.commentCount,
        u.balance,
        c.name as categoryName,
        CASE 
          WHEN u.postCount >= 12 THEN 'Muy Activo'
          WHEN u.postCount >= 8 THEN 'Activo'
          WHEN u.postCount >= 3 THEN 'Moderado'
          ELSE 'Nuevo'
        END as activityLevel
      FROM users u 
      LEFT JOIN categories c ON u.categoryId = c.id
      WHERE u.isActive = 1 
      ORDER BY u.postCount DESC, u.commentCount DESC
      LIMIT 3
    `);

    console.log("💻 Consulta Raw - Top usuarios por actividad:");
    rawResults.forEach((result: any, index: number) => {
      console.log(`  ${index + 1}. ${result.fullName}`);
      console.log(
        `     📝 ${result.postCount} posts - 💬 ${result.commentCount} comentarios`
      );
      console.log(`     📁 ${result.categoryName || "Sin categoría"}`);
      console.log(
        `     💰 $${parseFloat(result.balance).toFixed(2)} - 📊 ${
          result.activityLevel
        }`
      );
    });

    // === EJEMPLO 9: OPERACIONES CON FECHAS ===
    console.log("\n📅 EJEMPLO 9: Operaciones con Fechas");
    console.log("=".repeat(50));

    // Usuarios con actividad reciente
    const recentActiveUsers = await dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.lastLoginDate >= date('now', '-7 days')")
      .andWhere("user.isActive = :isActive", { isActive: true })
      .orderBy("user.lastLoginDate", "DESC")
      .getMany();

    console.log("🕐 Usuarios con actividad en los últimos 7 días:");
    recentActiveUsers.forEach((user) => {
      const lastLogin = user.lastLoginDate
        ? new Date(user.lastLoginDate)
        : null;
      const daysAgo = lastLogin
        ? Math.floor((Date.now() - lastLogin.getTime()) / (1000 * 60 * 60 * 24))
        : null;
      console.log(`  • ${user.getFullName()}`);
      console.log(
        `    🕐 Último login: ${
          daysAgo !== null ? `hace ${daysAgo} días` : "nunca"
        }`
      );
      console.log(
        `    📊 ${user.hasRecentActivity() ? "✅ Activo" : "💤 Inactivo"}`
      );
    });

    // === EJEMPLO 10: CASE WHEN ===
    console.log("\n🔄 EJEMPLO 10: Expresiones CASE WHEN");
    console.log("=".repeat(50));

    const userLevels = await dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .select([
        "user.firstName",
        "user.lastName",
        "user.postCount",
        "user.balance",
        `CASE 
           WHEN user.postCount >= 12 THEN 'Elite'
           WHEN user.postCount >= 8 THEN 'Avanzado'
           WHEN user.postCount >= 3 THEN 'Intermedio'
           ELSE 'Principiante'
         END as userLevel`,
        `CASE 
           WHEN user.balance >= 150 THEN 'Premium'
           WHEN user.balance >= 100 THEN 'Gold'
           WHEN user.balance >= 50 THEN 'Silver'
           ELSE 'Basic'
         END as membershipTier`,
      ])
      .orderBy("user.postCount", "DESC")
      .getRawMany();

    console.log("🏆 Niveles de usuario basados en actividad y balance:");
    userLevels.forEach((user: any) => {
      console.log(`  • ${user.user_firstName} ${user.user_lastName}`);
      console.log(
        `    📊 Nivel: ${user.userLevel} (${user.user_postCount} posts)`
      );
      console.log(
        `    💎 Membresía: ${user.membershipTier} ($${parseFloat(
          user.user_balance
        ).toFixed(2)})`
      );
    });

    console.log("\n✅ Ejemplo de Query Builder completado exitosamente!");
  } catch (error) {
    console.error("❌ Error ejecutando el ejemplo:", error);
  } finally {
    // Cerrar conexión
    await dataSource.destroy();
    console.log("🔐 Conexión cerrada");
  }
}

async function createSampleData(dataSource: any) {
  // Crear categorías
  const categories = [
    {
      name: "Tecnología",
      slug: "tecnologia",
      description: "Artículos sobre tecnología",
      color: "#3B82F6",
      icon: "💻",
    },
    {
      name: "Programación",
      slug: "programacion",
      description: "Tutoriales de programación",
      color: "#10B981",
      icon: "👨‍💻",
    },
    {
      name: "Diseño",
      slug: "diseno",
      description: "Diseño web y UX/UI",
      color: "#8B5CF6",
      icon: "🎨",
    },
    {
      name: "Negocios",
      slug: "negocios",
      description: "Estrategias de negocio",
      color: "#F59E0B",
      icon: "💼",
    },
  ];

  const savedCategories = await dataSource
    .getRepository(Category)
    .save(categories);

  // Crear usuarios
  const users = [
    {
      firstName: "Ana",
      lastName: "García",
      email: "ana@ejemplo.com",
      username: "ana_garcia",
      age: 28,
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      balance: 150.5,
      postCount: 15,
      commentCount: 45,
      city: "Buenos Aires",
      country: "Argentina",
      lastLoginDate: new Date(),
      categoryId: savedCategories[0].id,
    },
    {
      firstName: "Carlos",
      lastName: "López",
      email: "carlos@ejemplo.com",
      username: "carlos_lopez",
      age: 35,
      role: UserRole.AUTHOR,
      status: UserStatus.ACTIVE,
      balance: 89.25,
      postCount: 8,
      commentCount: 23,
      city: "Madrid",
      country: "España",
      lastLoginDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      categoryId: savedCategories[1].id,
    },
    {
      firstName: "María",
      lastName: "Rodríguez",
      email: "maria@ejemplo.com",
      username: "maria_rodriguez",
      age: 32,
      role: UserRole.EDITOR,
      status: UserStatus.ACTIVE,
      balance: 200.0,
      postCount: 12,
      commentCount: 67,
      city: "México DF",
      country: "México",
      lastLoginDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      categoryId: savedCategories[2].id,
    },
    {
      firstName: "Juan",
      lastName: "Martínez",
      email: "juan@ejemplo.com",
      username: "juan_martinez",
      age: 26,
      role: UserRole.SUBSCRIBER,
      status: UserStatus.ACTIVE,
      balance: 45.75,
      postCount: 3,
      commentCount: 12,
      city: "Lima",
      country: "Perú",
      lastLoginDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      categoryId: savedCategories[3].id,
    },
    {
      firstName: "Laura",
      lastName: "Sánchez",
      email: "laura@ejemplo.com",
      username: "laura_sanchez",
      age: 29,
      role: UserRole.AUTHOR,
      status: UserStatus.ACTIVE,
      balance: 120.3,
      postCount: 10,
      commentCount: 34,
      city: "Bogotá",
      country: "Colombia",
      lastLoginDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      categoryId: savedCategories[0].id,
    },
  ];

  await dataSource.getRepository(User).save(users);
}

// Ejecutar el ejemplo
runQueryBuilderExample().catch(console.error);
