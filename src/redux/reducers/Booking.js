import {
    SAVE_GET_ALL_BOOKING,
    SAVE_ADD_BOOKING,
    SAVE_EDIT_BOOKING,
    SAVE_DELETE_BOOKING
} from '../actions/types';

const defaultState = {
    bookingList: []
}

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case SAVE_GET_ALL_BOOKING: {
            return { ...state, bookingList: payload }
        }
        case SAVE_ADD_BOOKING: {
            return { ...state, bookingList: [{ ...payload, checkin: false, checkout: false }, ...state.bookingList] }
        }
        case SAVE_EDIT_BOOKING: {
            let bookingList = [...state.bookingList].map(value => {
                if (value._id === payload._id) {
                    return payload;
                }
                return value;
            });
            return { ...state, bookingList }
        }
        case SAVE_DELETE_BOOKING: {
            let bookingList = [...state.bookingList].filter(value => {
                return value._id !== payload._id
            });
            return { ...state, bookingList }
        }
        default: {
            return state;
        }
    }
}