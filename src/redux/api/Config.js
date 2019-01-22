import { API } from "./common";

const headerAuth = token => {
  return { headers: { Authorization: `access_token ${token}` } };
}

export default {
  getConfig: (token) => API.get("/cms/configs", {}, headerAuth(token)),
  updateConfig: (data, token) => API.post("/cms/configs", data, headerAuth(token)),
}