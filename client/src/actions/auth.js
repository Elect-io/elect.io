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
        throw err;
    }
}

export const getReset = async (id) => {
    try {
        const request = await axios.get(`/api/user/forgot/${id}`);
        console.log(request.data)
        return request.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
export const startReset = async (email) => {
    try {
        const request = await axios.post(`/api/user/forgot/${email}`);
        return request.data.msg
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const finishReset = async (dispatch, options) => {
    try {
        const request = await axios.post(`/api/user/reset/${options.id}`, {
            password: options.password
        });
        const {
            token
        } = request.data;
        dispatch({
            type: ADD_X_AUTH_TOKEN,
            payload: token
        });
        setToken(request.data.token);
        await loadProfile(dispatch);
    } catch (err) {
        console.log(err);
        throw err;
    }
}
export const getSocial = async (id) => {
    try {
        const request = await axios.get(`/api/socials/${id}`);
        return request.data.social
    } catch (err) {
        console.log(err);
        throw err;
    }
}
export const getGoogleLink = async () => {
    try {
        const request = await axios.get('/api/socials/google');
        return request.data.url;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
export const dispatchToken = async (dispatch, token) => {
    try {
        dispatch({
            type: ADD_X_AUTH_TOKEN,
            payload: token
        });
        setToken(token);
        await loadProfile(dispatch);
    } catch (err) {
        throw err;
    }
}
export const connectGoogleAccount = async (dispatch, id) => {
    try {
        const request = await axios.post(`/api/socials/merge/${id}`);
        dispatch({
            type: ADD_X_AUTH_TOKEN,
            payload: request.data.token
        });
        setToken(request.data.token);
        await loadProfile(dispatch);
    } catch (err) {
        console.log(err);
        throw err;
    }
}
export const removeAccount = async (dispatch) => {
    try {
        localStorage.clear();
        dispatch({
            type: REMOVE_X_AUTH_TOKEN
        })
        dispatch({
            type: REMOVE_PROFILE
        })
    } catch (err) {

    }
}
export const createFromGoogle = async (dispatch, options) => {
    try {
        const request = await axios.post(`/api/socials/create/${options.id}`, {
            password: options.password,
            name: options.name
        });
        dispatch({
            type: ADD_X_AUTH_TOKEN,
            payload: request.data.token
        });
        setToken(request.data.token);
        await loadProfile(dispatch);
    } catch (err) {
        console.log(err);
        throw err;
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
        throw err;
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
        localStorage.clear();
        document.location.reload();
        console.log(err);
        throw err;
    }
}