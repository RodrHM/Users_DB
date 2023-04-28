import { useState } from 'react';
import '../../style/auth.css'
import Login from './Login';
import Register from './Register';

function Auth (){
    const [auth, setAuth] = useState('Login')   // Despues va a tomar su valor inicial posiblemente de la store
    const [classForm, setClassForm] = useState({
        loginTag:'',
        registerTag:'notMatch'
    })

    const handlerAuth = ({target})=>{
        setAuth(target.textContent)
        
        setClassForm({
            ...classForm,
            loginTag:classForm.registerTag,
            registerTag:classForm.loginTag
        })
    }

    return (
        <div id="contentLogin">
            <h2><span 
            onClick={auth==='Register'?handlerAuth:()=>{}} 
            className={classForm.loginTag}>Login</span> / <span 
            onClick={auth==='Login'?handlerAuth:()=>{}} 
            className={classForm.registerTag}>Register</span></h2>
            {auth === 'Login'
            ? <Login/>
            : <Register/>
            }
        </div>
    )
  }

export default Auth;