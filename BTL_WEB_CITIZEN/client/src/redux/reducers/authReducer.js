import * as ACTIONS from '../constants/authContant';


const initialState = {
    accessToken: JSON.parse(localStorage.getItem("accessToken")) || null,
    user: null,
    messageRegister: "",
    messageLogin: "",
    messageError: "",
    messageDetail: "",
    messageSuccess: "",
};


const auth = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN_START:
            return {
                ...state,
                isLoading: true,
            };
        case ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                user: action.payload.user,
                isLoading: false,
            };
        case ACTIONS.LOGIN_ERROR:
            return {
                ...state,
                messageLogin: action.payload.message,
                isLoading: false,
            };
        case ACTIONS.GET_USER:
            return {
                ...state,
                user: action.payload.user,
            };
        case ACTIONS.REGISTER_SUCCESS:
            return {
                ...state,
                messageSuccess: action.payload.message,
            };
        case ACTIONS.REGISTER_ERROR:
            return {
                ...state,
                messageRegister: action.payload.message,
                messageDetail: action.payload.messageDetail,
            };
        case ACTIONS.CLEAR_MESSAGE:
            return {
                ...state,
                messageRegister: '',
                messageLogin: '',
                messageDetail: '',
                messageSuccess: '',
            };
        case ACTIONS.UPDATE_USER:
            return {
                ...state,
                user: action.payload.user,
            };
        case ACTIONS.UPDATE_ERROR:
            return {
                ...state,
                messageError: action.payload.messageError,
            };
        case ACTIONS.LOGOUT: 
            return {
                ...state,
                user: null,
                accessToken: null,
            }
        default:
            return state;
    }
}
export default auth;