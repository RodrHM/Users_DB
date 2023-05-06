import { useEffect, useState } from 'react';
import './styles/ConfirmAccount.css'
import { confirmAccount } from '../../redux/features/users/usersActions';

function ConfirmAccount ({tokenValue}){
    const [state, setState] = useState(false)
    useEffect(()=>{
        const handlerState = async ()=>{
            //LOADING TRUE
            const {message, error} = await confirmAccount(tokenValue)
    
            if(message) setState(message)
            if(error) alert(error)
            //LOADING FALSE
        }
        handlerState()
    },[tokenValue])
    
    const handlerPage = ()=>{
        window.location.href='/'
    }
    return(
        <>{
            state?
            <div className="card"> 
                {/* <button type="button" className="dismiss">×</button>  */}
                <div className="header"> 
                    <div className="image">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" stroke="#000000" d="M20 7L9.00004 18L3.99994 13"></path> </g></svg>
                    </div> 
                    <div className="content">
                        <span className="title">Order validated</span> 
                        <p className="message">{state}</p> 
                    </div> 
                    <div className="actions">
                        <button type="button" className="history" onClick={handlerPage}>Login</button> 
                        {/* <button type="button" className="track">Track my package</button>  */}
                    </div> 
                </div> 
            </div>
            :null
        }</>
    )
}

export default ConfirmAccount;