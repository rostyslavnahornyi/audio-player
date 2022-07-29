import React from "react";
import "./style.scoped.scss";
import Ava from "../../assets/avatar.png";
import OrangeButton from "../OrangeButton/OrangeButton";

import Middot from "../../assets/dot.png";
import PlayIcon from "../../assets/play_icon.svg";
import ShuffleIcon from "../../assets/shuffle_icon.svg";
import UploadIcon from "../../assets/upload.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
    actionGetTracks,
    actionGetTracksCount,
    actionRemoveTracks,
} from "../../redux/actions/creators/tracks";
import {
    actionPlay,
    actionSetQueue,
    actionShuffle,
} from "../../redux/actions/creators/audio";
import { useEffect } from "react";
import { actionGetProfileData } from "../../redux/actions/creators/profile";
import { actionGetPlaylistsCount } from "../../redux/actions/creators/playlists";
import { createSelector } from "reselect";

const tracksState = createSelector((store) => store.tracks, tracks => tracks);
const profileState = createSelector((store) => store.profile, profile => profile);
const playlistsState = createSelector((store) => store.playlists, playlists => playlists);

const ProfileData = ({ avatarChanging, buttonsVisible }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const tracks = useSelector(tracksState);
    const profile = useSelector(profileState);
    const playlists = useSelector(playlistsState);

    useEffect(() => {
        dispatch(actionGetProfileData());
        dispatch(actionGetTracksCount());
        dispatch(actionGetPlaylistsCount());

        if (buttonsVisible) {
            dispatch(actionRemoveTracks());
            dispatch(actionGetTracks(null, null, true));
        }
        return () => dispatch(actionRemoveTracks());
    }, []);

    const playHandler = () => {
        dispatch(actionSetQueue({ tracks: tracks.tracks }));
        dispatch(actionPlay());
    };

    return (
        <div className="profile-data">
            <div className="avatar">
                <img
                    className={`avatar-icon ${avatarChanging ? "visible" : ""}`}
                    src={Ava}
                    alt="profile_avatar"
                />
                {avatarChanging ? (
                    <img
                        className="upload-icon"
                        src={UploadIcon}
                        alt="upload_icon"
                    />
                ) : null}
            </div>
            <div className="data">
                <p className="name">{profile.login}</p>
                <p>
                    <span>{tracks.count} tracks</span>
                    <img className="middot" src={Middot} alt="middot" />
                    <span>{playlists.count} playlists</span>
                </p>
                <p>
                    <span>created at: {profile.createdAt}</span>
                    <img className="middot" src={Middot} alt="middot" />
                    <span>{profile.permission}</span>
                </p>
                {buttonsVisible ? (
                    <div className="buttons">
                        <div className="btn-play">
                            <OrangeButton
                                text={"Play tracks"}
                                icon={PlayIcon}
                                clickHandler={playHandler}
                            />
                        </div>
                        <div className="btn-upload">
                            <OrangeButton
                                text={"Upload tracks"}
                                icon={UploadIcon}
                                clickHandler={() => navigate(ROUTES.UPLOAD)}
                            />
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ProfileData;
