import React, { useState } from "react";

function GroupExpensesList(props) {

    const [groupMembers, setGroupMembers] = useState([
        {
            name: 'Nick',
            balance: 40
        },
        {
            name: 'Sarah',
            balance: -80
        }
    ])

    let listItems = []

    for (let i = 0; i < groupMembers.length; i++) {
        listItems.push(
            <li>
                <div className="">
                    <p style={{ fontSize: '1.1em' }}>
                        <b>{groupMembers[i].balance > 0 ? `${groupMembers[i].name} ows` : `${groupMembers[i].name} gets back`}</b>
                        <p>
                            <b>
                                {groupMembers[i].balance > 0 ? <span style={{ color: '#e65c2a' }}>${groupMembers[i].balance}</span> : <span style={{ color: '#2bbbad' }}>${groupMembers[i].balance * (-1)}</span>}
                            </b>
                        </p>
                    </p>
                </div>
            </li>
        )
    }

    return (
        <ul id="group-expenses-list">
            {listItems}
        </ul>
    );
}

export default GroupExpensesList;