import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionRemoveTracks, actionSetSortByTracks } from "../../redux/actions/creators/tracks";
import "./style.scoped.scss";

const defaultValues = [
    {
        name: "A-Z",
        value: 1,
    },
    {
        name: "Z-A",
        value: -1,
    },
];

const DropdownMenu = () => {
    const [value, setValue] = useState(defaultValues[0].value);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionSetSortByTracks(value));
        dispatch(actionRemoveTracks());
    }, [value]);

    return (
        <div className="dropdown-menu">
            <input
                className="dropdown"
                type="checkbox"
                id="dropdown"
                name="dropdown"
                value={value.value}
            />
            <label className="for-dropdown" htmlFor="dropdown">
                Sort by: {value.name}
                <i
                    className="uil uil-arrow-down iconify"
                    data-icon="uil:arrow-right"
                />
            </label>
            <div className="section-dropdown">
                {defaultValues.map((value, index) => (
                    <div
                        className="option"
                        key={index}
                        onClick={() => setValue(value.value)}
                    >
                        {value.name}
                        <i className="uil uil-arrow-right" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DropdownMenu;
