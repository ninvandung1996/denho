import { takeLatest, all } from 'redux-saga/effects';
import Api from '../api/News';
import {
    GET_ALL_NEWS,
    SAVE_GET_ALL_NEWS,
    GET_NEWS,
    SAVE_GET_NEWS,
    ADD_NEWS,
    SAVE_ADD_NEWS,
    EDIT_NEWS,
    SAVE_EDIT_NEWS,
    DELETE_NEWS,
    SAVE_DELETE_NEWS
} from '../actions/types'
import { createRequestSaga } from './common';
import { message } from "antd";

const getAllNews = createRequestSaga({
    request: Api.getAllNews,
    key: "getAllNews",
    success: [res => ({ type: SAVE_GET_ALL_NEWS, payload: res.data })],
    failure: []
})

const getNews = createRequestSaga({
    request: Api.getNews,
    key: "getNews",
    success: [res => ({})],
    failure: []
})

const addNews = createRequestSaga({
    request: Api.addNews,
    key: "addNews",
    success: [res => ({ type: SAVE_ADD_NEWS, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Thêm thành công!")],
    functionFailure: [() => message.failure("Thêm thất bại!")]
})

const editNews = createRequestSaga({
    request: Api.editNews,
    key: "editNews",
    success: [res => ({ type: SAVE_EDIT_NEWS, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Sửa thành công!")],
    functionFailure: [() => message.failure("Sửa thất bại!")]
})

const deleteNews = createRequestSaga({
    request: Api.deleteNews,
    key: "deleteNews",
    success: [res => ({ type: SAVE_DELETE_NEWS, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Xóa thành công!")],
    functionFailure: [() => message.failure("Xóa thất bại!")]
})

export default [
    function* fetchWatcher() {
        yield all([
            takeLatest(GET_ALL_NEWS, getAllNews),
            takeLatest(GET_NEWS, getNews),
            takeLatest(ADD_NEWS, addNews),
            takeLatest(EDIT_NEWS, editNews),
            takeLatest(DELETE_NEWS, deleteNews)
        ]);
    }
];