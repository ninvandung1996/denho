import { API } from './common';

const getHeader = (token) => ({ headers: { Authorization: `access_token ${token}` } })

export default {
    getAllSupplier: (token) => {
        return API.get('/cms/suppliers', {}, getHeader(token))
    },
    getSupplier: (_id, token) => {
        return API.get('/cms/suppliers/' + _id, {}, getHeader(token))
    },
    addSupplier: (data, token) => {
        return API.post('/cms/suppliers', data, getHeader(token))
    },
    editSupplier: (_id, data, token) => {
        return API.patch('/cms/suppliers/' + _id, data, getHeader(token))
    },
    deleteSupplier: (_id, token) => {
        return API.delete('/cms/suppliers/' + _id, {}, getHeader(token))
    },
    getAllProject: (token) => {
        return API.get('/cms/projects', {}, getHeader(token))
    }
}