import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getGroupDebt } from "../controllers/apis/expense.api";

function GroupExpensesList(props) {
  const { groupID } = useParams();
  const { data: membersDebt, status: membersDebtStatus } = useQuery(
    ["membersDebt", groupID],
    () => getGroupDebt(groupID),
    {
      select: (membersDebt) => membersDebt.result,
    }
  );

  return (
    <>
      <h4 style={{ color: "black" }}>Group balances</h4>
      <ul id="group-expenses-list">
        {membersDebtStatus === "success" && (
          <>
            {membersDebt.oweList.map((each) => {
              return (
                <li>    
                  <div style={{ marginLeft: "1em" }}>
                    <p style={{ fontSize: "1.1em" }}>
                      <b>{each.name}</b>
                      <p style={{ fontSize: "0.85em" }}>
                        {each.debtAmount > 0 ? (
                          <span style={{ color: "#e65c2a" }}>
                            owes ${each.debtAmount}
                          </span>
                        ) : (
                          <span style={{ color: "#2bbbad" }}>
                            gets back ${each.debtAmount * -1}
                          </span>
                        )}
                      </p>
                    </p>
                  </div>
                </li>
              );
            })}
          </>
        )}
      </ul>
    </>
  );
}

export default GroupExpensesList;
