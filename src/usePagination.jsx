import { useMemo } from "react";


export const DOTS = '...'

const range = (start, end) => {
   let length = end - start + 1
   //console.log('length',length);

   //create an Array of certain length to set elements from start and end value//
   return Array.from({ length }, (_, idx) => idx + start)

}


export const usePagination = ({ totalCount, pageSize, currentPage, siblingCount = 1 }) => {
   const paginationRange = useMemo(() => {
      const totalPageCount = Math.ceil(totalCount / pageSize)
      console.log('totalpage count',totalPageCount);

      const totalPageNumbers = siblingCount + 5
      console.log('totalpage Numbers',totalPageNumbers)
      if (totalPageNumbers >= totalPageCount) {
         return range(1, totalPageCount)


      }
      //console.log( 'total page num',totalPageNumbers)
      //calculate left and right sibling index within range//
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)
      //show dots.....//
      const shouldShowLeftDots = leftSiblingIndex > 2
      const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2
      const firstPageIndex = 1
      const lastPageIndex = totalPageCount
      // const firstPageIndex = (currentPage - 1) * pageSize;
      // const lastPageIndex = firstPageIndex + pageSize;
      //no left dot show but right dot show//

      if (!shouldShowLeftDots && shouldShowRightDots) {
         let leftItemCount = 3 + 2 * siblingCount
         let leftRange = range(1, leftItemCount)
         return [...leftRange, DOTS, totalPageCount]
      }
      //no right dot show but left dot show//
      if (shouldShowLeftDots && !shouldShowRightDots) {
         let rightItemCount = 3 + 2 * siblingCount
         let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
         return [firstPageIndex, DOTS, ...rightRange]
      }

      //both left and right dots shown//
      if (shouldShowLeftDots && shouldShowRightDots) {
         let middleRange = range(leftSiblingIndex, rightSiblingIndex)
         return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex,]
      }
      console.log('middlerange', middleRange)






   }, [totalCount, pageSize, currentPage, siblingCount])
   return paginationRange
}