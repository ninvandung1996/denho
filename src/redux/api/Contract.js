import { API } from './common';

const getHeader = (token) => ({ headers: { Authorization: `access_token ${token}` } })

export default {
    getAllContract: (token) => {
        return API.get('/cms/contracts', {}, getHeader(token))
    },
    addContract: (data, token) => {
        return API.post('/cms/contracts', data, getHeader(token))
    },
    editContract: (_id, data, token) => {
        return API.patch('/cms/contracts/' + _id, data, getHeader(token))
    },
    deleteContract: (_id, token) => {
        return API.delete('/cms/contracts/' + _id, {}, getHeader(token))
    },
    getAllUser: (token) => {
        return API.get('/cms/users/get', {}, getHeader(token))
    },
    getAllApartment: (token) => {
        return API.get('/cms/apartments', {}, getHeader(token))
    },
    addBooking: (data, token) => {
        return API.post('/cms/bookings', data, getHeader(token))
    },
    editBooking: (_id, data, token) => {
        return API.patch('/cms/bookings/' + _id, data, getHeader(token))
    },
    delteBooking: (_id, token) => {
        return API.delete('/cms/bookings/' + _id, {}, getHeader(token))
    },
    getApartment: (apartment_id, booking_id, token) => {
        return API.get(`/cms/apartments/${apartment_id}?booking=${booking_id}`, {}, getHeader(token))
    },
}