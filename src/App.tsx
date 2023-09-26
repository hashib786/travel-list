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

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAdd} />
      <PackagingList item={item} />
      <Stats />
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
  const [quantity, setQuantity] = useState(0);

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

function PackagingList({ item }: { item: ListI[] }) {
  return (
    <div className="list">
      <ul>
        {item.map((ele) => (
          <Item {...ele} key={ele.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ description, quantity, packed, id }: ListI) {
  console.log(description, quantity, packed, id);
  return (
    <li>
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <span>❌</span>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X item in your list, and already packed X(X%)</em>
    </footer>
  );
}

export default App;
