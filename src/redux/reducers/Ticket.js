import {
    SAVE_GET_ALL_TICKET,
    SAVE_ADD_TICKET,
    SAVE_EDIT_TICKET,
    SAVE_DELETE_TICKET
} from '../actions/types';

const defaultState = {
    ticketList: []
}

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case SAVE_GET_ALL_TICKET: {
            return { ...state, ticketList: payload }
        }
        case SAVE_ADD_TICKET: {
            return { ...state, ticketList: [payload, ...state.ticketList] }
        }
        case SAVE_EDIT_TICKET: {
            let ticketList = [...state.ticketList].map(value => {
                if (value._id === payload._id) {
                    return payload;
                }
                return value;
            });
            return { ...state, ticketList }
        }
        case SAVE_DELETE_TICKET: {
            let ticketList = [...state.ticketList].filter(value => {
                return value._id !== payload._id
            });
            return { ...state, ticketList }
        }
        default: {
            return state;
        }
    }
}