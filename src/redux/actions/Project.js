import {
    GET_ALL_PROJECT,
    GET_PROJECT,
    ADD_NEW_PROJECT,
    EDIT_PROJECT,
    DELETE_PROJECT,
    SAVE_DELETE_PROJECT,
    GET_APARTMENT,
    ADD_NEW_APARTMENT,
    EDIT_APARTMENT,
    DELETE_APARTMENT
} from './types';

export const getAllProject = (...args) => ({ type: GET_ALL_PROJECT, args });
export const getProject = (...args) => ({ type: GET_PROJECT, args });
export const addNewProject = (...args) => ({ type: ADD_NEW_PROJECT, args });
export const editProject = (...args) => ({ type: EDIT_PROJECT, args });
export const deleteProject = (...args) => ({ type: DELETE_PROJECT, args });
export const saveDeleteProject = (payload) => ({ type: SAVE_DELETE_PROJECT, payload });
export const getApartment = (...args) => ({ type: GET_APARTMENT, args });
export const addNewApartment = (...args) => ({ type: ADD_NEW_APARTMENT, args });
export const editApartment = (...args) => ({ type: EDIT_APARTMENT, args });
export const deleteApartment = (...args) => ({ type: DELETE_APARTMENT, args });