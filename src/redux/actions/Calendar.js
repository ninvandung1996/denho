import {
    CALENDAR_VIEW,
    CALENDAR_EVENTS,
    CALENDAR_GET_APARTMENT,
    CALENDAR_GET_USER,
    CALENDAR_GET_BOOKING,
    CALENDAR_ADD_BOOKING,
    CALENDAR_EDIT_BOOKING,
    CALENDAR_DELETE_BOOKING,
    CALENDAR_SELECT_APARTMENT,
    CALENDAR_EDIT_APARTMENT,
    CALENDAR_DELETE_APARTMENT,
    CALENDAR_GET_ALL_CONTRACT,
    CALENDAR_GET_APARTMENT_BY_ID
} from './types';

export const changeView = (view) => ({ type: CALENDAR_VIEW, view });
export const changeEvents = (events) => ({ type: CALENDAR_EVENTS, events });
export const getApartment = (...args) => ({ type: CALENDAR_GET_APARTMENT, args });
export const getUser = (...args) => ({ type: CALENDAR_GET_USER, args });
export const getBooking = (...args) => ({ type: CALENDAR_GET_BOOKING, args });
export const addBooking = (...args) => ({ type: CALENDAR_ADD_BOOKING, args });
export const editBooking = (...args) => ({ type: CALENDAR_EDIT_BOOKING, args });
export const deleteBooking = (...args) => ({ type: CALENDAR_DELETE_BOOKING, args });
export const selectApartment = (payload) => ({ type: CALENDAR_SELECT_APARTMENT, payload });
export const editApartment = (...args) => ({ type: CALENDAR_EDIT_APARTMENT, args });
export const deleteApartment = (...args) => ({ type: CALENDAR_DELETE_APARTMENT, args });
export const getContract = (...args) => ({ type: CALENDAR_GET_ALL_CONTRACT, args });
export const getApartmentById = (...args) => ({ type: CALENDAR_GET_APARTMENT_BY_ID, args });