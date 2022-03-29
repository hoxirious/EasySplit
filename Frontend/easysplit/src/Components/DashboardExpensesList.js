import React, { useState, useRef, useEffect } from "react";
import close from "../Resources/close.png"

function DashboardExpensesList(props) {

    const [youOweList, setYouOweList] = useState([{
        name: "Rick",
        amount: 10
    },
    {
        name: "Jonah",
        amount: 10
    },
    ]);


    const [OwedToYouList, setOwedToYouList] = useState([
        {
            name: "Sarah",
            amount: 40
        }, {
            name: "Chris",
            amount: 20
        }
    ]);

    let youOweListItems = [];
    let OwedToYouListItems = [];


    for (let i = 0; i < youOweList.length; i++) {
        youOweListItems.push(
            <li>
                <span>{youOweList[i].name}</span>
                <span style={{ color: '#e65c2a', paddingLeft: '1em' }}>{"$" + youOweList[i].amount}</span>
            </li>
        );
    }

    for (let i = 0; i < OwedToYouList.length; i++) {
        OwedToYouListItems.push(
            <li>
                <span>{OwedToYouList[i].name}</span>
                <span style={{ color: '#54b499', paddingLeft: '1em' }}>{"$" + OwedToYouList[i].amount}</span>
            </li>
        );
    }

    return (
        <div className="dashboard-expenses-div">
            <div className="dashboard-expenses-heading">
                <span><b>You Owe</b></span>
                <span><b>You Are Owed</b></span>
            </div>
            <div className="dashboard-expenses-lists">
                <ul id="you-owe-list">
                    {youOweListItems}
                </ul>
                <ul id="you-are-owed-list">
                    {OwedToYouListItems}
                </ul>
            </div>
        </div>
    );
}
export default DashboardExpensesList;
