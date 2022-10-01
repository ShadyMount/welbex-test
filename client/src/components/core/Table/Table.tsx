import { FC } from 'react'
import cn from './Table.module.css'

interface ITable {
  items: any[],
  sortBy: string,
  setSortBy: (sortBy: string) => void
  sortDir: 'ASC' | 'DESC'
  setSortDir: (sortDir: 'ASC' | 'DESC') => void
}
export const Table:FC<ITable> = ({items, setSortBy, setSortDir, sortBy, sortDir}) => {

  const requestSort = (key: string) => {
    let direction: 'ASC' | 'DESC' = "ASC";
    if (sortBy === key && sortDir === 'ASC') {
      direction = 'DESC';
    }
    setSortBy(key)
    setSortDir(direction);
  }


  return (
    <div className={cn.tableWrapper}>
    <table className={cn.flTable}>
        <thead>
        <tr>
            <th>№</th>
            <th className={cn.clickable} onClick={() => requestSort('name')}>Name</th>
            <th className={cn.clickable} onClick={() => requestSort('quantity')}>Quantity</th>
            <th className={cn.clickable} onClick={() => requestSort('distance')}>Distance</th>
            <th>Date</th>
        </tr>
        </thead>
        <tbody>
        {items.map((item:any)=>(
          <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>{item.distance}</td>
          <td>{new Date(item.date).toLocaleDateString()}</td>
      </tr>
        ))}
        </tbody>
    </table>
</div>
  )
}