import { useFetch } from "./useFetch";

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export function FetchExample2() {
    const { data: posts, loading, error, refetch } = useFetch<Post[]>(
        "https://jsonplaceholder.typicode.com/posts?_limit=5"
    );

    return (
        <div style={{ padding: "2rem", backgroundColor: "#1a1a1a", borderRadius: "8px" }}>
            <h3>Ejemplo 2.2: useFetch</h3>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <p style={{ color: "#888", margin: 0 }}>
                    Obteniendo posts desde JSONPlaceholder API
                </p>
                <button onClick={refetch} disabled={loading}>
                    {loading ? "⏳ Cargando..." : "🔄 Refetch"}
                </button>
            </div>

            {loading && (
                <div style={{ textAlign: "center", padding: "3rem", color: "#888" }}>
                    <p style={{ fontSize: "2em" }}>⏳</p>
                    <p>Cargando posts...</p>
                </div>
            )}

            {error && (
                <div style={{ padding: "1rem", backgroundColor: "rgba(255, 107, 107, 0.1)", borderRadius: "4px", color: "#ff6b6b" }}>
                    <p><strong>❌ Error:</strong> {error}</p>
                    <button onClick={refetch} style={{ marginTop: "0.5rem" }}>
                        Reintentar
                    </button>
                </div>
            )}

            {!loading && !error && posts && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            style={{
                                padding: "1.5rem",
                                backgroundColor: "#2a2a2a",
                                borderRadius: "8px",
                                border: "1px solid #444",
                            }}
                        >
                            <h4 style={{ marginBottom: "0.5rem", color: "#646cff" }}>
                                {post.id}. {post.title}
                            </h4>
                            <p style={{ color: "#aaa", margin: 0 }}>{post.body}</p>
                            <p style={{ fontSize: "0.8em", color: "#666", marginTop: "0.5rem" }}>
                                Usuario ID: {post.userId}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#2a2a2a", borderRadius: "4px" }}>
                <h4>💡 Hook de fetching completo</h4>
                <p>Este custom hook maneja:</p>
                <ul>
                    <li><strong>Estados:</strong> loading, error, data</li>
                    <li><strong>Refetch:</strong> Volver a cargar datos manualmente</li>
                    <li><strong>Cleanup:</strong> Cancelar request si el componente se desmonta</li>
                    <li><strong>Reutilizable:</strong> Funciona con cualquier URL</li>
                </ul>
            </div>
        </div>
    );
}

