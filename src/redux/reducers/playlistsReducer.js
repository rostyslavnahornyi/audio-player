import types from "../actions/types";

const initialState = {
    playlists: [], // _id, name, description, tracks
    count: 1,
    status: null,
    currentPage: 1,
    currentPlaylist: null,
};

const playlistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_PLAYLIST_PENDING:
            return { ...state, status: action.status };

        case types.CREATE_PLAYLIST_SUCCESS:
            return { ...state, status: action.status };

        case types.CREATE_PLAYLIST_FAIL:
            return { ...state, status: action.status };

        case types.GET_PLAYLISTS_COUNT_PENDING:
            return { ...state, status: action.status };

        case types.GET_PLAYLISTS_COUNT_SUCCESS:
            return { ...state, count: action.payload, status: action.status };

        case types.GET_PLAYLISTS_COUNT_FAIL:
            return { ...state, status: action.status };

        case types.PLAYLIST_PAGE_CHANGE:
            return { ...state, currentPage: action.payload };

        case types.GET_PLAYLISTS_PENDING:
            return { ...state, status: action.status };

        case types.GET_PLAYLISTS_SUCCESS:
            return {
                ...state,
                playlists: action.payload,
                status: action.status,
            };

        case types.GET_PLAYLISTS_FAIL:
            return { ...state, status: action.status };

        case types.GET_PLAYLIST_BY_ID_PENDING:
            return { ...state, status: action.status };

        case types.GET_PLAYLIST_BY_ID_SUCCESS:
            return {
                ...state,
                currentPlaylist: action.payload,
                status: action.status,
            };

        case types.GET_PLAYLIST_BY_ID_FAIL:
            return { ...state, status: action.status };

        case types.PLAYLIST_UPSERT_INFO_PENDING:
            return { ...state, status: action.status };

        case types.PLAYLIST_UPSERT_INFO_SUCCESS:
            return {
                ...state,
                currentPlaylist: {
                    ...state.currentPlaylist,
                    ...action.payload,
                },
                status: action.status,
            };

        case types.PLAYLIST_UPSERT_INFO_FAIL:
            return { ...state, status: action.status };

        case types.REMOVE_TRACK_FROM_PLAYLIST_PENDING:
            return { ...state, status: action.status };

        case types.REMOVE_TRACK_FROM_PLAYLIST_SUCCESS:
            const { tracks, playlistId } = action.payload;

            const playlistIndex = state.playlists.findIndex(
                (playlist) => playlist._id === playlistId
            );
            const playlists = state.playlists;
            playlists[playlistIndex].tracks = tracks;
            
            return {
                ...state,
                playlists,
                currentPlaylist: {
                    ...state.currentPlaylist,
                    tracks,
                },
            };

        case types.REMOVE_TRACK_FROM_PLAYLIST_FAIL:
            return { ...state, status: action.status };

        case types.ADD_TRACK_TO_PLAYLIST_PENDING:
            return { ...state, status: action.status };

        case types.ADD_TRACK_TO_PLAYLIST_SUCCESS:
            return {
                ...state,
                currentPlaylist: {
                    ...state.currentPlaylist,
                    tracks: action.payload,
                },
            };

        case types.ADD_TRACK_TO_PLAYLIST_FAIL:
            return { ...state, status: action.status };

        default:
            return state;
    }
};

export default playlistsReducer;
