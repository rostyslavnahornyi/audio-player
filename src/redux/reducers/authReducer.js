import types from "../actions/types";

const initialState = {
    authToken: localStorage.getItem("authToken") ?? null,
    status: null,
    error: null,
    _id: null,
    login: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REGISTER_PENDING:
            return { ...state, status: action.status };

        case types.REGISTER_SUCCESS:
            return {
                ...state,
                status: action.status,
                _id: action.payload._id,
                login: action.payload.login,
            };

        case types.REGISTER_FAIL:
            return { ...state, status: action.status, error: action.error };

        case types.LOGIN_PENDING:
            return { ...state, status: action.status };

        case types.LOGIN_SUCCESS:
            return {
                ...state,
                status: action.status,
                authToken: action.payload,
            };

        case types.LOGIN_FAIL:
            return { ...state, status: action.status, error: action.error };

        case types.LOGOUT:
            return {...state, authToken: null, _id: null, login: null}            

        default:
            return state;
    }
};

export default authReducer;
