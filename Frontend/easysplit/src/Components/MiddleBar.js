import { React, useEffect, useRef } from "react";
import { Route, Switch } from "react-router-dom";
import AllExpenses from "./AllExpenses";
import RecentActivity from "./RecentActivity";
import GroupExpense from "./GroupExpense";

function MiddleBar(props) {
  const heading = useRef();
  const topbar = useRef();

  useEffect(() => {
    if (props.isAllExpensesOpen) {
      heading.current.style.display = "none";
    } else {
      heading.current.style.display = "block";
    }
  }, [props.isAllExpensesOpen]);

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
            onClick={() => props.toggleAddExpense(true)}
          >
            Add an expense
          </button>
          <button id="settleup-btn">Settle up</button>
        </div>
      </div>
      <div className="all-expenses">
        <h1 style={{ color: "black", margin: 30 }} ref={heading}>
          You have not added any expenses yet
        </h1>
        <AllExpenses isOpen={props.isAllExpensesOpen} />
        <RecentActivity isOpen={props.isRecentActivityOpen} />
        <Switch>
          <Route path="/dashboard/allExpenses" component={AllExpenses} />
          <Route path="/dashboard/groups/:groupID" component={GroupExpense} />
        </Switch>
      </div>
    </div>
  );
}

export default MiddleBar;
