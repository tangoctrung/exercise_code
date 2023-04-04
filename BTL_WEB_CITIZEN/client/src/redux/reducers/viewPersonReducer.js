import * as ACTIONS from '../constants/viewPersonContant';


const initialState = {
    modeView: 'table',
};


const viewPerson = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.MODE_VIEW_TABLE:
            return {
                ...state,
                modeView: 'table',
            };
        case ACTIONS.MODE_VIEW_CARD:
            return {
                ...state,
                modeView: 'card',
            };   
        default:
            return state;
    }
}
export default viewPerson;