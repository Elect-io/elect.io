import {
    ADD_ALERT,
    REMOVE_ALERT
} from "../definitions/alert";

const initialState = [];

const alertReducer = (state = initialState, action) => {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case ADD_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter((alert)=>{
                if(alert.id !== payload){
                    return alert
                }
            });
        default:
            return state
    }

}

export default alertReducer;