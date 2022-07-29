import { STATUSES } from "../../utils/constants";
import types from "../actions/types";

const initialState = {
    tracks: [],
    count: 0,
    page: 0,
    isFetching: true,
    status: null,
    sortBy: 1,
    toDelete: [],
};

const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_TRACKS_PENDING:
            return { ...state, status: action.status };

        case types.GET_TRACKS_SUCCESS:
            return {
                ...state,
                tracks: [...state.tracks, ...action.payload],
                status: action.status,
            };

        case types.GET_TRACKS_FAIL:
            return { ...state, status: action.status };

        case types.NEXT_TRACKS_PAGE:
            return { ...state, page: state.page + 1 };

        case types.TRACKS_FETCHING_ON:
            return { ...state, isFetching: true };

        case types.TRACKS_FETCHING_OFF:
            return { ...state, isFetching: false };

        case types.GET_TRACKS_COUNT_PENDING:
            return { ...state, status: action.status };

        case types.GET_TRACKS_COUNT_SUCCESS:
            return { ...state, count: action.payload, status: action.status };

        case types.GET_TRACKS_COUNT_FAIL:
            return { ...state, status: action.payload };

        case types.SET_SORT_BY_TRACKS:
            return { ...state, sortBy: action.payload };

        case types.REMOVE_TRACKS:
            return {
                ...state,
                tracks: [],
                page: 0,
                isFetching: true,
                status: null,
            };

        case types.TRACK_TO_DELETE:
            const searchedIdx = state.toDelete.findIndex(
                (id) => id === action.payload
            );
            const newArr = [...state.toDelete];
            searchedIdx !== -1
                ? newArr.splice(searchedIdx, 1)
                : newArr.push(action.payload);

            return { ...state, toDelete: newArr };

        case types.DELETE_TRACKS_PENDING:
            return { ...state, status: STATUSES.PENDING };

        case types.DELETE_TRACKS_SUCCESS:
            const toDeleteSet = new Set(state.toDelete);
            const newTracks = state.tracks.filter(
                (track) => !toDeleteSet.has(track._id)
            );
            return { ...state, tracks: newTracks, status: STATUSES.PENDING, toDelete: [] };

        case types.DELETE_TRACKS_FAIL:
            return { ...state, status: STATUSES.PENDING };

        default:
            return state;
    }
};

export default tracksReducer;
