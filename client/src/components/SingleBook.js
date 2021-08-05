import React from "react";
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
export default function SingleBook({book}) {
    return(
    <Col>
         <Card style={{ width: '18rem' }}>
             <Card.Body>
             <Card.Title>{book.title}</Card.Title>
             <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
             <Card.Text>
                  {book.description}
             </Card.Text>
             </Card.Body>
         </Card>
     </Col>
    )
}