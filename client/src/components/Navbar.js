import React, { useContext } from 'react';
import{NavLink, useHistory} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


export const Navbar = () =>{
    const history = useHistory();
    const auth = useContext(AuthContext);
    const logoutHendler = event =>{
        event.preventDefault();
        auth.logout();
        history.push('/')
    }
    return(
        <nav>
            <div className="nav-wrapper green darken-1 ">
              <a href="#" className="brand-logo">MyLibrary</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/allbooks">AllBooks</NavLink></li>
                <li><NavLink to="/book">Books</NavLink></li>
                <li><a href="/" onClick ={logoutHendler}>LogOut</a></li>
              </ul>
            </div>
        </nav>
        
    )
}