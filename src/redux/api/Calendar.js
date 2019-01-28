import { API } from './common';

const getHeader = (token) => ({ headers: { Authorization: `access_token ${token}` } })

export default {
  getApartment: (token) => {
    return API.get('/cms/apartments', {}, getHeader(token))
  },
  editApartment: (_id, data, token) => {
    return API.patch('/cms/apartments/' + _id, data, getHeader(token))
  },
  deleteApartment: (_id, token) => {
    return API.delete('/cms/apartments/' + _id, {}, getHeader(token))
  },
  getUser: (token) => {
    return API.get('/cms/users/get', {}, getHeader(token))
  },
  getBooking: (token) => {
    return API.get('/cms/bookings', {}, getHeader(token))
  },
  addBooking: (data, token) => {
    return API.post('/cms/bookings', data, getHeader(token))
  },
  editBooking: (_id, data, token) => {
    return API.patch('/cms/bookings/' + _id, data, getHeader(token))
  },
  deleteBooking: (_id, token) => {
    return API.delete('/cms/bookings/' + _id, {}, getHeader(token))
  },
  getAllContract: (token) => {
    return API.get('/cms/contracts', {}, getHeader(token))
  },
  getApartmentById: (apartment_id, booking_id, token) => {
    return API.get(`/cms/apartments/${apartment_id}?booking=${booking_id}`, {}, getHeader(token))
  },
};
