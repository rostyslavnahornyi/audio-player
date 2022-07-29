import React from "react";
import "./style.scoped.scss";

const AddButton = ({ icon, text, opacity = 1, clickHandler}) => {
    return (
        <div className="add-button" style={{opacity}} onClick={clickHandler}>
            {icon ? <img src={icon}  className="icon"/> : null}
            <div className="text">{text}</div>
        </div>
    );
};

export default AddButton;
