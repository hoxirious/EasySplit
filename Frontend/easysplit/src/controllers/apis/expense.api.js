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
export const getFriendDebt = async (jwt) => {
  return await sendRequest({
    endpointInfo: ENDPOINTS.expenses.getFriendDebt,
    method: "get",
    token: jwt,
  });
};
export const getGroupDebt = async (extraPath) => {
  return await sendRequest({
    endpointInfo: ENDPOINTS.expenses.getGroupDebt,
    method: "get",
    useTokenInHeaders: false,
    extraPath,
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
  return await sendRequest({
    endpointInfo: ENDPOINTS.expenses.splitExpense,
    data: {
      userPayment: data,
    },
    useTokenInHeaders: false,
    method: "post",
  });
};
export const getCurrentBalanceFromFriend = async (jwt,extraPath) => {
  return await sendRequest({
    endpointInfo: ENDPOINTS.expenses.getCurrentBalanceFromFriend,
    token: jwt,
    extraPath: extraPath,
    method: "get",
  });
};
export const deleteExpenseByID = async (jwt, extraPath) => {
  return await sendRequest({
    endpointInfo: ENDPOINTS.expenses.deleteExpenseByID,
    token: jwt,
    extraPath: extraPath,
    method: "get",
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
