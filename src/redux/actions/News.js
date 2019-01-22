import {
    GET_ALL_NEWS,
    GET_NEWS,
    ADD_NEWS,
    EDIT_NEWS,
    DELETE_NEWS
} from './types';

export const getAllNews = (...args) => ({ type: GET_ALL_NEWS, args });
export const getNews = (...args) => ({ type: GET_NEWS, args });
export const addNews = (...args) => ({ type: ADD_NEWS, args });
export const editNews = (...args) => ({ type: EDIT_NEWS, args });
export const deleteNews = (...args) => ({ type: DELETE_NEWS, args });