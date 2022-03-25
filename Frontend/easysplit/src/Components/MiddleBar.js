import React from "react"
import easysplitlogo from '../Resources/divided.png'
function MiddleBar(props) {
    return (

        <div className="centerDiv">
            <div id="#center-topbar" className="topbar-group">
                <h1 id="expenses-header">All Expenses</h1>
                <div id="#topbar-actions" className="topbar-actions-group">
                    <button id="add-expense-btn" onClick={() => props.toggleAddExpense(true)}>Add an expense</button>
                    <button id="settleup-btn">Settle up</button>
                </div>
            </div>
            <div className="all-expenses">
                <h1 style={{ color: "black", margin: 30 }}>You have not added any expenses yet</h1>
                {/* Expenses list will be added to the innerHtml of this div*/}
            </div>
        </div>
    )
}

export default MiddleBar