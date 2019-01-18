import Auth from './auth'
import App from './app'
import Project from './Project';
import Promotion from './Promotion';
import Supplier from './Supplier';
import FeedBack from './FeedBack';
import FAQ from './FAQ';
import Booking from './Booking';
import Calendar from './Calendar';
import { requests, toast, modal } from './common';
import { combineReducers } from 'redux'

export default {
  Auth,
  requests,
  App, Project, Promotion, Supplier, FeedBack, FAQ, Booking, Calendar,
  ui: combineReducers({
    toast,
    modal
  })
};
