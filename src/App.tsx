import { useState } from "react";

type ListI = {
  description: string;
  quantity: number;
  packed: boolean;
  id: number;
};

function App() {
  const [item, setItem] = useState<ListI[]>([]);

  const handleAdd = (item: ListI) => {
    setItem((prev) => [...prev, item]);
  };

  const handleDelete = (id: number): void => {
    setItem((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleItem = (id: number): void => {
    setItem((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAdd} />
      <PackagingList
        item={item}
        onDelete={handleDelete}
        onToggle={handleToggleItem}
      />
      <Stats item={item} />
    </div>
  );
}

function Logo() {
  return <h1>Travel List</h1>;
}

interface FormProps {
  onAddItems: (item: ListI) => void;
}

function Form({ onAddItems }: FormProps): JSX.Element {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description) return;

    const newItem: ListI = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    onAddItems(newItem);

    setDescription("");
    setQuantity(0);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((ele) => (
          <option key={ele} value={ele}>
            {ele}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="text..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

interface PackingInterface {
  item: ListI[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}
function PackagingList({ item, onDelete, onToggle }: PackingInterface) {
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
      </div>
    </div>
  );
}

interface itemInterface {
  description: string;
  quantity: number;
  packed: boolean;
  id: number;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}
function Item({
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

function Stats({ item }: { item: ListI[] }) {
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

export default App;
