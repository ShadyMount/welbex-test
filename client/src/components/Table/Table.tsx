import React, { FC } from 'react'
import cn from './Table.module.css'

interface ITable {
  items: any[]
}
export const Table:FC<ITable> = ({items}) => {
  return (
    <div className={cn.tableWrapper}>
    <table className={cn.flTable}>
        <thead>
        <tr>
            <th>№</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Distance</th>
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
          <td>{item.date}</td>
      </tr>
        ))}
        </tbody>
    </table>
</div>
  )
}