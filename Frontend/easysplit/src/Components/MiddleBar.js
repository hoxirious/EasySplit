import { React } from "react";
import { Route, Switch } from "react-router-dom";
import AllExpenses from "./AllExpenses";
import Dashboard from "./Dashboard";
import FriendExpense from "./FriendExpense";
import GroupExpense from "./GroupExpense";
import RecentActivity from "./RecentActivity";

function MiddleBar(props) {
  return (
    <div className="centerDiv">
      <div className="all-expenses">
        <Switch>
          <Route exact path="/dashboard">
            <Dashboard
              toggleAddExpenseModal={props.toggleAddExpenseModal}
              toggleSettleUpModal={props.toggleSettleUpModal}
            />
          </Route>
          <Route exact path="/dashboard/recent" component={RecentActivity} />
          <Route exact path="/dashboard/allExpenses">
            <AllExpenses
              toggleAddExpenseModal={props.toggleAddExpenseModal}
              toggleSettleUpModal={props.toggleSettleUpModal}
            />
          </Route>
          <Route path="/dashboard/groups/:groupID">
            <GroupExpense
              toggleAddExpenseModal={props.toggleAddExpenseModal}
              toggleSettleUpModal={props.toggleSettleUpModal}
              setGroupID={props.setGroupID}
            />
          </Route>
          <Route path="/dashboard/friends/:friendID">
            <FriendExpense
              toggleAddExpenseModal={props.toggleAddExpenseModal}
              toggleSettleUpModal={props.toggleSettleUpModal}
              setFriendID={props.setFriendID}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default MiddleBar;
