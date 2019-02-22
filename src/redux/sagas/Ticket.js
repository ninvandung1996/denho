import { takeLatest, all } from 'redux-saga/effects';
import Api from '../api/Ticket';
import {
    GET_ALL_TICKET,
    SAVE_GET_ALL_TICKET,
    GET_TICKET,
    ADD_TICKET,
    SAVE_ADD_TICKET,
    EDIT_TICKET,
    SAVE_EDIT_TICKET,
    DELETE_TICKET,
    SAVE_DELETE_TICKET,
    TICKET_GET_ALL_CONTRACT,
    TICKET_GET_ALL_SERVICE
} from '../actions/types'
import { createRequestSaga } from './common';
import { message } from "antd";

const getAllTicket = createRequestSaga({
    request: Api.getAllTicket,
    key: "getAllTicket",
    success: [res => ({ type: SAVE_GET_ALL_TICKET, payload: res.data })],
    failure: []
})

const getTicket = createRequestSaga({
    request: Api.getTicket,
    key: "getTicket",
    success: [res => ({})],
    failure: []
})

const addTicket = createRequestSaga({
    request: Api.addTicket,
    key: "addTicket",
    success: [res => ({ type: SAVE_ADD_TICKET, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Thêm thành công!")],
    functionFailure: [() => message.failure("Thêm thất bại!")]
})

const editTicket = createRequestSaga({
    request: Api.editTicket,
    key: "editTicket",
    success: [res => ({ type: SAVE_EDIT_TICKET, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Sửa thành công!")],
    functionFailure: [() => message.failure("Sửa thất bại!")]
})

const deleteTicket = createRequestSaga({
    request: Api.deleteTicket,
    key: "deleteTicket",
    success: [res => ({ type: SAVE_DELETE_TICKET, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Xóa thành công!")],
    functionFailure: [() => message.failure("Xóa thất bại!")]
})


const getAllContract = createRequestSaga({
    request: Api.getAllContract,
    key: "ticketGetAllContract",
    success: [res => ({})],
    failure: []
})

const getAllService = createRequestSaga({
    request: Api.getAllService,
    key: "ticketGetAllService",
    success: [res => ({})],
    failure: []
})

export default [
    function* fetchWatcher() {
        yield all([
            takeLatest(GET_ALL_TICKET, getAllTicket),
            takeLatest(GET_TICKET, getTicket),
            takeLatest(ADD_TICKET, addTicket),
            takeLatest(EDIT_TICKET, editTicket),
            takeLatest(DELETE_TICKET, deleteTicket),
            takeLatest(TICKET_GET_ALL_CONTRACT, getAllContract),
            takeLatest(TICKET_GET_ALL_SERVICE, getAllService)
        ]);
    }
];