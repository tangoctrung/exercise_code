import AxiosInstance from "../api";

export const getInfoDoctor = () => {
    return AxiosInstance.get("staff/get-me")
}

export const updateInfoDoctor = (dataRequest:any) => {
    return AxiosInstance.put("staff/doctors", {data: dataRequest})
}

export const createInfoDoctor = (dataRequest:any) => {
    return AxiosInstance.post("staff/doctors", {data: dataRequest})
}

export const updateProfileDoctor = (dataRequest:any) => {
    return AxiosInstance.put("staff/profiles", {data: dataRequest})
}

export const createProfileDoctor = (dataRequest:any) => {
    return AxiosInstance.post("staff/profiles", {data: dataRequest})
}

export const getTimeWorkingDoctor = (dataRequest: any) => {
    return AxiosInstance.get(`staff/working-times?doctorId=${dataRequest?.doctorId}&from=${dataRequest?.from}&to=${dataRequest?.to}`)
}

export const createTimeWorkingDoctor = (dataRequest: any) => {
    return AxiosInstance.post(`staff/working-times`, {data: dataRequest})
}

export const getNotiDoctor = () => {
    return AxiosInstance.get(`staff/notifications`)
}

export const confirmNotiDoctor = (notiId:string) => {
    return AxiosInstance.post(`staff/notifications/confirm/${notiId}`, {
        data: {}
    })
}

export const getTreatments = (email: string, doctorId: string) => {
    return AxiosInstance.get(`staff/treatments?email=${email}&doctorId=${doctorId}`)
}

export const createTreatment = (dataRequest:any) => {
    return AxiosInstance.post(`staff/treatments`, {data: dataRequest})
}

export const updateTreatment = (id: string, dataRequest:any) => {
    return AxiosInstance.put(`staff/treatments/${id}`, {data: dataRequest})
}