import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    actionTogglePlay,
    actionToggleRepeat,
    actionSetVolume,
    actionSetCurrentTime,
    actionPrevTrack,
    actionNextTrack,
} from "../../redux/actions/creators/audio";
import "./style.scoped.scss";
import { removeAudioExtension } from "../../utils/regex";

import CollapseIcon from "../../assets/collapse_icon.svg";
import ShuffleIcon from "../../assets/shuffle_icon.svg";
import PreviousIcon from "../../assets/previous_icon.svg";
import NextIcon from "../../assets/next_icon.svg";
import PlayIcon from "../../assets/play_icon.svg";
import StopIcon from "../../assets/stop_icon.svg";
import RepeatIcon from "../../assets/repeat_icon.svg";
import VolumeUpIcon from "../../assets/volume_up_icon.svg";
import VolumeStopIcon from "../../assets/volume_stop_icon.svg";
import { secondsToHMS } from "../../utils";
import { createSelector } from "reselect";

const whiteFilter = `invert(100%) sepia(0%) saturate(7500%) hue-rotate(116deg)
brightness(109%) contrast(109%)`;
const darkFilter = `invert(48%) sepia(3%) saturate(4%) hue-rotate(326deg) brightness(110%) contrast(78%)`;

const playerState = createSelector(
    (store) => store.audio,
    (audio) => audio
);

const Player = () => {
    const dispatch = useDispatch();
    const state = useSelector(playerState);

    const title = state.track
        ? state.track.id3.title ||
          removeAudioExtension(state.track.originalFileName)
        : null;

    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div
            className="player"
            style={{
                height: isCollapsed ? "30px" : "80px",
            }}
        >
            <div className="header">
                <p className="duration">{secondsToHMS(state.currentTime)}</p>
                <input
                    className="audio"
                    type={"range"}
                    min={0}
                    max={state.duration}
                    value={state.currentTime}
                    onChange={(e) => {
                        dispatch(actionSetCurrentTime(+e.target.value));
                    }}
                />
                <img
                    className="button-collapse"
                    src={CollapseIcon}
                    style={{
                        filter: isCollapsed ? darkFilter : whiteFilter,
                    }}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                />
            </div>
            {!isCollapsed ? (
                <div className="footer">
                    <div className="info">
                        <p className="track-name">{title ?? "Here is track"}</p>
                        <p className="playlist-name">{state.queue?.name ?? "Here is playlist"}</p>
                    </div>
                    <div className="main-buttons">
                        <img className="shuffle-button" src={ShuffleIcon} />
                        <img
                            className="previous-button"
                            src={PreviousIcon}
                            onClick={() => dispatch(actionPrevTrack())}
                        />
                        <img
                            className="status-button"
                            src={state.isPlaying ? StopIcon : PlayIcon}
                            onClick={() =>
                                dispatch(
                                    actionTogglePlay(
                                        state.isPlaying ? false : true
                                    )
                                )
                            }
                        />
                        <img
                            className="next-button"
                            src={NextIcon}
                            onClick={() => dispatch(actionNextTrack())}
                        />
                        <img
                            className="repeat-button"
                            src={RepeatIcon}
                            style={{
                                filter: state.isRepeated
                                    ? whiteFilter
                                    : darkFilter,
                            }}
                            onClick={() =>
                                dispatch(actionToggleRepeat(!state.isRepeated))
                            }
                        />
                    </div>
                    <div className="volume-settings">
                        <img
                            className="button-volume"
                            src={state.volume ? VolumeUpIcon : VolumeStopIcon}
                            onClick={() =>
                                dispatch(actionSetVolume(state.volume ? 0 : 1))
                            }
                        />
                        <input
                            className="volume"
                            type={"range"}
                            min={0}
                            max={1}
                            step={0.01}
                            value={state.volume}
                            onChange={(e) => {
                                dispatch(actionSetVolume(+e.target.value));
                            }}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Player;
