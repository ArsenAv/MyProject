import React from "react"
import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
export default function BookBox({book}) {
   
    return(
      
    <Col>
         <Card style={{ width: '18rem' }}>
             <Card.Body>
             <Link to = {`/books/${book._id}`}><Card.Title >{book.title}</Card.Title></Link>
             <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
             <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="1">
                <Accordion.Header>About the book</Accordion.Header>
                    <Accordion.Body>
                                    {book.description}
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion> 
             </Card.Body>
         </Card>
     </Col>
    )
}
