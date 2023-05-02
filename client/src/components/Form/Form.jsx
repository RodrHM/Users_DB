import React, { useState } from "react";
import './styles/Form.css'
import Login from "./Login";
import Register from "./Register.jsx";
import Overlay from "../Overlay/Overlay";
import Loader from "../Loader/Loader";

function Form({input}){

    const [form, setForm] = useState(true)
    const [showOverlay, setShowOverlay] = useState(false)

    const toggleOverlay = (boolean)=> {
        // console.log(showOverlay)
        setShowOverlay(boolean)
    }

    return (
        <>{
            form?
            <Login setForm={setForm} toggleOverlay={toggleOverlay}/>
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
        </>
    )
}

export default Form;
