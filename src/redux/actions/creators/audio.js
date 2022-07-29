import store from "../../store";
import types from "../types";
import { backendURL } from "../../../utils/constants";


const audio = new Audio();

const togglePlay = (status) => ({
    type: types.TOGGLE_PLAY,
    payload: status,
});
const setDuration = (value) => ({
    type: types.SET_DURATION,
    payload: value,
});
const setCurrentTime = (value) => ({
    type: types.SET_CURRENT_TIME,
    payload: value,
});
const setVolume = (value) => ({
    type: types.SET_VOLUME,
    payload: value,
});
const toggleRepeat = (status) => ({
    type: types.TOGGLE_REPEAT,
    payload: status,
});
const setTrack = (track) => ({
    type: types.SET_TRACK,
    payload: track,
});
const resetPlayer = () => ({
    type: types.PLAYER_START_POSITION,
});
const setCurrentIndex = (index) => ({
    type: types.PLAYER_SET_CURRENT_INDEX,
    payload: index,
});

export const actionTogglePlay = (status) => {
    status ? audio.play() : audio.pause();

    return togglePlay(status);
};

export const actionPlay = () => {
    audio.play();

    return { type: types.PLAY };
};

export const actionPause = () => {
    audio.pause();

    return { type: types.PAUSE };
};

export const actionSetDuration = (e) => {
    const value = e.target.duration;

    store.dispatch(setDuration(value));
};

export const actionSetCurrentTime = (value) => {
    audio.currentTime = value;

    return setCurrentTime(value);
};

export const actionSetVolume = (value) => {
    audio.volume = value;

    return setVolume(value);
};

export const actionToggleRepeat = (status) => {
    audio.loop = status;

    return toggleRepeat(status);
};

export const actionResetPlayer = () => {
    store.dispatch(actionPause());

    return resetPlayer();
};

export const actionSetTrack = (track) => {
    store.dispatch(actionResetPlayer());

    audio.src = `${backendURL}/${track.url}`;
    store.dispatch(actionPlay());

    return setTrack(track);
};

export const actionSetQueue = (queue) => {
    if (queue.tracks?.length) {
        store.dispatch(actionSetTrack(queue.tracks[0]));
    }

    return {
        type: types.PLAYER_SET_QUEUE,
        payload: queue,
    };
};

export const actionNextTrack = () => {
    const state = store.getState().audio;
    const currIdx = state.currentQueueIndex;

    if (currIdx !== state.queue.tracks.length - 1) {
        store.dispatch(actionSetTrack(state.queue.tracks[currIdx + 1]));
        audio.play();

        return { type: types.NEXT_TRACK };
    } else {
        return actionResetPlayer();
    }
};

export const actionPrevTrack = () => {
    const state = store.getState().audio;
    const currIdx = state.currentQueueIndex;

    if (currIdx !== 0) {
        store.dispatch(actionSetTrack(state.queue.tracks[currIdx - 1]));

        return { type: types.PREV_TRACK };
    } else {
        return actionResetPlayer();
    }
};

export const actionClearQueue = () => ({
    type: types.CLEAR_QUEUE,
});

export const actionDeleteTrackFromQueue = (track) => {
    console.log(track);
    store.dispatch(actionResetPlayer());
    store.dispatch(setCurrentIndex(0));

    const { _id } = track;

    return { type: types.DELETE_TRACK_FROM_QUEUE, payload: _id };
};

const onEnded = () => {
    const state = store.getState().audio;

    if (!state.isRepeated) {
        if (!!state.queue?.tracks?.length) store.dispatch(actionNextTrack());
        else store.dispatch(actionResetPlayer());
    }
};
const onTimeUpdate = (e) => {
    store.dispatch(setCurrentTime(e.target.currentTime));
};

audio.addEventListener("ended", onEnded);
audio.addEventListener("timeupdate", onTimeUpdate);
audio.addEventListener("durationchange", actionSetDuration);
