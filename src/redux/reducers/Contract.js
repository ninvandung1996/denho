import {
    SAVE_GET_ALL_CONTRACT,
    SAVE_ADD_CONTRACT,
    SAVE_EDIT_CONTRACT,
    SAVE_DELETE_CONTRACT,
    SAVE_CONTRACT_ADD_BOOKING,
    SAVE_CONTRACT_EDIT_BOOKING,
    SAVE_CONTRACT_DELETE_BOOKING
} from '../actions/types';

const defaultState = {
    contractList: []
}

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case SAVE_GET_ALL_CONTRACT: {
            return { ...state, contractList: payload }
        }
        case SAVE_ADD_CONTRACT: {
            let addContract = { ...payload, mainUser: { _id: payload.mainUser, email: payload.mainEmail } }
            return { ...state, contractList: [addContract, ...state.contractList] }
        }
        case SAVE_EDIT_CONTRACT: {
            let contractList = [...state.contractList].map(value => {
                if (value._id === payload._id) {
                    return payload;
                }
                return value;
            });
            return { ...state, contractList }
        }
        case SAVE_DELETE_CONTRACT: {
            let contractList = [...state.contractList].filter(value => {
                return value._id !== payload._id
            });
            return { ...state, contractList }
        }
        case SAVE_CONTRACT_ADD_BOOKING: {
            let contractList = [...state.contractList].map(value => {
                if (value._id === payload.contract) {
                    return { ...value, booking: payload };
                }
                return value;
            });
            return { ...state, contractList }
        }
        case SAVE_CONTRACT_EDIT_BOOKING: {
            let contractList = [...state.contractList].map(value => {
                if (value.booking._id === payload._id) {
                    return { ...value, booking: payload };
                }
                return value;
            });
            return { ...state, contractList }
        }
        case SAVE_CONTRACT_DELETE_BOOKING: {
            let contractList = [...state.contractList].map(value => {
                if (value.booking && value.booking._id === payload._id) {
                    delete value.booking;
                    return value;
                }
                return value;
            });
            return { ...state, contractList }
        }
        default: {
            return state;
        }
    }
}