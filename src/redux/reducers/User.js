import {
    SAVE_GET_ALL_USER,
    SAVE_DELETE_USER
} from '../actions/types';

const defaultState = {
    userList: []
}

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case SAVE_GET_ALL_USER: {
            return { ...state, userList: payload }
        }
        case SAVE_DELETE_USER: {
            let userList = [...state.userList].filter(value => {
                return value._id !== payload._id
            });
            return { ...state, userList }
        }
        default: {
            return state;
        }
    }
}