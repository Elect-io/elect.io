import {
    LOAD_GENERAL_POLL,
    UPDATE_GENERAL_POLL,
    REMOVE_GENERAL_POLL
} from "../definitions/generalPoll";
const initialState = {
    answers: [],
    questions: [],
    remaining: 0,
    solved: 0,
    loaded: false
};

const pollReducer = (state = initialState, action) => {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case LOAD_GENERAL_POLL:
            return {
                ...payload, loaded: true
            };
        case REMOVE_GENERAL_POLL:
            return initialState;
        case UPDATE_GENERAL_POLL:
            console.log(state);
            if (payload.new) {
                return ({
                    ...state,
                    answers: [...state.answers, payload]
                })
            }
            return {
                ...state, answers: state.answers.map(a => {
                    if (a._id.toString() !== payload._id.toString()) {
                        return a;
                    } else {
                        return payload
                    }
                })
            }
            break;
        default:
            return state;
    }
}

export default pollReducer;