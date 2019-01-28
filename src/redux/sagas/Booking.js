import { takeLatest, all } from 'redux-saga/effects';
import Api from '../api/Booking';
import {
    GET_ALL_BOOKING,
    SAVE_GET_ALL_BOOKING,
    BOOKING_GET_ALL_APARTMENT,
    BOOKING_GET_ALL_USER,
    BOOKING_GET_ALL_CONTRACT,
    BOOKING_GET_APARTMENT,
    ADD_BOOKING,
    SAVE_ADD_BOOKING,
    EDIT_BOOKING,
    SAVE_EDIT_BOOKING,
    DELETE_BOOKING,
    SAVE_DELETE_BOOKING,
} from '../actions/types'
import { createRequestSaga } from './common';
import { message } from "antd";

const getAllBooking = createRequestSaga({
    request: Api.getAllBooking,
    key: "getAllBooking",
    success: [res => ({ type: SAVE_GET_ALL_BOOKING, payload: res.data })],
    failure: []
})

const getAllApartment = createRequestSaga({
    request: Api.getAllApartment,
    key: "getAllApartmentBooking",
    success: [res => ({})],
    failure: []
})

const getApartment = createRequestSaga({
    request: Api.getApartment,
    key: "getApartmentBooking",
    success: [res => ({})],
    failure: []
})

const getAllUser = createRequestSaga({
    request: Api.getAllUser,
    key: "getAllUserBooking",
    success: [res => ({})],
    failure: []
})

const getAllContract = createRequestSaga({
    request: Api.getAllContract,
    key: "getAllContractBooking",
    success: [res => ({})],
    failure: []
})

const addBooking = createRequestSaga({
    request: Api.addBooking,
    key: "addBooking",
    success: [res => ({ type: SAVE_ADD_BOOKING, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Thêm thành công!")],
    functionFailure: [() => message.failure("Thêm thất bại!")]
})

const editBooking = createRequestSaga({
    request: Api.editBooking,
    key: "editPromtion",
    success: [res => ({ type: SAVE_EDIT_BOOKING, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Sửa thành công!")],
    functionFailure: [() => message.failure("Sửa thất bại!")]
})

const deleteBooking = createRequestSaga({
    request: Api.deleteBooking,
    key: "deleteBooking",
    success: [res => ({ type: SAVE_DELETE_BOOKING, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Xóa thành công!")],
    functionFailure: [() => message.failure("Xóa thất bại!")]
})

export default [
    function* fetchWatcher() {
        yield all([
            takeLatest(GET_ALL_BOOKING, getAllBooking),
            takeLatest(BOOKING_GET_ALL_APARTMENT, getAllApartment),
            takeLatest(BOOKING_GET_ALL_USER, getAllUser),
            takeLatest(BOOKING_GET_ALL_CONTRACT, getAllContract),
            takeLatest(BOOKING_GET_APARTMENT, getApartment),
            takeLatest(ADD_BOOKING, addBooking),
            takeLatest(EDIT_BOOKING, editBooking),
            takeLatest(DELETE_BOOKING, deleteBooking)
        ]);
    }
];