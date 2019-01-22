import {
    SAVE_GET_ALL_NEWS,
    SAVE_ADD_NEWS,
    SAVE_EDIT_NEWS,
    SAVE_DELETE_NEWS
} from '../actions/types';

const defaultState = {
    newsList: []
}

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case SAVE_GET_ALL_NEWS: {
            return { ...state, newsList: payload }
        }
        case SAVE_ADD_NEWS: {
            return { ...state, newsList: [payload, ...state.selectedNEWS] }
        }
        case SAVE_EDIT_NEWS: {
            let newsList = [...state.newsList].map(value => {
                if (value._id === payload._id) {
                    return payload;
                }
                return value;
            });
            return { ...state, newsList }
        }
        case SAVE_DELETE_NEWS: {
            let newsList = [...state.newsList].filter(value => {
                return value._id !== payload._id
            });
            return { ...state, newsList }
        }
        default: {
            return state;
        }
    }
}