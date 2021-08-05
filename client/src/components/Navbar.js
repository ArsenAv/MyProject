import React, { useContext } from 'react';
import{NavLink, useHistory} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.css';
import '../components/Navbar.css'


export const Navbar = () =>{
    const history = useHistory();
    const auth = useContext(AuthContext);
    const logoutHendler = event =>{
        event.preventDefault();
        auth.logout();
        history.push('/')
    }
    return(
    <Nav className = "nav ">
        <Nav.Item className = "navitem">
            <Nav.Link eventKey="link-1">
               <NavLink className = "link" to="/allbooks">AllBooks</NavLink> 
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link eventKey="link-2">
             <NavLink className = "link" to="/book">Books</NavLink>
        </Nav.Link>
        </Nav.Item>
        <Nav.Item >
        <Nav.Link eventKey="link-3"><span href="/"  className = "link" onClick ={logoutHendler}>LogOut</span></Nav.Link>
        </Nav.Item>
    </Nav>
        
    )
}
