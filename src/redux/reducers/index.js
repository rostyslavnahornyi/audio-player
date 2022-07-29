import { combineReducers } from "redux";

import audioReducer from "./audioReducer";
import authReducer from "./authReducer";
import tracksReducer from "./tracksReducer";
import uploadReducer from "./uploadReducer";
import playlistsReducer from "./playlistsReducer";
import profileReducer from "./profileReducer";

const rootReducers = combineReducers({
    audio: audioReducer,
    auth: authReducer,
    upload: uploadReducer,
    tracks: tracksReducer,
    playlists: playlistsReducer,
    profile: profileReducer,
});

export default rootReducers;
