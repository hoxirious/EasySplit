import React, { useRef, useEffect, useState } from "react"

function RecentActivity(props) {

    const recentActivityDiv = useRef();

    function populateRecentActivity() {
        let demoEvents = [{
            eventID: "aef123deh",
            eventType: "ExpenseCreate",
            eventContent: {
                expenseID: "qwe345def",
                groupReference: "Game Night",
                description: "Games",
                timestamp: "MAR 26",
                totalExpense: 50,
                splitDetail: [
                    {
                        userID: "someone@example.com",
                        paidAmount: 100,
                        lentAmount: 50
                    },
                    {
                        userID: "rick@morty.com",
                        paidAmount: 50,
                        lentAmount: 25
                    }
                ],
                expenseState: "ACTIVE"
            },
            timestamp: "MAR 26"
        },
        {
            eventID: "abc123def",
            eventType: "GroupCreate",
            eventContent: {
                groupID: "def34af",
                groupName: "Where Money",
                memberList: ["Joe", "Rick"],
                expenseList: [""]
            },
            timestamp: "MAR 26"
        }
        ]

        let recentActivity = demoEvents.map((event) => {
            if (["ExpenseDelete", "ExpenseCreate", "ExpenseUpdate", "ExpenseUndelete"].includes(event.eventType)) {
                let eventStatus = ""
                switch (event.eventType) {
                    case "ExpenseDelete":
                        eventStatus = "deleted";
                        break;
                    case "ExpenseCreate":
                        eventStatus = "created";
                        break;
                    case "ExpenseUpdate":
                        eventStatus = "updated";
                        break;
                    case "ExpenseUndelete":
                        eventStatus = "undeleted";
                        break;
                }

                return (
                    `<li style="padding: 0.5em 0 0.5em 0.5em; border-bottom: 1px solid #b3b1b3">
                    <span style="color: #2bbbad"><b>${event.timestamp}</b></span>
                    <span><b>&nbspYou</b> ${eventStatus} <b>${event.eventContent.description}</b>${event.eventContent.groupReference ? " in" + ` <b>${event.eventContent.groupReference}</b>` : ""}</span>    
                    </li>`
                );
            }
            else if (["GroupDelete", "GroupCreate", "GroupUpdate", "GroupUndelete"].includes(event.eventType)) {
                let eventStatus = ""
                switch (event.eventType) {
                    case "GroupDelete":
                        eventStatus = "deleted";
                        break;
                    case "GroupCreate":
                        eventStatus = "created";
                        break;
                    case "GroupUpdate":
                        eventStatus = "updated";
                        break;
                    case "GroupUndelete":
                        eventStatus = "undeleted";
                        break;
                }
                return (
                    `<li style="padding: 0.5em 0 0.5em 0.5em; border-bottom: 1px solid #b3b1b3">
                        <span style="color: #2bbbad"><b>${event.timestamp}</b></span>
                        <span><b>&nbspYou</b> ${eventStatus} the group <b>${event.eventContent.groupName}</b></span>    
                    </li>`
                );
            }
        }).join('');

        recentActivityDiv.current.innerHTML =
            `
        <h2 id="recent-activity-header">Recent Activity</h2>
        <ul style="list-style-type:none;margin:0;padding:0; padding-inline-start: 0px">
        ${recentActivity}
        </ul>
        `
    }

    useEffect(() => {
        if (props.isOpen === true) {
            recentActivityDiv.current.style.display = 'block'
            populateRecentActivity();
        }
        else {
            recentActivityDiv.current.style.display = 'none'
            console.log("should be hidden")
        }
    }, [props.isOpen]);

    return (
        <div className="recent-activity-div" ref={recentActivityDiv}></div>
    )
}

export default RecentActivity