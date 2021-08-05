 import React, { useEffect} from 'react';
import {useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BookBox from "../components/BookBox";
import Row from 'react-bootstrap/Row';
import PageItem from 'react-bootstrap/PageItem'
import Pagination from 'react-bootstrap/Pagination'
import 'bootstrap/dist/css/bootstrap.min.css';
import {getBooksThunk, getBookCountThunk, updateCurrentPage} from '../redux/actions'

export const AllBooksPage = () =>{
    const books = useSelector(state => state.books.books);
    const limit = useSelector(state => state.books.limit)
    const pageCount = useSelector(state => state.books.pageCount)
    const currentPage = useSelector(state => state.books.currentPage)
    const dispatch = useDispatch();

    useEffect(() => {dispatch(getBookCountThunk())}, [])
    useEffect(() => {dispatch(getBooksThunk(currentPage, limit))}, [currentPage])
    

    const handleChangePage = (newPage) => {
        dispatch(updateCurrentPage(newPage))
    }
    
    let pages = []
    for(let i = 1; i <= pageCount; i++) {
        pages.push(
            {
                number: i,
                ref: `./allbooks?page=${i}`
            }
        )
    }
      
    return(
    <div className = "container-fluid">
         <Row xs={1} md={2} lg={3} className="g-4">
            { books && books.length>0 && books.map(book => {
                   return(
                   <div>
                   <BookBox book = {book} key = {book._id}/> 
                   </div>
                   )
             }) }
            
         
         </Row>
         <div style={{ display: "flex", justifyContent: "center" }}>
         {pages.map(page => 
        
        <Pagination className="pagination pagination-sm"> 
               <Pagination.Item className = "page-item"><Link to={page.ref} className="page-link" onClick={() => handleChangePage(page.number)}>
               {page.number}
             </Link> </Pagination.Item> 
        </Pagination>
            
           )}
           </div>
        {/* <div onClick={handleChangePage}>{pages.map(page => <Link to='./allbooks?page=`>{page}</span>)}</div> */}
     
     
    </div>
      
    )   
}