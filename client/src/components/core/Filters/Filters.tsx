import { Dispatch, FC, SetStateAction } from 'react'
import cn from './Filters.module.scss'

interface IFilters {
  setSortCompare: Dispatch<SetStateAction<string>>
  setSortValue: Dispatch<SetStateAction<string>>
  setSortBy: Dispatch<SetStateAction<string>>
  sortValue: string;
  sortCompare: string;
  sortBy: string

}

export const Filters: FC<IFilters> = ({ setSortBy, setSortCompare, setSortValue, sortBy, sortCompare, sortValue }) => {

  const sortChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
    setSortCompare('')
    setSortValue('')
  }

  const compareChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCompare(e.target.value)
  }

  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortValue(e.target.value)
  }


  return (
    <div className={cn.filtersWrapper}>
      <select onChange={sortChangeHandler} value={sortBy}>
        <option value=''>No filter</option>
        <option value={'name'}>Name</option>
        <option value={'quantity'}>Quantity</option>
        <option value={'distance'}>Distance</option>
      </select>
      <select onChange={compareChangeHandler} value={sortCompare} disabled={sortBy === ''}>
        <option value=''>No compare</option>
       {sortBy !== 'name' && (<>
        <option value={'more'}>More than</option>
        <option value={'less'}>Less than</option>
        </>
       )} 
        <option value={'equal'}>Equals</option>
        { sortBy !== 'distance' && sortBy !== 'quantity' && <option value={'contains'}>Contains</option>}

      </select>
      <input disabled={sortBy === '' || sortCompare === ''} value={sortValue} onChange={valueChangeHandler} type="text" />
    </div>
  )
}

