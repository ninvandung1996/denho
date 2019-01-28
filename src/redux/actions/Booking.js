import {
    GET_ALL_BOOKING,
    BOOKING_GET_ALL_APARTMENT,
    BOOKING_GET_ALL_USER,
    BOOKING_GET_ALL_CONTRACT,
    BOOKING_GET_APARTMENT,
    ADD_BOOKING,
    EDIT_BOOKING,
    DELETE_BOOKING
} from './types';

export const getAllBooking = (...args) => ({ type: GET_ALL_BOOKING, args });
export const getAllApartment = (...args) => ({ type: BOOKING_GET_ALL_APARTMENT, args });
export const getAllUser = (...args) => ({ type: BOOKING_GET_ALL_USER, args });
export const getAllContract = (...args) => ({ type: BOOKING_GET_ALL_CONTRACT, args });
export const getApartment = (...args) => ({ type: BOOKING_GET_APARTMENT, args });
export const addBooking = (...args) => ({ type: ADD_BOOKING, args });
export const editBooking = (...args) => ({ type: EDIT_BOOKING, args });
export const deleteBooking = (...args) => ({ type: DELETE_BOOKING, args });