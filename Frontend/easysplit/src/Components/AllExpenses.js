import React from "react";
import { useQuery, useMutation } from "react-query";
import {
  deleteExpenseByID,
  getExpenseByUserID,
} from "../controllers/apis/expense.api";
import { getUser } from "../controllers/apis/user.api";
import { getUserJWt } from "../controllers/helpers/api.helper";
import close from "../Resources/close.png";
function AllExpenses(props) {
  const { data: jwt } = useQuery("jwt", getUserJWt, {});

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
  const { data: allExpenses, status: allExpensesStatus } = useQuery(
    ["allExpenses", userJWT, userInfo],
    () => getExpenseByUserID(userJWT),
    {
      // The query will not execute until the userJWT exists
      enabled: !!userJWT && !!userInfo,
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: deleteExpenseMutation } = useMutation(async (expenseID) =>
    deleteExpenseByID(userJWT, expenseID)
  );

  function getYourLentAmount(splitDetail, userID) {
    let lentAmount = 0;
    splitDetail.forEach((billing) => {
      if (billing.userID === userID) {
        lentAmount = billing.lentAmount;
      }
    });
    return lentAmount;
  }
  function getYourPaidAmount(splitDetail, userID) {
    let paidAmount = 0;
    splitDetail.forEach((billing) => {
      if (billing.userID === userID) {
        paidAmount = billing.paidAmount;
      }
    });
    return paidAmount;
  }

  function deleteExpense() {
    console.log("Expense Deleted");
  }

  return (
    <div className="all-expenses-div">
      <div id="#center-topbar" className="topbar-group">
        <h1 id="expenses-header">All Expenses</h1>
        <div id="#topbar-actions" className="topbar-actions-group">
          <button
            id="add-expense-btn"
            onClick={() => props.toggleAddExpenseModal(true)}
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
      <ul
        style={{
          listStyleType: "none",
          margin: 0,
          padding: 0,
          paddingInlineStart: 0,
        }}
      >
        {allExpensesStatus === "success" &&
          userInfoStatus === "success" &&
          allExpenses.result.length !== 0 &&
          allExpenses.result.map((expense) => {
            return (
              <li
                key={expense.expenseID}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  border: "1px solid #b3b1b3",
                  justifyContent: "space-around",
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
                    <span>
                      $
                      {getYourPaidAmount(
                        expense.splitDetail,
                        userInfo.result.userID
                      )}
                    </span>
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
                    <span>
                      $
                      {getYourLentAmount(
                        expense.splitDetail,
                        userInfo.result.userID
                      )}
                    </span>
                  </div>
                </div>
                <img
                  src={close}
                  id="delete-expense"
                  onClick={() => deleteExpenseMutation(expense.expenseID)}
                />
              </li>
            );
          })}
      </ul>
      {allExpensesStatus === "success" && allExpenses.result.length === 0 && (
        <h1 style={{ color: "black", margin: 30 }}>
          You have not added any expenses yet
        </h1>
      )}
    </div>
  );
}
export default AllExpenses;
