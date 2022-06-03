import {
    LOAD_ADMIN_DASHBOARD,
    REMOVE_ADMIN_DASHBOARD
} from "../definitions/admin";
import axios from "axios";

export const loadDashboard = async (dispatch) => {
    try {
        const request = await axios.get('/api/mod/stats');
        console.log(request.data);
        return dispatch({
            type: LOAD_ADMIN_DASHBOARD,
            payload: request.data
        });
    } catch (err) {
        console.log(err);
    }
}

export const demote = async (dispatch, id) => {
    try {
        const request = await axios.put(`/api/mod/demote/${id}`);
        loadDashboard(dispatch);
    } catch (err) {
        throw err;
    }
}

export const promoteToAdmin = async (dispatch, id) => {
    try {
        const request = await axios.post(`/api/mod/promote-to-admin/${id}`);
        loadDashboard(dispatch);
    } catch (err) {
        throw err;
    }
}

export const promoteToModerator = async (dispatch, id) => {
    try {
        console.log(id);
        const request = await axios.post(`/api/mod/promote-to-mod/${id}`);
        loadDashboard(dispatch);
    } catch (err) {
        console.log(err)
        throw err;
    }
}