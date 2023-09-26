import { useState } from "react";
import { ListI } from "./App";
import { Item } from "./Item";

interface PackingInterface {
  item: ListI[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onReset: () => void;
}
export function PackagingList({
  item,
  onDelete,
  onToggle,
  onReset,
}: PackingInterface) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItem: ListI[] = [];
  if (sortBy === "input") sortedItem = item;

  if (sortBy === "description")
    sortedItem = item
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packing")
    sortedItem = item.sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItem.map((ele) => (
          <Item {...ele} key={ele.id} onDelete={onDelete} onToggle={onToggle} />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort By Input</option>
          <option value="description">Sort By Description</option>
          <option value="packing">Sort By Packing</option>
        </select>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}
