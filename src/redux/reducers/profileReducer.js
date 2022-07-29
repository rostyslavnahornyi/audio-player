import types from "../actions/types";

const initialState = {
    status: null,
    createdAt: null,
    permission: null,
    login: null,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.PROFILE_GET_DATA:
            return {...state, ...action.payload};

        default:
            return state;
    }
};

export default profileReducer;
