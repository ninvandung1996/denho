import { takeLatest, all } from 'redux-saga/effects';
import Api from '../api/Supplier';
import {
    GET_ALL_SUPPLIER,
    SAVE_GET_ALL_SUPPLIER,
    GET_SUPPLIER,
    SAVE_GET_SUPPLIER,
    ADD_SUPPLIER,
    SAVE_ADD_SUPPLIER,
    EDIT_SUPPLIER,
    SAVE_EDIT_SUPPLIER,
    DELETE_SUPPLIER,
    SAVE_DELETE_SUPPLIER
} from '../actions/types'
import { createRequestSaga } from './common';
import { message } from "antd";

const getAllSupplier = createRequestSaga({
    request: Api.getAllSupplier,
    key: "getAllSupplier",
    success: [res => ({ type: SAVE_GET_ALL_SUPPLIER, payload: res.data })],
    failure: []
})

const getSupplier = createRequestSaga({
    request: Api.getSupplier,
    key: "getSupplier",
    success: [res => ({ type: SAVE_GET_SUPPLIER, payload: res.data })],
    failure: []
})

const addSupplier = createRequestSaga({
    request: Api.addSupplier,
    key: "addSupplier",
    success: [res => ({ type: SAVE_ADD_SUPPLIER, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Thêm thành công!")],
    functionFailure: [() => message.failure("Thêm thất bại!")]
})

const editSupplier = createRequestSaga({
    request: Api.editSupplier,
    key: "editPromtion",
    success: [res => ({ type: SAVE_EDIT_SUPPLIER, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Sửa thành công!")],
    functionFailure: [() => message.failure("Sửa thất bại!")]
})

const deleteSupplier = createRequestSaga({
    request: Api.deleteSupplier,
    key: "deleteSupplier",
    success: [res => ({ type: SAVE_DELETE_SUPPLIER, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Xóa thành công!")],
    functionFailure: [() => message.failure("Xóa thất bại!")]
})

export default [
    function* fetchWatcher() {
        yield all([
            takeLatest(GET_ALL_SUPPLIER, getAllSupplier),
            takeLatest(GET_SUPPLIER, getSupplier),
            takeLatest(ADD_SUPPLIER, addSupplier),
            takeLatest(EDIT_SUPPLIER, editSupplier),
            takeLatest(DELETE_SUPPLIER, deleteSupplier)
        ]);
    }
];