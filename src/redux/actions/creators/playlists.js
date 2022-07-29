import { LIMIT, ROUTES, STATUSES } from "../../../utils/constants";
import { getGQL } from "../../../utils/getGQL";
import {
    createPlaylistQuery,
    getIdsInPlaylistQuery,
    getPlaylistByIdQuery,
    getPlaylistsCountQuery,
    getPlaylistsQuery,
    upsertPlaylistInfoQuery,
} from "../../../utils/graphQueries";
import { jwtDecode } from "../../../utils/jwtDecoder";
import types from "../types";

const createPlaylistPending = () => ({
    type: types.CREATE_PLAYLIST_PENDING,
    status: STATUSES.PENDING,
});
const createPlaylistSuccess = (id) => ({
    type: types.CREATE_PLAYLIST_SUCCESS,
    payload: id,
    status: STATUSES.SUCCESS,
});
const createPlaylistFail = () => ({
    type: types.CREATE_PLAYLIST_FAIL,
    status: STATUSES.FAIL,
});
const getPlaylistsCountPending = () => ({
    type: types.GET_PLAYLISTS_COUNT_PENDING,
    status: STATUSES.PENDING,
});
const getPlaylistsCountSuccess = (value) => ({
    type: types.GET_PLAYLISTS_COUNT_SUCCESS,
    payload: value,
    status: STATUSES.SUCCESS,
});
const getPlaylistsCountFail = () => ({
    type: types.GET_PLAYLISTS_COUNT_FAIL,
    status: STATUSES.FAIL,
});
const getPlaylistsPending = () => ({
    type: types.GET_PLAYLISTS_PENDING,
    status: STATUSES.PENDING,
});
const getPlaylistsSuccess = (playlists) => ({
    type: types.GET_PLAYLISTS_SUCCESS,
    payload: playlists,
    status: STATUSES.SUCCESS,
});
const getPlaylistsFail = () => ({
    type: types.GET_PLAYLISTS_FAIL,
    status: STATUSES.FAIL,
});
const getPlaylistByIdPending = () => ({
    type: types.GET_PLAYLIST_BY_ID_PENDING,
    status: STATUSES.PENDING,
});
const getPlaylistByIdSuccess = (playlist) => ({
    type: types.GET_PLAYLIST_BY_ID_SUCCESS,
    payload: playlist,
    status: STATUSES.SUCCESS,
});
const getPlaylistByIdFail = () => ({
    type: types.GET_PLAYLIST_BY_ID_FAIL,
    status: STATUSES.FAIL,
});
const upsertPlaylistInfoPending = () => ({
    type: types.PLAYLIST_UPSERT_INFO_PENDING,
    status: STATUSES.PENDING,
});
const upsertPlaylistInfoSuccess = (playlist) => ({
    type: types.PLAYLIST_UPSERT_INFO_SUCCESS,
    status: STATUSES.SUCCESS,
    payload: playlist,
});
const upsertPlaylistInfoFail = () => ({
    type: types.PLAYLIST_UPSERT_INFO_FAIL,
    status: STATUSES.FAIL,
});
const removeTrackFromPlaylistPending = () => ({
    type: types.REMOVE_TRACK_FROM_PLAYLIST_PENDING,
    status: STATUSES.PENDING,
});
const removeTrackFromPlaylistSuccess = (tracks, playlistId) => ({
    type: types.REMOVE_TRACK_FROM_PLAYLIST_SUCCESS,
    status: STATUSES.SUCCESS,
    payload: { tracks, playlistId },
});
const removeTrackFromPlaylistFail = () => ({
    type: types.REMOVE_TRACK_FROM_PLAYLIST_FAIL,
    status: STATUSES.FAIL,
});
const addTrackToPlaylistPending = () => ({
    type: types.ADD_TRACK_TO_PLAYLIST_PENDING,
    status: STATUSES.PENDING,
});
const addTrackToPlaylistSuccess = (tracks) => ({
    type: types.ADD_TRACK_TO_PLAYLIST_SUCCESS,
    payload: tracks,
    status: STATUSES.SUCCESS,
});
const addTrackToPlaylistFail = () => ({
    type: types.ADD_TRACK_TO_PLAYLIST_FAIL,
    status: STATUSES.FAIL,
});

