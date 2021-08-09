import React, { useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BookBox from "../components/BookBox";
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination'
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'
import Img1 from "../CaruselImg/Img1.jpg"
import Img2 from "../CaruselImg/Img2.jpg"
import Img3 from "../CaruselImg/Img3.jpg"
import { getBooksThunk, getBookCountThunk, updateCurrentPage } from '../redux/booksSlice'


export const Books = () =>{
    const books = useSelector(state => state.books.books);
    const limit = useSelector(state => state.books.limit)
    const pageCount = useSelector(state => state.books.pageCount)
    const currentPage = useSelector(state => state.books.currentPage)
    const dispatch = useDispatch();

    useEffect(() => { dispatch(getBookCountThunk()) }, [])
    useEffect(() => { dispatch(getBooksThunk(currentPage, limit)) }, [currentPage])
    
    const handleChangePage = (newPage) => {
        dispatch(updateCurrentPage(newPage))
    }
    
    let pages = []
    for(let i = 1; i <= pageCount; i++) {
        pages.push(
            {
                number: i,
                ref: `./books?page=${i}`
            }
        )
    }
      
    return(
        <div className = "container-fluid">
             <div style={{ display: 'block', width: "80%", padding: 30 , margin: "0 auto"}}>
                <Carousel >
                <Carousel.Item >
                    <img
                    className="d-block w-100"
                    src= {Img1}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={Img2}
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src= {Img3}
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
                </div>
            <Row xs={1} md={2} lg={3} className="g-4">
                { books && books.length > 0 && books.map(book => {
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
                        <Pagination.Item className = "page-item">
                            <Link to={page.ref} className="page-link" onClick={() => handleChangePage(page.number)}>
                        {page.number}
                        </Link> </Pagination.Item> 
                    </Pagination>
                
                )}
            </div>
        </div>
    )   
}