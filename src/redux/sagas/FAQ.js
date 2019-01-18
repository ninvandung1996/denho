import { takeLatest, all } from 'redux-saga/effects';
import Api from '../api/FAQ';
import {
    GET_ALL_FAQ,
    SAVE_GET_ALL_FAQ,
    GET_FAQ,
    SAVE_GET_FAQ,
    ADD_FAQ,
    SAVE_ADD_FAQ,
    EDIT_FAQ,
    SAVE_EDIT_FAQ,
    DELETE_FAQ,
    SAVE_DELETE_FAQ
} from '../actions/types'
import { createRequestSaga } from './common';
import { message } from "antd";

const getAllFAQ = createRequestSaga({
    request: Api.getAllFAQ,
    key: "getAllFAQ",
    success: [res => ({ type: SAVE_GET_ALL_FAQ, payload: res.data })],
    failure: []
})

const getFAQ = createRequestSaga({
    request: Api.getFAQ,
    key: "getFAQ",
    success: [res => ({ type: SAVE_GET_FAQ, payload: res.data })],
    failure: []
})

const addFAQ = createRequestSaga({
    request: Api.addFAQ,
    key: "addFAQ",
    success: [res => ({ type: SAVE_ADD_FAQ, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Thêm thành công!")],
    functionFailure: [() => message.failure("Thêm thất bại!")]
})

const editFAQ = createRequestSaga({
    request: Api.editFAQ,
    key: "editPromtion",
    success: [res => ({ type: SAVE_EDIT_FAQ, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Sửa thành công!")],
    functionFailure: [() => message.failure("Sửa thất bại!")]
})

const deleteFAQ = createRequestSaga({
    request: Api.deleteFAQ,
    key: "deleteFAQ",
    success: [res => ({ type: SAVE_DELETE_FAQ, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Xóa thành công!")],
    functionFailure: [() => message.failure("Xóa thất bại!")]
})

export default [
    function* fetchWatcher() {
        yield all([
            takeLatest(GET_ALL_FAQ, getAllFAQ),
            takeLatest(GET_FAQ, getFAQ),
            takeLatest(ADD_FAQ, addFAQ),
            takeLatest(EDIT_FAQ, editFAQ),
            takeLatest(DELETE_FAQ, deleteFAQ)
        ]);
    }
];