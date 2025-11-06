import { useLocalStorage } from "./useLocalStorage";

export function LocalStorageExample1() {
    const [name, setName] = useLocalStorage("user-name", "");
    const [favoriteColor, setFavoriteColor] = useLocalStorage("favorite-color", "#646cff");
    const [count, setCount] = useLocalStorage("counter", 0);

    return (
        <div style={{ padding: "2rem", backgroundColor: "#1a1a1a", borderRadius: "8px" }}>
            <h3>Ejemplo 2.1: useLocalStorage</h3>

            <div style={{ display: "grid", gap: "1.5rem", marginTop: "1rem" }}>
                {/* Nombre */}
                <div>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>
                        Tu nombre:
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Escribe tu nombre"
                        style={{
                            width: "100%",
                            padding: "0.5rem",
                            borderRadius: "4px",
                            border: "1px solid #444",
                            backgroundColor: "#2a2a2a",
                            color: "white",
                        }}
                    />
                    {name && <p style={{ marginTop: "0.5rem", color: "#51cf66" }}>✓ Guardado: {name}</p>}
                </div>

                {/* Color favorito */}
                <div>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>
                        Color favorito:
                    </label>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <input
                            type="color"
                            value={favoriteColor}
                            onChange={(e) => setFavoriteColor(e.target.value)}
                            style={{ width: "100px", height: "40px" }}
                        />
                        <div
                            style={{
                                width: "100px",
                                height: "40px",
                                backgroundColor: favoriteColor,
                                borderRadius: "4px",
                                border: "2px solid white",
                            }}
                        />
                        <span>{favoriteColor}</span>
                    </div>
                </div>

                {/* Contador */}
                <div>
                    <label style={{ display: "block", marginBottom: "0.5rem" }}>
                        Contador persistente:
                    </label>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <button onClick={() => setCount(count - 1)}>-</button>
                        <span style={{ fontSize: "1.5em", fontWeight: "bold", minWidth: "60px", textAlign: "center" }}>
                            {count}
                        </span>
                        <button onClick={() => setCount(count + 1)}>+</button>
                        <button onClick={() => setCount(0)} style={{ backgroundColor: "#ff6b6b" }}>
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#2a2a2a", borderRadius: "4px" }}>
                <h4>💡 Persistencia automática</h4>
                <p>Recarga la página y verás que los valores se mantienen:</p>
                <ul>
                    <li>✓ Se guarda en localStorage automáticamente</li>
                    <li>✓ Se carga al montar el componente</li>
                    <li>✓ API idéntica a useState</li>
                    <li>✓ Manejo de errores incluido</li>
                </ul>
                <button
                    onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                    }}
                    style={{ marginTop: "0.5rem", backgroundColor: "#ff6b6b" }}
                >
                    Limpiar localStorage y recargar
                </button>
            </div>
        </div>
    );
}

