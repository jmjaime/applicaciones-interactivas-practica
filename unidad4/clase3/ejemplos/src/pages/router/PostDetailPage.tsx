import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { Post } from "../loaders/postLoaders";

export function PostDetailPage() {
    const post = useLoaderData() as Post;
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="card">
                <h1 style={{ color: "#646cff", marginBottom: "1rem" }}>
                    {post.title}
                </h1>

                <p style={{ color: "#888", marginBottom: "1.5rem" }}>
                    Post #{post.id} | User ID: {post.userId}
                </p>

                <div style={{
                    padding: "1.5rem",
                    backgroundColor: "#2a2a2a",
                    borderRadius: "8px",
                    lineHeight: "1.8",
                    marginBottom: "2rem"
                }}>
                    {post.body}
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                    <button onClick={() => navigate("/router/posts")}>
                        ← Volver a Posts
                    </button>
                    <button onClick={() => navigate(-1)} style={{ backgroundColor: "#444" }}>
                        ← Atrás
                    </button>
                </div>
            </div>

            <div style={{
                padding: "1.5rem",
                backgroundColor: "#2a2a2a",
                borderRadius: "8px"
            }}>
                <h3 style={{ marginBottom: "1rem" }}>💡 Loader con Parámetros</h3>
                <p style={{ color: "#aaa", marginBottom: "1rem" }}>
                    El loader recibe los parámetros de la ruta:
                </p>
                <pre style={{
                    backgroundColor: "#1a1a1a",
                    padding: "1rem",
                    borderRadius: "4px",
                    overflow: "x-auto"
                }}>
                    {`export async function postDetailLoader({ params }) {
  const response = await fetch(
    \`https://api.com/posts/\${params.id}\`
  );
  return response.json();
}`}
                </pre>
            </div>
        </div>
    );
}

