import {
    GET_ALL_FAQ,
    GET_FAQ,
    ADD_FAQ,
    EDIT_FAQ,
    DELETE_FAQ
} from './types';

export const getAllFAQ = (...args) => ({ type: GET_ALL_FAQ, args });
export const getFAQ = (...args) => ({ type: GET_FAQ, args });
export const addFAQ = (...args) => ({ type: ADD_FAQ, args });
export const editFAQ = (...args) => ({ type: EDIT_FAQ, args });
export const deleteFAQ = (...args) => ({ type: DELETE_FAQ, args });