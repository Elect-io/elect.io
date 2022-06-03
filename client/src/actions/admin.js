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