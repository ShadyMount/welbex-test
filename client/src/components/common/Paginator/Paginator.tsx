import React, { useState, FC } from 'react'
import classes from './Paginator.module.css'

interface IPaginator {
    totalItems: number,
    portionSize: number,
    currentPage: number,
    pageSize: number,
    setCurrentPage: (p: number, currentPage: number) => void
}

const Paginator:FC<IPaginator> = ({totalItems, portionSize = 5, currentPage, setCurrentPage, pageSize}) => {
    const totalPages = Math.ceil(totalItems / pageSize)   
    let pages = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    } //устанавливаем количество страниц
    let portionCount = Math.ceil(totalPages / portionSize)

    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionNumber = portionNumber * portionSize
    
    return (      
            <div className={classes.Pages}>
                {portionNumber > 1 &&
                <button onClick={()=>{setPortionNumber(portionNumber - 1)}}>предыдущие</button>
                }
                Страницы: {pages
                .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
                .map(p => {
                    return <div key={p} className={currentPage === p ? classes.Selected : classes.PageNumber}
                        onClick={() => { setCurrentPage(p, currentPage) }}
                    >{p}</div>
                })}
                {portionCount > portionNumber &&
                <button onClick={()=>{setPortionNumber(portionNumber + 1)}}>следующие</button>
                }
            </div>
    )
}

export default Paginator