import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getExpenseByGroupID } from "../controllers/apis/expense.api";

function GroupExpense(props) {
  const { groupID } = useParams();
  const { data: groupsInfo, status: groupsInfoStatus } = useQuery(
    ["groupsInfo", groupID],
    () => getExpenseByGroupID(groupID)
  );
  return (
    <>
      {groupsInfoStatus === "success" && (
        <>
          <div id="#center-topbar" className="topbar-group">
            <h1 id="expenses-header">Group</h1>
            <div id="#topbar-actions" className="topbar-actions-group">
              <button
                id="add-expense-btn"
                onClick={() => {
                  props.toggleAddExpenseModal(true);
                  props.setGroupID(groupID);
                }}
              >
                Add an expense
              </button>
              <button
                id="settleup-btn"
                onClick={() => props.toggleSettleUpModal(true)}
              >
                Settle up
              </button>
            </div>
          </div>
          <div style={{ color: "black", margin: 30 }}>
            {groupsInfo.result.map((groupInfo) => {
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
        </>
      )}
    </>
  );
}

export default GroupExpense;
