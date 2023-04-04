import { getDataAPI, putDataAPI, postDataAPI, deleteDataAPI } from '../../api/api';
import * as ACTIONS from "../constants/userContant";

export const getAllUser = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI('getalluser', token);
        if (res.data.status === true) {
            dispatch({
                type: ACTIONS.GET_ALL_USER,
                payload: {
                    listUser: res.data.users,
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

export const getAllUserIsProvied = (userId, token) => async (dispatch) => {
    try {
        const res = await getDataAPI(`getalluserisprovied/${userId}`, token);
        if (res.data.status === true) {
            dispatch({
                type: ACTIONS.GET_ALL_USER_IS_PROVIED,
                payload: {
                    listUser: res.data.users,
                }
            });
        } else {
        }
    } catch (err) {
        console.log(err);
    }
}

export const changePassword = (data, token) => async (dispatch) => {
    try {
        const res = await putDataAPI('changepassword', data, token);
        if (res.data.status) {
            window.location.reload();
        } else {
            dispatch({type: ACTIONS.CHANGE_PASSWORD_ERROR, payload: {message: res.data.message}});
        }
    } catch (err) {
        console.log(err);
    }
}

export const addCitizen = (data, token) => async (dispatch) => {
    try {
        const res = await postDataAPI('addcitizen', data, token);
        if (res.data.status) {
            dispatch({type: ACTIONS.ADD_CITIZEN, payload: {message: res.data.message}})
        } else {
            dispatch({type: ACTIONS.ADD_CITIZEN, payload: {message: res.data.message}})
        }
    } catch (err) {
        console.log(err);
    }
}

export const updateCitizen = (index, data, userId, setIsOpenModal, token) => async (dispatch) => {
    try {
        const res = await putDataAPI(`updatecitizen/${userId}`, data, token);
        if (res.data.status) {
            dispatch({type: ACTIONS.EDIT_CITIZEN, payload: {
                index: index,
                citizen: data,
            }});
            setIsOpenModal(false);
        } else {
            dispatch({type: ACTIONS.EDIT_CITIZEN_ERROR, payload: {message: res.data.message}})
        }
    } catch (err) {
        console.log(err);
    }
}

export const deleteCitizen = (citizenId, setIsOpenModalDeleteCitizen, token) => async (dispatch) => {
    try {
        const res = await deleteDataAPI(`deletecitizen/${citizenId}`, token);
        if (res.data.status) {
            dispatch({type: ACTIONS.DELETE_CITIZEN, payload: {
                citizenId: citizenId,
            }});
            setIsOpenModalDeleteCitizen(false);
        } else {
            dispatch({type: ACTIONS.DELETE_CITIZEN_ERROR, payload: {message: res.data.message}})
        }
    } catch (err) {
        console.log(err);
    }
}

export const getAllCitizenCodenameDefault = (data, token) => async (dispatch) => {
    // xác định xem tên vùng người dùng tìm kiếm thuộc level nào: thôn, xã, huyện, tỉnh
    try {
        const res = await getDataAPI(`getallcitizencode?codeName=${data.codeName}&level=${data.level}`, token);
        dispatch({type: ACTIONS.GET_CITIZEN, payload: {citizens: res.data.citizens}});
    } catch (err) {
        console.log(err);
    }
}

export const getAllCitizenCodename = (data, token) => async (dispatch) => {
    let codeName = "";
    let level = "";
    // xác định xem tên vùng người dùng tìm kiếm thuộc level nào: thôn, xã, huyện, tỉnh
    if (data.nameCity !== "" && data.nameDistrict === "" && data.nameWard === "" && data.nameVillage === "") {
        codeName = data.nameCity;
        level = "Tỉnh";
    }
    if (data.nameDistrict !=="" && data.nameWard ==="" && data.nameVillage ==="") {
        codeName = data.nameDistrict;
        level = "Huyện";
    }
    if (data.nameWard !=="" && data.nameVillage ==="") {
        codeName = data.nameWard;
        level = "Xã";
    }
    if (data.nameVillage !=="") {
        codeName = data.nameVillage;
        level = "Thôn";
    }
    try {
        if (level !== "" && codeName !== "") {
            let res = null;
            if (codeName.includes(",")) {
                res = await getDataAPI(`getcitizenmanycode?codeName=${codeName}&level=${level}`, token);
            } else {
                res = await getDataAPI(`getallcitizencode?codeName=${codeName}&level=${level}`, token);
            }
            dispatch({type: ACTIONS.GET_CITIZEN, payload: {citizens: res.data.citizens}});
        }
    } catch (err) {
        console.log(err);
    }
}

export const getCitizenNumCCCD = (numCCCD, token) => async (dispatch) => {
    try {
        if (numCCCD !== "" && numCCCD !== undefined) {
            const res = await getDataAPI(`getcitizennumCCCD?numCCCD=${numCCCD}`, token);
            dispatch({type: ACTIONS.GET_CITIZEN_NUM_CCCD, payload: {citizen: res.data.data}});
        }

    } catch (err) {
        console.log(err);
    }
}

export const getAllCitizen = (token) => async (dispatch) => {
    try{
        const res = await getDataAPI('getallcitizen', token);
        dispatch({type: ACTIONS.GET_ALL_CITIZEN, payload: {citizens: res.data.citizens}})
    } catch (err) {
        console.log(err);
    }
}