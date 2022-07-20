import { useEffect, useState } from "react";
import { itemsAPI } from "./api/api";
import { Filters, Table } from "./components";
import Paginator from "./components/common/Paginator/Paginator";

function App() {

  const [sort, setSort] = useState(null)
  const [sortValue, setSortValue] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [itemsData, setItemsData] = useState({items: [], itemsAmount: 1})
const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const getItems =  async () => {
      let items = await itemsAPI.getItems({})
      setItemsData(items)
    }
    getItems()
  }, [])
console.log(itemsData);

  return (
    <div className="App">
      <Filters />
      <Table items={itemsData.items}/>
      <Paginator
        currentPage={currentPage}
        portionSize={5}
        setCurrentPage={setCurrentPage}
        totalItems={itemsData.itemsAmount}
        pageSize={15}
      />
    </div>
  );
}

export default App;
