import React from "react"
import GroupExpensesList from "./GroupExpensesList"
function RightSidebar() {
    return (

        <div className="thirdDiv">
            <h2 style={{ color: "black", marginTop: 10, marginLeft: 30 }}>Your Total Balance</h2>
            <div style={{ color: "black", margin: 30 }}>
                <GroupExpensesList />
            </div>
        </div>
    )
}

export default RightSidebar