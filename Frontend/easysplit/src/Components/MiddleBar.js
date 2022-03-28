import { React } from "react";
import { Route, Switch } from "react-router-dom";
import AllExpenses from "./AllExpenses";
import FriendExpense from "./FriendExpense";
import GroupExpense from "./GroupExpense";
import RecentActivity from "./RecentActivity";

function MiddleBar(props) {
  return (
    <div className="centerDiv">
      <div className="all-expenses">
        <Switch>
          <Route path="/dashboard/recent" component={RecentActivity} />
          <Route path="/dashboard/allExpenses">
            <AllExpenses
              toggleAddExpenseModal={props.toggleAddExpenseModal}
              toggleSettleUpModal={props.toggleSettleUpModal}
              currentlyOn={props.currentlyOn}
            />
          </Route>
          <Route path="/dashboard/groups/:groupID">
            <GroupExpense
              toggleAddExpenseModal={props.toggleAddExpenseModal}
              toggleSettleUpModal={props.toggleSettleUpModal}
            />
          </Route>
          <Route path="/dashboard/friends/:friendID">
            <FriendExpense
              toggleAddExpenseModal={props.toggleAddExpenseModal}
              toggleSettleUpModal={props.toggleSettleUpModal}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default MiddleBar;
