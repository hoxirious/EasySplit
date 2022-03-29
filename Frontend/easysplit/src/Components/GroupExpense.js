import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getExpenseByGroupID } from "../controllers/apis/expense.api";
import { getUser } from "../controllers/apis/user.api";
import { getUserJWt } from "../controllers/helpers/api.helper";
import close from "../Resources/close.png";

function GroupExpense(props) {
  const { groupID } = useParams();
  const { data: jwt } = useQuery("jwt", getUserJWt);
  const userJWT = jwt;
  const { data: userInfo, status: userInfoStatus } = useQuery(
    ["userInfo", userJWT],
    () => getUser(userJWT),
    {
      // The query will not execute until the userJWT exists
      enabled: !!userJWT,
      refetchOnWindowFocus: false,
    }
  );

  const { data: groupsInfo, status: groupsInfoStatus } = useQuery(
    ["groupsInfo", groupID],
    () => getExpenseByGroupID(groupID),
    {
      enabled: !!userJWT && !!userInfo,
      refetchOnWindowFocus: false,
      select: (groupsInfo) => {
        const expenses = groupsInfo.result;
        const ToReturn = [];
        expenses.forEach((expense) => {
          const myExpense = {
            expenseID: expense.expenseID,
            groupReference: expense.GroupExpense,
            description: expense.description,
            timeStamp: expense.timeStamp,
            totalExpense: expense.totalExpense,
            splitDetail: {},
            expenseState: expense.expenseState,
          };
          for (let i = 0; i < expense.splitDetail.length; i++) {
            if (expense.splitDetail[i].userID === userInfo.result.userID) {
              myExpense.splitDetail = expense.splitDetail[i];
              break;
            }
          }
          ToReturn.push(myExpense);
        });
        console.log(ToReturn);
        return ToReturn;
      },
    }
  );

  return (
    <>
      {groupsInfoStatus === "success" && userInfoStatus === "success" && (
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
          {groupsInfo.map((expense) => {
            return (
              <li
                key={expense.expenseID}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  border: "1px solid #b3b1b3",
                  justifyContent: "space-around",
                  color: "black",
                  height: "4em",
                  paddingBottom: "0.5em",
                  paddingTop: "0.5em",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginLeft: "1em",
                  }}
                >
                  <span style={{ color: "#2bbbad", fontWeight: "500" }}>
                    {expense.date}
                  </span>
                  <span style={{ color: "black", fontWeight: "500" }}>
                    {expense.description}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginLeft: "1em",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "1em",
                    }}
                  >
                    <p style={{ margin: 0 }}>You paid </p>
                    <span>${expense.splitDetail.paidAmount}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "1em",
                    }}
                  >
                    <p style={{ margin: 0 }}>You lent</p>
                    <span>${expense.splitDetail.lentAmount}</span>
                  </div>
                </div>
                <img src={close} id="delete-expense" />
              </li>
            );
          })}
        </>
      )}
    </>
  );
}

export default GroupExpense;
