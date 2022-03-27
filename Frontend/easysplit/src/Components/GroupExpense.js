import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getExpenseByGroupID } from "../controllers/apis/expense.api";

function GroupExpense(props) {
  const { groupID } = useParams();
  const { data: groupsInfo, status: groupsInfoStatus } = useQuery(
    ["groupsInfo", groupID],
    () => getExpenseByGroupID(groupID),
  );

  return (
    <div style={{ color: "black", margin: 30 }}>
      {groupsInfoStatus === "success" &&
        groupsInfo.result.map((groupInfo) => {
          return (
            <div>
              <div>Description: {groupInfo.description}</div>
              <div>Total Expense: {groupInfo.totalExpense}</div>
              {groupInfo.splitDetail.map((userBilling) => {
                return (
                  <div>
                    <div>You paid: {userBilling.paidAmount}</div>
                    <div>You lent: {userBilling.lentAmount}</div>
                    <br></br>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}

export default GroupExpense;
