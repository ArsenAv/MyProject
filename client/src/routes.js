import React from "react"
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from "./pages/AuthPage"
import Book from "./components/Book"
import { Books } from "./pages/Books"
import './auth.css'
import {Favorites} from "./pages/Favorites"
 

export const useRoutes = isAuthenticated =>{
     if(isAuthenticated){
        return(
            <Switch>
                <Route path="/books" exact>
                    <Books />
                </Route>
                <Route path="/books/favorites" exact>
                    <Favorites/>
                </Route>
                <Route path="/books/:id" exact>
                    <Book />
                </Route>
                <Redirect to ="/books"/>
            </Switch>
        )
     }
     return(
         <Switch>
             <Route path ="/" exact>
                 <AuthPage/>
             </Route> 
             <Redirect to ="/"/>
         </Switch>
     )
}