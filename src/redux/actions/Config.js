import {
  GET_CONFIG,
  UPDATE_CONFIG
} from './types';

export const getConfig = (...args) => ({ type: GET_CONFIG, args })
export const updateConfig = (...args) => ({ type: UPDATE_CONFIG, args })