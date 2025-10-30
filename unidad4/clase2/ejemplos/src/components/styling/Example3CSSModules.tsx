import { useState } from 'react'
import styles from './Example3CSSModules.module.css'

/**
 * Ejemplo 1.3: CSS Modules
 * 
 * Demuestra el uso de CSS Modules para estilos scoped.
 * Los nombres de clase se transforman automáticamente para evitar conflictos.
 */

interface Product {
    id: number
    name: string
    price: number
    inStock: boolean
}

const products: Product[] = [
    { id: 1, name: 'Laptop Gaming', price: 1200, inStock: true },
    { id: 2, name: 'Mouse Inalámbrico', price: 45, inStock: true },
    { id: 3, name: 'Teclado Mecánico', price: 89, inStock: false },
    { id: 4, name: 'Monitor 4K', price: 450, inStock: true },
]

export default function Example3CSSModules() {
    const [selectedId, setSelectedId] = useState<number | null>(null)

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Ejemplo 1.3: CSS Modules</h2>

            <p className={styles.description}>
                CSS Modules transforman los nombres de clase para que sean únicos.
                Por ejemplo: <code>card</code> → <code>Example3CSSModules_card__a1b2c3</code>
            </p>

            <div className={styles.grid}>
                {products.map(product => (
                    <div
                        key={product.id}
                        className={`${styles.card} ${selectedId === product.id ? styles.selected : ''} ${!product.inStock ? styles.outOfStock : ''}`}
                        onClick={() => setSelectedId(product.id)}
                    >
                        <h3 className={styles.productName}>{product.name}</h3>
                        <p className={styles.price}>${product.price}</p>

                        {product.inStock ? (
                            <span className={styles.badge}>En Stock</span>
                        ) : (
                            <span className={`${styles.badge} ${styles.outOfStockBadge}`}>
                                Agotado
                            </span>
                        )}

                        {selectedId === product.id && (
                            <div className={styles.selectedIndicator}>✓ Seleccionado</div>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.infoBox}>
                <h4>✅ Ventajas de CSS Modules:</h4>
                <ul>
                    <li>Estilos scoped por componente</li>
                    <li>No hay conflictos de nombres globales</li>
                    <li>Soporta todas las características de CSS</li>
                    <li>Autocompletado en TypeScript</li>
                </ul>
            </div>

            <div className={styles.codeExample}>
                <h4>Cómo usar:</h4>
                <pre>{`import styles from './Mi.module.css'

<div className={styles.miClase}>
  {/* Clases condicionales */}
  <div className={\`\${styles.base} \${activo ? styles.activo : ''}\`}>
  </div>
</div>`}</pre>
            </div>
        </div>
    )
}

