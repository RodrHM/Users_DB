import React, { useState } from "react";
import './styles/Form.css'
import Login from "./Login";
import Register from "./Register.jsx";

function Form({input}){

    const [form, setForm] = useState(true)

    return (
        <>{
            form?
            <Login setForm={setForm}/>
            :
            <Register setForm={setForm}/>
        }</>
    )
}

export default Form;
