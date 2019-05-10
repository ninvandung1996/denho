import { API } from "./common";

const getHeader = token => ({ headers: { Authorization: `Bearer ${token}` } });

export default {
  getAllUser: token => {
    return API.get("/users", {}, getHeader(token));
  },
  updateUser: (_id, data, token) => {
    return API.patch("/users" + _id, data, getHeader(token));
  }
};
