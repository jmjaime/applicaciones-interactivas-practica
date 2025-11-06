import { useRouteError, Link, isRouteErrorResponse } from "react-router-dom";

export function ErrorPage() {
    const error = useRouteError();

    let errorMessage: string;
    let errorStatus: number | undefined;

    if (isRouteErrorResponse(error)) {
        errorMessage = error.statusText || error.data?.message || "Error desconocido";
        errorStatus = error.status;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else {
        errorMessage = "Error desconocido";
    }

    return (
        <div className="container">
            <div className="card" style={{ textAlign: "center" }}>
                <h1 style={{ fontSize: "6em", marginBottom: "0.5rem" }}>
                    {errorStatus || "❌"}
                </h1>
                <h2 style={{ marginBottom: "1rem", color: "#ff6b6b" }}>
                    ¡Oops! Algo salió mal
                </h2>
                <p style={{ fontSize: "1.2em", color: "#888", marginBottom: "2rem" }}>
                    {errorMessage}
                </p>
                <Link to="/">
                    <button>🏠 Volver al inicio</button>
                </Link>
            </div>

            <div style={{
                padding: "1.5rem",
                backgroundColor: "#2a2a2a",
                borderRadius: "8px",
                marginTop: "2rem"
            }}>
                <h3 style={{ marginBottom: "1rem" }}>💡 Error Handling con errorElement</h3>
                <p style={{ color: "#aaa", marginBottom: "1rem" }}>
                    Este componente se renderiza cuando:
                </p>
                <ul style={{ color: "#aaa", lineHeight: "1.8" }}>
                    <li>Un loader falla (throw error)</li>
                    <li>Una ruta no existe (404)</li>
                    <li>Un componente lanza un error</li>
                </ul>
                <pre style={{
                    marginTop: "1rem",
                    backgroundColor: "#1a1a1a",
                    padding: "1rem",
                    borderRadius: "4px",
                    overflow: "x-auto"
                }}>
                    {`{
  path: "/",
  element: <App />,
  errorElement: <ErrorPage />,
  children: [...]
}`}
                </pre>
            </div>
        </div>
    );
}

