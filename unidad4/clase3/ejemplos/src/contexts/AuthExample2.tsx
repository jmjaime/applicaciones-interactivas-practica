import { use, useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthExample2() {
    const { user, login, logout, isAuthenticated } = use(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await login(username, password);
            setUsername("");
            setPassword("");
        } catch (err) {
            setError("Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "2rem", backgroundColor: "#1a1a1a", borderRadius: "8px" }}>
            <h3>Ejemplo 1.2: Context de Autenticación</h3>

            {!isAuthenticated ? (
                <form onSubmit={handleLogin} style={{ maxWidth: "400px" }}>
                    <h4>Iniciar Sesión</h4>
                    {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}

                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", marginBottom: "0.5rem" }}>
                            Usuario:
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="admin o user"
                            required
                            style={{
                                width: "100%",
                                padding: "0.5rem",
                                borderRadius: "4px",
                                border: "1px solid #444",
                                backgroundColor: "#2a2a2a",
                                color: "white",
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", marginBottom: "0.5rem" }}>
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Cualquier contraseña"
                            required
                            style={{
                                width: "100%",
                                padding: "0.5rem",
                                borderRadius: "4px",
                                border: "1px solid #444",
                                backgroundColor: "#2a2a2a",
                                color: "white",
                            }}
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Iniciando sesión..." : "Entrar"}
                    </button>
                </form>
            ) : (
                <div>
                    <h4>¡Bienvenido, {user?.username}!</h4>
                    <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#2a2a2a", borderRadius: "4px" }}>
                        <p><strong>ID:</strong> {user?.id}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Rol:</strong> <span style={{ color: user?.role === "admin" ? "#51cf66" : "#339af0" }}>{user?.role}</span></p>
                    </div>
                    <button onClick={logout} style={{ marginTop: "1rem", backgroundColor: "#ff6b6b" }}>
                        Cerrar Sesión
                    </button>
                </div>
            )}

            <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#2a2a2a", borderRadius: "4px" }}>
                <h4>💡 Context con objeto complejo</h4>
                <p>Este ejemplo muestra cómo manejar:</p>
                <ul>
                    <li>Estado complejo (objeto user)</li>
                    <li>Funciones asíncronas (login)</li>
                    <li>Estado derivado (isAuthenticated)</li>
                    <li>Múltiples acciones (login/logout)</li>
                </ul>
            </div>
        </div>
    );
}

