import React from 'react'
import cn from './Table.module.css'

export const Table = () => {
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
        <tr>
            <td>Content 1</td>
            <td>Content 1</td>
            <td>Content 1</td>
            <td>Content 1</td>
            <td>Content 1</td>
        </tr>
        </tbody>
    </table>
</div>
  )
}