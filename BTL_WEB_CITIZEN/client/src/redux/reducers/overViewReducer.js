import * as ACTIONS from '../constants/overViewContant';


const initialState = {
    dataPie: null,
    messageError: "Không có dữ liệu.",
};


const overView = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.GET_CITIZEN_CODENAME:
            return {
                ...state,
                dataPie: action.payload.data,
                messageError: '',
            }
        case ACTIONS.GET_CITIZEN_CODENAME_ERROR:
            return {
                ...state,
                messageError: action.payload.message,
                dataPie: null,
            }
        case ACTIONS.CLEAR_DATA:
            return {
                ...state,
                dataPie: '',
            }
        default:
            return state;
    }
}
export default overView;