import AxiosInstance from "../api";

export const getBranchs = () => {
    return AxiosInstance.get("api/branches")
}

export const getServices = () => {
    return AxiosInstance.get("manager/service-types")
}

export const getListDoctor = (branchId:string) => {
    return AxiosInstance.get(`staff/doctors?branchId=${branchId}`)
}

export const createReservation = (dataRequest: any) => {
    return AxiosInstance.post("api/reservations", {data: dataRequest})
}

export const getListFeedback = () => {
    return AxiosInstance.get(`api/feedbacks`)
}

export const createFeedback = (dataRequest:any) => {
    return AxiosInstance.post(`api/feedbacks`, { data: dataRequest})
}