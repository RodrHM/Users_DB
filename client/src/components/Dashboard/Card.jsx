import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/features/users/usersActions";

import './styles/Card.css'
function Card ({username, email}){

    const [input, setInput] = useState({
        username:username || '',
        email:email || '',
        password:''
    })
    const [error, setError] = useState([])

    const dispatch = useDispatch()

    const handlerInput = ({target})=>{
        const {value, placeholder} = target
        const locker = placeholder.toLowerCase()
        setInput({...input, [locker]:value})
    }

    const handlerError = (str, locker)=>{
        try {
            const regex = {
                username: /^[a-zA-Z0-9_ -]{3,20}$/, ///[a-zA-Z0-9 ]{3,32}/gi, // /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{4,29}$/igm,
                email:/[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                password:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
// - at least 8 characters
// - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
// - Can contain special characters
            }
            const messageError = {
                username:'Usernames can contain characters a-z, 0-9. The username cannot start nor end with a period. It must also not have more than one period sequentially. From 3 to 20 chars.',
                email:'Invalid email.',
                password:'It must be at least 8 characters in length, have 1 uppercase letter, 1 lowercase letter, and 1 number (special characters are allowed)'
            }
            if(!str.length) throw new Error(`Please complete the ${locker} field`)
            if(!regex[locker].test(str)) throw new Error(messageError[locker])
            return ''
        } catch (err) {
            return err.message
        }
    }

    const handlerSubmit = async (e)=>{
        e.preventDefault();

        const messageError = []
        const errorUsername = handlerError(input.username, 'username')
        const errorEmail = handlerError(input.email, 'email')
        const errorPassword = handlerError(input.password, 'password')
        
        if(errorUsername) messageError.push(errorUsername)
        if(errorEmail) messageError.push(errorEmail)
        if(errorPassword) messageError.push(errorPassword)


        setError(messageError)

        if(!errorUsername.length && !errorEmail.length && !errorPassword.length) {
            const request = await dispatch(registerUser({username:input.username, email:input.email, password:input.password}))
            alert(request)
        }

    }
    return (
        <form className="form" onSubmit={handlerSubmit}>
            <p id="heading">Dashboard</p>
            <div className="field">
                <svg className="input-icon" 
                xmlns="http://www.w3.org/2000/svg" width="20"height="20" fill="currentColor" viewBox="0 0 24 24" >
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" 
                    d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"></path>
                    <path strokeWidth="2" 
                    d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"></path>
                </svg>
                <input autoComplete="off" placeholder="Username" className="input-field" type="text" value={input.username} onChange={handlerInput}/>
            </div>
            <div className="field">
                <svg className="input-icon" 
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                </svg>
                <input autoComplete="off" placeholder="Email" className="input-field" type="text" value={input.email} onChange={handlerInput}/>
            </div>
            <div className="field">
                <svg className="input-icon" 
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                </svg>
                <input placeholder="Password" className="input-field" type="password" value={input.password} onChange={handlerInput}/>
            </div>
            {error.length?
            <div className="error-messages">
                <ul>
                    {
                    error.map( (err, inx) => <li key={inx}>
                        {err}
                    </li>)
                    }
                </ul>
            </div>
            :
            null}
            <div className="btn">
                <button className="button1" type="submit">Sign Up</button>
                <button className="button1" onClick={()=>{}}>Login</button>
            </div>
            <button className="button3">Forgot Password</button>
        </form>
    )
}

export default Card;