import { takeLatest, all } from 'redux-saga/effects';
import Api from '../api/FeedBack';
import {
    GET_ALL_FEEDBACK,
    SAVE_GET_ALL_FEEDBACK
} from '../actions/types'
import { createRequestSaga } from './common';

const getAllFeedBack = createRequestSaga({
    request: Api.getAllFeedBack,
    key: "getAllFeedBack",
    success: [res => ({ type: SAVE_GET_ALL_FEEDBACK, payload: res.data })],
    failure: []
})

export default [
    function* fetchWatcher() {
        yield all([
            takeLatest(GET_ALL_FEEDBACK, getAllFeedBack),
        ]);
    }
];