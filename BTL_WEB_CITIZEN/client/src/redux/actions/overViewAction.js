import { getDataAPI, postDataAPI, putDataAPI } from '../../api/api';
import * as ACTIONS from "../constants/overViewContant";

export const overViewTieuChi = (data, token) => async (dispatch) => {
    let codeName = "";
    let level = "";
    let tieuchi = data.tieuChi;
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
        if (level !== "" && codeName !== "" && tieuchi !== "") {
            let res = null;
            if (tieuchi === "Gender") {
                res = await getDataAPI(`getcitizengender?codeName=${codeName}&level=${level}`, token);
            } else if (tieuchi === "Age") {
                res = await getDataAPI(`getcitizenage?codeName=${codeName}&level=${level}`, token);
            } else if (tieuchi === "Nation") {
                res = await getDataAPI(`getcitizennation?codeName=${codeName}&level=${level}`, token);
            } else if (tieuchi === "Religion") {
                res = await getDataAPI(`getcitizenreligion?codeName=${codeName}&level=${level}`, token);
            } else if (tieuchi === "Education") {
                res = await getDataAPI(`getcitizeneducation?codeName=${codeName}&level=${level}`, token);
            } else if (tieuchi === "Job") {
                res = await getDataAPI(`getcitizenjob?codeName=${codeName}&level=${level}`, token);
            }
            if (res.data.status) {
                dispatch({type: ACTIONS.GET_CITIZEN_CODENAME, payload: {data: res.data.data}});
            } else {
                dispatch({type: ACTIONS.GET_CITIZEN_CODENAME_ERROR, payload: {message: res.data.message}});
            }
        }
    } catch (err) {
        console.log(err);
    }
}
