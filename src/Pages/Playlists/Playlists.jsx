import React, { useEffect, useState } from "react";
import {
    LeftBar,
    OrangeButton,
    PaginationBar,
    Player,
    PlaylistInfo,
} from "../../Components";
import PlusIcon from "../../assets/dark_plus_icon.svg";
import "./style.scoped.scss";
import { useDispatch, useSelector } from "react-redux";
import {
    actionCreatePlaylist,
    actionGetPlaylists,
} from "../../redux/actions/creators/playlists";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createSelector } from "reselect";

const playlistsState = createSelector(
    (store) => store.playlists,
    (playlists) => playlists
);

const Playlists = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector(playlistsState);

    const [searchParams] = useSearchParams();

    const createPlaylistHandler = () => {
        dispatch(actionCreatePlaylist(navigate));
    };

    useEffect(() => {
        const currPage = +searchParams.get("page") || state.currentPage;
        dispatch(actionGetPlaylists(currPage));
    }, [state.currentPage]);

    return (
        <div className="playlists">
            <div className="main">
                <LeftBar />

                <div className="wrapper">
                    <main className="content">
                        <div className="user-playlists">
                            <div className="header">
                                <div className="page-name">Playlists</div>
                            </div>
                            <div className="controls-bar">
                                <div className="button-create-playlist">
                                    <OrangeButton
                                        icon={PlusIcon}
                                        text={"Create playlist"}
                                        clickHandler={createPlaylistHandler}
                                    />
                                </div>
                            </div>
                            <div className="playlists-list">
                                {state.playlists.map((playlist) => (
                                    <PlaylistInfo
                                        key={playlist._id}
                                        playlist={playlist}
                                    />
                                ))}
                            </div>
                        </div>
                        <PaginationBar
                            currentPage={state.currentPage}
                            count={state.count}
                        />
                    </main>
                </div>
            </div>
            <Player />
        </div>
    );
};

export default Playlists;
