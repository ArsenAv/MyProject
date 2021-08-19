import React from 'react'
import { useSelector, useDispatch,} from "react-redux"
import { useEffect} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { getFavoritesThunk} from '../redux/booksSlice'


export const Favorites = () =>{
    const dispatch = useDispatch()
    let token = useSelector(state => state.users.token)
    const favorites = useSelector(state => state.books.favorites)
    useEffect(() => { dispatch(getFavoritesThunk(token)) }, [])
 
    
    console.log(favorites)

   
  
    
    return(
      <div className = "container-fluid">
            <Row xs={1} md={2} lg={3} className="g-4">
                { favorites && favorites.length > 0 && favorites.map(favorite => {
                    return(
                            <div>
                                    <Col>
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Body>
                                            <Card.Title >{favorite.title}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{favorite.author}</Card.Subtitle>
                                            <Accordion defaultActiveKey="0">
                                                <Accordion.Item eventKey="1">
                                                <Accordion.Header>About the book</Accordion.Header>
                                                    <Accordion.Body>
                                                                    {favorite.description}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                </Accordion> 
                                            </Card.Body>
                                        </Card>
                                    </Col>
                            </div>
                    )
                }) }
            </Row>

      </div>
    )
}