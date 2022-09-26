import {
    LOAD_ADMIN_DASHBOARD,
    REMOVE_ADMIN_DASHBOARD
} from '../definitions/admin';

const initialState = {
    totalContributions: 0,
    createdElections: 0,
    createdPoliticianAnswers: 0,
    createdPoliticians: 0,
    politicians:[],
    elections:[],
    mods: [],
    profileCount: 0
}

const admin = (state = initialState, action) => {
    const {
        payload,
        type
    } = action;
    switch (type) {
        case LOAD_ADMIN_DASHBOARD:
            return payload;
        case REMOVE_ADMIN_DASHBOARD:
            return initialState
        default:
            return state
    }
}

export default admin;