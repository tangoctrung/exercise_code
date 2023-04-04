import * as ACTIONS from '../constants/mailContant';
import { getDataAPI, postDataAPI, putDataAPI } from "../../api/api";


export const sendMail = (data, socket, token) => async (dispatch) => {
    try {
        const res = await postDataAPI("createmail", data, token);
        if (res.data.status) {
            dispatch({type: ACTIONS.SEND_MAIL, payload: {mail: res.data.data}});
            socket.emit("sendMail", res.data.data);
            dispatch({type: ACTIONS.CLOSE_SEND_MAIL});
        }
    } catch (err) {
        console.log(err);
    }
}

export const getMail = (socket) => async (dispatch) => {
    try {
        socket?.on("getMail", (dataMail) => {
            console.log(dataMail);
            dispatch({type: ACTIONS.RECEIVE_MAIL, payload: {mail: dataMail}});  
        }) 
    } catch (err) {
        console.log(err);
    }
}

export const deleteMail = (data, token) => async (dispatch) => {
    try {
        const res = await putDataAPI("deletemail", data, token);
        if (res.data.status) {
            dispatch({type: ACTIONS.DELETE_MAIL_SEND, payload: {mailId: data.mailId}});
            dispatch({type: ACTIONS.DELETE_MAIL_RECEIVE, payload: {mailId: data.mailId}});
        }
    } catch (err) {
        console.log(err);
    }
}

export const updateWatchedMail = (data, index, token) => async (dispatch) => {
    try {
        const res = await putDataAPI("updatewatched", data, token);
        if (res.data.status) {
            dispatch({type: ACTIONS.UPDATE_WATCHED_MAIL, payload: {mail: res.data.data, index}});
        }
    } catch (err) {
        console.log(err);
    }
}

export const getAllMail = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI("getallmailsend", token);
        if (res.data.status) {
            dispatch({type: ACTIONS.GET_ALL_MAIL_SEND, payload: {listMail: res.data.data}});
        }
        const res1 = await getDataAPI("getallmailreceive", token);
        if (res1.data.status) {
            dispatch({type: ACTIONS.GET_ALL_MAIL_RECEIVE, payload: {listMail: res1.data.data}});
        }
    } catch (err) {
        console.log(err);
    }
}

export const getAllUser = (token) => async (dispatch) => {
    try{
        const res = await getDataAPI("getalluser", token);
        if (res.data.status) {
            dispatch({type: ACTIONS.GET_ALL_USERS, payload: {users: res.data.users}});
        }
    } catch (err) {
        console.log(err);
    }
}