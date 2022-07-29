import { useMemo } from "react";
import { LeftBar, Player } from "../../Components";
import { useDropzone } from "react-dropzone";
import "./style.scoped.scss";
import { useDispatch, useSelector } from "react-redux";
import {
    actionUploadOpen,
    actionUploadTracks,
} from "../../redux/actions/creators/upload";
import { createSelector } from "reselect";
import { LIMIT } from "../../utils/constants";

const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "100px",
    borderWidth: 3,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "gray",
    color: "black",
    fontWeigt: 600,
    fontSize: "20px",
    outline: "none",
    transition: "border .3s ease-in-out",
    cursor: "pointer",
};

const focusedStyle = {
    borderColor: "#2196f3",
};

const acceptStyle = {
    borderColor: "#00e676",
};

const rejectStyle = {
    borderColor: "#ff1744",
};

const uploadState = createSelector(
    (store) => store.upload,
    (upload) => upload
);

const Upload = () => {
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        maxFiles: LIMIT.MAX_FILES_DROPZONE,
        accept: {
            "audio/*": [],
        },
    });

    const files = acceptedFiles.map((file) => (
        <li key={file.path}>{file.path}</li>
    ));

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    );

    const dispatch = useDispatch();
    const state = useSelector(uploadState);

    return (
        <div className="upload">
            <div className="main">
                <LeftBar />
                <main className="content">
                    <div className="wrapper">
                        <div className="header">
                            <h1 className="page-name">Upload tracks </h1>
                        </div>

                        <section
                            className="container"
                            onClick={() => dispatch(actionUploadOpen())}
                        >
                            <div {...getRootProps({ style })}>
                                <input {...getInputProps()} />
                                Open / drag audio files
                            </div>
                            <aside className="accepted-files">
                                <h4>Accepted files</h4>
                                <ul>{files}</ul>
                            </aside>
                        </section>

                        <button
                            className="button-add_tracks"
                            onClick={() =>
                                dispatch(actionUploadTracks(acceptedFiles))
                            }
                        >
                            {state.status ? state.status : "UPLOAD TRACKS"}
                        </button>
                    </div>
                </main>
            </div>
            <Player />
        </div>
    );
};

export default Upload;
