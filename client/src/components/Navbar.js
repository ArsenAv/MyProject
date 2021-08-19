import React from 'react';
import { useDispatch} from 'react-redux';
import{NavLink} from 'react-router-dom';
import {logoutUser} from '../redux/userSlice'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.css';
import '../components/Navbar.css'



export const Navbar = () =>{
    const dispatch = useDispatch();
    const logoutHendler = () => {
        dispatch(logoutUser())    
    }
    return(
    <Nav className = "nav ">
        <Nav.Item className = "navitem">
            <Nav.Link eventKey="link-1">
               <NavLink className = "link" to="/books">Books</NavLink> 
            </Nav.Link>
        </Nav.Item>
        <Nav.Item className = "navitem">
            <Nav.Link eventKey="link-2">
               <NavLink className = "link" to="/books/favorites">Favorites</NavLink> 
            </Nav.Link>
        </Nav.Item>
        <Nav.Item >
        <Nav.Link eventKey="link-2">
               <NavLink className = "link" to="/" onClick ={logoutHendler}>Logout</NavLink> 
        </Nav.Link> 
        </Nav.Item>
    </Nav>
        
    )
}
