import types from "../actions/types";

const initialState = {
    status: null,
};

const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPLOAD_OPEN:
            return {...state, status: null}

        case types.UPLOAD_TRACKS_PENDING:
            return { ...state, status: action.status };

        case types.UPLOAD_TRACKS_SUCCESS:
            return { ...state, status: action.status };

        case types.UPLOAD_TRACKS_FAIL:
            return { ...state, status: action.status };

        default:
            return state;
    }
};

export default uploadReducer;
