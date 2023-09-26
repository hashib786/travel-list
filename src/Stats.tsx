import { ListI } from "./App";

export function Stats({ item }: { item: ListI[] }) {
  const numItems = item.length;
  const numPacked = item.reduce((acc, item) => (acc += item.packed ? 1 : 0), 0);

  if (!numItems)
    return (
      <footer className="stats">
        <em>Please add some items</em>
      </footer>
    );

  const percentage = (numPacked / numItems) * 100;

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? `You completed all packing 📦📦`
          : `You have ${numItems} item in your list, and already packed ${numItems}(
        ${percentage}%)`}
      </em>
    </footer>
  );
}
