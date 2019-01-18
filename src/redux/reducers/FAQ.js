import {
    SAVE_GET_ALL_FAQ,
    SAVE_ADD_FAQ,
    SAVE_EDIT_FAQ,
    SAVE_DELETE_FAQ
} from '../actions/types';

const defaultState = {
    faqList: []
}

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case SAVE_GET_ALL_FAQ: {
            return { ...state, faqList: payload }
        }
        case SAVE_ADD_FAQ: {
            return { ...state, faqList: [payload, ...state.faqList] }
        }
        case SAVE_EDIT_FAQ: {
            let faqList = [...state.faqList].map(value => {
                if (value._id === payload._id) {
                    return payload;
                }
                return value;
            });
            return { ...state, faqList }
        }
        case SAVE_DELETE_FAQ: {
            let faqList = [...state.faqList].filter(value => {
                return value._id !== payload._id
            });
            return { ...state, faqList }
        }
        default: {
            return state;
        }
    }
}