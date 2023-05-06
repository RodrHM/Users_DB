import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, modifyUser, tokenChangePassword } from "../../redux/features/users/usersActions";
import "./styles/btnCloudCrose.css"
import './styles/UserProfile.css'
import { Navigate } from "react-router-dom";

function UserProfile() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user); //user se usa para el _id // userDashboard es para las props

  const [change, setChange] = useState({
    username: user.username || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    city: user.city || "",
    country: user.country || "",
    image: user.image || "",
    state: user.state || "",
  });

  const [disable, setDisable] = useState(false); // Permite machear entre los distintos formulatios tomando el nombre de estos cada ves que se preciona el boton MOD

  const [state, setState] = useState(false); // si hay cambios en cualquier formulario cambia de estado y muestra los botones SAVE y CANCEL

  const [error, setError] = useState({
    username: false,
    email: false,
    phone: false,
    address: false,
    // other: false,
    city: false,
    country: false,
    state: false,
    // roles: false,
    image: false,
  }); //  si cambia a true significa que hay un error en su respectivo formulario

  useEffect(() => {
    if (Object.entries(user).length)
      setChange({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        country: user.country || "",
        // roles: user.roles ? user.roles : "",
        image: user.image || "",
        state: user.state || "",
      });
  }, [user]);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const formsFails = Object.entries(error).reduce(
      (acc, curr) => (curr[1] ? (acc = acc + " " + curr[0]) : acc),
      ""
    );

    if (formsFails.length)
      alert("Errores en el/los formulario/s:" + formsFails.toLocaleUpperCase());
    else {
      dispatch(modifyUser(change));
      setState(false);
      setDisable(false);
    }
  };

  const handleChange = (e, name) => {
    setState(true);

    const regex = {
      usuario: /^[a-zA-Z0-9_ -]{3,20}$/, //letras, numeros, guiones, y guionbajo
      username: /^[a-zA-Z0-9_ -]{3,20}$/, //letras y espacios pueden llevar acentos
      email: /^[a-zA-Z0-9.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9.]+$/,
      phone: /^\d{7,14}$/,
      // address: /^[a-zA-Z0-9_-]{1,40}$/,
      address: /^[a-zA-ZÀ-ÿ\s0-9.,_-]{1,40}$/,  // minuscula, mayuscula, espacios, numeros, caracteres(.,-_)
      // other: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
      city: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
      country: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
      state: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
      // roles: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
      image: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
      // correo: /^[a-zA-Z0-9.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9.]+$/, //formato email
      // telefono:  /^\d{7,14}$/ //de 7 a 14 numeros
    };
    if(e.target.value.length<21){
      setError({ ...error, [name]: !regex[name].test(e.target.value) });
      setChange({
        ...change,
        [name]: e.target.value,
      });
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();

    dispatch(getUser());
    setState(false);
    setDisable(false);
    setError({
      username: false,
      email: false,
      phone: false,
      address: false,
      // other: false,
      city: false,
      country: false,
      state: false,
      // roles: false,
      image: false,
    })
  };

  const handleEdit = (e, form) => {
    e.preventDefault();
    setDisable(form);
  };

  const handlerPassword = async ()=>{
    // LOADING TRUE
    const {error, url} = await dispatch(tokenChangePassword({moduleCase:'changePassword'}))
    if(error) alert(error)
    if(url) window.location.href = url;
    // LOADING FALSE
  }

  const lockers = [
    {label: "Username: ",form: "username",placeholder: "Only words",required: "no acepta caracteres especialesacepta caracteres especiales",},
    { label: "E-mail: ", form: "email", placeholder: "fulano@gmail.com", required: "El email es invalido",},
    // {label: "Phone: ",form: "phone",placeholder: "123456789",required: "Nesesita",},
    // {label: "Address: ",form: "address",placeholder: "av.siempreviva 742",required: "Nesesita",},
    // // { label: "Other: ", form: "other", placeholder: "Timbre 3 puerta amarilla", required: "Nesesita",},
    // {label: "City: ",form: "city",placeholder: "Sidney",required: "Nesesita",},
    // {label: "Country: ",form: "country",placeholder: "Wakanda",required: "Nesesita",},
    // {label: "State: ",form: "state",placeholder: "California",required: "Nesesita",},
    // // { label: "Roles: ", form: "roles", placeholder: "Admin", required: "Nesesita",},
    // {label: "Image: ",form: "image",placeholder: "Hay que cambiar esto por una imagen",required: "Nesesita",},
  ];

  return (
    <div className="Account-container">
      <div className="Account-name">
        <h3>{change.username}</h3>
      </div>
      <form className="Account-form">
        {lockers.map((f, i) => (
          <div key={i} className="">
            <label className="usernamelabel labelForm" htmlFor={`${f.form}Field`}>{f.label}</label>
            <div className="Account-input">
              <input
                type="text"
                id={`${f.form}Field`}
                placeholder={f.placeholder}
                value={change[f.form]}
                onChange={(e) => handleChange(e, f.form)}
                disabled={disable !== f.form}
                className='Field'
              />
              {f.form!=='email'?
              <button className="Account-btnForm" onClick={(e) => handleEdit(e, f.form)}
              >
                <svg strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor"> <path d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11" stroke="#c4c4c4" strokeLinecap="round" strokeLinejoin="round" id="mainIconPathAttribute"></path> <path d="M8 10H16M8 6H12M8 14H11" stroke="#c4c4c4" strokeLinecap="round" strokeLinejoin="round" id="mainIconPathAttribute"></path> <path d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z" fill="currentColor" stroke="#c4c4c4" strokeLinecap="round" strokeLinejoin="round" id="mainIconPathAttribute"></path> <path d="M17.9541 16.9394L18.9541 15.9394C19.392 15.5015 20.102 15.5015 20.5399 15.9394V15.9394C20.9778 16.3773 20.9778 17.0873 20.5399 17.5252L19.5399 18.5252M17.9541 16.9394L14.963 19.9305C14.8131 20.0804 14.7147 20.2741 14.6821 20.4835L14.4394 22.0399L15.9957 21.7973C16.2052 21.7646 16.3988 21.6662 16.5487 21.5163L19.5399 18.5252M17.9541 16.9394L19.5399 18.5252" stroke="#c4c4c4" strokeLinecap="round" strokeLinejoin="round" id="mainIconPathAttribute"></path> </svg>
              </button>
              :
              null
              }
            </div>
              <p className="FormCreateError" hidden={!error[f.form]}>{f.required}</p>
          </div>
        ))}
        <div>
        <label className="usernamelabel labelForm" htmlFor={`passwordField`}>Password: </label>
            <div className="Account-input">
              <input
                type="button"
                // id={`passwordField`}
                value={'Change Password'}
                onClick={handlerPassword}
                className='brnField'
              />
            </div>
        </div>
      </form>
        <div className="AdminAccount-btnSave">
          {/* <button className="btnCard btnSave1" onClick={handleSubmitForm}>
            Save
          </button> */}
          <button className="btnCloud" onClick={handleSubmitForm} hidden={!state}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" className="icon"><path d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z"></path></svg>
          </button>
          <button className="btnCrose" onClick={handleCancel} hidden={!state}>
          <svg className="toggler-off" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <line className="path" x1="34.4" y1="34.4" x2="95.8" y2="95.8"></line>
            <line className="path" x1="95.8" y1="34.4" x2="34.4" y2="95.8"></line>
          </svg>
          </button>
        </div>
    </div>
  );
}

export default UserProfile;