import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes';
import {Navbar} from './components/Navbar'
import {authThunk} from './redux/userSlice'
import "./index.css"


function App() {
    const dispatch = useDispatch();
   
     
    const isAuth = useSelector(state => state.users.isAuthenticated)
    const routes = useRoutes(isAuth);
     return (
          <Router>
            
              {isAuth && <Navbar/>}
            <div className = "container-fluid ">
                {routes}
             </div>
             
         </Router>
 
     )
}

export default App;
