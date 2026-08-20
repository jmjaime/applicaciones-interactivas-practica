import { createInterface } from "node:readline/promises";

/**
 * Corre un paso de la demo: imprime un título, ejecuta `fn` y pausa hasta
 * que el profesor apriete Enter (si hay una terminal interactiva). Pensado
 * para reemplazar el debugger en las demos en vivo: cada paso queda aislado
 * en pantalla antes de pasar al siguiente.
 */
export async function paso(
  titulo: string,
  fn: () => void | Promise<void>
): Promise<void> {
  console.log(`\n▶ ${titulo}`);
  await fn();
  await esperarEnter();
}

async function esperarEnter(): Promise<void> {
  if (!process.stdin.isTTY) return;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  await rl.question("   ⏎ Enter para continuar...");
  rl.close();
}
