import { useState } from "react";
import { Logo } from "./Logo";
import { Form } from "./Form";
import { PackagingList } from "./PackagingList";
import { Stats } from "./Stats";

export type ListI = {
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

  const handleClear = (): void => {
    setItem([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAdd} />
      <PackagingList
        onReset={handleClear}
        item={item}
        onDelete={handleDelete}
        onToggle={handleToggleItem}
      />
      <Stats item={item} />
    </div>
  );
}

export default App;
