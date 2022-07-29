import React from "react";
import "./style.scoped.scss";
import PlayIcon from "../../assets/play_icon_2.svg";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import {
    actionClearQueue,
    actionSetTrack,
} from "../../redux/actions/creators/audio";
import { removeAudioExtension } from "../../utils/regex";
import { actionTrackToDelete } from "../../redux/actions/creators/tracks";

const BpIcon = styled("span")(({ theme = "dark" }) => ({
    borderRadius: 3,
    width: 16,
    height: 16,
    backgroundColor: "gray",
    ".Mui-focusVisible &": {
        outline: "2px auto rgba(19,124,189,.6)",
        outlineOffset: 2,
    },
    "input:hover ~ &": {
        backgroundColor: "gray",
    },
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "gray",
    "&:before": {
        display: "block",
        width: 16,
        height: 16,
        borderRadius: 3,
        backgroundColor: "#106ba3",
        backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
            " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
            "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
    },
    "input:hover ~ &": {
        backgroundColor: "#106ba3",
    },
});

function BpCheckbox(props) {
    return (
        <Checkbox
            sx={{
                "&:hover": { bgcolor: "transparent" },
            }}
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            {...props}
        />
    );
}

const TrackItem = (props) => {
    const dispatch = useDispatch();

    const track = props.data;
    const title =
        track.id3.title || removeAudioExtension(track.originalFileName);

    return (
        <div className="track">
            <div className="buttons">
                <div
                    className="button-delete"
                    onClick={() => dispatch(actionTrackToDelete(track._id))}
                >
                    <BpCheckbox />
                </div>
                <div
                    className="button-play"
                    onClick={() => {
                        dispatch(actionSetTrack(track));
                        dispatch(actionClearQueue());
                    }}
                >
                    <img src={PlayIcon} alt="play_icon" />
                </div>
            </div>

            <div className="info">
                <p className="title">{title ?? "Title"}</p>
                <p className="artist">{track.id3.artist ?? "artist"}</p>
                <p className="album">{track.id3.album ?? "album"}</p>
                <p className="year">{track.id3.year ?? "year"}</p>
                <p className="genre">{track.id3.genre ?? "genre"}</p>
            </div>
        </div>
    );
};

export default TrackItem;
