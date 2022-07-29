import React from "react";
import { useNavigate } from "react-router-dom";
import { LeftBar, Player } from "../../Components";
import ProfileData from "../../Components/ProfileData/ProfileData";
import { ROUTES } from "../../utils/constants";
import { push } from "../../utils/history";
import "./style.scoped.scss";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home">
            <div className="main">
                <LeftBar />
                <main className="content">
                    <div className="wrapper">
                        <div className="header">
                            <h1 className="page-name">Home</h1>
                        </div>
                        <ProfileData
                            avatarChanging={false}
                            buttonsVisible={true}
                        />
                        <hr className="separator" />
                        <div className="buttons">
                            <div
                                className="button-tracks box"
                                onClick={() => {
                                    push(ROUTES.TRACKS);
                                    navigate(ROUTES.TRACKS);
                                }}
                            >
                                Tracks
                            </div>
                            <div
                                className="button-playlists box"
                                onClick={() => {
                                    push(ROUTES.PLAYLISTS);
                                    navigate(ROUTES.PLAYLISTS);
                                }}
                            >
                                Playlists
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Player />
        </div>
    );
};

export default Home;
