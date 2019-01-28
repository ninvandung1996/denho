import {
    GET_ALL_CONTRACT,
    ADD_CONTRACT,
    EDIT_CONTRACT,
    DELETE_CONTRACT,
    CONTRACT_GET_ALL_USER,
    CONTRACT_GET_ALL_APARTMENT,
    CONTRACT_ADD_BOOKING,
    CONTRACT_EDIT_BOOKING,
    CONTRACT_DELETE_BOOKING,
    CONTRACT_GET_APARTMENT
} from './types';

export const getAllContract = (...args) => ({ type: GET_ALL_CONTRACT, args });
export const addContract = (...args) => ({ type: ADD_CONTRACT, args });
export const editContract = (...args) => ({ type: EDIT_CONTRACT, args });
export const deleteContract = (...args) => ({ type: DELETE_CONTRACT, args });
export const getAllUser = (...args) => ({ type: CONTRACT_GET_ALL_USER, args });
export const getAllApartment = (...args) => ({ type: CONTRACT_GET_ALL_APARTMENT, args });
export const addBooking = (...args) => ({ type: CONTRACT_ADD_BOOKING, args });
export const editBooking = (...args) => ({ type: CONTRACT_EDIT_BOOKING, args });
export const deleteBooking = (...args) => ({ type: CONTRACT_DELETE_BOOKING, args });
export const getApartment = (...args) => ({ type: CONTRACT_GET_APARTMENT, args });