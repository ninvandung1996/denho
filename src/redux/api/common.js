import { create } from "apisauce";
import { API_TIMEOUT } from "../constants/api";
import configs from "../constants/configs";

let endpoint = configs.endPointLocal;
const endpointImage = `${endpoint}/uploads/files/image`;
const API = create({
  baseURL: endpoint,
  timeout: API_TIMEOUT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export { API, endpoint, endpointImage };
