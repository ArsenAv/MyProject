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
import { getCommentsThunk, sendCommentThunk } from '../redux/booksSlice'

import { withRouter } from 'react-router-dom'
function Book(props) {
    const [word,setWord] = useState("")
    const [mail,setMail] = useState("")
    const inputRef = useRef()
    const mailInputRef = useRef()
    const bookId = props.match.params.id
    const books = useSelector(state => state.books.books)
    const comment = useSelector(state => state.books.comments)
    const book = books.find(book => book._id === bookId)
    const dispatch = useDispatch();

    useEffect(() => { dispatch(getCommentsThunk(bookId)) }, [])
   
    const handleWord = () =>{
         const inputValue =  inputRef.current.value
         const mailValue = mailInputRef.current.value
         dispatch(sendCommentThunk(bookId, inputValue, mailValue)) 
    }
   
    return(
        <div className = "container-fluid bookcase">
            <div className = "row">
            <div className = "col-md-6">
         <Card style={{ width: '18rem' , display: "block"}}>
             <Card.Body>
             <Card.Title>{book.title}</Card.Title>
             <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
             <Card.Text>
                 
                 {book.description}
             </Card.Text>
             </Card.Body>
         </Card>
         </div>
        <div className = "col-md-6">
         <InputGroup className="col-lg-3 ">
             
              <InputGroup.Text  id="inputGroup-sizing-default">Your Comment</InputGroup.Text>
              <FormControl ref ={inputRef} onChange = {e => setWord(e.target.value)} value = {word}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
                   
             
              <InputGroup.Text  id="inputGroup-sizing-default">Your Mail</InputGroup.Text>
              <FormControl ref ={mailInputRef} onChange = {e => setMail(e.target.value)} value = {mail}
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
                 <Button onClick = {handleWord} variant="secondary">Submit</Button>
              </InputGroup>
              </div>
              <div>{comment && comment.length > 0 && comment.map(comment => {
                    return <ListGroup>
                                <ListGroup.Item variant="warning"><span>{comment.mail}:</span>{comment.text}</ListGroup.Item>
                           </ListGroup>
              })}</div>
         </div>
        </div>
    )
}

export default withRouter(Book)

