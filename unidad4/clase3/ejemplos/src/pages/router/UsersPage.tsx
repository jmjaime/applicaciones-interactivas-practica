import { Link } from "react-router-dom";

const MOCK_USERS = [
    { id: 1, name: "Alice Johnson", role: "Developer", avatar: "👩‍💻" },
    { id: 2, name: "Bob Smith", role: "Designer", avatar: "👨‍🎨" },
    { id: 3, name: "Charlie Brown", role: "Manager", avatar: "👨‍💼" },
    { id: 4, name: "Diana Prince", role: "Developer", avatar: "👩‍💻" },
    { id: 5, name: "Ethan Hunt", role: "DevOps", avatar: "👨‍💻" },
];

export function UsersPage() {
    return (
        <div className="container">
            <div className="card">
                <h2>👥 Lista de Usuarios</h2>
                <p style={{ color: "#888", marginBottom: "2rem" }}>
                    Ejemplo de rutas dinámicas: Click en un usuario para ver su detalle
                </p>

                <div className="grid grid-3">
                    {MOCK_USERS.map((user) => (
                        <Link
                            key={user.id}
                            to={`/router/users/${user.id}`}
                            style={{
                                display: "block",
                                padding: "1.5rem",
                                backgroundColor: "#2a2a2a",
                                borderRadius: "8px",
                                border: "1px solid #444",
                                transition: "all 0.2s",
                                textAlign: "center",
                                textDecoration: "none",
                                color: "inherit"
                            }}
                        >
                            <div style={{ fontSize: "3em", marginBottom: "0.5rem" }}>
                                {user.avatar}
                            </div>
                            <h3 style={{ marginBottom: "0.5rem", fontSize: "1.1em" }}>
                                {user.name}
                            </h3>
                            <p style={{ color: "#888", fontSize: "0.9em" }}>
                                {user.role}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>

            <div style={{
                padding: "1.5rem",
                backgroundColor: "#2a2a2a",
                borderRadius: "8px"
            }}>
                <h3 style={{ marginBottom: "1rem" }}>💡 Concepto: Rutas Dinámicas</h3>
                <p style={{ color: "#aaa", marginBottom: "1rem" }}>
                    Cada usuario tiene su propia ruta: <code>/users/:id</code>
                </p>
                <pre style={{
                    backgroundColor: "#1a1a1a",
                    padding: "1rem",
                    borderRadius: "4px",
                    overflow: "x-auto"
                }}>
                    {`<Route path="/users/:id" element={<UserDetail />} />

function UserDetail() {
  const { id } = useParams();
  // id contiene el valor dinámico
}`}
                </pre>
            </div>
        </div>
    );
}

