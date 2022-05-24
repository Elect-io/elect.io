import axios from "axios";
import {
    ADD_X_AUTH_TOKEN,
    REMOVE_X_AUTH_TOKEN
} from "../definitions/auth";
import {
    LOAD_PROFILE,
    REMOVE_PROFILE
} from '../definitions/profile';
import setToken from './setToken';
export const login = async (dispatch, options) => {
    try {
        const request = await axios.post('/api/user/sign-in', options);
        dispatch({
            type: ADD_X_AUTH_TOKEN,
            payload: request.data.token
        });
        setToken(request.data.token);
        await loadProfile(dispatch);
    } catch (err) {
        console.log(err);
    }
}

export const startReset = async (email) =>{
    try{
        const request = await axios.post(`/api/user/forgot/${email}`);
        return request.data.msg
    }
    catch(err){
        console.log(err);
    }
}
export const getGoogleLink = async () =>{
    try{
        const request = await axios.get('/api/socials/google');
        return request.data.url;
    }
    catch(err){
        console.log(err);
    }
}
export const signup = async (dispatch, options) => {
    try {
        const request = await axios.post('/api/user/create-account', options);
        dispatch({
            type: ADD_X_AUTH_TOKEN,
            payload: request.data.token
        });
        setToken(request.data.token);
        await loadProfile(dispatch);
    } catch (err) {
        console.log(err);
    }
}

export const loadProfile = async (dispatch) => {
    try {
        const request = await axios.get('/api/user');
        const user = request.data;
        const profile = (await axios.get('/api/profile/')).data
        dispatch({
            type: LOAD_PROFILE,
            payload: {
                profile,
                user
            }
        })
    } catch (err) {
        console.log(err);
    }
}