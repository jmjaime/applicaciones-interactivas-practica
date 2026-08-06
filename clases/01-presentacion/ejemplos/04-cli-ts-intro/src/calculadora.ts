import { calcular } from "./operaciones";

const [operacion, aStr, bStr] = process.argv.slice(2);
const a = Number(aStr);
const b = Number(bStr);

const resultado = calcular(operacion, a, b);

if (resultado === undefined) {
  console.error(`Operación desconocida: "${operacion}". Usar: sumar, restar`);
} else {
  console.log(resultado);
}
