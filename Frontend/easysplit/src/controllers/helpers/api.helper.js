import { baseURL } from "../data/endpoints.data";
import { axios } from "axios";

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

    console.log(headers)
    console.log(baseURL + endpointInfo + `${extraPath ?? ""}`);
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
