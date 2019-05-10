import { createStore, combineReducers, applyMiddleware } from "redux";

import createHistory from "history/createBrowserHistory";

import { routerReducer, routerMiddleware } from "react-router-redux";

import thunk from "redux-thunk";

import createSagaMiddleware from "redux-saga";

import reducers from "./reducers";

import rootSaga from "./sagas";

import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "SmartLife",
  storage,
  blacklist: [
    "User"
  ]
};

const history = createHistory();

const sagaMiddleware = createSagaMiddleware();

const routeMiddleware = routerMiddleware(history);

const middlewares = [thunk, sagaMiddleware, routeMiddleware];

const allReducer = combineReducers({
  ...reducers,
  router: routerReducer
});

const persistedReducer = persistReducer(persistConfig, allReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
export const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, history };
