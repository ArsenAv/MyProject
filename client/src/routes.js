import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import { AuthPage } from "./pages/AuthPage";
import { BookPage } from "./pages/BookPage";
import { AllBooksPage } from "./pages/AllBooksPage";


export const useRoutes = isAuthenticated =>{
     if(isAuthenticated){
        return(
            <Switch>
                <Route path="/book" exact>
                    <BookPage />
                </Route>
                <Route path="/allbooks" exact>
                    <AllBooksPage/>
                </Route>
                <Redirect to ="/allbooks"/>
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