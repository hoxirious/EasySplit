import React, { useRef, useEffect, useState } from "react"

function AllExpenses(props) {

    const allExpensesDiv = useRef();

    function populateAllExpenses() {

        let demoExpenses = [{
            date: 'MAR 26',
            description: 'Movies',
            youPaid: 40,
            youLent: {
                lentTo: `Monty`,
                lentAmount: 20
            }
        },
        {
            date: 'MAR 26',
            description: 'Games',
            youPaid: 80,
            youLent: {
                lentTo: `Joe`,
                lentAmount: 40
            }
        },
        {
            date: 'MAR 28',
            description: 'Cocaine',
            youPaid: 80,
            youLent: {
                lentTo: `McLovin`,
                lentAmount: 40
            }
        }
        ]

        let allExpenses = demoExpenses.map(expense => `<li style="display:flex; flex-direction: row; border-bottom: 1px solid #b3b1b3; justify-content: space-between; padding-bottom: 0.5em; padding-top: 0.5em"> 
                                                           <div style="display:flex, flex-direction: row; margin-left: 1em">
                                                                <span style='color: #2bbbad; font-weight: 500'>${expense.date}</span> 
                                                                <span style='font-weight: 500; color: "black"'>&nbsp&nbsp${expense.description}</span>
                                                           </div>
                                                            
                                                           <div style="display:flex; flex-direction: row">
                                                                <div style="display:flex; flex-direction: column; margin-right: 1em">
                                                                    <h6>You paid</h6>
                                                                    <span>$${expense.youPaid}</span>
                                                                </div>
                                                                <div style="display:flex; flex-direction: column; margin-right: 1em; width: 8em">
                                                                    <h6>You lent ${expense.youLent.lentTo}</h6>
                                                                    <span>$${expense.youLent.lentAmount}</span>
                                                                </div>
                                                           </div>
                                                        </li>`).join('');
        allExpensesDiv.current.innerHTML = `<ul style="list-style-type:none;margin:0;padding:0; padding-inline-start: 0px">
        ${allExpenses}
        </ul>`
    }

    useEffect(() => {
        if (props.isOpen === true) {
            allExpensesDiv.current.style.display = 'block'
            populateAllExpenses();
        }
        else {
            allExpensesDiv.current.style.display = 'none'
            console.log("should be hidden")
        }
    }, [props.isOpen]);

    return (

        <div className="all-expenses-div" ref={allExpensesDiv} ></div>
    )
}

export default AllExpenses