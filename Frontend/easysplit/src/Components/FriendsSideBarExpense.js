import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getCurrentBalanceFromFriend } from "../controllers/apis/expense.api";
import { getUser } from "../controllers/apis/user.api";
import { getUserJWt } from "../controllers/helpers/api.helper";

function FriendsSideBarExpense(props) {
  const { friendID } = useParams();

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

  const { data: userDebt, status: userDebtStatus } = useQuery(
    ["userDebt", userJWT, friendID],
    () => getCurrentBalanceFromFriend(userJWT, friendID),
    {
      enabled: !!userJWT && !!userInfo,
      select: (userDebt) => {
        return {
          friendID: userDebt.result.friendID,
          friendName: userDebt.result.friendName,
          debtAmount: userDebt.result.debtAmount.toFixed(2),
        };
      },
    }
  );

  return (
    <div className="">
      <h4 style={{ color: "black" }}>Group balances</h4>
      {userDebtStatus === "success" && userInfoStatus == "success" && (
        <p style={{ fontSize: "1.1em" }}>
          <b>
            {userDebt.debtAmount > 0
              ? `You owe ${userDebt.friendName}`
              : `${userDebt.friendName} owes You`}
          </b>
          <p style={{ fontSize: "1.6em" }}>
            <b>
              {userDebt.debtAmount > 0 ? (
                <span style={{ color: "#e65c2a" }}>${userDebt.debtAmount}</span>
              ) : (
                <span style={{ color: "#2bbbad" }}>
                  ${(userDebt.debtAmount * -1).toFixed(2)}
                </span>
              )}
            </b>
          </p>
        </p>
      )}
    </div>
  );
}

export default FriendsSideBarExpense;
