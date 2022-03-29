import React, { useState } from "react";
import AddExpenseModal from "./AddExpenseModal";
import AddFriendModal from "./AddFriendModal";
import AddGroupModal from "./AddGroupModal";
import LeftSideBar from "./LeftSidebar";
import MiddleBar from "./MiddleBar";
import RightSidebar from "./RightSidebar";
import SettleUpModal from "./SettleUpModal";
import { NavLink } from "react-router-dom";
import { auth } from "../App";
import easysplitlogo from "../Resources/divided.png";

function RouterManager(props) {
  const [addFriend, setAddFriend] = useState(false);
  const [addGroup, setAddGroup] = useState(false);
  const [addExpense, setAddExpense] = useState(false);
  const [settleUp, setSettleUp] = useState(false);
  const [groupID, setGroupID] = useState();
  const [friendID, setFriendID] = useState();
  return (
    <div className="homeScreenDiv">
      <nav
        id="mainNavbar"
        className="navbar navbar-dark bg-dark py-0 px-0 fixed-top flex"
      >
        <a className="nav-left" href="/dashboard">
          <img src={easysplitlogo} alt="easysplitlogo" className="nav-logo" />
          <b>Easy Split</b>
        </a>
        <div className="nav-btns">
          <NavLink
            to="/"
            className="btn btn-success my-2 mr-4 signup-btn"
            onClick={async () => {
              await auth.signOut();
            }}
          >
            Log out
          </NavLink>
        </div>
      </nav>
      <div className="dashBoardDiv">
        <LeftSideBar
          toggleAddFriendModal={setAddFriend}
          toggleAddGroupModal={setAddGroup}
        />
        <MiddleBar
          toggleAddExpenseModal={setAddExpense}
          toggleSettleUpModal={setSettleUp}
          setGroupID={setGroupID}
          setFriendID={setFriendID}
        />
        <RightSidebar setGroupID={setGroupID} setFriendID={setFriendID} />
        <AddFriendModal
          isOpen={addFriend}
          toggleAddFriendModal={setAddFriend}
        />
        <AddGroupModal isOpen={addGroup} toggleAddGroupModal={setAddGroup} />
        <AddExpenseModal
          isOpen={addExpense}
          groupID={groupID}
          friendID={friendID}
          toggleAddExpenseModal={setAddExpense}
          setGroupID={setGroupID}
          setFriendID={setFriendID}
        />
        <SettleUpModal isOpen={settleUp} toggleSettleUpModal={setSettleUp} />
      </div>
    </div>
  );
}

export default RouterManager;
