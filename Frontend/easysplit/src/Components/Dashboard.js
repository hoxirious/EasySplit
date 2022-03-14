import React from "react"

function Dashboard(props) {

    const firstDiv = <div className="firstDiv">
        <a href="#" id="dashboard-link" className="fdiv-elem">Dashboard</a>
        <a href="#" id="activity-link" className="fdiv-elem">Recent Activity</a>
        <a href="#" id="expenses-link" className="fdiv-elem">All Expenses</a>
        <div id="group-friends-div">
            <div id="gf-g-header" className="fdiv-elem">Groups<a href="#" className="fdiv-elem">Add</a></div>
            <div id="gf-g-list" className="fdiv-elem">
                {/* Groups list will be added to innerHtml of this div*/}
            </div>
            <div id="gf-f-header" className="fdiv-elem">Friends<a href="#" className="fdiv-elem">Add</a></div>
            {/* Friends list will be added to innerHtml of this div*/}
            <div id="gf-f-list" className="fdiv-elem"></div>
        </div>
    </div>
    const centerDiv = <div className="centerDiv">
        <div id="#center-topbar" className="topbar-group">
            <h1 id="expenses-header">All Expenses</h1>
            <div id="#topbar-actions" className="topbar-actions-group">
                <button id="add-expense-btn">Add an expense</button>
                <button id="settleup-btn">Settle up</button>
            </div>
        </div>
        <div className="all-expenses">
            <h1 style={{ color: "black", margin: 30 }}>You have not added any expenses yet</h1>
            {/* Expenses list will be added to the innerHtml of this div*/}
        </div>
    </div>
    const thirdDiv = <div className="thirdDiv">
        <h2 style={{ color: "black", marginTop: 10, marginLeft: 30 }}>Your Total Balance</h2>
        <div style={{ color: "black", margin: 30 }}>
            {/* Total balance will be added to the innerHtml of this div */}
            You are all settled up
        </div>
    </div>
    return (
        <div className="homeScreenDiv">
            <nav id="mainNavbar" className="navbar navbar-dark bg-dark py-0 px-0 fixed-top d-flex">
                <div className="nav-btns">
                    <button className="btn btn-success my-2 mx-2 signup-btn">Your Account</button>
                </div>
            </nav>
            <div className="dashBoardDiv">
                {firstDiv}
                {centerDiv}
                {thirdDiv}
            </div>
        </div>

    )
}

export default Dashboard