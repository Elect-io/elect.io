import {
    LOAD_GENERAL_POLL,
    REMOVE_GENERAL_POLL
} from "../definitions/generalPoll";
const initialState = [];

const pollReducer = (state = initialState, action) => {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case LOAD_GENERAL_POLL:
            return payload;
        case REMOVE_GENERAL_POLL:
            return null;
        default:
            return state;
    }
}

export default pollReducer;