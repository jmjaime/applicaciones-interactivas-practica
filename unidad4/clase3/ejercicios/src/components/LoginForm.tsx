import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await login(username, password);
        } catch (err) {
            setError("Error al iniciar sesión. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card" style={{ maxWidth: "500px", margin: "2rem auto" }}>
            <h2 className="card-title">🎮 Iniciar Sesión en GamerHub</h2>

            {error && (
                <div style={{
                    padding: "1rem",
                    backgroundColor: "rgba(255, 107, 107, 0.1)",
                    border: "2px solid var(--error)",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                    color: "var(--error)"
                }}>
                    ❌ {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Username:</label>
                    <input
                        type="text"
                        className="form-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Ingresa tu username"
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu password"
                        required
                        disabled={loading}
                    />
                </div>

                <button type="submit" disabled={loading} style={{ width: "100%" }}>
                    {loading ? "⏳ Ingresando..." : "🚀 Entrar"}
                </button>
            </form>

            <p style={{ marginTop: "1.5rem", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.9em" }}>
                💡 Tip: Usa cualquier username y password para ingresar
            </p>
        </div>
    );
}

