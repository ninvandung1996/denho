import {
    SAVE_GET_ALL_SERVICE,
    SAVE_ADD_SERVICE,
    SAVE_EDIT_SERVICE,
    SAVE_DELETE_SERVICE
} from '../actions/types';

const defaultState = {
    serviceList: []
}

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case SAVE_GET_ALL_SERVICE: {
            return { ...state, serviceList: payload }
        }
        case SAVE_ADD_SERVICE: {
            return { ...state, serviceList: [payload, ...state.serviceList] }
        }
        case SAVE_EDIT_SERVICE: {
            let serviceList = [...state.serviceList].map(value => {
                if (value._id === payload._id) {
                    return payload;
                }
                return value;
            });
            return { ...state, serviceList }
        }
        case SAVE_DELETE_SERVICE: {
            let serviceList = [...state.serviceList].filter(value => {
                return value._id !== payload._id
            });
            return { ...state, serviceList }
        }
        default: {
            return state;
        }
    }
}