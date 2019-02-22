import { API } from './common';

const getHeader = (token) => ({ headers: { Authorization: `access_token ${token}` } })

export default {
  getData: (token) => {
    return API.get('/cms/projects', {}, getHeader(token))
  },
  getProject: (_id, token) => {
    return API.get('/cms/projects/' + _id, {}, getHeader(token))
  },
  addProject: (data, token) => {
    return API.post('/cms/projects', data, getHeader(token))
  },
  editProject: (_id, data, token) => {
    return API.patch('/cms/projects/' + _id, data, getHeader(token))
  },
  deleteProject: (_id, token) => {
    return API.delete('/cms/projects/' + _id, {}, getHeader(token))
  },

  getApartment: (_id, token) => {
    return API.get('/cms/apartments/' + _id, {}, getHeader(token))
  },
  addApartment: (data, token) => {
    return API.post('/cms/apartments/', data, getHeader(token))
  },
  editApartment: (_id, data, token) => {
    return API.patch('/cms/apartments/' + _id, data, getHeader(token))
  },
  deleteApartment: (_id, token) => {
    return API.delete('/cms/apartments/' + _id, {}, getHeader(token))
  },
};
