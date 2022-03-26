import { React, useEffect, useRef } from "react";
import { Route, Switch } from "react-router-dom";
import AllExpenses from "./AllExpenses";
import GroupExpense from "./GroupExpense";

function MiddleBar(props) {
  const heading = useRef();


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
        <h1 style={{ color: "black", margin: 30 }} ref={heading}>
          You have not added any expenses yet
        </h1>
        {/* <AllExpenses isOpen={props.isAllExpensesOpen} /> */}
        <Switch>
          <Route path="/dashboard/allExpenses" component={AllExpenses} />
          <Route path="/dashboard/groups/:groupID" component={GroupExpense} />
        </Switch>
      </div>
    </div>
  );
}

export default MiddleBar;
