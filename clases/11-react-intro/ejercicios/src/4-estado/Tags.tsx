type TagsProps = {
  tags: string[];
};

export default function Tags({ tags }: TagsProps) {
  if (tags.length === 0) return null;

  const visibles = tags.slice(0, 2);
  const restantes = tags.length - visibles.length;

  return (
    <ul className="tags">
      {visibles.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
      {restantes > 0 && <li className="mas">+{restantes}</li>}
    </ul>
  );
}
