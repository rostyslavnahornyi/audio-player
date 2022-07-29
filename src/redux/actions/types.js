const AUDIO = {
    PLAY: "PLAY",
    PAUSE: "PAUSE",
    TOGGLE_PLAY: "TOGGLE_PLAY",
    SET_DURATION: "SET_DURATION",
    SET_CURRENT_TIME: "SET_CURRENT_TIME",
    SET_VOLUME: "SET_VOLUME",
    TOGGLE_REPEAT: "TOGGLE_REPEAT",
    SET_TRACK: "SET_TRACK",
    NEXT_TRACK: "NEXT_TRACK",
    PREV_TRACK: "PREV_TRACK",
    PLAYER_START_POSITION: "PLAYER_START_POSITION",
    PLAYER_SET_QUEUE: "PLAYER_SET_QUEUE",
    CLEAR_QUEUE: "CLEAR_QUEUE",
    DELETE_TRACK_FROM_QUEUE: "DELETE_TRACK_FROM_QUEUE",
    PLAYER_SET_CURRENT_INDEX: "PLAYER_SET_CURRENT_INDEX",
};

const AUTH = {
    LOGIN_PENDING: "LOGIN_PENDING",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAIL: "LOGIN_FAIL",
    REGISTER_PENDING: "REGISTER_PENDING",
    REGISTER_SUCCESS: "REGISTER_SUCCESS",
    REGISTER_FAIL: "REGISTER_FAIL",
    LOGOUT: "LOGOUT",
};

const UPLOAD = {
    UPLOAD_OPEN: "UPLOAD_OPEN",
    UPLOAD_TRACKS_PENDING: "UPLOAD_TRACKS_PENDING",
    UPLOAD_TRACKS_SUCCESS: "UPLOAD_TRACKS_SUCCESS",
    UPLOAD_TRACKS_FAIL: "UPLOAD_TRACKS_FAIL",
};

const TRACKS = {
    GET_TRACKS_PENDING: "GET_TRACKS_PENDING",
    GET_TRACKS_SUCCESS: "GET_TRACKS_SUCCESS",
    GET_TRACKS_FAIL: "GET_TRACKS_FAIL",
    NEXT_TRACKS_PAGE: "NEXT_TRACKS_PAGE",
    TRACKS_FETCHING_ON: "TRACKS_FETCHING_ON",
    TRACKS_FETCHING_OFF: "TRACKS_FETCHING_OFF",
    GET_TRACKS_COUNT_PENDING: "GET_TRACKS_COUNT_PENDING",
    GET_TRACKS_COUNT_SUCCESS: "GET_TRACKS_COUNT_SUCCESS",
    GET_TRACKS_COUNT_FAIL: "GET_TRACKS_COUNT_FAIL",
    SET_SORT_BY_TRACKS: "SET_SORT_BY_TRACKS",
    REMOVE_TRACKS: "REMOVE_TRACKS",
    DELETE_TRACKS: "DELETE_TRACKS",
    TRACK_TO_DELETE: "TRACK_TO_DELETE",
    DELETE_TRACKS_PENDING: "DELETE_TRACKS_PENDING",
    DELETE_TRACKS_SUCCESS: "DELETE_TRACKS_SUCCESS",
    DELETE_TRACKS_FAIL: "DELETE_TRACKS_FAIL",
};

const PLAYLISTS = {
    CREATE_PLAYLIST_PENDING: "CREATE_PLAYLIST_PENDING",
    CREATE_PLAYLIST_SUCCESS: "CREATE_PLAYLIST_SUCCESS",
    CREATE_PLAYLIST_FAIL: "CREATE_PLAYLIST_FAIL",
    GET_PLAYLISTS_COUNT_PENDING: "GET_PLAYLISTS_COUNT_PENDING",
    GET_PLAYLISTS_COUNT_SUCCESS: "GET_PLAYLISTS_COUNT_SUCCESS",
    GET_PLAYLISTS_COUNT_FAIL: "GET_PLAYLISTS_COUNT_FAIL",
    PLAYLIST_PAGE_CHANGE: "PLAYLIST_PAGE_CHANGE",
    GET_PLAYLISTS_PENDING: "GET_PLAYLISTS_PENDING",
    GET_PLAYLISTS_SUCCESS: "GET_PLAYLISTS_SUCCESS",
    GET_PLAYLISTS_FAIL: "GET_PLAYLISTS_FAIL",
    GET_PLAYLIST_BY_ID_PENDING: "GET_PLAYLIST_BY_ID_PENDING",
    GET_PLAYLIST_BY_ID_SUCCESS: "GET_PLAYLIST_BY_ID_SUCCESS",
    GET_PLAYLIST_BY_ID_FAIL: "GET_PLAYLIST_BY_ID_FAIL",
    PLAYLIST_UPSERT_INFO_PENDING: "PLAYLIST_UPSERT_INFO_PENDING",
    PLAYLIST_UPSERT_INFO_SUCCESS: "PLAYLIST_UPSERT_INFO_SUCCESS",
    PLAYLIST_UPSERT_INFO_FAIL: "PLAYLIST_UPSERT_INFO_FAIL",
    REMOVE_TRACK_FROM_PLAYLIST_PENDING: "REMOVE_TRACK_FROM_PLAYLIST_PENDING",
    REMOVE_TRACK_FROM_PLAYLIST_SUCCESS: "REMOVE_TRACK_FROM_PLAYLIST_SUCCESS",
    REMOVE_TRACK_FROM_PLAYLIST_FAIL: "REMOVE_TRACK_FROM_PLAYLIST_FAIL",
    ADD_TRACK_TO_PLAYLIST_PENDING: "ADD_TRACK_TO_PLAYLIST_PENDING",
    ADD_TRACK_TO_PLAYLIST_SUCCESS: "ADD_TRACK_TO_PLAYLIST_SUCCESS",
    ADD_TRACK_TO_PLAYLIST_FAIL: "ADD_TRACK_TO_PLAYLIST_FAIL",
};

const PROFILE = {
    PROFILE_GET_DATA: "PROFILE_GET_DATA",
    CHANGE_PASSWORD_PENDING: "CHANGE_PASSWORD_PENDING",
    CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS",
    CHANGE_PASSWORD_FAIL: "CHANGE_PASSWORD_FAIL",
};

export default {
    ...AUDIO,
    ...AUTH,
    ...UPLOAD,
    ...TRACKS,
    ...PLAYLISTS,
    ...PROFILE,
};