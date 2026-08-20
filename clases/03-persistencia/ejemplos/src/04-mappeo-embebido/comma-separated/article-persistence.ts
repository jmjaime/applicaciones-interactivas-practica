import Database from "better-sqlite3";

export interface ArticleData {
  id?: number;
  titulo: string;
  contenido: string;
  tags: string[];
  fechaCreacion?: Date;
}

export interface ArticleWithCommaTags {
  id: number;
  titulo: string;
  contenido: string;
  tags: string; // Stored as comma-separated string
  fecha_creacion: string;
}

export class ArticleSQLPersistence {
  private db: Database.Database;

  constructor(dbPath: string = "comma-separated-sql.sqlite") {
    this.db = new Database(dbPath);
    this.db.pragma("foreign_keys = ON");
  }

  async initialize(): Promise<void> {
    console.log(
      "🔧 Inicializando cliente SQL para lista separada por comas..."
    );
    await this.createDatabaseStructure();
    console.log("✅ Cliente SQL inicializado correctamente");
  }

  private async createDatabaseStructure(): Promise<void> {
    console.log("🏗️ Creando estructura de base de datos...");

    // Limpiar tabla existente
    this.db.exec(`DROP TABLE IF EXISTS articulos`);

    // Crear tabla articulos con tags como string separado por comas
    this.db.exec(`
            CREATE TABLE articulos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT NOT NULL,
                contenido TEXT NOT NULL,
                tags TEXT NOT NULL DEFAULT '',
                fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

    // Crear índices para búsquedas
    this.db.exec(`
            CREATE INDEX idx_articulos_titulo ON articulos(titulo);
            CREATE INDEX idx_articulos_tags ON articulos(tags);
            CREATE INDEX idx_articulos_fecha ON articulos(fecha_creacion);
        `);

    console.log("✅ Estructura de base de datos creada");
  }

  async createArticle(articleData: ArticleData): Promise<number> {
    const stmt = this.db.prepare(`
            INSERT INTO articulos (titulo, contenido, tags)
            VALUES (?, ?, ?)
        `);

    const tagsString = this.tagsToString(articleData.tags);
    const result = stmt.run(
      articleData.titulo,
      articleData.contenido,
      tagsString
    );

    return result.lastInsertRowid as number;
  }

  async createArticles(articlesData: ArticleData[]): Promise<number[]> {
    const articleIds: number[] = [];

    const transaction = this.db.transaction((articles: ArticleData[]) => {
      const stmt = this.db.prepare(`
                INSERT INTO articulos (titulo, contenido, tags)
                VALUES (?, ?, ?)
            `);

      for (const article of articles) {
        const tagsString = this.tagsToString(article.tags);
        const result = stmt.run(article.titulo, article.contenido, tagsString);
        articleIds.push(result.lastInsertRowid as number);
      }
    });

    transaction(articlesData);
    return articleIds;
  }

  getAllArticles(): ArticleData[] {
    const stmt = this.db.prepare(`
            SELECT id, titulo, contenido, tags, fecha_creacion
            FROM articulos
            ORDER BY fecha_creacion DESC
        `);

    const rows = stmt.all() as ArticleWithCommaTags[];
    return rows.map((row) => this.mapToArticleData(row));
  }

  getArticleById(id: number): ArticleData | null {
    const stmt = this.db.prepare(`
            SELECT id, titulo, contenido, tags, fecha_creacion
            FROM articulos
            WHERE id = ?
        `);

    const row = stmt.get(id) as ArticleWithCommaTags | undefined;
    return row ? this.mapToArticleData(row) : null;
  }

  // Buscar artículos que contengan un tag específico
  getArticlesByTag(tag: string): ArticleData[] {
    const stmt = this.db.prepare(`
            SELECT id, titulo, contenido, tags, fecha_creacion
            FROM articulos
            WHERE tags LIKE ?
            ORDER BY fecha_creacion DESC
        `);

    const searchPattern = `%${tag}%`;
    const rows = stmt.all(searchPattern) as ArticleWithCommaTags[];
    return rows.map((row) => this.mapToArticleData(row)).filter(
      (article) => article.tags.includes(tag) // Filtro adicional para matches exactos
    );
  }

  // Buscar artículos que contengan cualquiera de los tags especificados
  getArticlesByAnyTag(tags: string[]): ArticleData[] {
    if (tags.length === 0) return [];

    const conditions = tags.map(() => "tags LIKE ?").join(" OR ");
    const stmt = this.db.prepare(`
            SELECT id, titulo, contenido, tags, fecha_creacion
            FROM articulos
            WHERE ${conditions}
            ORDER BY fecha_creacion DESC
        `);

    const searchPatterns = tags.map((tag) => `%${tag}%`);
    const rows = stmt.all(...searchPatterns) as ArticleWithCommaTags[];

    return rows
      .map((row) => this.mapToArticleData(row))
      .filter((article) => tags.some((tag) => article.tags.includes(tag)));
  }

  // Buscar artículos que contengan todos los tags especificados
  getArticlesByAllTags(tags: string[]): ArticleData[] {
    if (tags.length === 0) return [];

    const conditions = tags.map(() => "tags LIKE ?").join(" AND ");
    const stmt = this.db.prepare(`
            SELECT id, titulo, contenido, tags, fecha_creacion
            FROM articulos
            WHERE ${conditions}
            ORDER BY fecha_creacion DESC
        `);

    const searchPatterns = tags.map((tag) => `%${tag}%`);
    const rows = stmt.all(...searchPatterns) as ArticleWithCommaTags[];

    return rows
      .map((row) => this.mapToArticleData(row))
      .filter((article) => tags.every((tag) => article.tags.includes(tag)));
  }

  // Buscar artículos por título o contenido
  searchArticles(searchTerm: string): ArticleData[] {
    const stmt = this.db.prepare(`
            SELECT id, titulo, contenido, tags, fecha_creacion
            FROM articulos
            WHERE titulo LIKE ? OR contenido LIKE ?
            ORDER BY fecha_creacion DESC
        `);

    const searchPattern = `%${searchTerm}%`;
    const rows = stmt.all(
      searchPattern,
      searchPattern
    ) as ArticleWithCommaTags[];
    return rows.map((row) => this.mapToArticleData(row));
  }

  // Actualizar tags de un artículo
  updateArticleTags(id: number, tags: string[]): boolean {
    const stmt = this.db.prepare(`
            UPDATE articulos 
            SET tags = ?
            WHERE id = ?
        `);

    const tagsString = this.tagsToString(tags);
    const result = stmt.run(tagsString, id);
    return result.changes > 0;
  }

  // Agregar un tag a un artículo existente
  addTagToArticle(id: number, newTag: string): boolean {
    const article = this.getArticleById(id);
    if (!article) return false;

    if (!article.tags.includes(newTag)) {
      article.tags.push(newTag);
      return this.updateArticleTags(id, article.tags);
    }
    return true; // Tag ya existe
  }

  // Remover un tag de un artículo
  removeTagFromArticle(id: number, tagToRemove: string): boolean {
    const article = this.getArticleById(id);
    if (!article) return false;

    const updatedTags = article.tags.filter((tag) => tag !== tagToRemove);
    return this.updateArticleTags(id, updatedTags);
  }

  // Obtener estadísticas de tags
  getTagStats(): Array<{ tag: string; count: number; articles: string[] }> {
    const stmt = this.db.prepare(`
            SELECT titulo, tags
            FROM articulos
            WHERE tags != ''
        `);

    const rows = stmt.all() as Array<{ titulo: string; tags: string }>;
    const tagStats = new Map<string, { count: number; articles: string[] }>();

    rows.forEach((row) => {
      const tags = this.stringToTags(row.tags);
      tags.forEach((tag) => {
        if (!tagStats.has(tag)) {
          tagStats.set(tag, { count: 0, articles: [] });
        }
        const stats = tagStats.get(tag)!;
        stats.count++;
        stats.articles.push(row.titulo);
      });
    });

    return Array.from(tagStats.entries())
      .map(([tag, stats]) => ({
        tag,
        count: stats.count,
        articles: stats.articles,
      }))
      .sort((a, b) => b.count - a.count);
  }

  // Obtener artículos similares basados en tags compartidos
  getSimilarArticles(articleId: number, limit: number = 5): ArticleData[] {
    const article = this.getArticleById(articleId);
    if (!article || article.tags.length === 0) return [];

    const conditions = article.tags.map(() => "tags LIKE ?").join(" OR ");
    const stmt = this.db.prepare(`
            SELECT id, titulo, contenido, tags, fecha_creacion
            FROM articulos
            WHERE id != ? AND (${conditions})
            ORDER BY fecha_creacion DESC
            LIMIT ?
        `);

    const searchPatterns = article.tags.map((tag) => `%${tag}%`);
    const rows = stmt.all(
      articleId,
      ...searchPatterns,
      limit
    ) as ArticleWithCommaTags[];

    return rows.map((row) => this.mapToArticleData(row));
  }

  // Métodos privados para conversión entre array y string
  private tagsToString(tags: string[]): string {
    return tags.filter((tag) => tag.trim() !== "").join(",");
  }

  private stringToTags(tagsString: string): string[] {
    if (!tagsString || tagsString.trim() === "") return [];
    return tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
  }

  // Método privado para mapear filas de DB a objetos ArticleData
  private mapToArticleData(row: ArticleWithCommaTags): ArticleData {
    return {
      id: row.id,
      titulo: row.titulo,
      contenido: row.contenido,
      tags: this.stringToTags(row.tags),
      fechaCreacion: new Date(row.fecha_creacion),
    };
  }

  async close(): Promise<void> {
    this.db.close();
    console.log("🔒 Conexión SQL cerrada");
  }
}
