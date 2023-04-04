import * as ACTIONS from '../constants/mailContant';


const initialState = {
    emailIsOpen: null,
    isOpenSendMail: false,
    mailSend: [],
    mailReceive: [],
    modeMail: "1",
    users: [],
};


const mail = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.EMAIL_IS_OPEN:
            return {
                ...state,
                emailIsOpen: action.payload.mail,
            };
        case ACTIONS.VIEW_MAIL_SEND:
            return {
                ...state,
                modeMail: "1",
            };
        case ACTIONS.VIEW_MAIL_RECEIVE:
            return {
                ...state,
                modeMail: "2",
            };
        case ACTIONS.CLEAR_EMAIL_IS_OPEN:
            return {
                ...state,
                emailIsOpen: null,
            };
        case ACTIONS.OPEN_SEND_MAIL:
            return {
                ...state,
                isOpenSendMail: true,
            };
        case ACTIONS.CLOSE_SEND_MAIL:
            return {
                ...state,
                isOpenSendMail: false,
            };   
        case ACTIONS.GET_ALL_MAIL_SEND:
            return {
                ...state,
                mailSend: action.payload.listMail,
            };
        case ACTIONS.GET_ALL_MAIL_RECEIVE:
            return {
                ...state,
                mailReceive: action.payload.listMail,
            };
        case ACTIONS.SEND_MAIL:
            return {
                ...state,
                mailSend: [action.payload.mail, ...state.mailSend],
            };
        case ACTIONS.RECEIVE_MAIL:
            return {
                ...state,
                mailReceive: [action.payload.mail, ...state.mailReceive],
            };
        case ACTIONS.DELETE_MAIL_SEND:
            return {
                ...state,
                mailSend: state.mailSend.filter((mail) => mail?._id !== action.payload.mailId),
            }
        case ACTIONS.DELETE_MAIL_RECEIVE:
            return {
                ...state,
                mailReceive: state.mailReceive.filter((mail) => mail?._id !== action.payload.mailId),
            }
        case ACTIONS.UPDATE_WATCHED_MAIL: 
            return {
                ...state,
                mailReceive: [...state.mailReceive.slice(0, action.payload.index), action.payload.mail, ...state.mailReceive.slice(action.payload.index + 1)],
            }
        case ACTIONS.GET_ALL_USERS:
            return {
                ...state,
                users: action.payload.users,
            }
        default:
            return state;
    }
}
export default mail;