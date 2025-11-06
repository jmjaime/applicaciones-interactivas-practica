import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { use } from "react";
import "./App.css";
import { ThemeContext } from "./contexts/ThemeContext";
import { useAuth } from "./contexts/AuthContext";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { FeedPage } from "./pages/FeedPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
    const { theme, toggleTheme } = use(ThemeContext);
    const { isAuthenticated, gamer, logout } = useAuth();

    return (
        <BrowserRouter>
            <div className="app" style={{
                backgroundColor: theme === "dark" ? "var(--bg-primary)" : "#f5f5f5",
                color: theme === "dark" ? "var(--text-primary)" : "#333",
                transition: "all 0.3s ease"
            }}>
                <nav className="navbar">
                    <Link to="/" className="navbar-brand">
                        🎮 GamerHub
                    </Link>

                    <div className="navbar-links">
                        <Link to="/" className="navbar-link">
                            🏠 Home
                        </Link>
                        {isAuthenticated && (
                            <>
                                <Link to="/feed" className="navbar-link">
                                    📱 Feed
                                </Link>
                                <Link to={`/profile/${gamer?.username}`} className="navbar-link">
                                    👤 Perfil
                                </Link>
                                <Link to="/settings" className="navbar-link">
                                    ⚙️ Config
                                </Link>
                            </>
                        )}

                        <button
                            onClick={toggleTheme}
                            style={{
                                padding: "0.5rem 1rem",
                                fontSize: "0.9em",
                                backgroundColor: "var(--bg-tertiary)"
                            }}
                        >
                            {theme === "dark" ? "☀️" : "🌙"}
                        </button>

                        {isAuthenticated ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <span className="badge">{gamer?.avatar} {gamer?.username}</span>
                                <button
                                    onClick={logout}
                                    className="btn-danger"
                                    style={{ padding: "0.5rem 1rem", fontSize: "0.9em" }}
                                >
                                    🚪 Salir
                                </button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <button style={{ padding: "0.5rem 1rem", fontSize: "0.9em" }}>
                                    🔐 Login
                                </button>
                            </Link>
                        )}
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/feed"
                        element={
                            <ProtectedRoute>
                                <FeedPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile/:username"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute>
                                <SettingsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>

                <footer style={{
                    padding: "2rem",
                    textAlign: "center",
                    color: "var(--text-secondary)",
                    borderTop: "1px solid var(--bg-tertiary)",
                    marginTop: "3rem"
                }}>
                    <p>🎮 GamerHub - Red Social de Gamers</p>
                    <p style={{ fontSize: "0.9em", marginTop: "0.5rem" }}>
                        Proyecto Educativo - React Clase III
                    </p>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;

