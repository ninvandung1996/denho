import { API } from './common';

export default {
  verifyToken: token => API.get('/login', {}, { headers: { Authorization: `access_token ${token}` } }),
  login: (params = {}) => {
    return API.post('/auth/login', params, {})
  }
};
