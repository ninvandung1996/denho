import {
    GET_ALL_SUPPLIER,
    GET_SUPPLIER,
    ADD_SUPPLIER,
    EDIT_SUPPLIER,
    DELETE_SUPPLIER,
    SUPPLIER_GET_ALL_PROJECT,
    SUPPLIER_GET_CATEGORY
} from './types';

export const getAllSupplier = (...args) => ({ type: GET_ALL_SUPPLIER, args });
export const getSupplier = (...args) => ({ type: GET_SUPPLIER, args });
export const addSupplier = (...args) => ({ type: ADD_SUPPLIER, args });
export const editSupplier = (...args) => ({ type: EDIT_SUPPLIER, args });
export const deleteSupplier = (...args) => ({ type: DELETE_SUPPLIER, args });
export const getAllProject = (...args) => ({ type: SUPPLIER_GET_ALL_PROJECT, args });
export const getCategory = (...args) => ({ type: SUPPLIER_GET_CATEGORY, args });