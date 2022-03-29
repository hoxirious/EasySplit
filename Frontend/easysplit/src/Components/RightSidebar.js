import React from "react";
import { Route, Switch } from "react-router-dom";
import GroupExpensesList from "./GroupExpensesList";
import FriendsSideBarExpense from "./FriendsSideBarExpense";
function RightSidebar() {
  return (
    <div className="thirdDiv">
      <div style={{ color: "black", margin: 30 }}>
        <Switch>
          <Route path="/dashboard/groups/:groupID">
            <GroupExpensesList />
          </Route>
          <Route path="/dashboard/friends/:friendID">
            <FriendsSideBarExpense />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default RightSidebar;
