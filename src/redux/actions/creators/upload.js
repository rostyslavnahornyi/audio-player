import { STATUSES } from "../../../utils/constants";
import { getGQL_Upload } from "../../../utils/getGQL_Upload";
import types from "../types";

const actionUploadTracksPending = () => ({
    type: types.UPLOAD_TRACKS_PENDING,
    status: STATUSES.PENDING,
});
const actionUploadTracksSuccess = () => ({
    type: types.UPLOAD_TRACKS_SUCCESS,
    status: STATUSES.SUCCESS,
});
const actionUploadTracksFail = () => ({
    type: types.UPLOAD_TRACKS_FAIL,
    status: STATUSES.FAIL,
});

export const actionUploadOpen = () => ({
    type: types.UPLOAD_OPEN,
});

export const actionUploadTracks = (files) => (dispatch) => {
    if (files.length === 0) {
        dispatch(actionUploadTracksFail());
        return;
    }

    dispatch(actionUploadTracksPending());

    const tracks = files.map((file) => {
        const formData = new FormData();
        formData.append("track", file);
        return getGQL_Upload({ formData, fetchPart: "track" });
    });

    Promise.all(tracks)
        .then(() => {
            dispatch(actionUploadTracksSuccess());
        })
        .catch(() => dispatch(actionUploadTracksFail()));
};
