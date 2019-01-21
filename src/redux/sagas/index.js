import { fork, all } from 'redux-saga/effects';
import auth from './auth';
import Project from './Project';
import Promotion from './Promotion';
import Supplier from './Supplier';
import FeedBack from './FeedBack';
import FAQ from './FAQ';
import Booking from './Booking';
import Calendar from './Calendar';
import Service from './Service';
const rootSaga = function* () {
  yield all([
    ...auth.map(watcher => fork(watcher)),
    ...Project.map(watcher => fork(watcher)),
    ...Promotion.map(watcher => fork(watcher)),
    ...Supplier.map(watcher => fork(watcher)),
    ...FeedBack.map(watcher => fork(watcher)),
    ...FAQ.map(watcher => fork(watcher)),
    ...Booking.map(watcher => fork(watcher)),
    ...Calendar.map(watcher => fork(watcher)),
    ...Service.map(watcher => fork(watcher))
  ]);
};
export default rootSaga;
