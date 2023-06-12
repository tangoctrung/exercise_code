import AxiosInstance from "../api";

export const getBranchs = () => {
    return AxiosInstance.get("api/branches")
}

export const createAccountBM = (dataRequest:any) => {
    return AxiosInstance.post("manager", {data: dataRequest})
}

export const createAccountKetoan = (dataRequest:any) => {
    return AxiosInstance.post("accountant", {data: dataRequest})
}

export const createAccountDoctor = (dataRequest:any) => {
    return AxiosInstance.post("staff/doctors", {data: dataRequest})
}

export const createBranch = (dataRequest:any) => {
    return AxiosInstance.post("api/branches", {data: dataRequest})
}

export const getListDoctorFeedbacks = (from:number, to:number) => {
    return AxiosInstance.get(`staff/doctors?fromStar=${from}&toStar=${to}`)
}

export const getBranchId = () => {
    return AxiosInstance.get("manager/branch")
}

export const getListTool = (branchId:string) => {
    return AxiosInstance.get(`manager/tools?branchId=${branchId}`)
}

export const createTool = (dataRequest:any) => {
    return AxiosInstance.post(`manager/tools`, {data:dataRequest})
}

export const getListTreatment = (branchId: string, from:string, to:string) => {
    return AxiosInstance.get(`staff/treatments?branchId=${branchId}&from=${from}&to=${to}`)
}

export const createServices = (dataRequest:any) => {
    return AxiosInstance.post(`manager/service-types`, {data:dataRequest})
}

export const getServices = () => {
    return AxiosInstance.get(`manager/service-types`)
}

export const assignDevice = (dataRequest:any) => {
    return AxiosInstance.post(`manager/tool-users`, {data: dataRequest})
}

export const getListAssignDevice = (branchId: string) => {
    return AxiosInstance.get(`manager/tool-users?branchId=${branchId}&status=1`)
}

export const getHistoryActionDevice = (branchId:string) => {
    return AxiosInstance.get(`manager/tool-managements?branchId=${branchId}`)
}

export const returnAssignDevice = (assignId: string) => {
    return AxiosInstance.put(`manager/tool-users/return/${assignId}`, {data: {}})
}

export const getListDoctor = (branchId: string) => {
    return AxiosInstance.get(`staff/doctors?branchId=${branchId}`)
}

export const getTotalSoLuotKham = (from: string, to: string, branchId:string) => {  // 01-2023
    return AxiosInstance.get(`staff/stats/total?from=${from}&to=${to}&branchId=${branchId}`)
}

export const getTotalMoney = (from: string, to: string, branchId: string) => {
    return AxiosInstance.get(`staff/stats/money?branchId=${branchId}&from=${from}&to=${to}`)
}

export const getToolManagerKetoan = (from: string, to: string, branchId:string) => {
    return AxiosInstance.get(`manager/tool-managements?branchId=${branchId}&from=${from}&to=${to}`)
}

export const getDataDiseases = (from: string, to: string, branchId:string) => {
    return AxiosInstance.get(`staff/stats/diseases?branchId=${branchId}&from=${from}&to=${to}`)
}

export const getHistoryActionDeviceKeToan = (branchId:string) => {
    return AxiosInstance.get(`manager/tool-managements?branchId=${branchId}&type=0`)
}