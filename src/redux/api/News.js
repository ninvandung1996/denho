import { API } from './common';

const getHeader = (token) => ({ headers: { Authorization: `access_token ${token}` } })

export default {
    getAllNews: (token) => {
        return API.get('/cms/news', {}, getHeader(token))
    },
    getNews: (_id, token) => {
        return API.get('/cms/news/' + _id, {}, getHeader(token))
    },
    addNews: (data, token) => {
        return API.post('/cms/news', data, getHeader(token))
    },
    editNews: (_id, data, token) => {
        return API.patch('/cms/news/' + _id, data, getHeader(token))
    },
    deleteNews: (_id, token) => {
        return API.delete('/cms/news/' + _id, {}, getHeader(token))
    }
}