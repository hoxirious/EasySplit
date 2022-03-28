import { ENDPOINTS } from "../data/endpoints.data";
import { sendRequest } from "../helpers/api.helper";

export const getUserFriends = async (jwt) => {
  return await sendRequest({
    endpointInfo: ENDPOINTS.users.getUserAllFriends,
    token: jwt,
    method: "get",
  });
};

export const addFriend = async (email, jwt) => {
  return await sendRequest({
    endpointInfo: ENDPOINTS.users.addFriend,
    token: jwt,
    data: { email },
    method: "put",
  });
};
