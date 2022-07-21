import { Dispatch, FC, SetStateAction, useState } from 'react'
import cn from './Filters.module.scss'

interface IFilters {
  setSortCompare: Dispatch<SetStateAction<string>>
  setSortValue: Dispatch<SetStateAction<string>>
  setSortBy: Dispatch<SetStateAction<string>>
  sortValue: string;
  sortCompare: string;
  sortBy: string;
  isDisabled: boolean

}

export const Filters: FC<IFilters> = ({ setSortBy, setSortCompare, setSortValue, sortBy, sortCompare, sortValue, isDisabled }) => {

  const [currentInputValue, setCurrentInputValue] = useState(sortValue)
  const [isTyping, setIsTyping] = useState(false)
  const sortChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
    setSortCompare('')
    setSortValue('')
  }

  const compareChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCompare(e.target.value)
  }

  let timeout : ReturnType<typeof setTimeout>
  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout)
    setCurrentInputValue(e.target.value)
    timeout = setTimeout(() => {
      setSortValue(currentInputValue)
      }, 1000)
  }
  

  return (
    <div className={cn.filtersWrapper}>
      <select onChange={sortChangeHandler} disabled={isDisabled} value={sortBy}>
        <option value=''>No filter</option>
        <option value={'name'}>Name</option>
        <option value={'quantity'}>Quantity</option>
        <option value={'distance'}>Distance</option>
      </select>
      <select onChange={compareChangeHandler} value={sortCompare} disabled={sortBy === '' || isDisabled}>
        <option value=''>No compare</option>
       {sortBy !== 'name' && (<>
        <option value={'more'}>More than</option>
        <option value={'less'}>Less than</option>
        </>
       )} 
        <option value={'equal'}>Equals</option>
        { sortBy !== 'distance' && sortBy !== 'quantity' && <option value={'contains'}>Contains</option>}

      </select>
      <input disabled={sortBy === '' || sortCompare === ''} value={currentInputValue} onChange={valueChangeHandler} type="text" />
    </div>
  )
}

