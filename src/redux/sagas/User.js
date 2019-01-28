import { takeLatest, all } from 'redux-saga/effects';
import Api from '../api/User';
import {
    GET_ALL_USER,
    SAVE_GET_ALL_USER,
    CREATE_USER,
    SAVE_CREATE_USER,
    RESET_PASSWORD_USER,
    DELETE_USER,
    SAVE_DELETE_USER
} from '../actions/types'
import { createRequestSaga } from './common';
import { message } from "antd";

const getAllUser = createRequestSaga({
    request: Api.getAllUser,
    key: "getAllUser",
    success: [res => ({ type: SAVE_GET_ALL_USER, payload: res.data })],
    failure: []
})

const createUser = createRequestSaga({
    request: Api.createUser,
    key: "createUser",
    success: [res => ({ type: SAVE_CREATE_USER, payload: res.data })],
    failure: [],
    functionSuccess: [() => message.success("Tạo tài khoản thành công!")],
    functionFailure: [() => message.failure("Tạo tài khoản thất bại!")]
})

const resetPassword = createRequestSaga({
    request: Api.resetPassword,
    key: "resetPasswordUser",
    success: [res => ({})],
    failure: [],
    functionSuccess: [() => message.success("Reset mật khẩu thành công!")],
    functionFailure: [() => message.failure("Reset mật khẩu thất bại!")]
})

export default [
    function* fetchWatcher() {
        yield all([
            takeLatest(GET_ALL_USER, getAllUser),
            takeLatest(CREATE_USER, createUser),
            takeLatest(RESET_PASSWORD_USER, resetPassword)
        ]);
    }
];