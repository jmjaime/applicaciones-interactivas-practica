import { useToggle } from "./useToggle";

export function ToggleExample4() {
    const modal = useToggle(false);
    const darkMode = useToggle(true);
    const notifications = useToggle(true);
    const sidebar = useToggle(false);

    return (
        <div style={{ padding: "2rem", backgroundColor: "#1a1a1a", borderRadius: "8px" }}>
            <h3>Ejemplo 2.4: useToggle</h3>

            <div style={{ display: "grid", gap: "1.5rem", marginTop: "1rem" }}>
                {/* Modal */}
                <div style={{ padding: "1.5rem", backgroundColor: "#2a2a2a", borderRadius: "8px" }}>
                    <h4>Modal</h4>
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                        <button onClick={modal.toggle}>
                            {modal.value ? "Cerrar" : "Abrir"} Modal
                        </button>
                        <button onClick={modal.setTrue}>Forzar Abrir</button>
                        <button onClick={modal.setFalse}>Forzar Cerrar</button>
                    </div>
                    {modal.value && (
                        <div style={{
                            marginTop: "1rem",
                            padding: "1.5rem",
                            backgroundColor: "#1a1a1a",
                            borderRadius: "8px",
                            border: "2px solid #646cff"
                        }}>
                            <h5 style={{ marginBottom: "1rem" }}>🎉 ¡Modal Abierto!</h5>
                            <p>Este es el contenido del modal.</p>
                            <button onClick={modal.setFalse} style={{ marginTop: "1rem" }}>
                                Cerrar ✕
                            </button>
                        </div>
                    )}
                </div>

                {/* Dark Mode */}
                <div style={{
                    padding: "1.5rem",
                    backgroundColor: darkMode.value ? "#1a1a1a" : "#f5f5f5",
                    color: darkMode.value ? "white" : "black",
                    borderRadius: "8px",
                    border: "2px solid #444"
                }}>
                    <h4>Modo {darkMode.value ? "Oscuro 🌙" : "Claro ☀️"}</h4>
                    <button onClick={darkMode.toggle} style={{ marginTop: "1rem" }}>
                        Cambiar a modo {darkMode.value ? "claro" : "oscuro"}
                    </button>
                </div>

                {/* Notifications */}
                <div style={{ padding: "1.5rem", backgroundColor: "#2a2a2a", borderRadius: "8px" }}>
                    <h4>Notificaciones</h4>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1rem" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                            <input
                                type="checkbox"
                                checked={notifications.value}
                                onChange={notifications.toggle}
                                style={{ width: "20px", height: "20px" }}
                            />
                            <span>
                                Notificaciones {notifications.value ? "activadas" : "desactivadas"}
                            </span>
                        </label>
                        {notifications.value && (
                            <span style={{ fontSize: "0.9em", color: "#51cf66" }}>
                                🔔 Recibirás notificaciones
                            </span>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div style={{ padding: "1.5rem", backgroundColor: "#2a2a2a", borderRadius: "8px", position: "relative" }}>
                    <h4>Sidebar</h4>
                    <button onClick={sidebar.toggle} style={{ marginTop: "1rem" }}>
                        {sidebar.value ? "Ocultar" : "Mostrar"} Sidebar
                    </button>
                    {sidebar.value && (
                        <div style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: "200px",
                            height: "100%",
                            backgroundColor: "#1a1a1a",
                            borderLeft: "2px solid #646cff",
                            padding: "1.5rem",
                            borderRadius: "0 8px 8px 0"
                        }}>
                            <button
                                onClick={sidebar.setFalse}
                                style={{
                                    position: "absolute",
                                    top: "0.5rem",
                                    right: "0.5rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.8em"
                                }}
                            >
                                ✕
                            </button>
                            <h5>Sidebar</h5>
                            <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
                                <li style={{ padding: "0.5rem 0" }}>📋 Item 1</li>
                                <li style={{ padding: "0.5rem 0" }}>📊 Item 2</li>
                                <li style={{ padding: "0.5rem 0" }}>⚙️ Item 3</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#2a2a2a", borderRadius: "4px" }}>
                <h4>💡 API conveniente para booleanos</h4>
                <p>useToggle simplifica el manejo de valores booleanos con:</p>
                <ul>
                    <li><strong>toggle():</strong> Cambia entre true/false</li>
                    <li><strong>setTrue():</strong> Fuerza el valor a true</li>
                    <li><strong>setFalse():</strong> Fuerza el valor a false</li>
                    <li><strong>setValue():</strong> Setter normal de useState</li>
                </ul>
                <p style={{ marginTop: "1rem", fontSize: "0.9em", color: "#888" }}>
                    Ideal para: modales, dropdowns, sidebars, switches, checkboxes, etc.
                </p>
            </div>
        </div>
    );
}

