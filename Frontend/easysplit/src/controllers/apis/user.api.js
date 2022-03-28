import { ENDPOINTS } from "../data/endpoints.data";
import { sendRequest } from "../helpers/api.helper";

export const getUser = async (jwt) => {
  return await sendRequest({
    endpointInfo: ENDPOINTS.users.getUser,
    token: jwt,
    method: "get",
  });
};

export const getUserByID = async (userID) => {
  return await sendRequest({
    endpointInfo: ENDPOINTS.users.getUserByID,
    method: "get",
    extraPath: userID,
    useTokenInHeaders: false,
  });
};

export const getUserEvents = async (jwt) => {
  return await sendRequest({
    endpointInfo: ENDPOINTS.users.getUserEvents,
    token: jwt,
    method: "get",
  });
};

export const createUser = async (user, jwt) => {
  return await sendRequest({
    endpointInfo: ENDPOINTS.users.getUser,
    token: jwt,
    data: user,
    method: "put",
  });
};

