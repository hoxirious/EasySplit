import { ENDPOINTS } from "../data/endpoints.data";
import { sendRequest } from "../helpers/api.helper";

export const getUser = async (jwt) => {
  return await sendRequest({
    endpointInfo: ENDPOINTS.users.getUser,
    token: jwt,
    method: "get",
  });
};

// todos add jwt into header
export const createUser = async (user, jwt) => {
  return await sendRequest(ENDPOINTS.users.createUser, user, jwt);
};
