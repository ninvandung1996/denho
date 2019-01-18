import {
    SAVE_GET_ALL_SUPPLIER,
    SAVE_ADD_SUPPLIER,
    SAVE_EDIT_SUPPLIER,
    SAVE_DELETE_SUPPLIER
} from '../actions/types';

const defaultState = {
    supplierList: []
}

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case SAVE_GET_ALL_SUPPLIER: {
            return { ...state, supplierList: payload }
        }
        case SAVE_ADD_SUPPLIER: {
            return { ...state, supplierList: [payload, ...state.supplierList] }
        }
        case SAVE_EDIT_SUPPLIER: {
            let supplierList = [...state.supplierList].map(value => {
                if (value._id === payload._id) {
                    return payload;
                }
                return value;
            });
            return { ...state, supplierList }
        }
        case SAVE_DELETE_SUPPLIER: {
            let supplierList = [...state.supplierList].filter(value => {
                return value._id !== payload._id
            });
            return { ...state, supplierList }
        }
        default: {
            return state;
        }
    }
}