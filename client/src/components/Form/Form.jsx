import React, { useState } from "react";
import './styles/Form.css'
import Login from "./Login";
import Register from "./Register.jsx";
import Overlay from "../Overlay/Overlay";
import Loader from "../Loader/Loader";
import ForgotPasswordForm from "./ForgotPasswordForm";

function Form({input}){

    const [form, setForm] = useState(true)
    const [showOverlay, setShowOverlay] = useState(false)
    const [showForgotPassword, setShowForgotPassword] = useState(false)

    const toggleOverlay = (boolean)=> {
        setShowOverlay(boolean)
    }

    return (
        <>{
            form?
            <Login setForm={setForm} toggleOverlay={toggleOverlay} setShowForgotPassword={setShowForgotPassword}/>
            :
            <Register setForm={setForm} toggleOverlay={toggleOverlay}/>
        }
        {
            showOverlay?
            <Overlay onClick={()=>{}} showOverlay={showOverlay}>
                <Loader/>
            </Overlay>
            :
            null
        }
        {
            showForgotPassword?
            <Overlay onClick={()=>{}} showOverlay={showForgotPassword}>
                <ForgotPasswordForm setShowForgotPassword={setShowForgotPassword} toggleOverlay={toggleOverlay}/>
            </Overlay>
            :
            null
        }
        </>
    )
}

export default Form;
