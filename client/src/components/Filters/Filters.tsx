import cn from './Filters.module.scss'

export const Filters = () => {
  return (
    <div className={cn.filtersWrapper}>
        <select onChange={(e)=> console.log(e.target.value)}>
            <option value={'name'}>Name</option>
            <option value={'quantity'}>Quantity</option>
            <option value={'distance'}>Distance</option>
        </select>
        <select onChange={(e)=> console.log(e.target.value)}>
            <option value={'more'}>More than</option>
            <option value={'less'}>Less than</option>
            <option value={'equal'}>Equals</option>
            <option value={'contains'}>Contains</option>

        </select>
        <input onChange={(e)=> console.log(e.target.value)} type="text" />
    </div>
  )
}

