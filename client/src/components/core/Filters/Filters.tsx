import { Dispatch, FC, SetStateAction, useState } from 'react'
import cn from './Filters.module.scss'

interface IFilters {
  setFilterCompare: Dispatch<SetStateAction<string>>
  setFilterValue: Dispatch<SetStateAction<string>>
  setFilterBy: Dispatch<SetStateAction<string>>
  filterValue: string;
  filterCompare: string;
  filterBy: string;
  isDisabled: boolean

}

export const Filters: FC<IFilters> = ({ setFilterBy, setFilterCompare, setFilterValue, filterBy, filterCompare, filterValue, isDisabled }) => {

  const [currentInputValue, setCurrentInputValue] = useState(filterValue)
  const sortChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(e.target.value)
    setFilterCompare('')
    setFilterValue('')
  }

  const compareChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCompare(e.target.value)
  }

  let timeout : ReturnType<typeof setTimeout>

  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInputValue(e.target.value)
    clearTimeout(timeout)
     timeout = setTimeout(() => {
      setFilterValue(e.target.value)
      }, 1000)
  }
  

  return (
    <div className={cn.filtersWrapper}>
      <select onChange={sortChangeHandler} disabled={isDisabled} value={filterBy}>
        <option value=''>No filter</option>
        <option value={'name'}>Name</option>
        <option value={'quantity'}>Quantity</option>
        <option value={'distance'}>Distance</option>
      </select>
      <select onChange={compareChangeHandler} value={filterCompare} disabled={filterBy === '' || isDisabled}>
        <option value=''>No compare</option>
       {filterBy !== 'name' && (<>
        <option value={'more'}>More than</option>
        <option value={'less'}>Less than</option>
        </>
       )} 
        <option value={'equal'}>Equals</option>
        { filterBy !== 'distance' && filterBy !== 'quantity' && <option value={'contains'}>Contains</option>}

      </select>
      <input disabled={filterBy === '' || filterCompare === ''} value={currentInputValue} onChange={valueChangeHandler} type="text" />
    </div>
  )
}

