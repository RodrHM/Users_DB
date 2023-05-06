import axios from 'axios'
import { 
    SendUser,
    confirmUser, newTokenValue
} from './usersSlice'

export const registerUser = (payload) => async (dispatch)=>{
    try {
        //  payload = { username, email, password }
        const {data} = await axios.post("/auth/register", payload)
        // data = { username, email, token }
        return data.message
    } catch (error) {
        localStorage.removeItem('token')
        dispatch(confirmUser(''))
        return error.response.data.error
    }
}

export const logInUser = (payload) => async (dispatch)=>{
    try {
        const {data} = await axios.post('/auth/login', payload)

        localStorage.setItem('token', data.token)
        return dispatch(confirmUser(data.token))
    } catch (error) {
        return {error: error.response.data.error}
    }
}

export const logOutUser = () => async (dispatch)=>{
        localStorage.removeItem('token')
        return dispatch(confirmUser(''))
}

export const modifyToken = (payload='') => async (dispatch)=>{
    try {
        dispatch(newTokenValue(payload))
    } catch (error) {
        return dispatch()
    }
}

export const getUser = () => async (dispatch)=>{
    try {
        const token = localStorage.getItem('token')
        const headers = {headers:{'Authorization':`Bearer ${token}`}}
        const { data } = await axios.get('/user', headers)
        
        localStorage.setItem('token', data.token)
        dispatch(confirmUser(data.token))
        return dispatch(SendUser(data.user))
    } catch (error) {
        localStorage.removeItem('token')
        return dispatch(confirmUser(''))
    }
}

export const confirmAccount = async (token)=>{
    try {
        const headers = {headers:{'Authorization':`Bearer ${token}`}}
        const { data } = await axios.get('/user/confirmAccount', headers)

        return data
    } catch (error) {
        return error.response.data
    }
}

export const modifyUser = (body) => async (dispatch)=>{
    try {
        const token = localStorage.getItem('token')
        const headers = {headers:{'Authorization':`Bearer ${token}`}}
        
        const { data } = await axios.put('/user/modifyAccount', body, headers)
        
        localStorage.setItem('token', data.token)
        dispatch(confirmUser(data.token))
        return dispatch(SendUser(data.user))
    } catch (error) {
        localStorage.removeItem('token')
        return dispatch(confirmUser(''))
    }
}

export const confirmToken = () => async (dispatch)=>{
    try {
        const token = localStorage.getItem('token')
        const headers = {headers:{'Authorization':`Bearer ${token}`}}
        const { data } = await axios.get('/auth/confirmToken', headers)

        localStorage.setItem('token', data.token)
        return dispatch(confirmUser(data.token))
    } catch (error) {
        localStorage.clear('token')
        return dispatch()
    }
}

export const tokenChangePassword = (body) => async (dispatch)=>{
    try {
        const token = localStorage.getItem('token')
        const headers = {headers:{'Authorization':`Bearer ${token}`}}
        const {data} = await axios.post("/auth/changePassword", body, headers)
        // data = { username, email, token }
        
        return data
    } catch (error) {
        return error.response.data
    }
}

export const changePassword = ({body, token}) => async (dispatch)=>{
    try {
        // const body = { moduleCase:'changePassword'or'forgotPassword' }
        const headers = {headers:{'Authorization':`Bearer ${token}`}}
        const {data} = await axios.put("/user/changePassword", body, headers)
        // data = { username, email, token }

        return data
    } catch (error) {
        return error.response.data
    }
}

export const tokenForgotPassword = (body) => async (dispatch)=>{
    try {
        // const body = {email, moduleCase}
        const {data} = await axios.post("/auth/forgotPassword", body)

        return data
    } catch (error) {
        return error.response.data
    }
}

export const tokenDeleteUser = (body) => async (dispatch)=>{
    try {
        // const body = {email, moduleCase}
        const token = localStorage.getItem('token')
        const headers = {headers:{'Authorization':`Bearer ${token}`}}
        const {data} = await axios.post("/auth/desactiveAccount", body, headers)
        // data = {}

        return data
    } catch (error) {
        return error.response.data
    }
}

export const DeleteUser = async (token)=>{
    try {
        const headers = {headers:{'Authorization':`Bearer ${token}`}}
        const {data} = await axios.delete("/user/desactiveAccount", headers)
        
        return data
    } catch (error) {
        return error.response.data
    }
}
