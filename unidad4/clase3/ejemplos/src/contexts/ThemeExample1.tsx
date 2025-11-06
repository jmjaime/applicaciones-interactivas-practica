import { use } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeExample1() {
    const { theme, toggleTheme } = use(ThemeContext);

    const styles = {
        container: {
            padding: "2rem",
            backgroundColor: theme === "dark" ? "#1a1a1a" : "#f5f5f5",
            color: theme === "dark" ? "#fff" : "#000",
            borderRadius: "8px",
            transition: "all 0.3s ease",
        },
    };

    return (
        <div style={styles.container}>
            <h3>Ejemplo 1.1: Sistema de Temas</h3>
            <p>Tema actual: <strong>{theme}</strong></p>
            <p>
                Este componente consume el ThemeContext usando el hook <code>use()</code> de React 19.
            </p>
            <button onClick={toggleTheme} style={{ marginTop: "1rem" }}>
                {theme === "dark" ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
            </button>

            <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: theme === "dark" ? "#2a2a2a" : "#e5e5e5", borderRadius: "4px" }}>
                <h4>¿Cómo funciona?</h4>
                <ol>
                    <li>ThemeContext provee el estado del tema</li>
                    <li>Cualquier componente puede consumirlo con <code>use()</code></li>
                    <li>Cambiar el tema afecta a TODOS los componentes</li>
                    <li>No hay prop drilling necesario</li>
                </ol>
            </div>
        </div>
    );
}

