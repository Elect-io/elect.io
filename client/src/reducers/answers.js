import {
  LOAD_ANSWER,
  UPDATE_ANSWER,
  REMOVE_ANSWER
} from "../definitions/auth";

const initialState = [];

const answersReducer = (state = initialState, action) => {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case(LOAD_ANSWER):
            return [payload, ...state]
        case(REMOVE_ANSWER):
            return state.filter(answer=>{
                if(answer._id !== payload){
                    return answer;
                }
            });
        case UPDATE_ANSWER:
            return state.map(answer=>{
                if(answer._id !== payload._id){
                    return answer;
                }
                else{
                    return payload
                }
            });
        default:
            return state
    }

}

export default answersReducer;