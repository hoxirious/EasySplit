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
export const splitExpense = async (data) => {
  console.log({
    userPayment: data
  });
  return await sendRequest({
    endpointInfo: ENDPOINTS.expenses.splitExpense,
    data: {
      userPayment: data,
    },
    useTokenInHeaders: false,
    method: "post",
  });
};

export const createExpense = async (data, jwt) => {
  return await sendRequest({
    endpointInfo: ENDPOINTS.expenses.createExpense,
    token: jwt,
    data: {
      groupReference: data.groupReference,
      description: data.description,
      totalExpense: data.totalExpense,
      splitDetail: data.splitDetail,
    },
    method: "post",
  });
};
