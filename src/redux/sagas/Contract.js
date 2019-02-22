import { takeLatest, all } from 'redux-saga/effects';
import Api from '../api/Contract';
import {
    GET_ALL_CONTRACT,
    SAVE_GET_ALL_CONTRACT,
    ADD_CONTRACT,
    SAVE_ADD_CONTRACT,
    EDIT_CONTRACT,
    SAVE_EDIT_CONTRACT,
    DELETE_CONTRACT,
    SAVE_DELETE_CONTRACT,
    CONTRACT_GET_ALL_USER,
    CONTRACT_GET_ALL_APARTMENT,
    CONTRACT_ADD_BOOKING,
    SAVE_CONTRACT_ADD_BOOKING,
    CONTRACT_EDIT_BOOKING,
    SAVE_CONTRACT_EDIT_BOOKING,
    CONTRACT_DELETE_BOOKING,
    SAVE_CONTRACT_DELETE_BOOKING,
    CONTRACT_GET_APARTMENT
} from '../actions/types'
import { createRequestSaga } from './common';
import { message } from "antd";

const getAllContract = createRequestSaga({
    request: Api.getAllContract,
    key: "getAllContract",
    success: [res => ({ type: SAVE_GET_ALL_CONTRACT, payload: res.data })],
    failure: []
})

const addContract = createRequestSaga({
    request: Api.addContract,
    key: "addContract",
    success: [res => ({ type: SAVE_ADD_CONTRACT, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Thêm thành công!")],
    functionFailure: [() => message.failure("Thêm thất bại!")]
})

const editContract = createRequestSaga({
    request: Api.editContract,
    key: "editContract",
    success: [res => ({ type: SAVE_EDIT_CONTRACT, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Sửa thành công!")],
    functionFailure: [() => message.failure("Sửa thất bại!")]
})

const deleteContract = createRequestSaga({
    request: Api.deleteContract,
    key: "deleteContract",
    success: [res => ({ type: SAVE_DELETE_CONTRACT, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Xóa thành công!")],
    functionFailure: [() => message.failure("Xóa thất bại!")]
})

const getAllUser = createRequestSaga({
    request: Api.getAllUser,
    key: "contractGetAllUser",
    success: [res => ({})],
    failure: []
})

const getAllApartment = createRequestSaga({
    request: Api.getAllApartment,
    key: "contractGetAllApartment",
    success: [res => ({})],
    failure: []
})

const getApartment = createRequestSaga({
    request: Api.getApartment,
    key: "contractGetApartment",
    success: [res => ({})],
    failure: []
})

const addBooking = createRequestSaga({
    request: Api.addBooking,
    key: "contractAddBooking",
    success: [res => ({ type: SAVE_CONTRACT_ADD_BOOKING, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Thêm thành công!")],
    functionFailure: [() => message.failure("Thêm thất bại!")]
})

const editBooking = createRequestSaga({
    request: Api.editBooking,
    key: "contractEditBooking",
    success: [res => ({ type: SAVE_CONTRACT_EDIT_BOOKING, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Sửa thành công!")],
    functionFailure: [() => message.failure("Sửa thất bại!")]
})

const deleteBooking = createRequestSaga({
    request: Api.delteBooking,
    key: "contractDeleteBooking",
    success: [res => ({ type: SAVE_CONTRACT_DELETE_BOOKING, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Xóa thành công!")],
    functionFailure: [() => message.failure("Xóa thất bại!")]
})

export default [
    function* fetchWatcher() {
        yield all([
            takeLatest(GET_ALL_CONTRACT, getAllContract),
            takeLatest(ADD_CONTRACT, addContract),
            takeLatest(EDIT_CONTRACT, editContract),
            takeLatest(DELETE_CONTRACT, deleteContract),
            takeLatest(CONTRACT_GET_ALL_USER, getAllUser),
            takeLatest(CONTRACT_GET_ALL_APARTMENT, getAllApartment),
            takeLatest(CONTRACT_ADD_BOOKING, addBooking),
            takeLatest(CONTRACT_EDIT_BOOKING, editBooking),
            takeLatest(CONTRACT_DELETE_BOOKING, deleteBooking),
            takeLatest(CONTRACT_GET_APARTMENT, getApartment),
        ]);
    }
];