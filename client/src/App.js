import React from 'react'
import { useSelector} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes';
import {Navbar} from './components/Navbar'
import "./index.css"


function App() {
  
   
     
    const isAuth = useSelector(state => state.users.isAuthenticated)
    const routes = useRoutes(isAuth)
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
