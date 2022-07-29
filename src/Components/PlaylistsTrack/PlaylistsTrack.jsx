import React from "react";
import { useDispatch } from "react-redux";
import IconRemove from "../../assets/close_icon.svg";
import { actionRemoveTrackFromPlaylist } from "../../redux/actions/creators/playlists";
import { removeAudioExtension } from "../../utils/regex";
import "./style.scoped.scss";

const PlaylistsTrack = ({ track, playlistId }) => {
    const dispatch = useDispatch();

    const title = track
        ? track.id3.title || removeAudioExtension(track.originalFileName)
        : null;

    const clickHandler = (e) => {
        dispatch(actionRemoveTrackFromPlaylist(playlistId, track._id));
    };

    return (
        <div className="track-item">
            <p className="name">{title}</p>
            <div className="button-remove" onClick={clickHandler}>
                <img src={IconRemove} alt="icon_remove" />
            </div>
        </div>
    );
};

export default PlaylistsTrack;
