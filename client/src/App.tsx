import { useState } from "react";
import { Filters, Table } from "./components";

function App() {
  const [sort, setSort] = useState(null)
  const [sortValue, setSortValue] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  
  return (
    <div className="App">
      <Filters />
      <Table />
    </div>
  );
}

export default App;
