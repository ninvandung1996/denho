import { API } from './common';

const getHeader = (token) => ({ headers: { Authorization: `access_token ${token}` } })

export default {
    getAllService: (token) => {
        return API.get('/cms/services', {}, getHeader(token))
    },
    getService: (_id, token) => {
        return API.get('/cms/services/' + _id, {}, getHeader(token))
    },
    addService: (data, token) => {
        return API.post('/cms/services', data, getHeader(token))
    },
    editService: (_id, data, token) => {
        return API.patch('/cms/services/' + _id, data, getHeader(token))
    },
    deleteService: (_id, token) => {
        return API.delete('/cms/services/' + _id, {}, getHeader(token))
    },
    getAllProject: (token) => {
        return API.get('/cms/projects', {}, getHeader(token))
    }
}