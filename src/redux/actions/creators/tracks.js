import { LIMIT, STATUSES } from "../../../utils/constants";
import { getGQL } from "../../../utils/getGQL";
import {
    deleteTrackById,
    getTracksCountQuery,
    getTracksQuery,
} from "../../../utils/graphQueries";
import { jwtDecode } from "../../../utils/jwtDecoder";
import types from "../types";

const actionGetTracksPending = () => ({
    type: types.GET_TRACKS_PENDING,
    status: STATUSES.PENDING,
});
const actionGetTracksSuccess = (tracks) => ({
    type: types.GET_TRACKS_SUCCESS,
    payload: tracks,
    status: STATUSES.SUCCESS,
});
const actionGetTracksFail = () => ({
    type: types.GET_TRACKS_FAIL,
    status: STATUSES.FAIL,
});
const actionGetTracksCountPending = () => ({
    type: types.GET_TRACKS_COUNT_PENDING,
    status: STATUSES.PENDING,
});
const actionGetTracksCountSuccess = (value) => ({
    type: types.GET_TRACKS_COUNT_SUCCESS,
    payload: value,
    status: STATUSES.SUCCESS,
});
const actionGetTracksCountFail = () => ({
    type: types.GET_TRACKS_COUNT_FAIL,
    status: STATUSES.FAIL,
});
const actionDeleteTracksPending = () => ({
    type: types.DELETE_TRACKS_PENDING,
    status: STATUSES.PENDING,
});
const actionDeleteTracksSuccess = () => ({
    type: types.DELETE_TRACKS_SUCCESS,
    status: STATUSES.SUCCESS,
});
const actionDeleteTracksFail = () => ({
    type: types.DELETE_TRACKS_FAIL,
    status: STATUSES.FAIL,
});

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

const actionNextTracksPage = () => ({ type: types.NEXT_TRACKS_PAGE });

export const actionGetTracks = (page, sortBy, findAll = false) => (
    dispatch
) => {
    const jwtData = jwtDecode(localStorage.getItem("authToken"));

    dispatch(actionGetTracksPending());

    const paginationSettings = !findAll
        ? {
              limit: [LIMIT.TRACKS_ON_PAGE],
              skip: [page * LIMIT.TRACKS_ON_PAGE],
              sort: [{ originalFileName: sortBy }],
          }
        : {};

    getGQL(getTracksQuery, {
        query: JSON.stringify([
            {
                ___owner: jwtData.id,
                url: { $exists: true, $ne: "" },
                originalFileName: { $exists: true, $ne: "" },
            },
            paginationSettings,
        ]),
    })
        .then((tracks) => {
            dispatch(actionGetTracksSuccess(tracks));
            dispatch(actionNextTracksPage());
        })
        .catch(() => dispatch(actionGetTracksFail()))
        .finally(() => dispatch(actionTracksFetchingOff()));
};

export const actionTracksFetchingOn = () => ({
    type: types.TRACKS_FETCHING_ON,
});
export const actionTracksFetchingOff = () => ({
    type: types.TRACKS_FETCHING_OFF,
});

export const actionGetTracksCount = () => (dispatch) => {
    const jwtData = jwtDecode(localStorage.getItem("authToken"));

    dispatch(actionGetTracksCountPending());

    getGQL(getTracksCountQuery, {
        query: JSON.stringify([
            {
                ___owner: jwtData.id,
            },
        ]),
    })
        .then((value) => dispatch(actionGetTracksCountSuccess(value)))
        .catch(() => dispatch(actionGetTracksCountFail()));
};

export const actionSetSortByTracks = (value) => ({
    type: types.SET_SORT_BY_TRACKS,
    payload: value,
});

export const actionRemoveTracks = () => ({ type: types.REMOVE_TRACKS });

export const actionTrackToDelete = (id) => ({
    type: types.TRACK_TO_DELETE,
    payload: id,
});

export const actionDeleteTracks = (ids) => (dispatch) => {
    dispatch(actionDeleteTracksPending());

    const promises = ids.map((id) => getGQL(deleteTrackById, { id }));

    Promise.all(promises)
        .then(() => dispatch(actionDeleteTracksSuccess()))
        .catch(() => dispatch(actionDeleteTracksFail()));
};
