// Datos fijos adentro del componente: sirve para ver la pieza, pero
// todas las cards salen iguales. Los props (ejemplo 2.2) resuelven eso.
export default function Card() {
  return (
    <article className="card">
      <img src="https://picsum.photos/seed/prop2/400/260" alt="Casa con jardín y pileta" />
      <div className="card-body">
        <div className="card-precio">
          <strong>USD 285.000</strong>
          <button className="fav" type="button" aria-label="Favorito">
            ❤️
          </button>
        </div>
        <h2>Casa con jardín y pileta</h2>
        <p>Villa Devoto · Venta</p>
      </div>
    </article>
  );
}
