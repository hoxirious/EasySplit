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
