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
  return (
    <div className="add-form">
      <h3>What do you need for your trip?</h3>
    </div>
  );
}

function PackagingList() {
  return <div className="list">list</div>;
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X item in your list, and already packed X(X%)</em>
    </footer>
  );
}

export default App;
