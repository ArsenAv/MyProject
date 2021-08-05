import React, {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'


export const AuthPage = () =>{
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: "", password: ""
    });
    useEffect( () => {
        message(error)
        clearError()
    }, [error, message, clearError])

    
    const formHandler = event =>{
        setForm({...form, [event.target.name]: event.target.value})
    }
    const registerHandler = async () => {
        try{
            const data = await (request('/api/auth/register', 'POST', {...form}))
            message(data.message)
        } catch (e){
            
        }
    }
    const loginHandler = async () => { 
        try{
        const data = await (request('/api/auth/login', 'POST', {...form}))
           auth.login(data.token, data.userId);
        } catch (e){
          
        }
    }
    return(
      
    <Form className = " form-inline  " >  
        <Form.Group className="mb-2" controlId="formGroupEmail">
            <Form.Label htmlFor ="email">Email address</Form.Label>
            <Form.Control value={form.email} placeholder ="" name = "email" type="text" onChange = {formHandler}  />
    
         </Form.Group>
        <Form.Group className="mb-2" controlId="formGroupPassword">
             <Form.Label htmlFor="email">Password</Form.Label>
             <Form.Control placeholder =""  type="password" value={form.password} name = "password" onChange = {formHandler} />
         <Button variant="primary" disabled = {loading} onClick = {loginHandler}>
                 Login
        </Button>
         <Button variant="primary" disabled = {loading} onClick = {registerHandler}>
                 Register
         </Button>
        </Form.Group>
    </Form>
    
    )
}
