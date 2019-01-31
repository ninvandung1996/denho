import { API } from './common';

const getHeader = (token) => ({ headers: { Authorization: `access_token ${token}` } })

export default {
    getAllTicket: (token) => {
        return API.get('/cms/tickets', {}, getHeader(token))
    },
    getTicket: (_id, token) => {
        return API.get('/cms/tickets/' + _id, {}, getHeader(token))
    },
    addTicket: (data, token) => {
        return API.post('/cms/tickets', data, getHeader(token))
    },
    editTicket: (_id, data, token) => {
        return API.patch('/cms/tickets/' + _id, data, getHeader(token))
    },
    deleteTicket: (_id, token) => {
        return API.delete('/cms/tickets/' + _id, {}, getHeader(token))
    },
    getAllContract: (token) => {
        return API.get('/cms/contracts?booking=true', {}, getHeader(token))
    },
    getAllService: (booking_id, token) => {
        return API.get('/cms/services?booking' + booking_id, {}, getHeader(token))
    },
}