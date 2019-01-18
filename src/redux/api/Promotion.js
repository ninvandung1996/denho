import { API } from './common';

const getHeader = (token) => ({ headers: { Authorization: `access_token ${token}` } })

export default {
    getAllPromotion: (token) => {
        return API.get('/cms/promotions', {}, getHeader(token))
    },
    getPromotion: (_id, token) => {
        return API.get('/cms/promotions/' + _id, {}, getHeader(token))
    },
    addPromotion: (data, token) => {
        return API.post('/cms/promotions', data, getHeader(token))
    },
    editPromotion: (_id, data, token) => {
        return API.patch('/cms/promotions/' + _id, data, getHeader(token))
    },
    deletePromotion: (_id, token) => {
        return API.delete('/cms/promotions/' + _id, {}, getHeader(token))
    }
}