import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import "./style.scoped.scss";

import { styled, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import PlaylistIcon from "../../assets/playlist_icon_2.svg";
import { useDispatch } from "react-redux";
import { actionUpsertPlaylistInfo } from "../../redux/actions/creators/playlists";

const CssTextField = styled(TextField)({
    "& .MuiInput-root": {
        color: "gray",
        "&:before": {
            borderBottom: "1px solid black",
        },
        "&:after": {
            borderBottom: "2px solid rgb(89, 215, 89)",
        },
    },
    "& .MuiInputLabel-root": {
        color: "gray",
        fontSize: "15px",
        "&.Mui-focused": {
            color: "rgb(89, 215, 89)",
        },
    },
});

const PlaylistCover = ({ _id, name, description }) => {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();

    const [isEditingInfo, setIsEditingInfo] = useState(false);

    const submitHandler = (data) => {
        const { name, description } = data;
        dispatch(actionUpsertPlaylistInfo({ _id, name, description }));
        reset();
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div
                className="playlist-info"
                onClick={() => setIsEditingInfo(!isEditingInfo)}
            >
                <img className="icon" src={PlaylistIcon} alt="playlist_icon" />
                <p className="name">{name}</p>
                <p className="description">{description}</p>
            </div>
            <div
                className={`playlist-edit ${
                    isEditingInfo ? "playlist-edit-visible" : ""
                }`}
            >
                <CssTextField
                    variant="standard"
                    label="Name"
                    id="name-input"
                    autoComplete="none1"
                    {...register("name", { required: true })}
                />
                <CssTextField
                    variant="standard"
                    label="Description"
                    id="description-input"
                    autoComplete="none2"
                    {...register("description", { required: true })}
                />
                <Button
                    style={{ marginTop: "20px" }}
                    color="success"
                    variant="outlined"
                    type="submit"
                >
                    Save
                </Button>
            </div>
        </form>
    );
};

export default PlaylistCover;
