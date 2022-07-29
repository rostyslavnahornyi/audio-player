import React from "react";
import { removeAudioExtension } from "../../utils/regex";
import "./style.scoped.scss";

import CloseIcon from "../../assets/close_icon.svg";
import DragIcon from "../../assets/drag_icon.png";
import { sortableHandle } from "react-sortable-hoc";
import { useDispatch } from "react-redux";
import { actionDeleteTrackFromQueue } from "../../redux/actions/creators/audio";

const DragHandle = sortableHandle(() => <img src={DragIcon} alt="drag-icon" />);

const QueueItem = (props) => {
    const dispatch = useDispatch();

    const { data } = props;
    const title = data.id3.title || removeAudioExtension(data.originalFileName);

    return (
        <div className="queue-item">
            <div className="info">
                <div className="drag-icon">
                    <DragHandle />
                </div>
                <p className="title">{title}</p>
            </div>
            <div className="buttons">
                <div
                    className="button-remove"
                    onClick={() => dispatch(actionDeleteTrackFromQueue(data))}
                >
                    <img src={CloseIcon} alt="close_icon" />
                </div>
            </div>
        </div>
    );
};

export default QueueItem;
