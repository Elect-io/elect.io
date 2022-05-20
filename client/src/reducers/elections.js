import {
    LOAD_ELECTION,
    UPDATE_ELECTION,
    REMOVE_ELECTION
} from "../definitions/elections";
const initialState = [];

const electionReducer = (state = initialState, action) => {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case LOAD_ELECTION:
            return [...state, payload];
        case REMOVE_ELECTION:
            return state.filter(election => {
                if (election._id !== payload) {
                    return election
                }
            })
        case UPDATE_ELECTION:
            return state.map(election => {
                if (election._id !== payload._id) {
                    return election
                } else {
                    return payload
                }
            })
        default:
            return state;
    }
}

export default electionReducer;