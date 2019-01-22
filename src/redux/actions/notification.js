import {
  GET_ALL_NOTIFICATION,
  GET_SINGLE_NOTIFICATION,
  CREATE_NOTIFICATION,
  UPDATE_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from './types.js';

export const actGetAllNotification = (...args) => ({
  type: GET_ALL_NOTIFICATION,
  args
});

export const actGetSingleNotification = (...args) => ({
  type: GET_SINGLE_NOTIFICATION,
  args
});

export const actCreateNotification = (...args) => ({
  type: CREATE_NOTIFICATION,
  args
});

export const actUpdateNotification = (...args) => ({
  type: UPDATE_NOTIFICATION,
  args
});

export const actRemoveNotification = (...args) => ({
  type: REMOVE_NOTIFICATION,
  args
});