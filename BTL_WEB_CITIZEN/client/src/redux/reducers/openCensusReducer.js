import * as ACTIONS from '../constants/openCensusContant';


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
    messageCitizen: "",
    listCitizen: [],
    statusCensus: false, // kiểm tra xem địa phương của người dùng có đang mở cuộc khảo sát hay không,
    isComplete: false, // kiểm tra xem địa phương đã hoàn thành cuộc khảo sát hay chưa
    timeClose: null,
    timeOpen: null,
    messageComplete: "",
};


const openCensus = (state = initialState, action) => {
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
                messageComplete: '',    
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
        case ACTIONS.GET_CITIZEN_CODENAME:
            return {
                ...state,
                messageCitizen: "",
                listCitizen: action.payload.citizens,
            }
        case ACTIONS.GET_CITIZEN_CODENAME_ERROR:
            return {
                ...state,
                messageCitizen: action.payload.message,
                listCitizen: [],
            }
        case ACTIONS.CHECK_OPEN_CENSUS:
            return {
                ...state,
                statusCensus: action.payload.statusCensus,
                timeClose: action.payload.timeClose,
                timeOpen: action.payload.timeOpen,
            }
        case ACTIONS.COMPLETE_CENSUS:
            return {
                ...state,
                isComplete: true,
                statusCensus: false,
            }    
        case ACTIONS.COMPLETE_CENSUS_ERROR:
            return {
                ...state,
                messageComplete: action.payload.message,
            }    
        default:
            return state;
    }
}
export default openCensus;