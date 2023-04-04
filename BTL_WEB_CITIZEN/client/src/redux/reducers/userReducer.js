import * as ACTIONS from '../constants/userContant';


const initialState = {
    articleView: '1',
    workingMode: '0',
    listUser: null,
    messageError: "",
    messageCitizenEdit: "",
    messageCitizenDelete: "",
    listCitizen: null,
};


const user = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.ARTICLE_VIEW:
            return {
                ...state,
                articleView: action.payload.articleView,
            };
        case ACTIONS.WORKING_MODE:
            return {
                ...state,
                workingMode: action.payload.workingMode,
            };
        case ACTIONS.GET_ALL_USER:
            return {
                ...state,
                listUser: action.payload.listUser,
            };    
        case ACTIONS.GET_ALL_USER_IS_PROVIED:
            return {
                ...state,
                listUser: action.payload.listUser,
            };   
        case ACTIONS.CHANGE_PASSWORD_ERROR:
            return {
                ...state,
                messageError: action.payload.message,
            };
        case ACTIONS.ADD_CITIZEN:
            return {
                ...state,
                messageCitizen: action.payload.message,
            };
        case ACTIONS.EDIT_CITIZEN:
            return {
                ...state,
                listCitizen: [...state.listCitizen.slice(0, action.payload.index), action.payload.citizen, ...state.listCitizen.slice(action.payload.index + 1)],
            };
        case ACTIONS.EDIT_CITIZEN_ERROR:
            return {
                ...state,
                messageCitizenEdit: action.payload.message,
            };
        case ACTIONS.DELETE_CITIZEN_ERROR:
            return {
                ...state,
                messageCitizenDelete: action.payload.message,
            };
        case ACTIONS.DELETE_CITIZEN:
            return {
                ...state,
                listCitizen: state.listCitizen.filter(
                    (citizen) => citizen._id !== action.payload.citizenId
                ),
            };
        case ACTIONS.CLEAR_MESSAGE_CITIZEN:
            return {
                ...state,
                messageCitizenEdit: "",
                messageCitizenDelete: "",
            };
        case ACTIONS.GET_CITIZEN:
            return {
                ...state,
                listCitizen: action.payload.citizens,
            };
        case ACTIONS.GET_CITIZEN_NUM_CCCD:
            return {
                ...state,
                listCitizen: action.payload.citizen,
            }
        case ACTIONS.GET_ALL_CITIZEN:
            return {
                ...state,
                listCitizen: action.payload.citizens,
            };   
        default:
            return state;
    }
}
export default user;