import React, { useState } from "react";
import AddExpenseModal from "./AddExpenseModal";
import AddFriendModal from "./AddFriendModal";
import AddGroupModal from "./AddGroupModal";
import LeftSideBar from "./LeftSidebar";
import MiddleBar from "./MiddleBar";
import RightSidebar from "./RightSidebar";
import SettleUpModal from "./SettleUpModal";

function RouterManager(props) {
  const [addFriend, setAddFriend] = useState(false);
  const [addGroup, setAddGroup] = useState(false);
  const [addExpense, setAddExpense] = useState(false);
  const [settleUp, setSettleUp] = useState(false);
  const [currentlyOn, setCurrentlyOn] = useState("Dashboard");
  return (
    <div className="homeScreenDiv">
      <nav
        id="mainNavbar"
        className="navbar navbar-dark bg-dark py-0 px-0 fixed-top d-flex"
      >
        <div className="nav-btns">
          <button className="btn btn-success my-2 mx-2 signup-btn">
            Your Account
          </button>
        </div>
      </nav>
      <div className="dashBoardDiv">
        <LeftSideBar
          toggleAddFriendModal={setAddFriend}
          toggleAddGroupModal={setAddGroup}
          changeCurrentlyOn={setCurrentlyOn}
        />
        <MiddleBar
          toggleAddExpenseModal={setAddExpense}
          toggleSettleUpModal={setSettleUp}
          currentlyOn={currentlyOn}
        />
        <RightSidebar />
        <AddFriendModal
          isOpen={addFriend}
          toggleAddFriendModal={setAddFriend}
        />
        <AddGroupModal isOpen={addGroup} toggleAddGroupModal={setAddGroup} />
        <AddExpenseModal
          isOpen={addExpense}
          toggleAddExpenseModal={setAddExpense}
        />
        <SettleUpModal isOpen={settleUp} toggleSettleUpModal={setSettleUp} />
      </div>
    </div>
  );
}

export default RouterManager;
