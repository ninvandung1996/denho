import { API } from './common';

const headerAuth =  token => {
  return { headers: { Authorization: `access_token ${token}` } };
}

export default {
  // Notification
  getAllNotifications: token => API.get("/cms/notifications", {}, headerAuth(token)),
  getSingleNotification: (token, id) => API.get("/cms/notifications/" + id, {}, headerAuth(token)),
  createNotification: (token, data) =>
    API.post("/cms/notifications/", data, headerAuth(token)),
  removeNotification: (token, id) =>
    API.delete("/cms/notifications/" + id, {}, headerAuth(token)),
  updateNotification: (token, data, id) =>
    API.patch("/cms/notifications/" + id, data, headerAuth(token)),
}