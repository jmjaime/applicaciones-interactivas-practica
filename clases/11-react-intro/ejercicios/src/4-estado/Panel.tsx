import type { ReactNode } from "react";

type PanelProps = {
  titulo: string;
  children: ReactNode;
};

export default function Panel({ titulo, children }: PanelProps) {
  return (
    <section className="panel">
      <h2>{titulo}</h2>
      {children}
    </section>
  );
}
