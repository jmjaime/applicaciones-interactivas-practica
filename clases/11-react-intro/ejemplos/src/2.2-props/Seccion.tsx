import type { ReactNode } from "react";

type SeccionProps = {
  titulo: string;
  children: ReactNode;
};

// No sabe qué contiene: el padre rellena el "hueco" con children.
export default function Seccion({ titulo, children }: SeccionProps) {
  return (
    <section className="seccion">
      <h2>{titulo}</h2>
      {children}
    </section>
  );
}
