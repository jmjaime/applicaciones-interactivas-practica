import { ArticleSQLPersistence, ArticleData } from "./article-persistence";
import { paso } from "../../utils/demo";

function tabla(articles: ArticleData[]) {
  console.table(
    articles.map((a) => ({
      id: a.id,
      titulo: a.titulo,
      tags: a.tags.join(", "),
    }))
  );
}

async function main() {
  const persistence = new ArticleSQLPersistence();

  try {
    await persistence.initialize();
    console.log("=== MAPEO EMBEBIDO SQL: LISTA SEPARADA POR COMAS ===");

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

    let allArticles: ArticleData[] = [];

    await paso("Crear artículos (tags: string[] → columna CSV 'tag1,tag2,...')", async () => {
      const articleIds = await persistence.createArticles(articlesData);
      console.log(`Creados con IDs: [${articleIds.join(", ")}]`);
    });

    await paso("Todos los artículos, tags reconstruidos como array", () => {
      allArticles = persistence.getAllArticles();
      tabla(allArticles);
    });

    await paso("Artículos con tag 'javascript' (LIKE sobre el CSV)", () => {
      tabla(persistence.getArticlesByTag("javascript"));
    });

    await paso("Artículos con tag 'web' O 'frontend'", () => {
      tabla(persistence.getArticlesByAnyTag(["web", "frontend"]));
    });

    await paso("Artículos con tags 'javascript' Y 'desarrollo'", () => {
      tabla(persistence.getArticlesByAllTags(["javascript", "desarrollo"]));
    });

    await paso("Búsqueda por contenido: 'aplicaciones'", () => {
      tabla(persistence.searchArticles("aplicaciones"));
    });

    await paso("Agregar y quitar un tag al artículo 1", () => {
      persistence.addTagToArticle(1, "tutorial");
      persistence.removeTagFromArticle(1, "programacion");
      const updated = persistence.getArticleById(1);
      if (updated) tabla([updated]);
    });

    await paso("Estadísticas de tags", () => {
      const tagStats = persistence.getTagStats();
      console.table(
        tagStats.map((s) => ({ tag: s.tag, count: s.count, articulos: s.articles.join(", ") }))
      );
    });

    await paso("Artículos similares al artículo 1 (comparten tags)", () => {
      tabla(persistence.getSimilarArticles(1, 3));
    });

    await paso("Cómo se guarda realmente en SQLite", () => {
      console.log("Columna 'tags' TEXT: 'tag1,tag2,tag3' (sin tabla aparte)");
      if (allArticles.length > 0) {
        console.log(
          `Ejemplo: "${allArticles[0].titulo}" → "${allArticles[0].tags.join(",")}"`
        );
      }
    });

    await paso("Trade-offs del mapeo CSV", () => {
      console.log("✅ Simple, compatible con cualquier SQL, búsqueda rápida con índice");
      console.log("⚠️ LIKE puede dar falsos positivos → filtrado extra en la app");
      console.log("⚠️ No sirve para consultas complejas sobre elementos individuales");
      console.log("⚠️ Se rompe si algún valor contiene comas");
    });
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await persistence.close();
  }
}

main();
