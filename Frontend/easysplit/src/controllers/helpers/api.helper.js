import { baseURL } from "../data/endpoints.data";
import { auth } from "../../App.js";
import axios from "axios";

export const getUserJWt = async () => await auth.currentUser.getIdToken();

export const sendRequest = async ({
  endpointInfo,
  data = null,
  token,
  method,
  customHeader = {},
  useTokenInHeaders = true,
  extraPath,
}) => {
  let result = {};
  try {
    const headers = { ...customHeader };
    if (useTokenInHeaders) {
      headers["Authorization"] = `Bearer ${token}`;
      headers["Content-Type"] = "application/json";
    }

    const response = await axios({
      baseURL: baseURL + endpointInfo + `${extraPath ?? ""}`,
      headers,
      data: data,
      method: method,
    });
    result.result = response.data;
  } catch (error) {
    console.error(error);
  }
  return result;
};
