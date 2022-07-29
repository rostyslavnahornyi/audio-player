import types from "../actions/types";

const initialState = {
    isPlaying: false,
    duration: 0,
    currentTime: 0,
    currentQueueIndex: 0,
    volume: 1,
    isRepeated: false,
    isShuffled: false,
    track: null,
    queue: null, // {_id, name, tracks: []}
};

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_PLAY:
            return { ...state, isPlaying: action.payload };

        case types.PLAY:
            return { ...state, isPlaying: true };

        case types.PAUSE:
            return { ...state, isPlaying: false };

        case types.SET_DURATION:
            return { ...state, duration: action.payload };

        case types.SET_CURRENT_TIME:
            return { ...state, currentTime: action.payload };

        case types.SET_VOLUME:
            return { ...state, volume: action.payload };

        case types.TOGGLE_REPEAT:
            return { ...state, isRepeated: action.payload };

        case types.NEXT_TRACK:
            return { ...state, currentQueueIndex: state.currentQueueIndex + 1 };

        case types.PREV_TRACK:
            return { ...state, currentQueueIndex: state.currentQueueIndex - 1 };

        case types.PLAYER_START_POSITION:
            return { ...state, isPlaying: false, currentTime: 0, };

        case types.SET_TRACK:
            return { ...state, track: action.payload, isPlaying: true };

        case types.PLAYER_SET_QUEUE:
            return { ...state, queue: action.payload, currentQueueIndex: 0 };

        case types.PLAYER_SET_CURRENT_INDEX:
            return { ...state, currentQueueIndex: action.payload };

        case types.DELETE_TRACK_FROM_QUEUE:
            const newTracks = state.queue.tracks.filter(
                (track) => track._id !== action.payload
            );
            return { ...state, queue: { ...state.queue, tracks: newTracks } };

        case types.CLEAR_QUEUE:
            return { ...state, queue: {}, currentQueueIndex: 0 };

        default:
            return state;
    }
};

export default playerReducer;
