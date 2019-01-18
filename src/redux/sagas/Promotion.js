import { takeLatest, all } from 'redux-saga/effects';
import Api from '../api/Promotion';
import {
    GET_ALL_PROMOTION,
    SAVE_GET_ALL_PROMOTION,
    GET_PROMOTION,
    SAVE_GET_PROMOTION,
    ADD_PROMOTION,
    SAVE_ADD_PROMOTION,
    EDIT_PROMOTION,
    SAVE_EDIT_PROMOTION,
    DELETE_PROMOTION,
    SAVE_DELETE_PROMOTION
} from '../actions/types'
import { createRequestSaga } from './common';
import { message } from "antd";

const getAllPromotion = createRequestSaga({
    request: Api.getAllPromotion,
    key: "getAllPromotion",
    success: [res => ({ type: SAVE_GET_ALL_PROMOTION, payload: res.data })],
    failure: []
})

const getPromotion = createRequestSaga({
    request: Api.getPromotion,
    key: "getPromotion",
    success: [res => ({ type: SAVE_GET_PROMOTION, payload: res.data })],
    failure: []
})

const addPromotion = createRequestSaga({
    request: Api.addPromotion,
    key: "addPromotion",
    success: [res => ({ type: SAVE_ADD_PROMOTION, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Thêm thành công!")],
    functionFailure: [() => message.failure("Thêm thất bại!")]
})

const editPromotion = createRequestSaga({
    request: Api.editPromotion,
    key: "editPromtion",
    success: [res => ({ type: SAVE_EDIT_PROMOTION, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Sửa thành công!")],
    functionFailure: [() => message.failure("Sửa thất bại!")]
})

const deletePromotion = createRequestSaga({
    request: Api.deletePromotion,
    key: "deletePromotion",
    success: [res => ({ type: SAVE_DELETE_PROMOTION, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Xóa thành công!")],
    functionFailure: [() => message.failure("Xóa thất bại!")]
})

export default [
    function* fetchWatcher() {
        yield all([
            takeLatest(GET_ALL_PROMOTION, getAllPromotion),
            takeLatest(GET_PROMOTION, getPromotion),
            takeLatest(ADD_PROMOTION, addPromotion),
            takeLatest(EDIT_PROMOTION, editPromotion),
            takeLatest(DELETE_PROMOTION, deletePromotion)
        ]);
    }
];