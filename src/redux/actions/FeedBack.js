import {
    GET_ALL_FEEDBACK
} from './types';

export const getAllFeedBack = (...args) => ({ type: GET_ALL_FEEDBACK, args });