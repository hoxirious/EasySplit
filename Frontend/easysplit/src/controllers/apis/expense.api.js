import { ENDPOINTS } from "../data/endpoints.data";
import { sendRequest } from "../helpers/api.helper";

export const getExpenseByGroupID = async (extraPath) => {
  return await sendRequest({
    endpointInfo: ENDPOINTS.expenses.getExpenseByGroupID,
    method: "get",
    useTokenInHeaders: false,
    extraPath,
  });
};
export const getExpenseByUserID = async (jwt) => {
  return await sendRequest({
    endpointInfo: ENDPOINTS.expenses.getExpenseByUserID,
    method: "get",
    token: jwt,
  });
};

export const getExpenseWithFriend = async (extraPath, jwt) => {
  return await sendRequest({
    endpointInfo: ENDPOINTS.expenses.getExpenseWithFriend,
    method: "get",
    token: jwt,
    extraPath,
  });
};
