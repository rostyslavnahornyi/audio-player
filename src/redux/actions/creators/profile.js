import { STATUSES } from "../../../utils/constants";
import { getGQL } from "../../../utils/getGQL";
import { getGQL_Upload } from "../../../utils/getGQL_Upload";
import { changePasswordQuery } from "../../../utils/graphQueries";
import { jwtDecode } from "../../../utils/jwtDecoder";
import types from "../types";

const changePasswordPending = () => ({
    type: types.CHANGE_PASSWORD_PENDING,
    status: STATUSES.PENDING,
});
const changePasswordSuccess = () => ({
    type: types.CHANGE_PASSWORD_SUCCESS,
    status: STATUSES.SUCCESS,
});
const changePasswordFail = () => ({
    type: types.CHANGE_PASSWORD_FAIL,
    status: STATUSES.FAIL,
});

export const actionGetProfileData = () => {
    const jwtData = jwtDecode(localStorage.getItem("authToken"));
    const { createdAt, permission, login } = jwtData;

    const dateCreatedAt = new Date(createdAt * 1000).toLocaleDateString();

    return {
        type: types.PROFILE_GET_DATA,
        payload: { createdAt: dateCreatedAt, permission, login },
    };
};

export const actionChange = (pastPassword, newPassword) => (
    dispatch
) => {
    dispatch(changePasswordPending());

    const jwtData = jwtDecode(localStorage.getItem("authToken"));
    getGQL(changePasswordQuery, {
        login: jwtData.login,
        password: pastPassword,
        newPassword,
    })
        .then(() => dispatch(changePasswordSuccess()))
        .catch(() => changePasswordFail());
};
