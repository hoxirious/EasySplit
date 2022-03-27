import React from "react";

function AllExpenses(props) {
  const demoExpenses = [
    {
      date: "MAR 26",
      description: "Movies",
      youPaid: 40,
      youLent: {
        lentTo: `Monty`,
        lentAmount: 20,
      },
    },
    {
      date: "MAR 26",
      description: "Games",
      youPaid: 80,
      youLent: {
        lentTo: `Joe`,
        lentAmount: 40,
      },
    },
    {
      date: "MAR 28",
      description: "Cocaine",
      youPaid: 80,
      youLent: {
        lentTo: `McLovin`,
        lentAmount: 40,
      },
    },
  ];
  return (
    <div className="all-expenses-div">
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
      <ul
        style={{
          listStyleType: "none",
          margin: 0,
          padding: 0,
          paddingInlineStart: 0,
        }}
      >
        {demoExpenses.map((expense) => {
          return (
            <li
              key={expense.description}
              style={{
                display: "flex",
                flexDirection: "row",
                border: "1px solid #b3b1b3",
                justifyContent: "space-around",
                height: "4em",
                paddingBottom: "0.5em",
                paddingTop: "0.5em",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginLeft: "1em",
                  width: "8em",
                }}
              >
                <span style={{ color: "#2bbbad", fontWeight: "500" }}>
                  {expense.date}
                </span>
                <span style={{ color: "black", fontWeight: "500" }}>
                  {expense.description}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginLeft: "1em",
                  width: "15em",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "1em",
                  }}
                >
                  <p style={{ margin: 0 }}>You paid </p>
                  <span>${expense.youPaid}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "1em",
                  }}
                >
                  <p style={{ margin: 0 }}>You lent {expense.youLent.lentTo}</p>
                  <span>${expense.youLent.lentAmount}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default AllExpenses;
