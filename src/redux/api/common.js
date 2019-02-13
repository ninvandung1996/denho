import { create } from "apisauce";
import { API_TIMEOUT } from "../constants/api";
import configs from "../constants/configs";

const endpoint = configs.endPointLocal;
// const node_env = process.env.NODE_ENV;
// if (
//   node_env !== "dev" &&
//   node_env !== "development" &&
//   node_env !== "develop"
// ) {
//   endpoint = configs.endPoint;
//   console.log("object");
// } else endpoint = configs.endPoint;
// console.log({
//   node_env,
//   endpoint,
//   check: node_env === "development",
//   port: process.env.PORT
// });

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
