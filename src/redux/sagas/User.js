import { takeLatest, all } from 'redux-saga/effects';
import Api from '../api/User';
import {
    GET_ALL_USER,
    SAVE_GET_ALL_USER,
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
            takeLatest(RESET_PASSWORD_USER, resetPassword)
        ]);
    }
];