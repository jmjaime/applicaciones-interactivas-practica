// Ejercicio 3.1 — ver README.md de esta carpeta.
type TagsProps = {
  tags: string[];
};

export default function Tags({ tags }: TagsProps) {
  // TODO: los dos primeros tags y "+N" si hay más; sin tags, no se dibuja nada
  return <p className="mensaje">Pendiente: {tags.length} tags</p>;
}
