import React, { useState, useEffect, useRef } from "react"
import LeftSideBar from "./LeftSidebar"
import RightSidebar from "./RightSidebar"
import MiddleBar from "./MiddleBar"
import AddFriendModal from "./AddFriendModal"
import AddGroupModal from "./AddGroupModal"
import AddExpenseModal from "./AddExpenseModal"

function Dashboard(props) {
    const [addFriend, setAddFriend] = useState(false);
    const [addGroup, setAddGroup] = useState(false);
    const [addExpense, setAddExpense] = useState(false);
    return (
        <div className="homeScreenDiv">
            <nav id="mainNavbar" className="navbar navbar-dark bg-dark py-0 px-0 fixed-top d-flex">
                <div className="nav-btns">
                    <button className="btn btn-success my-2 mx-2 signup-btn">Your Account</button>
                </div>
            </nav>
            <div className="dashBoardDiv">
                <LeftSideBar toggleAddFriendModal={setAddFriend} toggleAddGroupModal={setAddGroup} />
                <MiddleBar toggleAddExpense={setAddExpense} />
                <RightSidebar />
                <AddFriendModal isOpen={addFriend} toggleAddFriendModal={setAddFriend} />
                <AddGroupModal isOpen={addGroup} toggleAddGroupModal={setAddGroup} />
                <AddExpenseModal isOpen={addExpense} toggleAddExpenseModal={setAddExpense} />
            </div>
        </div>

    )
}

export default Dashboard