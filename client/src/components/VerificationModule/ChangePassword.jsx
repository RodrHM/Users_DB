import { useState } from 'react';
import './styles/ChangePassword.css'
import { useDispatch } from 'react-redux';
import { changePassword } from '../../redux/features/users/usersActions';

function ChangePassword ({caseValue, tokenValue}){
    const dispatch = useDispatch()

    const [change, setChange] = useState({
        password:'',
        newPassword:''
    })
    const [error, setError] = useState([])

    const handlerChange = ({target})=>{
        setChange({...change, [target.name]:target.value})
    }

    const handlerError = ()=>{
        const messageError = [] 

        //  Controlamos el error de Password (unicamente que no este vacio)
        if(caseValue==='changePassword' && !change.password.length) messageError.push('missing password')
        
        //  Controlamos errores de New Password
        const regexNewPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
        //  'It must be at least 8 characters in length, have 1 uppercase letter, 1 lowercase letter, and 1 number (special characters are allowed)'
        if(!change.newPassword.length) messageError.push('missing password')
        else {
            const validateNewPassword = !regexNewPassword.test(change.newPassword)
            if(validateNewPassword) messageError.push('It must be at least 8 characters in length, have 1 uppercase letter, 1 lowercase letter, and 1 number (special characters are allowed)')
        }

        return messageError
    }

    const handdlerSubmit = async (e)=>{
        e.preventDefault();
        //  LOADING TRUE
        const messageError = handlerError()
        
        const payload = { 
            body:{
                moduleCase:caseValue,
                password:change.password,
                newPassword:change.newPassword,
            }, 
            token:tokenValue,
        }
        const {error, message} = messageError.length || await dispatch(changePassword(payload))
        if(error) messageError.push(error)
        if(message) {
            alert(message)
            window.location.href = '/dashboard';
        }

        setError(messageError)
        //  LOADING FASLE
    }
    
    return (
        <form className="ChangePassword" onSubmit={handdlerSubmit}>
            {
               caseValue==='changePassword'?
               <>
                <label className="label">Password</label>
                <input className="input" type="text" value={change.password} onChange={handlerChange} name='password'/>
               </>
               :null
            }
            <label className="label">New password</label>
            <input className="input" type="text" value={change.newPassword} onChange={handlerChange} name='newPassword'/> 
            <button type='submit'>Submit</button>
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
        </form>
    )
}

export default ChangePassword;