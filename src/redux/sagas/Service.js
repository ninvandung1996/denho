import { takeLatest, all } from 'redux-saga/effects';
import Api from '../api/Service';
import {
    GET_ALL_SERVICE,
    SAVE_GET_ALL_SERVICE,
    GET_SERVICE,
    SAVE_GET_SERVICE,
    ADD_SERVICE,
    SAVE_ADD_SERVICE,
    EDIT_SERVICE,
    SAVE_EDIT_SERVICE,
    DELETE_SERVICE,
    SAVE_DELETE_SERVICE,
    SERVICE_GET_ALL_PROJECT
} from '../actions/types'
import { createRequestSaga } from './common';
import { message } from "antd";

const getAllService = createRequestSaga({
    request: Api.getAllService,
    key: "getAllService",
    success: [res => ({ type: SAVE_GET_ALL_SERVICE, payload: res.data })],
    failure: []
})

const getService = createRequestSaga({
    request: Api.getService,
    key: "getService",
    success: [res => ({ type: SAVE_GET_SERVICE, payload: res.data })],
    failure: []
})

const addService = createRequestSaga({
    request: Api.addService,
    key: "addService",
    success: [res => ({ type: SAVE_ADD_SERVICE, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Thêm thành công!")],
    functionFailure: [() => message.failure("Thêm thất bại!")]
})

const editService = createRequestSaga({
    request: Api.editService,
    key: "editService",
    success: [res => ({ type: SAVE_EDIT_SERVICE, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Sửa thành công!")],
    functionFailure: [() => message.failure("Sửa thất bại!")]
})

const deleteService = createRequestSaga({
    request: Api.deleteService,
    key: "deleteService",
    success: [res => ({ type: SAVE_DELETE_SERVICE, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Xóa thành công!")],
    functionFailure: [() => message.failure("Xóa thất bại!")]
})

const getAllProject = createRequestSaga({
    request: Api.getAllProject,
    key: "serviceGetAllProject",
    success: [res => ({})],
    failure: []
})

export default [
    function* fetchWatcher() {
        yield all([
            takeLatest(GET_ALL_SERVICE, getAllService),
            takeLatest(GET_SERVICE, getService),
            takeLatest(ADD_SERVICE, addService),
            takeLatest(EDIT_SERVICE, editService),
            takeLatest(DELETE_SERVICE, deleteService),
            takeLatest(SERVICE_GET_ALL_PROJECT, getAllProject)
        ]);
    }
];