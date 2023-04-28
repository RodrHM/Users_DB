import axios from 'axios'
import { 
    SendUser,
    confirmUser, newTokenValue
} from './usersSlice'

export const registerUser = (payload) => async (dispatch)=>{
    try {
        // console.log('Esto es registerUser')
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
        // localStorage.removeItem('token')
        // return dispatch(confirmUser(''))
        return error.response.data.error
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

// export const getUser = () => async (dispatch)=>{
//     try {
        
//     } catch (error) {
//         return dispatch()
//     }
// }
