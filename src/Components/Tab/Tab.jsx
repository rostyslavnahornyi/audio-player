import React from "react";
import { history } from "../../utils/history";
import "./style.scoped.scss";

const Tab = ({ label, icon, url }) => {
    const isActive = history.location.pathname === url;

    return (
        <div
            className="tab"
            style={{
                background: isActive ? "rgba(255, 255, 255, 0.1)" : "none",
            }}
        >
            <img className="image" src={icon} alt="icon" />
            <p className="text">{label}</p>
        </div>
    );
};

export default Tab;
