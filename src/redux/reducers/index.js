import Auth from "./auth";
import App from "./app";
import { requests, toast, modal } from "./common";
import { combineReducers } from "redux";
import User from "./User";

export default {
  Auth,
  requests,
  App,
  User,
  ui: combineReducers({
    toast,
    modal
  })
};
