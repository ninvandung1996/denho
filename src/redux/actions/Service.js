import {
    GET_ALL_SERVICE,
    GET_SERVICE,
    ADD_SERVICE,
    EDIT_SERVICE,
    DELETE_SERVICE,
    SERVICE_GET_ALL_PROJECT
} from './types';

export const getAllService = (...args) => ({ type: GET_ALL_SERVICE, args });
export const getService = (...args) => ({ type: GET_SERVICE, args });
export const addService = (...args) => ({ type: ADD_SERVICE, args });
export const editService = (...args) => ({ type: EDIT_SERVICE, args });
export const deleteService = (...args) => ({ type: DELETE_SERVICE, args });
export const getAllProject = (...args) => ({ type: SERVICE_GET_ALL_PROJECT, args });