import { USER_GET_ALL, USER_UPDATE } from "./types";

export const getUser = (...args) => ({ type: USER_GET_ALL, args });
export const updateUser = (...args) => ({ type: USER_UPDATE, args });
