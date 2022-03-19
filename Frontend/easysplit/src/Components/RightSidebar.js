import React from "react"
function RightSidebar() {
    return (

        <div className="thirdDiv">
            <h2 style={{ color: "black", marginTop: 10, marginLeft: 30 }}>Your Total Balance</h2>
            <div style={{ color: "black", margin: 30 }}>
                {/* Total balance will be added to the innerHtml of this div */}
                You are all settled up
            </div>
        </div>
    )
}

export default RightSidebar