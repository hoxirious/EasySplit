import React, { useRef, useEffect, useState } from "react";
import Activity from "./Activity";
let demoEvents = [
  {
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
          lentAmount: 50,
        },
        {
          userID: "rick@morty.com",
          paidAmount: 50,
          lentAmount: 25,
        },
      ],
      expenseState: "ACTIVE",
    },
    timestamp: "MAR 26",
  },
  {
    eventID: "abc123def",
    eventType: "GroupCreate",
    eventContent: {
      groupID: "def34af",
      groupName: "Where Money",
      memberList: ["Joe", "Rick"],
      expenseList: [""],
    },
    timestamp: "MAR 26",
  },
];
function RecentActivity(props) {
  function populateEvent(eventType) {
    if (
      [
        "ExpenseDelete",
        "ExpenseCreate",
        "ExpenseUpdate",
        "ExpenseUndelete",
      ].includes(eventType)
    ) {
      switch (eventType) {
        case "ExpenseDelete":
          return {
            eventType: "Expense",
            actionType: "deleted",
          };
        case "ExpenseCreate":
          return {
            eventType: "Expense",
            actionType: "created",
          };
        case "ExpenseUpdate":
          return {
            eventType: "Expense",
            actionType: "updated",
          };
        case "ExpenseUndelete":
          return {
            eventType: "Expense",
            actionType: "undeleted",
          };
      }
    } else if (
      ["GroupDelete", "GroupCreate", "GroupUpdate", "GroupUndelete"].includes(
        eventType
      )
    ) {
      switch (eventType) {
        case "GroupDelete":
          return {
            eventType: "Group",
            actionType: "deleted",
          };
        case "GroupCreate":
          return {
            eventType: "Group",
            actionType: "created",
          };
        case "GroupUpdate":
          return {
            eventType: "Group",
            actionType: "updated",
          };
        case "GroupUndelete":
          return {
            eventType: "Group",
            actionType: "undeleted",
          };
      }
    }
  }

  return (
    <div className="recent-activity-div">
      <h2 id="recent-activity-header">Recent Activity</h2>
      <ul
        style={{
          listStyleType: "none",
          margin: 0,
          padding: 0,
          paddingInlineStart: 0,
        }}
      >
        {demoEvents.map((event) => {
          return (
            <Activity
              key={event.eventID}
              actionType={populateEvent(event.eventType).actionType}
              eventType={populateEvent(event.eventType).eventType}
              eventContent={event.eventContent}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default RecentActivity;
