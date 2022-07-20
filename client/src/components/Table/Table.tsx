import React, { FC } from 'react'
import cn from './Table.module.css'

interface ITable {
  items: any[]
}
export const Table:FC<ITable> = ({items}) => {
  const [sortConfig, setSortConfig] = React.useState<any>({key: null, direction: null});
  let sortedItems = [...items];
  React.useMemo(() => {
  if (sortConfig !== null) {
    sortedItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }}, [items, sortConfig])

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
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
        {sortedItems.map((item:any)=>(
          <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>{item.distance}</td>
          <td>{item.date}</td>
      </tr>
        ))}
        </tbody>
    </table>
</div>
  )
}