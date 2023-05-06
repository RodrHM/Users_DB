import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUser, logOutUser } from "../../redux/features/users/usersActions"
import UserProfile from "./UserProfile";
import DeletAccountButton from './DeletAccountButton.jsx'

function Dashboard (){
    const dispatch = useDispatch()
    const { user } = useSelector( state => state.user)

    useEffect(()=>{
        dispatch(getUser())
    },[dispatch])

    const handlerLogOut = ()=>{
        dispatch(logOutUser())
    }

    return (
        <div>
            <button onClick={handlerLogOut}>Log-Out</button>
            <DeletAccountButton/>
            {Object.values(user).length?
            <UserProfile username={user.username} email={user.email} />
            :    
            null
            }
        </div>
    )
}

export default Dashboard;