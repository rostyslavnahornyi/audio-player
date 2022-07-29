import React from "react";
import "./style.scoped.scss";

const OrangeButton = ({ icon, text, clickHandler }) => {
    return (
        <div className="orange-button" onClick={clickHandler}>
            {icon ? <img src={icon} className="icon" /> : null}
            <div className="text">{text}</div>
        </div>
    );
};

export default OrangeButton;
