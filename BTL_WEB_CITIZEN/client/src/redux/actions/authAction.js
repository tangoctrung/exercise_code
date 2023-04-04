import { getDataAPI, postDataAPI, putDataAPI } from '../../api/api';
import * as ACTIONS from "../constants/authContant";

export const login = (data) => async (dispatch) => {
    try {
        const res = await postDataAPI('auth/login', data);
        if (res.data.status === true) {
            dispatch({
                type: ACTIONS.LOGIN_SUCCESS,
                payload: {
                    accessToken: res.data.token,
                    user: res.data.newUser,
                }
            });
            localStorage.setItem('accessToken', JSON.stringify(res.data.token));
        } else {
            dispatch({type: ACTIONS.LOGIN_ERROR, payload: {
                message: res.data.message,
            }})
        }
    } catch (err) {
        console.log(err);
    }
}

export const register = (data, token) => async (dispatch) => {
    try {
        const res = await postDataAPI('auth/register', data, token);
        if (res.data.status === true) {
            dispatch({type: ACTIONS.REGISTER_SUCCESS, payload: {message: res.data.message}});
        } else {
            dispatch({type: ACTIONS.REGISTER_ERROR, payload: {
                message: res.data.message,
                messageDetail: res.data.messageDetail,
            }});
        }
    } catch (err) {
        console.log(err);
    }
}

export const getUser = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI('getuser', token);
        if (res.data.status === true) {
            dispatch({
                type: ACTIONS.GET_USER,
                payload: {
                    user: res.data.user,
                }
            });
            // localStorage.setItem('accessToken', JSON.stringify(res.data.token));
        } else {
            // dispatch({type: ACTIONS.LOGIN_ERROR, payload: {
            //     message: res.data.message,
            // }})
        }
    } catch (err) {
        console.log(err);
    }
}

export const updateUser = (data, userId, token) => async (dispatch) => {
    try {
        const res = await putDataAPI('updateuser/' + userId, data, token);
        if (res.data.status === true) {
            dispatch({
                type: ACTIONS.UPDATE_USER,
                payload: {
                    user: res.data.user,
                }
            });
            window.location.reload();
        } else {
        }
    } catch (err) {
        console.log(err);
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch({type: ACTIONS.LOGOUT});
        localStorage.setItem('accessToken', null);
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
}

export const changePassword = (data, setIsOpenModalPassword, token) => async (dispatch) => {
    try {
        const res = await putDataAPI("changepasswordsecondary", data, token);
        if (res.data.status) {
            setIsOpenModalPassword(false)
        } else {
            alert(`${res.data.message}`);
        }
    } catch (err) {
        console.log(err);
    }
}
