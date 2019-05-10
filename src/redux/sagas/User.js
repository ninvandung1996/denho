import { takeLatest, all } from "redux-saga/effects";
import Api from "../api/User";
import {
  USER_GET_ALL,
  SAVE_USER_GET_ALL,
  USER_UPDATE,
  SAVE_USER_UPDATE
} from "../actions/types";
import { createRequestSaga } from "./common";
import { message } from "antd";

const getAllUser = createRequestSaga({
  request: Api.getAllUser,
  key: "getAllUser",
  success: [res => ({ type: SAVE_USER_GET_ALL, payload: res.data })],
  failure: []
});

const updateUser = createRequestSaga({
  request: Api.updateUser,
  key: "updateUser",
  success: [res => ({ type: SAVE_USER_UPDATE, payload: res.data })],
  failure: [],
  functionSuccess: [() => message.success("Sửa thành công!")],
  functionFailure: [() => message.failure("Sửa thất bại!")]
});

export default [
  function* fetchWatcher() {
    yield all([
      takeLatest(USER_GET_ALL, getAllUser),
      takeLatest(USER_UPDATE, updateUser)
    ]);
  }
];
