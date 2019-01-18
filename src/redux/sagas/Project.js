import { takeLatest, all } from 'redux-saga/effects';
import Api from '../api/Project';
import {
    GET_ALL_PROJECT,
    SAVE_GET_ALL_PROJECT,
    ADD_NEW_PROJECT,
    SAVE_ADD_NEW_PROJECT,
    EDIT_PROJECT,
    SAVE_EDIT_PROJECT,
    SAVE_DELETE_PROJECT,
    DELETE_PROJECT,
    SAVE_GET_PROJECT,
    GET_PROJECT,
    GET_APARTMENT,
    ADD_NEW_APARTMENT,
    SAVE_ADD_NEW_APARTMENT,
    EDIT_APARTMENT,
    SAVE_EDIT_APARTMENT,
    DELETE_APARTMENT,
    SAVE_DELETE_APARTMENT
} from '../actions/types'
import { createRequestSaga } from './common';
import { message } from "antd";

const getAllProject = createRequestSaga({
    request: Api.getData,
    key: "getAllProject",
    success: [res => ({ type: SAVE_GET_ALL_PROJECT, payload: res.data })],
    failure: []
})

const getProject = createRequestSaga({
    request: Api.getProject,
    key: "getProject",
    success: [res => ({ type: SAVE_GET_PROJECT, payload: res.data })],
    failure: []
})

const addProject = createRequestSaga({
    request: Api.addProject,
    key: "addProject",
    success: [res => ({ type: SAVE_ADD_NEW_PROJECT, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Thêm thành công!")],
    functionFailure: [() => message.failure("Thêm thất bại!")]
})

const editProject = createRequestSaga({
    request: Api.editProject,
    key: "editProject",
    success: [res => ({ type: SAVE_EDIT_PROJECT, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Sửa thành công!")],
    functionFailure: [() => message.failure("Sửa thất bại!")]
})

const deleteProject = createRequestSaga({
    request: Api.deleteProject,
    key: "deleteProject",
    success: [res => ({})],
    failure: [],
    functionSuccess: [() => message.success("Xóa thành công!")],
    functionFailure: [() => message.failure("Xóa thất bại!")]
})

const getApartment = createRequestSaga({
    request: Api.getApartment,
    key: "getApartment",
    success: [() => ({})],
    failure: [],
})

const addApartment = createRequestSaga({
    request: Api.addApartment,
    key: "addApartment",
    success: [res => ({ type: SAVE_ADD_NEW_APARTMENT, payload: res.data })],
    failure: [() => { }],
    functionSuccess: [() => message.success("Thêm thành công!")],
    functionFailure: [() => message.failure("Thêm thất bại!")]
})

const editApartment = createRequestSaga({
    request: Api.editApartment,
    key: "editApartment",
    success: [res => ({ type: SAVE_EDIT_APARTMENT, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Sửa thành công!")],
    functionFailure: [() => message.failure("Sửa thất bại!")]
})

const deleteApartment = createRequestSaga({
    request: Api.deleteApartment,
    key: "deleteApartment",
    success: [res => ({ type: SAVE_DELETE_APARTMENT, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Xóa thành công!")],
    functionFailure: [() => message.failure("Xóa thất bại!")]
})

export default [
    function* fetchWatcher() {
        yield all([
            takeLatest(GET_ALL_PROJECT, getAllProject),
            takeLatest(GET_PROJECT, getProject),
            takeLatest(ADD_NEW_PROJECT, addProject),
            takeLatest(EDIT_PROJECT, editProject),
            takeLatest(DELETE_PROJECT, deleteProject),
            takeLatest(GET_APARTMENT, getApartment),
            takeLatest(ADD_NEW_APARTMENT, addApartment),
            takeLatest(EDIT_APARTMENT, editApartment),
            takeLatest(DELETE_APARTMENT, deleteApartment)
        ]);
    }
];