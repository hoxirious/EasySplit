import { React, useEffect, useRef } from "react"
import easysplitlogo from '../Resources/divided.png'
import AllExpenses from "./AllExpenses"

function MiddleBar(props) {

    const heading = useRef();

    useEffect(() => {
        if (props.isAllExpensesOpen) {
            heading.current.style.display = 'none';
        }
        else {
            heading.current.style.display = 'block';
        }
    }, [props.isAllExpensesOpen]);

    return (

        <div className="centerDiv">
            <div id="#center-topbar" className="topbar-group">
                <h1 id="expenses-header">All Expenses</h1>
                <div id="#topbar-actions" className="topbar-actions-group">
                    <button id="add-expense-btn" onClick={() => props.toggleAddExpense(true)}>Add an expense</button>
                    <button id="settleup-btn">Settle up</button>
                </div>
            </div>
            <div className="all-expenses">
                <h1 style={{ color: "black", margin: 30 }} ref={heading}>You have not added any expenses yet</h1>
                <AllExpenses isOpen={props.isAllExpensesOpen} />
            </div>

        </div>
    )
}

export default MiddleBar