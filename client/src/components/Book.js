import React from "react";
import { useState , useRef, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import ListGroup from 'react-bootstrap/ListGroup'
import "../index.css"
import { getCommentsThunk, sendCommentThunk, sendRatingThunk, getRatingThunk, sendFavoriteThunk} from '../redux/booksSlice'
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import {BiHeart} from "react-icons/bi";

import { withRouter } from 'react-router-dom'
function Book(props) {
    const [word,setWord] = useState("")
    const [mail,setMail] = useState("")
    const inputRef = useRef()
    const mailInputRef = useRef()
    let bookId = props.match.params.id
    const books = useSelector(state => state.books.books)
    let token = useSelector(state => state.users.token)
    const comment = useSelector(state => state.books.comments)
    const Rating = useSelector(state => state.books.averageRating)
    const book  = books.find(book => book._id === bookId)
    const dispatch = useDispatch()
    useEffect(() => { dispatch(getCommentsThunk(bookId,token)) }, [])
    useEffect(() => { dispatch(getRatingThunk(bookId,token)) }, [])
    const handleWord = () =>{
         const inputValue =  inputRef.current.value
         const mailValue = mailInputRef.current.value
         dispatch(sendCommentThunk(bookId, inputValue, mailValue, token)) 
    }
    const ratingChanged = (newRating) => {
        console.log(newRating)
        dispatch(sendRatingThunk(bookId, newRating, token))
    };
    const handlefavorite = () => {
        dispatch(sendFavoriteThunk(token,String(bookId)))
    }
      
    return(
        <div className = "container-fluid">
        <div className = "container bookcase">
            
            <div>
         <Card style={{ width: '18rem' , display: "block"}}>
             <Card.Body>
             <Card.Title>{book.title}</Card.Title>
             <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
             <Card.Text>
                 {book.description}
             </Card.Text>
             </Card.Body>
         </Card>

         <div className = "ratingbox">
         <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
            />
            
            </div>
         </div>
         <div>
         <Card.Title className = "RateStar"><FaStar/>{Rating}</Card.Title>
         <Button onClick = {handlefavorite} variant="warning"><BiHeart/></Button>
          </div>
        
    </div>
        <div className = "container commentsbox">
        <div>
         
      <InputGroup className="col-lg-3 ">
          
           <InputGroup.Text  id="inputGroup-sizing-default">Your Comment</InputGroup.Text>
           <FormControl ref ={inputRef} onChange = {e => setWord(e.target.value)} value = {word}
             aria-label="Default"
             aria-describedby="inputGroup-sizing-default"
           />
                
          
           <InputGroup.Text  id="inputGroup-sizing-default">Your Name</InputGroup.Text>
           <FormControl ref ={mailInputRef} onChange = {e => setMail(e.target.value)} value = {mail}
             aria-label="Default"
             aria-describedby="inputGroup-sizing-default"
           />
              <Button onClick = {handleWord} variant="secondary">Submit</Button>
           </InputGroup>
           </div>
           <div><h3>All Coments</h3>{comment && comment.length > 0 && comment.map(comment => {
             return  <ListGroup >
                     <div className = "commentbox"> 
                       
                         <ListGroup.Item variant="secondary">{comment.mail}</ListGroup.Item>
                         <ListGroup.Item variant="warning">{comment.text}</ListGroup.Item>
                     </div>
                     </ListGroup>
           })}</div>
         </div>
      </div> 
    )
}

export default withRouter(Book)

