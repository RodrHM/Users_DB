
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logInUser } from '../../redux/features/users/usersActions';
import '../../style/login.css'

function Login () {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [input, setInput] = useState({
    //     email:'',
    //     password:''
    // })
    const [error, setError] = useState({
        email:'',   // REXEC
        password:''
    })


    const handlerEmail = ({target})=>{
        setEmail(target.value)
    }

    const handlerPassword = ({target})=>{
        setPassword(target.value)
    }

    const handlerSubmit = (e)=>{
        e.preventDefault();

        const regex = {
            email:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
            password:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
            // - at least 8 characters
            // - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
            // - Can contain special characters
        }
        
        const controlErrorEmail = regex.email.test(email)
        let sendErrorEmail = ''
        if(!controlErrorEmail) sendErrorEmail = 'syntax errors'

        const controlErrorPassword = regex.password.test(password)
        let sendErrorPassword = ''
        if(!controlErrorPassword) sendErrorPassword = 'At least 8 characters and must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.'

        setError({...error, 
            email:sendErrorEmail, 
            password:sendErrorPassword
        })

        if(!sendErrorEmail.length && !sendErrorPassword.length){
            dispatch(logInUser({email:email, password:password}))
        }
    }

    return (
        <form className='login' onSubmit={handlerSubmit}>
            <div className='formLocker'>
                <label htmlFor="">email: </label>
                <div className='inputLogin right'>
                    <input 
                        type="text" 
                        name="email" 
                        placeholder='Send your email'
                        onChange={handlerEmail} 
                        value={email}/>
                </div>
                {/* <p hidden={!error.email}>{error.email}</p> */}
            </div>
            <div className='formLocker'>
                <label htmlFor="">password: </label>
                <div className='inputLogin left'>
                    <input 
                        type="password" 
                        name="password"
                        placeholder='Send your password'
                        onChange={handlerPassword}
                        value={password}/>
                </div>
                {/* <p hidden={!error.password}>{error.password}</p> */}
            </div>
            <button type="submit">LOGIN</button>
        </form>
    )
}


export default Login;