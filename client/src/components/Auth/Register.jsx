import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/features/users/usersActions";
import '../../style/bubbleError.css'
import '../../style/register.css'


function Register (){

    const dispatch = useDispatch()

    const [input, setInput] = useState({
        username:'',
        email:'',
        password:''
    })

    const [error, setError] = useState({
        username:'',
        email:'',
        password:''
    })
    const regex = {
        username: /[a-zA-Z]{3,32}/gi, // /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{4,29}$/igm,
        email:/[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
        password:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    }

    const hanclerInput = ({target})=>{
        setInput({...input, [target.name]:target.value})
    }

    const handlerError = (str, locker)=>{
        try {
            const messageError = {
                username:'Usernames can contain characters a-z, 0-9, underscores and periods. The username cannot start nor end with a period. It must also not have more than one period sequentially. From 5 to 30 chars.',
                email:'Invalid email.',
                password:'At least 8 characters and must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.'
            }
            if(!str.length) throw new Error('locker bacio')
            if(!regex[locker].test(str)) throw new Error(messageError[locker])

            return ''
        } catch (err) {
            return err.message
        }
    }

    const handlerSubmit = (e)=>{
        e.preventDefault();

        const errorUsername = handlerError(input.username, 'username')
        const errorEmail = handlerError(input.email, 'email')
        const errorPassword = handlerError(input.password, 'password')

        setError({...error,
            username:errorUsername,
            email:errorEmail,
            password:errorPassword
        })

        if(!errorUsername.length && !errorEmail.length && !errorPassword.length) {
            dispatch(registerUser({username:input.username, email:input.email, password:input.password}))
        }
    }

    return (
        <form className="register" onSubmit={handlerSubmit}>
            <div className='formLocker'>
                <label htmlFor="">username: </label>
                <div className='inputLogin username'>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder='Send your username'
                        onChange={hanclerInput} 
                        value={input.username}/>
                </div>
                <p hidden={!''}>{''}</p>
            </div>
            <div className='formLocker'>
                <label htmlFor="">email: </label>
                <div className='inputLogin email'>
                    <input 
                        type="text" 
                        name="email" 
                        placeholder='Send your email'
                        onChange={hanclerInput} 
                        value={input.email}/>
                </div>
                <p hidden={!''}>{''}</p>
            </div>
            <div className='formLocker'>
                <label htmlFor="">password: </label>
                <div className='inputLogin password'>
                    <input 
                        type="password" 
                        name="password"
                        placeholder='Send your password'
                        onChange={hanclerInput}
                        value={input.password}/>
                </div>
                <p hidden={!''}>{''}</p>
            </div>
            <button type="submit">REGISTER</button>
        </form>
    )
}

export default Register;
