type ListI = {
  description: string;
  quantity: number;
  packed: boolean;
  id: number;
};

const intialData: ListI[] = [
  { description: "hello hashib", quantity: 10, packed: true, id: 1 },
  { description: "hello hashib", quantity: 10, packed: false, id: 2 },
  { description: "hello hashib", quantity: 10, packed: false, id: 3 },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackagingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Travel List</h1>;
}

function Form() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((ele) => (
          <option key={ele} value={ele}>
            {ele}
          </option>
        ))}
      </select>
      <input type="text" placeholder="text..." />
      <button>Add</button>
    </form>
  );
}

function PackagingList() {
  return (
    <div className="list">
      <ul>
        {intialData.map((ele) => (
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
