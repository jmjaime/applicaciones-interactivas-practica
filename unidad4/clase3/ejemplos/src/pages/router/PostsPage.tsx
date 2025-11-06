import { useLoaderData, Link } from "react-router-dom";
import { Post } from "../loaders/postLoaders";

export function PostsPage() {
    const posts = useLoaderData() as Post[];

    return (
        <div className="container">
            <div className="card">
                <h2>📰 Posts (con Loader)</h2>
                <p style={{ color: "#888", marginBottom: "2rem" }}>
                    Estos datos se cargaron ANTES de renderizar el componente usando un loader.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            to={`/router/posts/${post.id}`}
                            style={{
                                display: "block",
                                padding: "1.5rem",
                                backgroundColor: "#2a2a2a",
                                borderRadius: "8px",
                                border: "1px solid #444",
                                transition: "all 0.2s",
                                textDecoration: "none",
                                color: "inherit"
                            }}
                        >
                            <h3 style={{ marginBottom: "0.5rem", color: "#646cff" }}>
                                {post.id}. {post.title}
                            </h3>
                            <p style={{ color: "#aaa", margin: 0 }}>
                                {post.body.substring(0, 100)}...
                            </p>
                        </Link>
                    ))}
                </div>
            </div>

            <div style={{
                padding: "1.5rem",
                backgroundColor: "#2a2a2a",
                borderRadius: "8px",
                marginTop: "2rem"
            }}>
                <h3 style={{ marginBottom: "1rem" }}>💡 Ventajas de los Loaders</h3>
                <ul style={{ color: "#aaa", lineHeight: "1.8" }}>
                    <li>✅ Datos disponibles antes del render</li>
                    <li>✅ No necesitas useState, useEffect ni loading states</li>
                    <li>✅ Código más limpio y declarativo</li>
                    <li>✅ Manejo de errores centralizado</li>
                </ul>
                <pre style={{
                    marginTop: "1rem",
                    backgroundColor: "#1a1a1a",
                    padding: "1rem",
                    borderRadius: "4px",
                    overflow: "x-auto"
                }}>
                    {`// En el router:
{
  path: "/posts",
  element: <PostsPage />,
  loader: postsLoader
}

// En el componente:
const posts = useLoaderData();`}
                </pre>
            </div>
        </div>
    );
}

