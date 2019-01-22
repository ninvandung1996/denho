import { API } from './common';

const getHeader = (token) => ({ headers: { Authorization: `access_token ${token}` } })

export default {
    getAllUser: (token) => {
        return API.get('/cms/users/get', {}, getHeader(token))
    },
    resetPassword: (data, token) => {
        return API.post('/cms/users/resetpassword', data, getHeader(token));
    },
    deleteUser: (_id, token) => {
        return API.delete('/cms/users/' + _id, {}, getHeader(token))
    }
}