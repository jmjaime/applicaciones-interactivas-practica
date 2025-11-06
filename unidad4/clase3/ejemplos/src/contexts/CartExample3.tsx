import { use } from "react";
import { CartContext } from "./CartContext";

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Mouse", price: 29 },
  { id: 3, name: "Teclado", price: 79 },
  { id: 4, name: "Monitor", price: 349 },
];

export function CartExample3() {
  const { state, addItem, removeItem, updateQuantity, clearCart } =
    use(CartContext);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#1a1a1a", borderRadius: "8px" }}>
      <h3>Ejemplo 1.3: Carrito con useReducer</h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "1rem" }}>
        {/* Productos disponibles */}
        <div>
          <h4>🛍️ Productos Disponibles</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                style={{
                  padding: "1rem",
                  backgroundColor: "#2a2a2a",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>{product.name}</strong>
                  <p style={{ color: "#51cf66", margin: 0 }}>${product.price}</p>
                </div>
                <button onClick={() => addItem(product)}>Agregar</button>
              </div>
            ))}
          </div>
        </div>

        {/* Carrito */}
        <div>
          <h4>🛒 Carrito ({state.items.length} items)</h4>
          {state.items.length === 0 ? (
            <p style={{ color: "#888" }}>El carrito está vacío</p>
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: "1rem",
                      backgroundColor: "#2a2a2a",
                      borderRadius: "4px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <strong>{item.name}</strong>
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{ backgroundColor: "#ff6b6b", fontSize: "0.8em" }}
                      >
                        ✕
                      </button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                      <span style={{ marginLeft: "auto", color: "#51cf66" }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ padding: "1rem", backgroundColor: "#2a2a2a", borderRadius: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2em", fontWeight: "bold" }}>
                  <span>Total:</span>
                  <span style={{ color: "#51cf66" }}>${state.total.toFixed(2)}</span>
                </div>
                <button
                  onClick={clearCart}
                  style={{ width: "100%", marginTop: "1rem", backgroundColor: "#ff6b6b" }}
                >
                  Vaciar Carrito
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#2a2a2a", borderRadius: "4px" }}>
        <h4>💡 Context + useReducer</h4>
        <p>Este patrón es ideal para:</p>
        <ul>
          <li><strong>Estado complejo:</strong> Múltiples items con propiedades</li>
          <li><strong>Acciones claras:</strong> ADD, REMOVE, UPDATE, CLEAR</li>
          <li><strong>Lógica centralizada:</strong> Reducer maneja todas las actualizaciones</li>
          <li><strong>Predecible:</strong> Mismo input → mismo output</li>
        </ul>
      </div>
    </div>
  );
}

