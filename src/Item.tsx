interface itemInterface {
  description: string;
  quantity: number;
  packed: boolean;
  id: number;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}
export function Item({
  description,
  quantity,
  packed,
  id,
  onDelete,
  onToggle,
}: itemInterface) {
  return (
    <li>
      <input
        type="checkbox"
        checked={packed}
        value={packed ? "Yes" : "No"}
        onChange={() => onToggle(id)}
      />
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button onClick={() => onDelete(id)}>❌</button>
    </li>
  );
}
