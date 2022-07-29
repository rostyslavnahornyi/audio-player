import { STATUSES } from "../../../utils/constants";
import { getGQL } from "../../../utils/getGQL";
import { registerQuery, loginQuery } from "../../../utils/graphQueries";
import types from "../types";

const actionRegisterPending = () => ({
    type: types.REGISTER_PENDING,
    status: STATUSES.PENDING,
});
const actionRegisterSuccess = (payload) => ({
    type: types.REGISTER_SUCCESS,
    status: STATUSES.SUCCESS,
    payload,
});
const actionRegisterFail = (error) => ({
    type: types.REGISTER_FAIL,
    status: STATUSES.FAIL,
    error,
});

const actionLoginPending = () => ({
    type: types.LOGIN_PENDING,
    status: STATUSES.PENDING,
});
const actionLoginSuccess = (payload) => ({
    type: types.LOGIN_SUCCESS,
    status: STATUSES.SUCCESS,
    payload,
});
const actionLoginFail = (error) => ({
    type: types.LOGIN_FAIL,
    status: STATUSES.FAIL,
    error,
});

export const actionRegister = (email, password) => (dispatch) => {
    dispatch(actionRegisterPending);

    getGQL(registerQuery, { login: email, password })
        .then((data) => dispatch(actionRegisterSuccess(data)))
        .catch((error) => dispatch(actionRegisterFail(error)));
};

export const actionLogin = (email, password) => (dispatch) => {
    dispatch(actionLoginPending);

    getGQL(loginQuery, { login: email, password })
        .then((authToken) => {
            if (authToken) {
                localStorage.setItem("authToken", authToken);
                return dispatch(actionLoginSuccess(authToken));
            }
            return dispatch(actionLoginFail("User is not found"));
        })
        .catch((error) => dispatch(actionLoginFail(error)));
};

export const actionLogout = () => {
    localStorage.removeItem("authToken");
    return { type: types.LOGOUT };
};
