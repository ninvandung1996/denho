import {
    SAVE_GET_ALL_PROMOTION,
    SAVE_ADD_PROMOTION,
    SAVE_EDIT_PROMOTION,
    SAVE_DELETE_PROMOTION
} from '../actions/types';

const defaultState = {
    promotionList: []
}

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case SAVE_GET_ALL_PROMOTION: {
            return { ...state, promotionList: payload }
        }
        case SAVE_ADD_PROMOTION: {
            return { ...state, promotionList: [payload, ...state.promotionList] }
        }
        case SAVE_EDIT_PROMOTION: {
            let promotionList = [...state.promotionList].map(value => {
                if (value._id === payload._id) {
                    return payload;
                }
                return value;
            });
            return { ...state, promotionList }
        }
        case SAVE_DELETE_PROMOTION: {
            let promotionList = [...state.promotionList].filter(value => {
                return value._id !== payload._id
            });
            return { ...state, promotionList }
        }
        default: {
            return state;
        }
    }
}