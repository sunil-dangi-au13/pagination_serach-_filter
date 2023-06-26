import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './style.scss'
import data from '../src/data/mock-data.json'
import Pagination from './Pagination'
const pageSize = 10
function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState("")
  const[filterCount,setFilterCount]= useState(1)
  // const[myData,setMyData]= useState([])
  // const[fetchData,setFechData]= useState([])
  //let pageSize = pageNumber => setCurrentPage(pageNumber)

  // useEffect(()=>{
  //   setMyData(data)
  //   let fetchData = <tbody/>
  //   setFechData(fetchData)
  // },[])
  const currentTableData = useMemo(() => {
     const firstPageIndex = (currentPage - 1) * pageSize
     const lastpageIndex = firstPageIndex + pageSize
    //const lastpageIndex = currentPage * PageSize
    //const firstPageIndex = lastpageIndex - PageSize
    //const currentdata = fetchData.slice(firstPageIndex,lastpageIndex)
    
    const copyData = [...data]
    const filteredData = copyData?.filter((el) => {
      // setFilterCount(filterCount + 1)

      if (searchValue === '') {
        return el;
      }


      else {
        return el.first_name.toLowerCase().includes(searchValue) || el.last_name.toLowerCase().includes(searchValue) || el.email.toLowerCase().includes(searchValue)
      }
       
    },
     

    
    )
    console.log('length',filteredData.length);
      // const filtercount = filterCount(filteredData?.length)
      // setFilterCount(filtercount)
      // console.log('filter count',filterCount);
      setFilterCount(filteredData?.length)

    return filteredData.slice(firstPageIndex, lastpageIndex)
    

  }, [currentPage, searchValue])




  const handleSearch = (e) => {
    let lowerCase = e.target.value.toLowerCase()
    setSearchValue(lowerCase)
  }

  // const handleSearch = (searchValue)=>{
  //  const result = data.filter((item)=>item.first_name.toLowerCase().includes(searchValue))
  // setFilterData(result)
  // }


console.log('currentTable data', currentTableData);
//console.log('filter length', setFilterCount(filterCount));

  return (

    <>
    <h2>Pagination & Search Filter</h2>
      <input
        type="text"
        placeholder="Search"
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
          </tr>
        </thead>
        <tbody >
          {currentTableData?.map(item => {
            return (
              <tr key={item?.id}>
                <td>{item?.id}</td>
                <td>{item?.first_name}</td>
                <td>{item?.last_name}</td>
                <td>{item?.email}</td>
                <td>{item?.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
       <Pagination
        className='pagination-bar'
        currentPage={currentPage}
        totalCount= {filterCount}
        pageSize={pageSize}
        onPageChange={page => setCurrentPage(page)}
      /> 
      
      {/* <Pagination  
      className = 'pagination-bar'
      currentPage = {currentPage}
      totalCount = {data.length}
      pageSize = {PageSize}
      onPageChange = {page =>setCurrentPage(page)}
      /> */}
    </>
  )
}

export default App
