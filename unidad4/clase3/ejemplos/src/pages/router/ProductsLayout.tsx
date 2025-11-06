import { Outlet, NavLink } from "react-router-dom";

export function ProductsLayout() {
    return (
        <div className="container">
            <div className="card">
                <h1 style={{ marginBottom: "1.5rem" }}>🛍️ Productos</h1>

                <nav style={{
                    display: "flex",
                    gap: "1rem",
                    padding: "1rem",
                    backgroundColor: "#2a2a2a",
                    borderRadius: "8px",
                    marginBottom: "2rem"
                }}>
                    <NavLink
                        to="/router/products"
                        end
                        style={({ isActive }) => ({
                            padding: "0.5rem 1rem",
                            borderRadius: "4px",
                            backgroundColor: isActive ? "#646cff" : "transparent",
                            color: isActive ? "white" : "#646cff",
                            textDecoration: "none"
                        })}
                    >
                        📋 Lista
                    </NavLink>
                </nav>

                {/* Aquí se renderizan las rutas hijas */}
                <Outlet />
            </div>

            <div style={{
                padding: "1.5rem",
                backgroundColor: "#2a2a2a",
                borderRadius: "8px",
                marginTop: "2rem"
            }}>
                <h3 style={{ marginBottom: "1rem" }}>💡 Concepto: Rutas Anidadas + Outlet</h3>
                <p style={{ color: "#aaa", marginBottom: "1rem" }}>
                    Este layout se comparte entre todas las páginas de productos.
                </p>
                <ul style={{ color: "#aaa", lineHeight: "1.8" }}>
                    <li><strong>Layout persistente:</strong> Navbar siempre visible</li>
                    <li><strong>{"<Outlet />"}:</strong> Renderiza la ruta hija actual</li>
                    <li><strong>NavLink:</strong> Links con estado activo automático</li>
                </ul>
            </div>
        </div>
    );
}

