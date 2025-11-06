import { useParams, Link, useNavigate } from "react-router-dom";

const MOCK_USERS = [
    { id: 1, name: "Alice Johnson", role: "Developer", avatar: "👩‍💻", email: "alice@example.com", bio: "Full-stack developer with 5 years of experience" },
    { id: 2, name: "Bob Smith", role: "Designer", avatar: "👨‍🎨", email: "bob@example.com", bio: "UI/UX designer passionate about user experience" },
    { id: 3, name: "Charlie Brown", role: "Manager", avatar: "👨‍💼", email: "charlie@example.com", bio: "Project manager leading agile teams" },
    { id: 4, name: "Diana Prince", role: "Developer", avatar: "👩‍💻", email: "diana@example.com", bio: "Frontend specialist in React and TypeScript" },
    { id: 5, name: "Ethan Hunt", role: "DevOps", avatar: "👨‍💻", email: "ethan@example.com", bio: "DevOps engineer automating everything" },
];

export function UserDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const user = MOCK_USERS.find((u) => u.id === Number(id));

    if (!user) {
        return (
            <div className="container">
                <div className="card">
                    <h2 style={{ color: "#ff6b6b" }}>❌ Usuario no encontrado</h2>
                    <p style={{ color: "#888", marginBottom: "1.5rem" }}>
                        El usuario con ID {id} no existe.
                    </p>
                    <Link to="/router/users">
                        <button>← Volver a la lista</button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="card">
                <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", marginBottom: "2rem" }}>
                    <div style={{
                        fontSize: "6em",
                        backgroundColor: "#2a2a2a",
                        padding: "1rem",
                        borderRadius: "50%",
                        width: "150px",
                        height: "150px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        {user.avatar}
                    </div>

                    <div style={{ flex: 1 }}>
                        <h1 style={{ marginBottom: "0.5rem" }}>{user.name}</h1>
                        <p style={{
                            fontSize: "1.2em",
                            color: "#646cff",
                            marginBottom: "1rem"
                        }}>
                            {user.role}
                        </p>
                        <p style={{ color: "#888", marginBottom: "0.5rem" }}>
                            ✉️ {user.email}
                        </p>
                        <p style={{ color: "#aaa", lineHeight: "1.6" }}>
                            {user.bio}
                        </p>
                    </div>
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                    <button onClick={() => navigate("/router/users")}>
                        ← Volver a la lista
                    </button>
                    <button onClick={() => navigate(-1)} style={{ backgroundColor: "#444" }}>
                        ← Atrás (historial)
                    </button>
                    {user.id > 1 && (
                        <button onClick={() => navigate(`/router/users/${user.id - 1}`)} style={{ backgroundColor: "#444" }}>
                            ← Usuario anterior
                        </button>
                    )}
                    {user.id < MOCK_USERS.length && (
                        <button onClick={() => navigate(`/router/users/${user.id + 1}`)} style={{ backgroundColor: "#444" }}>
                            Usuario siguiente →
                        </button>
                    )}
                </div>
            </div>

            <div style={{
                padding: "1.5rem",
                backgroundColor: "#2a2a2a",
                borderRadius: "8px"
            }}>
                <h3 style={{ marginBottom: "1rem" }}>💡 Conceptos Demostrados</h3>
                <ul style={{ lineHeight: "1.8", color: "#aaa" }}>
                    <li><strong>useParams():</strong> Extrae el ID de la URL (<code>/users/{id}</code>)</li>
                    <li><strong>useNavigate():</strong> Navegación programática con botones</li>
                    <li><strong>Manejo de 404:</strong> Muestra error si el usuario no existe</li>
                    <li><strong>Navegación dinámica:</strong> Botones para anterior/siguiente</li>
                </ul>
            </div>
        </div>
    );
}

