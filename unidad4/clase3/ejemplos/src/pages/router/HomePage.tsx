export function HomePage() {
    return (
        <div className="container">
            <div className="card">
                <h1>🛣️ React Router - Ejemplos</h1>
                <p style={{ fontSize: "1.2em", color: "#888", marginBottom: "2rem" }}>
                    Ejemplos completos de navegación con React Router 7
                </p>

                <div className="grid grid-2">
                    <div>
                        <h3 style={{ color: "#646cff" }}>📚 Ejemplos Básicos</h3>
                        <ul style={{ lineHeight: "2", color: "#aaa" }}>
                            <li><strong>Navegación simple</strong> - Links y NavLinks</li>
                            <li><strong>Rutas dinámicas</strong> - Parámetros en la URL</li>
                            <li><strong>Rutas anidadas</strong> - Layouts con Outlet</li>
                            <li><strong>404 Not Found</strong> - Manejo de rutas inválidas</li>
                        </ul>
                    </div>

                    <div>
                        <h3 style={{ color: "#646cff" }}>🚀 Ejemplos Avanzados</h3>
                        <ul style={{ lineHeight: "2", color: "#aaa" }}>
                            <li><strong>Protected Routes</strong> - Rutas privadas</li>
                            <li><strong>Query Parameters</strong> - Filtros en URL</li>
                            <li><strong>Loaders</strong> - Carga de datos</li>
                            <li><strong>Error Boundaries</strong> - Manejo de errores</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="card">
                <h2>🎯 Conceptos Clave</h2>
                <div style={{ marginTop: "1rem", lineHeight: "1.8", color: "#aaa" }}>
                    <p><strong>SPA (Single Page Application):</strong> Navegación sin recargas de página</p>
                    <p><strong>Client-side Routing:</strong> JavaScript maneja la navegación</p>
                    <p><strong>Dynamic Routes:</strong> URLs con parámetros variables</p>
                    <p><strong>Nested Routes:</strong> Rutas dentro de rutas para layouts compartidos</p>
                    <p><strong>Data Loaders:</strong> Cargar datos antes de renderizar componentes</p>
                </div>
            </div>

            <div style={{
                padding: "1.5rem",
                backgroundColor: "#2a2a2a",
                borderRadius: "8px",
                border: "1px solid #646cff"
            }}>
                <h3 style={{ marginBottom: "1rem" }}>🧭 Navegación</h3>
                <p style={{ color: "#aaa" }}>
                    Usa el menú de navegación arriba para explorar cada ejemplo. Cada uno demuestra
                    un concepto específico de React Router con código funcional.
                </p>
            </div>
        </div>
    );
}

