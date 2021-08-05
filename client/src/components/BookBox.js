import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col'
import SingleBook from "./SingleBook";
export default function BookBox({book}) {
    // const toBookLink = (e) => {
    //     e.preventDefault();
    //     history.push('/your-route');
    // };
    return(
      
    <Col>
         <Card style={{ width: '18rem' }}>
             <Card.Body>
             <Card.Title>{book.title}</Card.Title>
             {/* <Link to={`/book/${book._id}`} onClick = {toBookLink}><Card.Title>{book.title}</Card.Title></Link> */}
             <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
             <Card.Text>
                  {book.description}
             </Card.Text>
             </Card.Body>
         </Card>
     </Col>
    )
}