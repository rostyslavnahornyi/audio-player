import React from "react";
import PlaylistsTrack from "../PlaylistsTrack/PlaylistsTrack";
import { useNavigate } from "react-router-dom";
import "./style.scoped.scss";

import PlaylistIcon from "../../assets/playlist_icon_2.svg";
import PlayIcon from "../../assets/play_icon.svg";
import { ROUTES } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { actionSetQueue } from "../../redux/actions/creators/audio";

const PlaylistInfo = ({ playlist }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { _id, name, description, tracks } = playlist;

    const editClickHandler = () => {
        navigate(`${ROUTES.PLAYLISTS}/${_id}`);
    };

    const playClickHandler = () => {
        dispatch(actionSetQueue({ _id, name, tracks: tracks ?? [] }));
    };

    return (
        <div className="playlist-item">
            <div className="top">
                <div className="cover">
                    <img
                        className="playlist-icon"
                        src={PlaylistIcon}
                        alt="playlist_icon"
                    />
                    <img
                        className="play-icon"
                        src={PlayIcon}
                        alt="play_icon"
                        onClick={playClickHandler}
                    />
                </div>
                <div className="tracks-box">
                    <div className="tracks">
                        {tracks?.length
                            ? tracks.map((track) => (
                                  <PlaylistsTrack
                                      key={track._id}
                                      track={track}
                                      playlistId={_id}
                                  />
                              ))
                            : "0 TRACKS"}
                    </div>
                    <div className="button-edit" onClick={editClickHandler}>
                        EDIT
                    </div>
                </div>
            </div>
            <div className="info">
                <p className="name">{name}</p>
                <p className="description">{description}</p>
            </div>
        </div>
    );
};

export default PlaylistInfo;
