import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export function useAuth (){
    const {token} = useSelector( state => state.user)
    const headers = {headers:`Bearer ${token}`}

    const [user, setUser] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const getUser = async ()=> {
        try {
            const { data } = await axios.get('/user', headers)

            setUser(data)
            isAuthenticated(true)
            return data
        } catch (error) {

            setUser({})
            setIsAuthenticated(false)

            return {}
        }
    }

    // if(user.value.length)

    // const isAuthenticated = async ()=>{}

    return {
        getUser,
        isAuthenticated,
        user
    }
}

