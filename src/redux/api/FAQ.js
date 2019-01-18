import { API } from './common';

const getHeader = (token) => ({ headers: { Authorization: `access_token ${token}` } })

export default {
    getAllFAQ: (token) => {
        return API.get('/cms/faqs', {}, getHeader(token))
    },
    getFAQ: (_id, token) => {
        return API.get('/cms/faqs/' + _id, {}, getHeader(token))
    },
    addFAQ: (data, token) => {
        return API.post('/cms/faqs', data, getHeader(token))
    },
    editFAQ: (_id, data, token) => {
        return API.patch('/cms/faqs/' + _id, data, getHeader(token))
    },
    deleteFAQ: (_id, token) => {
        return API.delete('/cms/faqs/' + _id, {}, getHeader(token))
    }
}