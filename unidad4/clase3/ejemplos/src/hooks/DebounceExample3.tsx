import { useState } from "react";
import { useDebounce } from "./useDebounce";

const MOCK_USERS = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Brown",
    "Diana Prince",
    "Ethan Hunt",
    "Fiona Apple",
    "George Miller",
    "Hannah Montana",
    "Ian McKellen",
    "Julia Roberts",
];

export function DebounceExample3() {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const filteredUsers = MOCK_USERS.filter((user) =>
        user.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: "2rem", backgroundColor: "#1a1a1a", borderRadius: "8px" }}>
            <h3>Ejemplo 2.3: useDebounce</h3>

            <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                    Buscar usuario (con delay de 500ms):
                </label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Escribe para buscar..."
                    style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "4px",
                        border: "2px solid #444",
                        backgroundColor: "#2a2a2a",
                        color: "white",
                        fontSize: "1em",
                    }}
                />
            </div>

            <div style={{ display: "flex", gap: "2rem", marginBottom: "1.5rem" }}>
                <div style={{ flex: 1, padding: "1rem", backgroundColor: "#2a2a2a", borderRadius: "4px" }}>
                    <p style={{ color: "#888", fontSize: "0.9em", marginBottom: "0.5rem" }}>
                        Valor actual (actualizado inmediatamente):
                    </p>
                    <p style={{ fontSize: "1.2em", fontWeight: "bold" }}>
                        {searchTerm || <span style={{ color: "#666" }}>vacío</span>}
                    </p>
                </div>

                <div style={{ flex: 1, padding: "1rem", backgroundColor: "#2a2a2a", borderRadius: "4px" }}>
                    <p style={{ color: "#888", fontSize: "0.9em", marginBottom: "0.5rem" }}>
                        Valor debounced (actualizado después de 500ms):
                    </p>
                    <p style={{ fontSize: "1.2em", fontWeight: "bold", color: "#51cf66" }}>
                        {debouncedSearchTerm || <span style={{ color: "#666" }}>vacío</span>}
                    </p>
                </div>
            </div>

            <div>
                <h4>Resultados ({filteredUsers.length}):</h4>
                {filteredUsers.length === 0 ? (
                    <p style={{ color: "#888", padding: "2rem", textAlign: "center" }}>
                        No se encontraron usuarios
                    </p>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.5rem" }}>
                        {filteredUsers.map((user) => (
                            <div
                                key={user}
                                style={{
                                    padding: "0.75rem",
                                    backgroundColor: "#2a2a2a",
                                    borderRadius: "4px",
                                    border: "1px solid #444",
                                }}
                            >
                                👤 {user}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#2a2a2a", borderRadius: "4px" }}>
                <h4>💡 Optimización de búsqueda</h4>
                <p>useDebounce es perfecto para:</p>
                <ul>
                    <li><strong>Búsquedas en tiempo real:</strong> Evita requests en cada tecla</li>
                    <li><strong>Autocompletado:</strong> Espera que el usuario termine de escribir</li>
                    <li><strong>Validación:</strong> Valida solo cuando el usuario para de escribir</li>
                    <li><strong>Performance:</strong> Reduce carga en servidor y cliente</li>
                </ul>
                <p style={{ marginTop: "1rem", fontSize: "0.9em", color: "#888" }}>
                    💡 <strong>Truco:</strong> Escribe rápido y nota cómo la búsqueda espera 500ms después de tu última tecla.
                </p>
            </div>
        </div>
    );
}

