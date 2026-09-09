import { AppDataSource } from "../src/db/data-source";
import { Inmobiliaria } from "../src/entities/Inmobiliaria";
import { TipoPropiedad, Operacion, Moneda } from "../src/entities/Propiedad";

// Fixtures compartidas entre los archivos de test de este ejercicio. No
// es un `.spec.ts` a propósito (ver jest.config.ts: testMatch solo corre
// `*.spec.ts`) — así puede vivir en __tests__/ sin que Jest lo trate como
// una suite vacía.

export async function crearInmobiliaria() {
  return AppDataSource.getRepository(Inmobiliaria).save({
    nombreFantasia: `Inmobiliaria ${Date.now()}-${Math.random()}`,
    telefono: "1122334455",
    email: "contacto@inmobiliaria.com",
  });
}

export function propiedadValida(inmobiliariaId: number) {
  return {
    titulo: "Depto 2 ambientes en Palermo",
    tipo: TipoPropiedad.DEPARTAMENTO,
    operacion: Operacion.VENTA,
    precio: 120000,
    moneda: Moneda.USD,
    direccion: "Av. Santa Fe 3000",
    zona: "Palermo",
    superficieTotal: 55,
    inmobiliariaId,
  };
}
