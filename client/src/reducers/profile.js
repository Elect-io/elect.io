import {
    LOAD_PROFILE,
    REMOVE_PROFILE
} from '../definitions/profile';
const initialState = {
    user: {},
    profile: {},
    loaded:false
}

const profileReducer = (state=initialState, action) =>{
    const {type, payload} = action;
    switch(type){
        case LOAD_PROFILE: 
            return {...payload, loaded:true}
        case REMOVE_PROFILE:
            return initialState;
        default:
            return state
    }
}


export default profileReducer;