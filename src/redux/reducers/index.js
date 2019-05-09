import Auth from './auth'
import App from './app'
import { requests, toast, modal } from './common';
import { combineReducers } from 'redux'

export default {
  Auth,
  requests,
  App,
  ui: combineReducers({
    toast,
    modal
  })
};
