import { React } from "react";
import { Route, Switch } from "react-router-dom";
import AllExpenses from "./AllExpenses";
import FriendExpense from "./FriendExpense";
import GroupExpense from "./GroupExpense";
import RecentActivity from "./RecentActivity";

function MiddleBar(props) {
  return (
    <div className="centerDiv">
      <div id="#center-topbar" className="topbar-group">
        <h1 id="expenses-header">All Expenses</h1>
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
      <div className="all-expenses">
        <Switch>
          <Route path="/dashboard/recent" component={RecentActivity} />
          <Route path="/dashboard/allExpenses" component={AllExpenses} />
          <Route path="/dashboard/groups/:groupID" component={GroupExpense} />
          <Route
            path="/dashboard/friends/:friendID"
            component={FriendExpense}
          />
        </Switch>
      </div>
    </div>
  );
}

export default MiddleBar;
