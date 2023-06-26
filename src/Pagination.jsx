import React from "react";
import classNames from "classnames";
import { DOTS, usePagination } from './usePagination'
import './pagination.scss'

const Pagination = props => {
    const {
        onPageChange,
        pageSize,
        totalCount,
        siblingCount = 1,
        currentPage,
        className


    } = props
    const paginationRange = usePagination({
        pageSize,
        totalCount,
        siblingCount,
        currentPage,
    })
    if (currentPage === 0 || paginationRange?.length < 2) {
        return null
    }

    const onNext = () => {
        onPageChange(currentPage + 1)
    }

    const onPrev = () => {
        onPageChange(currentPage - 1)
    }
    let lastPage = paginationRange[paginationRange?.length - 1]
    //console.log('lastpage',lastPage);
    return (
        <>
            <ul className={classNames('pagination-container', { [className]: className })}>
                {/*Left navigation arrow*/}
                <li className={classNames('pagination-item', { disabled: currentPage === 1 })} onClick={onPrev}>
                    <div className="arrow left" />
                </li>
                {paginationRange.map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                        return <li key={`dot-${index}`} className={"pagination-item-dots"} >...</li>
                    }
                    return (
                        <li key={pageNumber} className={classNames('pagination-item', { selected: pageNumber === currentPage })} onClick={() => onPageChange(pageNumber)}>
                            {pageNumber}
                        </li>
                    )
                })}
                {/*Right navigation arrow*/}

                <li className={classNames('pagination-item', {
                    disabled: currentPage === lastPage
                })}
                    onClick={onNext}>
                    <div className="arrow right" />
                </li>
            </ul>
        </>
    )
}
export default Pagination;