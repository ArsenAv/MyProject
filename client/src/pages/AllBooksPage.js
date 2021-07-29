import React, { useState } from 'react';
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector, useDispatch, useCallback} from "react-redux";
import { fetchData} from '../redux/actions';
import {changeBooks} from '../redux/actions'
const axios = require('axios')

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
// function downloadBooks(dispatch) {
//     return axios.get('http://localhost:5000/api/auth/books')
//       .then(({ data }) => {
//           alert("response data: " + JSON.stringify(data))
//         dispatch(changeBooks(data.data));
//     });
// }
export const AllBooksPage = () =>{
    const dispatch = useDispatch();
    // downloadBooks(dispatch)
    dispatch(fetchData())
    sleep(2000)
    const books = useSelector(state => state.allbooks);
    
    console.log("books: " + JSON.stringify(useSelector(state => state)))
    //  const book = books.reduce(book => {
    //     return books
    // });
 
    return(
    <div className = "container-fluid">
     {/* <Card style={{ width: '18rem' }}>
        <Card.Body>
         <Card.Title></Card.Title>
         <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
         <Card.Text>
           
          </Card.Text>
         </Card.Body>
     </Card> */}

    </div>
      
    )
    
}
