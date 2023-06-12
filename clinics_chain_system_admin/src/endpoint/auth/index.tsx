import AxiosInstance from "../api";

export const loginUser = (dataRequest:any) => {
    return AxiosInstance.post("auth/credential", {data: dataRequest})
}

export const getInfoUser = () => {
    return AxiosInstance.get("api/get-me")
}

export const updateInfoUser = (dataRequest:any) => {
    return AxiosInstance.put("api/users", {data: dataRequest})
}