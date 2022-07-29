import React, { useEffect, useRef } from "react";
import {
    AddButton,
    LeftBar,
    Player,
    OrangeButton,
    DropdownTracks,
} from "../../Components";
import "./style.scoped.scss";

import AddTrackIcon from "../../assets/add_track_icon.svg";
import PlayIcon from "../../assets/play_icon_3.png";

import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import TrackItem from "../../Components/TrackItem/TrackItem";
import { useDispatch, useSelector } from "react-redux";
import {
    actionDeleteTracks,
    actionGetTracks,
    actionGetTracksCount,
    actionTracksFetchingOn,
} from "../../redux/actions/creators/tracks";
import store from "../../redux/store";
import { actionPlay, actionSetQueue } from "../../redux/actions/creators/audio";
import { createSelector } from "reselect";

const tracksState = createSelector(
    (store) => store.tracks,
    (tracks) => tracks
);

const Tracks = () => {
    const list = useRef(null);
    const dispatch = useDispatch();
    const state = useSelector(tracksState);

    useEffect(() => {
        dispatch(actionGetTracksCount());

        list.current.addEventListener("scroll", scrollHandler);
        return function() {
            document.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    useEffect(() => {
        if (state.isFetching) {
            dispatch(actionGetTracks(state.page, state.sortBy));
        }
    }, [state.isFetching]);

    const scrollHandler = (e) => {
        const { tracks, count } = store.getState().tracks;

        if (
            e.target.scrollHeight -
                (e.target.scrollTop + e.target.clientHeight) <
                100 &&
            tracks.length < count - 1
        ) {
            dispatch(actionTracksFetchingOn());
        }
    };

    return (
        <div className="tracks">
            <div className="main">
                <LeftBar />

                <main className="content">
                    <div className="wrapper">
                        <div className="header">
                            <h1 className="page-name">Tracks</h1>
                            <div className="buttons">
                                <AddButton
                                    text={"Delete tracks"}
                                    opacity={state.toDelete.length ? 1 : 0}
                                    clickHandler={() =>
                                        dispatch(
                                            actionDeleteTracks(state.toDelete)
                                        )
                                    }
                                />
                                <Link to={ROUTES.UPLOAD}>
                                    <AddButton
                                        icon={AddTrackIcon}
                                        text={"Add tracks"}
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="filter-bar">
                            <OrangeButton
                                icon={PlayIcon}
                                text={`Play all (${state.tracks.length})`}
                                clickHandler={() => {
                                    dispatch(
                                        actionSetQueue({ tracks: state.tracks })
                                    );
                                    dispatch(actionPlay());
                                }}
                            />
                            <DropdownTracks />
                        </div>
                        <div className="tracks-list" ref={list}>
                            {state.tracks.length > 0
                                ? state.tracks.map((track) => (
                                      <TrackItem key={track._id} data={track} />
                                  ))
                                : null}
                        </div>
                    </div>
                </main>
            </div>

            <Player />
        </div>
    );
};

export default Tracks;
