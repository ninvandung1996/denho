import { API } from './common';

const getHeader = (token) => ({ headers: { Authorization: `access_token ${token}` } })

export default {
    getAllBooking: (token) => {
        return API.get('/cms/bookings', {}, getHeader(token))
    },
    getAllApartment: (token) => {
        return API.get('/cms/apartments/', {}, getHeader(token))
    },
    getAllUser: (token) => {
        return API.get('/cms/users/get', {}, getHeader(token))
    },
    addBooking: (data, token) => {
        return API.post('/cms/bookings', data, getHeader(token))
    },
    editBooking: (_id, data, token) => {
        return API.patch('/cms/bookings/' + _id, data, getHeader(token))
    },
    deleteBooking: (_id, token) => {
        return API.delete('/cms/bookings/' + _id, {}, getHeader(token))
    }
}