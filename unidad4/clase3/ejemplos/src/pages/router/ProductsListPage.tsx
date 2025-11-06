import { useSearchParams, Link } from "react-router-dom";

const ALL_PRODUCTS = [
    { id: 1, name: "Laptop Pro", category: "electronics", price: 1299 },
    { id: 2, name: "Smartphone X", category: "electronics", price: 899 },
    { id: 3, name: "Camiseta Premium", category: "clothing", price: 29 },
    { id: 4, name: "Jeans Classic", category: "clothing", price: 79 },
    { id: 5, name: "React in Action", category: "books", price: 39 },
    { id: 6, name: "TypeScript Deep Dive", category: "books", price: 45 },
];

export function ProductsListPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const sort = searchParams.get("sort") || "name";
    const search = searchParams.get("search") || "";

    const filteredProducts = ALL_PRODUCTS
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sort === "price-asc") return a.price - b.price;
            if (sort === "price-desc") return b.price - a.price;
            return a.name.localeCompare(b.name);
        });

    return (
        <div>
            <div style={{ marginBottom: "2rem" }}>
                <h2>Todos los Productos ({filteredProducts.length})</h2>

                <div style={{
                    display: "flex",
                    gap: "1rem",
                    marginTop: "1rem",
                    flexWrap: "wrap"
                }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "0.5rem", color: "#aaa" }}>
                            Buscar:
                        </label>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearchParams(prev => {
                                    if (e.target.value) {
                                        prev.set("search", e.target.value);
                                    } else {
                                        prev.delete("search");
                                    }
                                    return prev;
                                });
                            }}
                            placeholder="Nombre del producto..."
                            style={{ width: "250px" }}
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", marginBottom: "0.5rem", color: "#aaa" }}>
                            Ordenar por:
                        </label>
                        <select
                            value={sort}
                            onChange={(e) => {
                                setSearchParams(prev => {
                                    prev.set("sort", e.target.value);
                                    return prev;
                                });
                            }}
                            style={{ width: "200px" }}
                        >
                            <option value="name">Nombre</option>
                            <option value="price-asc">Precio: Menor a Mayor</option>
                            <option value="price-desc">Precio: Mayor a Menor</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-3">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        style={{
                            display: "block",
                            padding: "1.5rem",
                            backgroundColor: "#1a1a1a",
                            borderRadius: "8px",
                            border: "1px solid #444"
                        }}
                    >
                        <h3 style={{ marginBottom: "0.5rem", fontSize: "1.1em" }}>
                            {product.name}
                        </h3>
                        <p style={{ color: "#888", fontSize: "0.9em", marginBottom: "0.5rem" }}>
                            {product.category}
                        </p>
                        <p style={{ fontSize: "1.3em", color: "#51cf66", fontWeight: "bold" }}>
                            ${product.price}
                        </p>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <p style={{ textAlign: "center", color: "#888", padding: "3rem" }}>
                    No se encontraron productos
                </p>
            )}

            <div style={{
                marginTop: "2rem",
                padding: "1rem",
                backgroundColor: "#1a1a1a",
                borderRadius: "8px"
            }}>
                <h4>💡 Query Parameters en acción</h4>
                <p style={{ color: "#aaa", marginTop: "0.5rem" }}>
                    URL actual: <code>?{searchParams.toString() || "(sin parámetros)"}</code>
                </p>
            </div>
        </div>
    );
}

