import { takeLatest, all } from 'redux-saga/effects';
import Api from '../api/Calendar';
import {
    CALENDAR_GET_APARTMENT,
    SAVE_CALENDAR_GET_APARTMENT,
    CALENDAR_EDIT_APARTMENT,
    SAVE_CALENDAR_EDIT_APARTMENT,
    CALENDAR_DELETE_APARTMENT,
    SAVE_CALENDAR_DELETE_APARTMENT,
    CALENDAR_GET_USER,
    CALENDAR_GET_BOOKING,
    CALENDAR_ADD_BOOKING,
    SAVE_CALENDAR_ADD_BOOKING,
    CALENDAR_EDIT_BOOKING,
    SAVE_CALENDAR_EDIT_BOOKING,
    CALENDAR_DELETE_BOOKING,
    SAVE_CALENDAR_DELETE_BOOKING,
    CALENDAR_GET_ALL_CONTRACT,
    CALENDAR_GET_APARTMENT_BY_ID
} from '../actions/types'
import { createRequestSaga } from './common';
import { message } from "antd";

const getApartment = createRequestSaga({
    request: Api.getApartment,
    key: "calendarGetApartment",
    success: [res => ({ type: SAVE_CALENDAR_GET_APARTMENT, payload: res.data })],
    failure: []
})

const getApartmentById = createRequestSaga({
    request: Api.getApartmentById,
    key: "calendarGetApartmentById",
    success: [res => ({})],
    failure: []
})

const editApartment = createRequestSaga({
    request: Api.editApartment,
    key: "calendarEditApartment",
    success: [res => ({ type: SAVE_CALENDAR_EDIT_APARTMENT, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Sửa thành công!")],
    functionFailure: [(res) => message.error("Sửa thất bại!")]
})

const deleteApartment = createRequestSaga({
    request: Api.deleteApartment,
    key: "calendarDeleteApartment",
    success: [res => ({ type: SAVE_CALENDAR_DELETE_APARTMENT, payload: res.data._id })],
    failure: [],
    functionSuccess: [() => message.success("Xóa thành công!")],
    functionFailure: [(res) => message.error("Xóa thất bại!")]
})

const getUser = createRequestSaga({
    request: Api.getUser,
    key: "calendarGetUser",
    success: [res => ({})],
    failure: []
})

const getBooking = createRequestSaga({
    request: Api.getBooking,
    key: "calendarGetBooking",
    success: [res => ({})],
    failure: [],
    functionFailure: []
})

const addBooking = createRequestSaga({
    request: Api.addBooking,
    key: "calendarAddBooking",
    success: [res => ({ type: SAVE_CALENDAR_ADD_BOOKING, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Thêm thành công!")],
    functionFailure: [(res) => message.error("Thêm thất bại!")]
})

const editBooking = createRequestSaga({
    request: Api.editBooking,
    key: "calendarEditBooking",
    success: [res => ({ type: SAVE_CALENDAR_EDIT_BOOKING, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Sửa thành công!")],
    functionFailure: [() => message.error("Sửa thất bại!")]
})

const deleteBooking = createRequestSaga({
    request: Api.deleteBooking,
    key: "calendarDeleteBooking",
    success: [res => ({ type: SAVE_CALENDAR_DELETE_BOOKING, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Xóa thành công!")],
    functionFailure: [() => message.error("Xóa thất bại!")]
})

const getContract = createRequestSaga({
    request: Api.getAllContract,
    key: "calendarGetAllContract",
    success: [res => ({})],
    failure: []
})

export default [
    function* fetchWatcher() {
        yield all([
            takeLatest(CALENDAR_GET_APARTMENT, getApartment),
            takeLatest(CALENDAR_EDIT_APARTMENT, editApartment),
            takeLatest(CALENDAR_DELETE_APARTMENT, deleteApartment),
            takeLatest(CALENDAR_GET_USER, getUser),
            takeLatest(CALENDAR_GET_BOOKING, getBooking),
            takeLatest(CALENDAR_ADD_BOOKING, addBooking),
            takeLatest(CALENDAR_EDIT_BOOKING, editBooking),
            takeLatest(CALENDAR_DELETE_BOOKING, deleteBooking),
            takeLatest(CALENDAR_GET_ALL_CONTRACT, getContract),
            takeLatest(CALENDAR_GET_APARTMENT_BY_ID, getApartmentById),
        ]);
    }
];