import React from "react";
import { Link } from "react-router-dom";
import { Tab } from "../../Components";
import { ROUTES } from "../../utils/constants";
import { back, push } from "../../utils/history";
import './style.scoped.scss';

import logo from "../../assets/logo.png";
import IconBack from "@mui/icons-material/KeyboardBackspace";
import HomeIcon from "../../assets/home_icon.svg";
import ProfileIcon from "../../assets/profile_icon.svg";
import QueueIcon from "../../assets/queue_icon.svg";
import TrackIcon from "../../assets/track_icon.svg";
import PlaylistIcon from "../../assets/playlist_icon.svg";

const tabs = [
    {
        label: "Home",
        route: ROUTES.HOME,
        icon: HomeIcon,
    },
    {
        label: "Profile",
        route: ROUTES.PROFILE,
        icon: ProfileIcon,
    },
    {
        label: "Set up queue",
        route: ROUTES.QUEUE,
        icon: QueueIcon,
    },
    {
        label: "Tracks",
        route: ROUTES.TRACKS,
        icon: TrackIcon,
    },
    {
        label: "Playlists",
        route: ROUTES.PLAYLISTS,
        icon: PlaylistIcon,
    },
];

const LeftBar = () => {
    return (
        <div className="leftbar">
            <aside className="navbar">
                <div className="button-back" onClick={() => back()}>
                    <IconBack />
                </div>
                <Link to="/" onClick={() => push(ROUTES.HOME)}>
                    <div className="logo">
                        <img className="image" src={logo} alt="logo" />
                        <p className="text">Audio Player</p>
                    </div>
                </Link>
            </aside>

            {tabs.map((tab, index) => (
                <React.Fragment key={index}>
                    <Link to={tab.route} onClick={() => push(tab.route)}>
                        <Tab
                            label={tab.label}
                            icon={tab.icon}
                            url={tab.route}
                        />
                    </Link>
                    {index === 2 ? <div className="line" /> : null}
                </React.Fragment>
            ))}
        </div>
    );
};
export default LeftBar;
