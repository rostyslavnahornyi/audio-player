import React from "react";
import { useDispatch } from "react-redux";
import { actionLogout } from "../../redux/actions/creators/auth";
import { LeftBar, Player } from "../../Components";
import "./style.scoped.scss";
import ProfileData from "../../Components/ProfileData/ProfileData";


const Profile = () => {
    const dispatch = useDispatch();

    return (
        <div className="profile">
            <div className="main">
                <LeftBar />
                <main className="content">
                    <div className="wrapper">
                        <div className="header">
                            <h1 className="page-name">Profile</h1>
                        </div>
                        <ProfileData
                            avatarChanging={true}
                            buttonsVisible={false}
                        />
                        <hr className="separator" />
                        <div
                            className="button-logout"
                            onClick={() => dispatch(actionLogout())}
                        >
                            Logout
                        </div>
                    </div>
                </main>
            </div>
            <Player />
        </div>
    );
};

export default Profile;
