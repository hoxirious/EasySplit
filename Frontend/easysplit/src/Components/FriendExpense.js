import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getExpenseWithFriend } from "../controllers/apis/expense.api";
import { getUserJWt } from "../controllers/helpers/api.helper";

function FriendExpense(props) {
  const { friendID } = useParams();

  const { data: jwt } = useQuery("jwt", getUserJWt, {
    refetchOnWindowFocus: false,
  });

  const userJWT = jwt;
  const { data: friendsInfo, status: friendsInfoStatus } = useQuery(
    ["friendsInfo", friendID, userJWT],
    () => getExpenseWithFriend(friendID, userJWT),
    {
      enabled: !!userJWT,
    }
  );

  return (
    <div style={{ color: "black"}}>
      <div id="#center-topbar" className="topbar-group">
        <h1 id="expenses-header">Friend</h1>
        <div id="#topbar-actions" className="topbar-actions-group">
          <button
            id="add-expense-btn"
            onClick={() => props.toggleAddExpenseModal(true)}
          >
            Add an expense
          </button>
          <button id="settleup-btn">Settle up</button>
        </div>
      </div>
      {friendsInfoStatus === "success" &&
        friendsInfo.result.length !== 0 &&
        friendsInfo.result.map((friendInfo) => {
          return (
            <div>
              <div>Description: {friendInfo.description}</div>
              <div>Total Expense: {friendInfo.totalExpense}</div>
              {friendInfo.splitDetail.map((userBilling) => {
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
      {friendsInfoStatus === "success" && friendsInfo.result.length === 0 && (
        <h1 style={{ color: "black", margin: 30 }}>
          You have not added any expenses yet
        </h1>
      )}
    </div>
  );
}

export default FriendExpense;
