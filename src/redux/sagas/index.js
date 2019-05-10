import { fork, all } from "redux-saga/effects";
import auth from "./auth";
import User from "./User";

const rootSaga = function*() {
  yield all([
    ...auth.map(watcher => fork(watcher)),
    ...User.map(watcher => fork(watcher))
  ]);
};
export default rootSaga;
