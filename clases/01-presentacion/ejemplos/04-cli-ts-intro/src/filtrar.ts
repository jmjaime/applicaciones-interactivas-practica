import fs from "fs";
import path from "path";

type Persona = { nombre: string; edad: number; activo: boolean };

const [campo, valor] = process.argv.slice(2);

const ruta = path.join(__dirname, "..", "data", "personas.json");
const personas: Persona[] = JSON.parse(fs.readFileSync(ruta, "utf-8"));

function coincide(persona: Persona): boolean {
  if (campo === "activo") return persona.activo === (valor === "true");
  // TODO: agregar el caso "nombre" (comparar persona.nombre con valor)
  return false;
}

const resultado = personas.filter(coincide);

console.log(resultado);
