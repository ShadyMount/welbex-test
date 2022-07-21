import { useEffect, useState } from "react";
import { itemsAPI } from "./api/api";
import { Filters, Table, Paginator, Spinner } from "./components";

function App() {

  const [sortBy, setSortBy] = useState('')
  const [sortValue, setSortValue] = useState('')
  const [sortCompare, setSortCompare] = useState('')
  const [itemsData, setItemsData] = useState({items: [], itemsAmount: 1})
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [isFetching, setIsFetching] = useState(false)
  const [fetchingError, setFetchingError] =  useState(null)

  useEffect(() => {
      (async () => {
        try {
          if(!isFetching){
            setIsFetching(true)
            let items = await itemsAPI.getItems({sortBy, sortValue, sortCompare, currentPage, pageSize})
            if(Math.ceil(items.itemsAmount / pageSize) < Math.ceil(itemsData.itemsAmount / pageSize)){
              setCurrentPage(1)
            }        
            setItemsData(items)
            setIsFetching(false)
          }
        } catch (error: any) {
          setFetchingError(error.message)
          setIsFetching(false)
        }
    })()
    // eslint-disable-next-line
  }, [sortBy, sortValue, sortCompare, currentPage, pageSize])


  if(fetchingError) return <div>Fetching data error: {fetchingError} , please try to reload page...</div>

  return (
    <div className="App">
      <Filters
        isDisabled={isFetching}
        sortBy={sortBy}
        sortCompare={sortCompare}
        sortValue={sortValue}
        setSortBy={setSortBy}
        setSortCompare={setSortCompare}
        setSortValue={setSortValue}
      />
      {isFetching
        ? <Spinner />
        : <>
            <Table items={itemsData.items}/>
            <Paginator
              currentPage={currentPage}
              portionSize={5}
              setCurrentPage={setCurrentPage}
              totalItems={itemsData.itemsAmount}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
        </>
      }
      {/* <Spinner /> */}
      
    </div>
  );
}

export default App;
