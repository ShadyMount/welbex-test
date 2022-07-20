import { useState } from "react";
import { itemsAPI } from "./api/api";
import { Filters, Table } from "./components";

function App() {

  const [sort, setSort] = useState(null)
  const [sortValue, setSortValue] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  
  const getItems= async () => {
    let items = await itemsAPI.getItems({})
    console.log('items: ', items);
    
    return items
  }

  return (
    <div className="App">
      <Filters />
      <Table />
    </div>
  );
}

export default App;
