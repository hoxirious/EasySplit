import { React } from "react";
import { Route, Switch } from "react-router-dom";
import AllExpenses from "./AllExpenses";
import FriendExpense from "./FriendExpense";
import GroupExpense from "./GroupExpense";

function MiddleBar(props) {


  useEffect(() => {
    if (props.isRecentActivityOpen) {
      topbar.current.style.display = "none";
      heading.current.style.display = "none";
    } else {
      topbar.current.style.display = "block";
      heading.current.style.display = "block";
    }
  }, [props.isRecentActivityOpen]);

  return (
    <div className="centerDiv">
      <div id="#center-topbar" className="topbar-group" ref={topbar}>
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
        {/* <RecentActivity isOpen={props.isRecentActivityOpen} /> */}
        <Switch>
          <Route path="/dashboard/allExpenses" component={AllExpenses} />
          <Route path="/dashboard/groups/:groupID" component={GroupExpense} />
          <Route path="/dashboard/friends/:friendID" component={FriendExpense} />
        </Switch>
      </div>
    </div>
  );
}

export default MiddleBar;
