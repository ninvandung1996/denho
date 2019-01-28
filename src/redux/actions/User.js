import {
    GET_ALL_USER,
    CREATE_USER,
    RESET_PASSWORD_USER,
    DELETE_USER
} from './types';

export const getAllUser = (...args) => ({ type: GET_ALL_USER, args });
export const createUser = (...args) => ({ type: CREATE_USER, args });
export const resetPassword = (...args) => ({ type: RESET_PASSWORD_USER, args });
export const deleteUser = (...args) => ({ type: DELETE_USER, args });