export const actionCreatePlaylist = (navigate) => (dispatch) => {
    dispatch(createPlaylistPending());

    getGQL(createPlaylistQuery)
        .then((playlist) => {
            const { _id } = playlist;

            dispatch(createPlaylistSuccess());
            navigate(`${ROUTES.PLAYLISTS}/${_id}`);
        })
        .catch(() => dispatch(createPlaylistFail()));
};

export const actionGetPlaylistsCount = () => (dispatch) => {
    dispatch(getPlaylistsCountPending());

    const jwtData = jwtDecode(localStorage.getItem("authToken"));

    getGQL(getPlaylistsCountQuery, {
        query: JSON.stringify([
            {
                ___owner: jwtData.id,
            },
        ]),
    })
        .then((count) => dispatch(getPlaylistsCountSuccess(count)))
        .catch(() => dispatch(getPlaylistsCountFail()));
};

export const actionPlaylistPageChange = (page) => ({
    type: types.PLAYLIST_PAGE_CHANGE,
    payload: page,
});

export const actionGetPlaylists = (page) => (dispatch) => {
    dispatch(getPlaylistsPending());

    const jwtData = jwtDecode(localStorage.getItem("authToken"));

    getGQL(getPlaylistsQuery, {
        query: JSON.stringify([
            {
                ___owner: jwtData.id,
            },
            {
                limit: [LIMIT.PLAYLISTS_ON_PAGE],
                skip: [(page - 1) * LIMIT.PLAYLISTS_ON_PAGE],
            },
        ]),
    })
        .then((playlists) => dispatch(getPlaylistsSuccess(playlists)))
        .catch(() => dispatch(getPlaylistsFail()));
};

export const actionGetPlaylistById = (_id) => (dispatch) => {
    dispatch(getPlaylistByIdPending());

    getGQL(getPlaylistByIdQuery, {
        query: JSON.stringify([{ _id }]),
    })
        .then((playlist) => dispatch(getPlaylistByIdSuccess(playlist)))
        .catch(() => dispatch(getPlaylistByIdFail()));
};

export const actionUpsertPlaylistInfo = (data) => (dispatch) => {
    dispatch(upsertPlaylistInfoPending());

    getGQL(upsertPlaylistInfoQuery, { query: data })
        .then((data) => dispatch(upsertPlaylistInfoSuccess(data)))
        .catch(e =>console.log(e));
};

export const actionRemoveTrackFromPlaylist = (playlistID, trackID) => (
    dispatch
) => {
    dispatch(removeTrackFromPlaylistPending());

    getGQL(getIdsInPlaylistQuery, {
        query: JSON.stringify([{ _id: playlistID }]),
    })
        .then((tracksWithId) => {
            const ids = tracksWithId.tracks;
            ids.splice(ids.findIndex((id) => id === trackID), 1);
            getGQL(upsertPlaylistInfoQuery, {
                query: {
                    _id: playlistID,
                    tracks: ids,
                },
            })
                .then(({ tracks }) =>
                    dispatch(removeTrackFromPlaylistSuccess(tracks, playlistID))
                )
                .catch(() => dispatch(removeTrackFromPlaylistFail()));
        })
        .catch(() => dispatch(removeTrackFromPlaylistFail()));
};

export const actionAddTrackToPlaylist = (playlistID, trackID) => (dispatch) => {
    dispatch(addTrackToPlaylistPending());

    getGQL(getIdsInPlaylistQuery, {
        query: JSON.stringify([{ _id: playlistID }]),
    })
        .then((tracksWithId) => {
            const ids = tracksWithId.tracks ?? [];
            
            const isExist =
                ids.findIndex((id) => id._id === trackID) === -1 ? false : true;

            if (!isExist) {
                ids.push({ _id: trackID });

                getGQL(upsertPlaylistInfoQuery, {
                    query: {
                        _id: playlistID,
                        tracks: ids,
                    },
                })
                    .then(({ tracks }) =>
                        dispatch(addTrackToPlaylistSuccess(tracks))
                    )
                    .catch(() => dispatch(addTrackToPlaylistFail()));
            }
        })
        .catch(() => dispatch(addTrackToPlaylistFail()));
};
