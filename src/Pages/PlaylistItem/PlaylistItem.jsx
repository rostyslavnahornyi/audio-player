import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSelector } from "reselect";
import {
    LeftBar,
    Player,
    PlaylistCover,
    PlaylistsTrack,
    SearchBar,
} from "../../Components";
import { actionGetPlaylistById } from "../../redux/actions/creators/playlists";
import "./style.scoped.scss";

const currentPlaylist = createSelector(
    (store) => store.playlists.currentPlaylist,
    (currentPlaylist) => currentPlaylist
);

const PlaylistItem = () => {
    const { id } = useParams(); // playlistID
    const dispatch = useDispatch();
    const playlist = useSelector(currentPlaylist);

    useEffect(() => {
        dispatch(actionGetPlaylistById(id));
    }, []);

    return (
        <div className="playlist">
            <div className="main">
                <LeftBar />
                <main className="content">
                    <div className="wrapper">
                        <div className="header">
                            <div className="page-name">{playlist?.name}</div>
                            <div className="playlist-counter">
                                {playlist?.tracks?.length ?? 0} tracks
                            </div>
                        </div>
                        <main className="main">
                            <div className="left-bar-info">
                                <PlaylistCover
                                    _id={id}
                                    name={playlist?.name}
                                    description={playlist?.description}
                                />
                            </div>
                            <div className="right-bar-tracks">
                                <div className="search-bar">
                                    <SearchBar playlistId={id} />
                                </div>
                                <div className="tracks-list">
                                    {playlist?.tracks?.length > 0
                                        ? playlist.tracks.map((track) => (
                                              <PlaylistsTrack
                                                  key={track._id}
                                                  playlistId={id}
                                                  track={track}
                                              />
                                          ))
                                        : null}
                                </div>
                            </div>
                        </main>
                    </div>
                </main>
            </div>
            <Player />
        </div>
    );
};

export default PlaylistItem;
