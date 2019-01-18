import {
    SAVE_GET_ALL_FEEDBACK
} from '../actions/types';

const defaultState = {
    feedbackList: []
}

export default (state = defaultState, { type, payload }) => {
    switch (type) {
        case SAVE_GET_ALL_FEEDBACK: {
            return { ...state, feedbackList: payload }
        }
        default: {
            return state;
        }
    }
}