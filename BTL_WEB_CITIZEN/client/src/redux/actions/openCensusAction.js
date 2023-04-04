import { getDataAPI, postDataAPI, putDataAPI } from '../../api/api';
import * as ACTIONS from "../constants/openCensusContant";

// lấy danh sách các tỉnh, huyện, xã, thôn mà người dùng quản lí
export const getCodeNameOpenCensus = (codeId, token) => async (dispatch) => {
    try {
        const res = await getDataAPI('getallcodeopencensus/' + codeId, token);
        if (res.data.status === true) {
            if (codeId === "00") {
                dispatch({type: ACTIONS.GET_CITY, payload: {city: res.data.data}})
                dispatch({type: ACTIONS.MESSAGE_DISTRICT, payload: {message: "Không có dữ liệu."}})
                dispatch({type: ACTIONS.MESSAGE_WARD, payload: {message: "Không có dữ liệu."}});
                dispatch({type: ACTIONS.MESSAGE_VILLAGE, payload: {message: "Không có dữ liệu."}})
            } else if (codeId.length === 2 && codeId !== "00") {
                dispatch({type: ACTIONS.GET_DISTRICT, payload: {district: res.data.data}})
                dispatch({type: ACTIONS.MESSAGE_WARD, payload: {message: "Không có dữ liệu."}});
                dispatch({type: ACTIONS.MESSAGE_VILLAGE, payload: {message: "Không có dữ liệu."}})
            } else if (codeId.length === 4 && codeId !== "00") {
                dispatch({type: ACTIONS.GET_WARD, payload: {ward: res.data.data}})
                dispatch({type: ACTIONS.MESSAGE_VILLAGE, payload: {message: "Không có dữ liệu."}})
            } else if (codeId.length === 6 && codeId !== "00") {
                dispatch({type: ACTIONS.GET_VILLAGE, payload: {village: res.data.data}})
            }
        } else {
            if (codeId === "00") {
                dispatch({type: ACTIONS.MESSAGE_CITY, payload: {message: res.data.message}})
                dispatch({type: ACTIONS.MESSAGE_DISTRICT, payload: {message: res.data.message}})
                dispatch({type: ACTIONS.MESSAGE_WARD, payload: {message: res.data.message}});
                dispatch({type: ACTIONS.MESSAGE_VILLAGE, payload: {message: res.data.message}})
            } else if (codeId.length === 2 && codeId !== "00") {
                dispatch({type: ACTIONS.MESSAGE_DISTRICT, payload: {message: res.data.message}})
                dispatch({type: ACTIONS.MESSAGE_WARD, payload: {message: res.data.message}});
                dispatch({type: ACTIONS.MESSAGE_VILLAGE, payload: {message: res.data.message}})
            } else if (codeId.length === 4 && codeId !== "00") {
                dispatch({type: ACTIONS.MESSAGE_WARD, payload: {message: res.data.message}})
                dispatch({type: ACTIONS.MESSAGE_VILLAGE, payload: {message: res.data.message}})
            } else if (codeId.length === 6 && codeId !== "00") {
                dispatch({type: ACTIONS.MESSAGE_VILLAGE, payload: {message: res.data.message}})
            }
        }
    } catch (err) {
        console.log(err);
    }
}

// lấy danh sách công dân của từng địa phương người dùng quản lí
export const getCitizenCodename = (codeName, level, token) => async (dispatch) => {
    
    try {
        if (level !== "" && codeName !== "") {
            const res = await getDataAPI(`getallcitizencode?codeName=${codeName}&level=${level}`, token);
            dispatch({type: ACTIONS.GET_CITIZEN_CODENAME, payload: {citizens: res.data.citizens}});
        }
    } catch (err) {
        console.log(err);
    }
}

// kiểm tra thời gian khai báo
export const checkTimeCensus = (token) => async (dispatch) => {
    try {
        const res = await putDataAPI(`checktimecensus`,{}, token);
        if (res.data.status) {
            dispatch({type: ACTIONS.CHECK_OPEN_CENSUS, payload: {
                statusCensus: true, timeOpen: res.data.timeOpen, timeClose: res.data.timeClose
            }});
        } else {
            dispatch({type: ACTIONS.CHECK_OPEN_CENSUS, payload: {
                statusCensus: false, timeOpen: null, timeClose: null
            }});
        }
    } catch (err) {
        console.log(err);
    }
}

// mở cuộc khai báo dân số
export const openCensusTime = (user, data, token) => async (dispatch) => {
    try {
        let res = null;
        if (user?.typeAccount === "A1") {
            let data1 = {
                timeOpen: data.timeOpen,
                timeClose: data.timeClose,
                opener: user?._id,
            }
            res = await postDataAPI("opencensusa1", data1, token);
        } else {
            res = await putDataAPI("opencensuscode", data, token);
        }
        if (res.data.status) {
            dispatch({type: ACTIONS.MESSAGE_SUCCESS, payload: {success: res.data.message}});
            dispatch({type: ACTIONS.CHECK_OPEN_CENSUS, payload: {
                statusCensus: true, timeOpen: data.timeOpen, timeClose: data.timeClose
            }});
        } else {
            dispatch({type: ACTIONS.MESSAGE_ERROR, payload: {error: res.data.message, errorDetail: res.data.messageDetail}});
        }
    } catch (err) {
        console.log(err);
    }
}

// chỉnh sửa thời gian khai báo dân số
export const editCensusTime = (setIsOpenModalEdit ,data, token) => async (dispatch) => {
    try {
        const res = await putDataAPI("edittimecensus", data, token);
        if (res.data.status) {
            dispatch({type: ACTIONS.MESSAGE_SUCCESS, payload: {success: res.data.message}});
            dispatch({type: ACTIONS.CHECK_OPEN_CENSUS, payload: {
                statusCensus: true, timeOpen: data.timeOpen, timeClose: data.timeClose
            }});
            setIsOpenModalEdit(false);
        } else {
            dispatch({type: ACTIONS.MESSAGE_ERROR, payload: {error: res.data.message, errorDetail: res.data.messageDetail}});
        }
    } catch (err) {
        console.log(err);
    }
}

export const completeCensus = (setIsOpenModalComplete, token) => async (dispatch) => {
    try {
        const res = await putDataAPI("completecensus", {}, token);
        if (res.data.status) {
            dispatch({type: ACTIONS.COMPLETE_CENSUS});
            setIsOpenModalComplete(false);
        } else {
            dispatch({type: ACTIONS.COMPLETE_CENSUS_ERROR, payload: {message: res.data.message}})
        }
    } catch (err) {
        console.log(err);
    }
}