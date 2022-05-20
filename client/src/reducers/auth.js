import {
    ADD_X_AUTH_TOKEN,
    REMOVE_X_AUTH_TOKEN
} from "../definitions/auth";

const initialState = null;

const authReducer = (state = initialState, action) => {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case(ADD_X_AUTH_TOKEN):
            return payload
        case(REMOVE_X_AUTH_TOKEN):
            return null;
        default:
            return state
    }

}

export default authReducer;