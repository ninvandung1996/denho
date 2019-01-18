import { API } from './common';

const getHeader = (token) => ({ headers: { Authorization: `access_token ${token}` } })

export default {
    getAllFeedBack: (token) => {
        return API.get('/cms/feedbacks', {}, getHeader(token))
    }
}