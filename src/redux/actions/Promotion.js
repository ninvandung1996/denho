import {
    GET_ALL_PROMOTION,
    GET_PROMOTION,
    ADD_PROMOTION,
    EDIT_PROMOTION,
    DELETE_PROMOTION
} from './types';

export const getAllPromotion = (...args) => ({ type: GET_ALL_PROMOTION, args });
export const getPromotion = (...args) => ({ type: GET_PROMOTION, args });
export const addPromotion = (...args) => ({ type: ADD_PROMOTION, args });
export const editPromotion = (...args) => ({ type: EDIT_PROMOTION, args });
export const deletePromotion = (...args) => ({ type: DELETE_PROMOTION, args });