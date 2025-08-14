import { ArticleSQLPersistence, ArticleData } from "./article-persistence";

async function main() {
  const persistence = new ArticleSQLPersistence();

  try {
    await persistence.initialize();
    console.log("=== MAPEO EMBEBIDO SQL: LISTA SEPARADA POR COMAS ===\n");

    // Datos de ejemplo
    const articlesData: ArticleData[] = [
      {
        titulo: "Introducción a TypeScript",
        contenido:
          "TypeScript es un lenguaje de programación desarrollado por Microsoft que añade tipado estático opcional a JavaScript.",
        tags: ["typescript", "javascript", "programacion", "desarrollo"],
      },
      {
        titulo: "Bases de Datos NoSQL",
        contenido:
          "Las bases de datos NoSQL ofrecen flexibilidad y escalabilidad para aplicaciones modernas.",
        tags: ["nosql", "base-de-datos", "mongodb", "tecnologia"],
      },
      {
        titulo: "Desarrollo Web Moderno",
        contenido:
          "El desarrollo web ha evolucionado considerablemente con nuevas tecnologías y frameworks.",
        tags: ["web", "javascript", "desarrollo", "frontend"],
      },
      {
        titulo: "Arquitectura de Microservicios",
        contenido:
          "Los microservicios permiten construir aplicaciones más escalables y mantenibles.",
        tags: ["microservicios", "arquitectura", "desarrollo", "escalabilidad"],
      },
      {
        titulo: "Introducción a React",
        contenido:
          "React es una biblioteca de JavaScript para construir interfaces de usuario.",
        tags: ["react", "javascript", "frontend", "web"],
      },
    ];

    // Crear artículos
    console.log("📝 Creando artículos...");
    const articleIds = await persistence.createArticles(articlesData);
    console.log(
      `✅ ${articleIds.length} artículos creados con IDs: [${articleIds.join(
        ", "
      )}]\n`
    );

    // Obtener todos los artículos
    console.log("📚 Obteniendo todos los artículos:");
    const allArticles = persistence.getAllArticles();
    allArticles.forEach((article) => {
      console.log(`ID: ${article.id} | ${article.titulo}`);
      console.log(`   🏷️ Tags: [${article.tags.join(", ")}]`);
      console.log(
        `   📅 Fecha: ${article.fechaCreacion?.toLocaleDateString()}`
      );
    });

    // Buscar artículos por tag específico
    console.log("\n🔍 Artículos con tag 'javascript':");
    const articulosJavaScript = persistence.getArticlesByTag("javascript");
    articulosJavaScript.forEach((article) => {
      console.log(
        `   • ${article.titulo} - Tags: [${article.tags.join(", ")}]`
      );
    });

    // Buscar artículos que contengan cualquiera de los tags especificados
    console.log("\n🔍 Artículos con tags 'web' o 'frontend':");
    const articulosWebFrontend = persistence.getArticlesByAnyTag([
      "web",
      "frontend",
    ]);
    articulosWebFrontend.forEach((article) => {
      console.log(
        `   • ${article.titulo} - Tags: [${article.tags.join(", ")}]`
      );
    });

    // Buscar artículos que contengan todos los tags especificados
    console.log("\n🔍 Artículos con tags 'javascript' Y 'desarrollo':");
    const articulosJSDesarrollo = persistence.getArticlesByAllTags([
      "javascript",
      "desarrollo",
    ]);
    articulosJSDesarrollo.forEach((article) => {
      console.log(
        `   • ${article.titulo} - Tags: [${article.tags.join(", ")}]`
      );
    });

    // Buscar artículos por contenido
    console.log("\n🔍 Búsqueda por contenido 'aplicaciones':");
    const articulosAplicaciones = persistence.searchArticles("aplicaciones");
    articulosAplicaciones.forEach((article) => {
      console.log(`   • ${article.titulo}`);
    });

    // Obtener artículo específico
    console.log("\n👤 Obteniendo artículo con ID 1:");
    const article1 = persistence.getArticleById(1);
    if (article1) {
      console.log(
        `   ${article1.titulo} - Tags: [${article1.tags.join(", ")}]`
      );
    }

    // Manipulación de tags
    console.log("\n✏️ Agregando tag 'tutorial' al artículo con ID 1:");
    const tagAdded = persistence.addTagToArticle(1, "tutorial");
    if (tagAdded) {
      console.log("   ✅ Tag agregado exitosamente");
      const updatedArticle = persistence.getArticleById(1);
      if (updatedArticle) {
        console.log(`   Nuevos tags: [${updatedArticle.tags.join(", ")}]`);
      }
    }

    console.log("\n✏️ Removiendo tag 'programacion' del artículo con ID 1:");
    const tagRemoved = persistence.removeTagFromArticle(1, "programacion");
    if (tagRemoved) {
      console.log("   ✅ Tag removido exitosamente");
      const updatedArticle = persistence.getArticleById(1);
      if (updatedArticle) {
        console.log(
          `   Tags actualizados: [${updatedArticle.tags.join(", ")}]`
        );
      }
    }

    // Estadísticas de tags
    console.log("\n📊 Estadísticas de tags:");
    const tagStats = persistence.getTagStats();
    tagStats.forEach((stat) => {
      console.log(`   ${stat.tag}: ${stat.count} artículo(s)`);
      console.log(`     - Artículos: ${stat.articles.join(", ")}`);
    });

    // Artículos similares
    console.log("\n🔗 Artículos similares al artículo con ID 1:");
    const similarArticles = persistence.getSimilarArticles(1, 3);
    similarArticles.forEach((article) => {
      console.log(
        `   • ${article.titulo} - Tags: [${article.tags.join(", ")}]`
      );
    });

    console.log("\n=== DETALLES TÉCNICOS ===");
    console.log("🏗️ Estructura de la tabla SQL:");
    console.log("CREATE TABLE articulos (");
    console.log("    id INTEGER PRIMARY KEY AUTOINCREMENT,");
    console.log("    titulo TEXT NOT NULL,");
    console.log("    contenido TEXT NOT NULL,");
    console.log("    tags TEXT NOT NULL DEFAULT '',");
    console.log("    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP");
    console.log(");");

    console.log("\n📋 Características del mapeo:");
    console.log(
      "• Los arrays de tags se almacenan como strings separados por comas"
    );
    console.log("• Conversión automática entre array<string> y string CSV");
    console.log("• Búsquedas usando LIKE con wildcards");
    console.log("• Filtrado adicional en aplicación para matches exactos");
    console.log("• Transacciones para operaciones batch");

    console.log("\n🔍 Ventajas del mapeo CSV:");
    console.log("• Simplicidad de implementación");
    console.log("• Compatible con cualquier base de datos SQL");
    console.log("• Búsquedas rápidas con índices en la columna de tags");
    console.log("• Ideal para listas simples de valores");

    console.log("\n⚠️ Consideraciones:");
    console.log("• Las búsquedas por LIKE pueden dar falsos positivos");
    console.log("• Filtrado adicional requerido en aplicación");
    console.log("• No es adecuado para consultas complejas sobre elementos");
    console.log("• Problemas si los valores contienen comas");

    // Demostrar almacenamiento raw
    console.log("\n📦 Datos raw en la base de datos:");
    console.log(
      "   Los tags se almacenan como: 'tag1,tag2,tag3' en la columna 'tags'"
    );
    if (allArticles.length > 0) {
      console.log(
        `   Ejemplo: Artículo "${
          allArticles[0].titulo
        }" tiene tags almacenados como: "${allArticles[0].tags.join(",")}"`
      );
    }
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await persistence.close();
  }
}

main();
