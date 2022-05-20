import {
    LOAD_PROFILE,
    REMOVE_PROFILE
} from '../definitions/profile';
const initialState = {
    user: {},
    lastLoaded:new Date(),
    profile: {}
}

const profileReducer = (state=initialState, action) =>{
    const {type, payload} = action;
    switch(type){
        case LOAD_PROFILE: 
            return payload
        case REMOVE_PROFILE:
            return null;
        default:
            return state
    }
}


export default profileReducer;