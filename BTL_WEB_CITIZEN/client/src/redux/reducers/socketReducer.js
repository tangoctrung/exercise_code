import * as ACTIONS from '../constants/mailContant';
import { io } from 'socket.io-client';

const initialState = {
    socket : io("http://localhost:8800"), 
    users: [],
};


const socket = (state = initialState, action) => {
    switch (action.type) {
        
        default:
            return state;
    }
}
export default socket;