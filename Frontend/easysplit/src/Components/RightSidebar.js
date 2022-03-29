import React from "react";
import { Route, Switch } from "react-router-dom";
import GroupExpensesList from "./GroupExpensesList";
function RightSidebar() {
  return (
    <div className="thirdDiv">
      
      <div style={{ color: "black", margin: 30 }}>
        <Switch>
          <Route path="/dashboard/groups/:groupID">
            <GroupExpensesList />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default RightSidebar;
