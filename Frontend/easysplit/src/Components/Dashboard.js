import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getFriendDebt } from "../controllers/apis/expense.api";
import { getUser } from "../controllers/apis/user.api";
import { getUserJWt } from "../controllers/helpers/api.helper";

export default function Dashboard(props) {
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

  const {
    data: debtInfo,
    status: debtInfoStatus,
    refetch,
  } = useQuery(["debtInfo", userJWT], () => getFriendDebt(userJWT), {
    enabled: !!userJWT && !!userInfo,
    refetchOnWindowFocus: false,
    select: (debtInfo) => {
      let ToReturn = {
        totalBalance: 0,
        totalYouOwe: 0,
        totalFriendOwe: 0,
        youOwe: debtInfo.result.youOwe,
        friendOwe: debtInfo.result.friendOwe,
      };
      if (debtInfo.result.friendOwe.length !== 0) {
        ToReturn.totalFriendOwe = debtInfo.result.friendOwe.reduce(
          (current, value) => {
            current += value.debtAmount;
            return current;
          },
          0
        );
      }
      if (debtInfo.result.youOwe.length !== 0) {
        ToReturn.totalYouOwe = debtInfo.result.youOwe.reduce(
          (current, value) => {
            current += value.debtAmount;
            return current;
          },
          0
        );
      }
      ToReturn.totalBalance = ToReturn.totalFriendOwe - ToReturn.totalYouOwe;

      return ToReturn;
    },
  });

  return (
    <div className="all-expenses-div">
      <div id="#center-topbar" className="topbar-group">
        <h1 id="expenses-header">Dashboard</h1>
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
      {debtInfoStatus === "success" &&
        (debtInfo.friendOwe.length !== 0 || debtInfo.youOwe.length !== 0) && (
          <>
            <div className="balance-details-div">
              <div id="total-balance">
                <p>
                  <b>Total Balance</b>
                </p>
                <span>${debtInfo.totalBalance}</span>
              </div>
              <div id="you-owe">
                <p>
                  <b>You Owe</b>
                </p>
                <span>${debtInfo.totalYouOwe}</span>
              </div>
              <div id="owed-to-you">
                <p>
                  <b>You Are Owed</b>
                </p>
                <span>${debtInfo.totalFriendOwe}</span>
              </div>
            </div>
            <div className="dashboard-expenses-div">
              <div className="dashboard-expenses-heading">
                <span>
                  <b>You Owe</b>
                </span>
                <span>
                  <b>You Are Owed</b>
                </span>
              </div>
              <div className="dashboard-expenses-lists">
                <ul id="you-owe-list">
                  {debtInfo.youOwe.map((each) => {
                    return (
                      <Link
                        to={`/dashboard/friends/${each.friendID}`}
                        key={each.friendID}
                      >
                        <span>{each.name}</span>
                        <span style={{ color: "#54b499", paddingLeft: "1em" }}>
                          ${each.debtAmount}
                        </span>
                      </Link>
                    );
                  })}
                </ul>
                <ul id="you-are-owed-list">
                  {debtInfo.friendOwe.map((each) => {
                    return (
                      <Link
                        to={`/dashboard/friends/${each.friendID}`}
                        key={each.friendID}
                      >
                        <span>{each.name}</span>
                        <span style={{ color: "#54b499", paddingLeft: "1em" }}>
                          ${each.debtAmount}
                        </span>
                      </Link>
                    );
                  })}
                </ul>
              </div>
            </div>
          </>
        )}
      {debtInfoStatus === "success" &&
        debtInfo.friendOwe.length === 0 &&
        debtInfo.youOwe.length === 0 && (
          <h3 style={{ color: "black", margin: 30 }}>
            You have not added any expenses yet
          </h3>
        )}
    </div>
  );
}
