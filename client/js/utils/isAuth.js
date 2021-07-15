import {
  crud
} from "./crud.js";
import {
  loginEndpoint
} from "./endpoints.js";
import {
  getParamsFromUrl
} from "./getParamsFromUrl.js";
export const isAuth = async () => {
  const [uid] = getParamsFromUrl(["uid"]);
  crud.endpoint = loginEndpoint + "/" + uid;
  const response = crud.get().then((auth) => {
    return auth;
  })
  return response;
}
