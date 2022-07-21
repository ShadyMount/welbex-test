import React, { useState, FC } from 'react'
import classes from './Paginator.module.css'

interface IPaginator {
    totalItems: number,
    portionSize: number,
    currentPage: number,
    pageSize: number,
    setCurrentPage: (p: number, currentPage: number) => void,
    setPageSize: (p:number) => void
}

export const Paginator:FC<IPaginator> = ({totalItems, portionSize = 5, currentPage, setCurrentPage, pageSize, setPageSize}) => {
    const totalPages = Math.ceil(totalItems / pageSize)   
    let pages = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    } //set pages amount
    let portionCount = Math.ceil(totalPages / portionSize)

    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionNumber = portionNumber * portionSize
    
    return (<>
            <div className={classes.Pages}>
                {portionNumber > 1 &&
                <button onClick={()=>{setPortionNumber(portionNumber - 1)}}>prev</button>
                }
                Pages: {pages
                .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
                .map(p => {
                    return <div key={p} className={currentPage === p ? classes.Selected : classes.PageNumber}
                        onClick={() => { setCurrentPage(p, currentPage) }}
                    >{p}</div>
                })}
                {portionCount > portionNumber &&
                <button onClick={()=>{setPortionNumber(portionNumber + 1)}}>next</button>
                }
            </div>
            <label className={classes.itemsOnPage} >
            items on page:
            <select value={pageSize} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPageSize(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
            </select>
            </label>
            </>
    )
}