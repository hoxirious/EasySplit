import { ENDPOINTS } from "../data/endpoints.data";
import { sendRequest } from "../helpers/api.helper";

export const getUserGroups = async (jwt) => {
    return await sendRequest({
      endpointInfo: ENDPOINTS.users.getUserAllGroups,
      token: jwt,
      method: "get",
    });
  };