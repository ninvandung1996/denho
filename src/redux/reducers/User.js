import { SAVE_USER_GET_ALL, SAVE_USER_UPDATE } from "../actions/types";

const defaultState = {
  userList: [],
  currentPage: 0,
  totalPages: 0
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SAVE_USER_GET_ALL: {
      return { ...state, userList: payload.data, currentPage: payload.currentPage, totalPages: payload.totalPages };
    }
    case SAVE_USER_UPDATE: {
      let userList = [...state.userList].map(value => {
        if (value._id === payload._id) {
          return payload;
        }
        return value;
      });
      return { ...state, userList };
    }
    default: {
      return state;
    }
  }
};
