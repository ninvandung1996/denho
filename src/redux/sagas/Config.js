import { takeLatest, all } from "redux-saga/effects";
import {
  GET_CONFIG,
  UPDATE_CONFIG
} from '../actions/types';
import { createRequestSaga } from "./common";
import Api from '../api/Config';
import { message } from "antd";

const getConfig = createRequestSaga({
  request: Api.getConfig,
  key: "getConfig",
  success: [res => ({})],
  failure: []
})

const updateConfig = createRequestSaga({
  request: Api.updateConfig,
  key: "updateConfig",
  success: [res => ({})],
  failure: [],
  functionSuccess: [() => message.success("Cập nhật thành công!")],
  functionFailure: [() => message.failure("Cập nhật thất bại!")]
})

export default [
  function* fetchWatcher() {
    yield all([
      takeLatest(GET_CONFIG, getConfig),
      takeLatest(UPDATE_CONFIG, updateConfig)
    ]);
  }
];