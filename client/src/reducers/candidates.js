import {
    LOAD_CANDIDATE,
    UPDATE_CANDIDATE,
    REMOVE_CANDIDATE
} from "../definitions/candidates";
const initialState = [];

const candidateReducer = (state = initialState, action) => {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case LOAD_CANDIDATE:
            return [...state, payload];
        case REMOVE_CANDIDATE:
            return state.filter(candidate => {
                if (candidate._id !== payload) {
                    return candidate
                }
            })
        case UPDATE_CANDIDATE:
            return state.map(candidate => {
                if (candidate._id !== payload._id) {
                    return candidate
                } else {
                    return payload
                }
            })
        default:
            return state;
    }
}

export default candidateReducer;