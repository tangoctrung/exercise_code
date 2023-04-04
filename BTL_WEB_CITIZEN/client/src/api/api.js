import axios from 'axios';
import { urlApi } from './urlApi';

export const getDataAPI = async (url, token) => {
    const res = await axios.get( urlApi + `/${url}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return res;
}

export const postDataAPI = async (url, data, token) => {
    const res = await axios.post( urlApi + `/${url}`, data, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return res;
}


export const putDataAPI = async (url, data, token) => {
    const res = await axios.put( urlApi + `/${url}`, data, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return res;
}
export const patchDataAPI = async (url, data, token) => {
    const res = await axios.patch( urlApi + `/${url}`, data, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return res;
}

export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete( urlApi + `/${url}`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    return res;
}