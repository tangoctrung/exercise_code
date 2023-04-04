import * as ACTIONS from '../constants/addCodeContant';


const initialState = {
    error: "",
    errorDetail: "",
    success: "",
    city: [],
    district: [],
    ward: [],
    village: [],
    messageCity: "",
    messageDistrict: "",
    messageWard: "",
    messageVillage: "",
};


const addCode = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.MESSAGE_ERROR:
            return {
                ...state,
                error: action.payload.error,
                errorDetail: action.payload.errorDetail,
            };
        case ACTIONS.MESSAGE_SUCCESS:
            return {
                ...state,
                success: action.payload.success,
            };
        case ACTIONS.CLEAR_MESSAGE:
            return {
                ...state,
                error: '',
                errorDetail: '',
                success: '',        
            };
        case ACTIONS.GET_CITY:
            return {
                ...state,
                city: action.payload.city,
                district: [],
                ward: [],
                village: [],
            };
        case ACTIONS.GET_DISTRICT:
            return {
                ...state,
                district: action.payload.district,
                ward: [],
                village: [],
            };
        case ACTIONS.GET_WARD:
            return {
                ...state,
                ward: action.payload.ward,
                village: [],
            };
        case ACTIONS.GET_VILLAGE:
            return {
                ...state,
                village: action.payload.village,
            };
        case ACTIONS.MESSAGE_CITY:
            return {
                ...state,
                messageCity: action.payload.message || "Không có dữ liệu.",
                city: [],
            };
        case ACTIONS.MESSAGE_DISTRICT:
            return {
                ...state,
                messageDistrict: action.payload.message || "Không có dữ liệu.",
                district: [],
            };
        case ACTIONS.MESSAGE_WARD:
            return {
                ...state,
                messageWard: action.payload.message || "Không có dữ liệu.",
                ward: [],
            };
        case ACTIONS.MESSAGE_VILLAGE:
            return {
                ...state,
                messageVillage: action.payload.message || "Không có dữ liệu.",
                village: [],
            };
        default:
            return state;
    }
}
export default addCode;