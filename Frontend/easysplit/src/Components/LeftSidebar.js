import React, { useRef, useState } from "react"
import AddFriendModal from "./AddFriendModal"

function LeftSideBar(props) {
    return (
        <div className="firstDiv">
            <a href="#" id="dashboard-link" className="fdiv-elem" onClick={() => props.toggleAllExpenses(false)}>Dashboard</a>
            <a href="#" id="activity-link" className="fdiv-elem" onClick={() => props.toggleAllExpenses(false)}>Recent Activity</a>
            <a href="#" id="expenses-link" className="fdiv-elem" onClick={() => props.toggleAllExpenses(true)}>All Expenses</a>
            <div id="group-friends-div">
                <div id="gf-g-header" className="fdiv-elem">Groups<a href="#" className="fdiv-elem" onClick={() => props.toggleAddGroupModal(true)}>+ Add</a></div>
                <div id="gf-g-list" className="fdiv-elem">
                    <ul className="groups-list">
                        <li>Group 1</li>
                        <li>Group 2</li>
                        <li>Group 3</li>
                        <li>Group 4</li>
                    </ul>
                </div>
                <div id="gf-f-header" className="fdiv-elem">Friends<a href="#" className="fdiv-elem" onClick={() => props.toggleAddFriendModal(true)}>+ Add</a></div>
                <ul className="friends-list">
                    <li>Friend 1</li>
                    <li>Friend 2</li>
                    <li>Friend 3</li>
                    <li>Friend 4</li>
                </ul>
                <div id="gf-f-list" className="fdiv-elem"></div>
            </div>
        </div>
    )
}

export default LeftSideBar