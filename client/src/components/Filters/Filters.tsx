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
            <option value={'more'}>{'>'}</option>
            <option value={'less'}>{'<'}</option>
            <option value={'equal'}>{'='}</option>
        </select>
        <input onChange={(e)=> console.log(e.target.value)} type="text" />
    </div>
  )
}

