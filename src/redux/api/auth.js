import { API } from './common';

export default {
  verifyToken: token => API.get('cms/login', {}, { headers: { Authorization: `access_token ${token}` } }),
  login: (params = {}) => API.post('auths/admin/login', params)
};
