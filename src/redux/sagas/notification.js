import { takeLatest, all } from "redux-saga/effects";
import { message } from "antd";
import {
  GET_ALL_NOTIFICATION,
  GET_SINGLE_NOTIFICATION,
  CREATE_NOTIFICATION,
  UPDATE_NOTIFICATION,
  REMOVE_NOTIFICATION,
  SAVE_CREATE_NOTIFICATION,
  SAVE_UPDATE_NOTIFICATION,
  SAVE_REMOVE_NOTIFICATION,
  SAVE_GET_ALL_NOTIFICATION,
} from '../actions/types';
import { createRequestSaga } from "./common";
import notification from "../api/notification";

const getAllNotifications = createRequestSaga({
  request: notification.getAllNotifications,
  key: "getAllNotifications",
  success: [
    res => ({
      type: SAVE_GET_ALL_NOTIFICATION,
      payload: res.data
    })
  ],
  failure: [
    () => message.error("Có lỗi xảy ra, vui lòng tải lại trang!")
  ]
});

const getSingleNotification = createRequestSaga({
  request: notification.getSingleNotification,
  key: "getSingleNotification",
  success: [
  ],
  failure: [
    () => message.error("Có lỗi xảy ra, vui lòng tải lại trang!")
  ]
});

const createNotification = createRequestSaga({
  request: notification.createNotification,
  key: "createNotification",
  success: [
    res => ({
      type: SAVE_CREATE_NOTIFICATION,
      payload: res.data
    })
  ],
  failure: [
    () => message.error("Có lỗi xảy ra, vui lòng tải lại trang!")
  ],
  functionSuccess: [
    () => message.success("Tạo thông báo thành công!")
  ]
});

const updateNotification = createRequestSaga({
  request: notification.updateNotification,
  key: "updateNotification",
  success: [
    res => ({
      type: SAVE_UPDATE_NOTIFICATION,
      payload: res.data
    })
  ],
  failure: [
    () => message.error("Có lỗi xảy ra, vui lòng tải lại trang!")
  ],
  functionSuccess: [
    () => message.success("Cập nhật thông báo thành công!")
  ]
});

const removeNotification = createRequestSaga({
  request: notification.removeNotification,
  key: "removeNotification",
  success: [
    res => ({
      type: SAVE_REMOVE_NOTIFICATION,
      payload: res.data
    })
  ],
  failure: [
    () => message.error("Có lỗi xảy ra, vui lòng tải lại trang!")
  ],
  functionSuccess: [
    () => message.success("Xóa thông báo thành công!")
  ]
});

export default [
  function* fetchWatcher() {
    yield all([
      takeLatest(GET_ALL_NOTIFICATION, getAllNotifications),
      takeLatest(GET_SINGLE_NOTIFICATION, getSingleNotification),
      takeLatest(CREATE_NOTIFICATION, createNotification),
      takeLatest(UPDATE_NOTIFICATION, updateNotification),
      takeLatest(REMOVE_NOTIFICATION, removeNotification),
    ]);
  }
];