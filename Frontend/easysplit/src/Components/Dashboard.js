export default function Dashboard(props) {
  return (
    <div className="all-expenses-div">
      <div id="#center-topbar" className="topbar-group">
        <h1 id="expenses-header">Dashboard</h1>
        <div id="#topbar-actions" className="topbar-actions-group">
          <button
            id="add-expense-btn"
            onClick={() => props.toggleAddExpenseModal(true)}
          >
            Add an expense
          </button>
          <button
            id="settleup-btn"
            onClick={() => props.toggleSettleUpModal(true)}
          >
            Settle up
          </button>
        </div>
      </div>

      <div className="balance-details-div">
          <div id="total-balance">
            <p>
              <b>Total Balance</b>
            </p>
            <span>$40</span>
          </div>
          <div id="you-owe">
            <p>
              <b>You Owe</b>
            </p>
            <span>$20</span>
          </div>
          <div id="owed-to-you">
            <p>
              <b>You Are Owed</b>
            </p>
            <span>$60</span>
          </div>
        </div>
    </div>
  );
}
