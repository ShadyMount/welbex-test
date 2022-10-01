import { useEffect, useState } from "react";
import { itemsAPI } from "./api/api";
import { Filters, Table, Paginator, Spinner } from "./components";

function App() {

  const [filterBy, setFilterBy] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [filterCompare, setFilterCompare] = useState('')
  const [itemsData, setItemsData] = useState({items: [], itemsAmount: 1})
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [isFetching, setIsFetching] = useState(false)
  const [fetchingError, setFetchingError] =  useState(null)
  const [orderBy, setOrderBy] = useState('id')
  const [orderDir, setOrderDir] = useState<'ASC' | 'DESC'>('ASC')

  useEffect(() => {
      (async () => {
        try {
          if(!isFetching){
            setIsFetching(true)
            let items = await itemsAPI.getItems({filterBy, filterValue, filterCompare, currentPage, pageSize, orderBy, orderDir})
            const totalPages = Math.ceil(items.itemsAmount / pageSize)
            if(currentPage > totalPages){
              setCurrentPage(totalPages)
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
  }, [filterBy, filterValue, filterCompare, currentPage, pageSize, orderBy, orderDir])


  if(fetchingError) return <div>Fetching data error: {fetchingError} , please try to reload page...</div>
console.log('Cp: ', currentPage, 'PageSize: ', pageSize, 'itemsData.itemsAmount: ', itemsData.itemsAmount);

  return (
    <div className="App">
      <Filters
        isDisabled={isFetching}
        filterBy={filterBy}
        filterCompare={filterCompare}
        filterValue={filterValue}
        setFilterBy={setFilterBy}
        setFilterCompare={setFilterCompare}
        setFilterValue={setFilterValue}
      />
      {isFetching
        ? <Spinner />
        : <>
            <Table
              items={itemsData.items}
              sortBy={orderBy}
              setSortBy={setOrderBy}
              setSortDir={setOrderDir}
              sortDir={orderDir}

            />
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
      
    </div>
  );
}

export default App;
