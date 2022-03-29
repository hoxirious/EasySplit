import React from "react";

function FriendsSideBarExpense(props) {
    let balance = -400;
    let name = 'Nick'
    return (
        <div className="">
            <p style={{ fontSize: '1.5em' }}>
                <b>{balance > 0 ? `You owe ${name}` : `${name} owes You`}</b>
                <p>
                    <b>
                        {balance > 0 ? <span style={{ color: '#e65c2a' }}>${balance}</span> : <span style={{ color: '#2bbbad' }}>${balance * (-1)}</span>}
                    </b>
                </p>
            </p>
        </div>
    );
}

export default FriendsSideBarExpense;
