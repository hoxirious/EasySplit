import React from "react";
import { useQuery } from "react-query";
import { getUserEvents } from "../controllers/apis/user.api";
import { getUserJWt } from "../controllers/helpers/api.helper";
import Activity from "./Activity";
function RecentActivity(props) {
  const { data: jwt } = useQuery("jwt", getUserJWt, {});
  const userJWT = jwt;
  const { data: allEvents, status: allEventsStatus } = useQuery(
    ["allEvents", userJWT],
    () => getUserEvents(userJWT),
    {
      // The query will not execute until the userJWT exists
      enabled: !!userJWT,
      refetchOnWindowFocus: false,
      select: (allEvents) => allEvents.result,
    }
  );

  function populateEvent(eventType) {
    if (
      [
        "EXPENSE_DELETE",
        "EXPENSE_CREATE",
        "EXPENSE_UPDATED",
        "EXPENSE_UNDELETE",
      ].includes(eventType)
    ) {
      switch (eventType) {
        case "EXPENSE_DELETE":
          return {
            eventType: "Expense",
            actionType: "deleted",
          };
        case "EXPENSE_CREATE":
          return {
            eventType: "Expense",
            actionType: "created",
          };
        case "EXPENSE_UPDATED":
          return {
            eventType: "Expense",
            actionType: "updated",
          };
        case "EXPENSE_UNDELETE":
          return {
            eventType: "Expense",
            actionType: "undeleted",
          };
      }
    } else if (
      [
        "GROUP_DELETE",
        "GROUP_CREATE",
        "GROUP_UPDATE",
        "GROUP_UNDELETE",
      ].includes(eventType)
    ) {
      switch (eventType) {
        case "GROUP_DELETE":
          return {
            eventType: "Group",
            actionType: "deleted",
          };
        case "GROUP_CREATE":
          return {
            eventType: "Group",
            actionType: "created",
          };
        case "GROUP_UPDATE":
          return {
            eventType: "Group",
            actionType: "updated",
          };
        case "GROUP_UNDELETE":
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
      {allEventsStatus === "success" && allEvents !== undefined && (
        <ul
          style={{
            listStyleType: "none",
            margin: 0,
            padding: 0,
            paddingInlineStart: 0,
          }}
        >
          {allEvents.eventList.map((event) => {
            return (
              <Activity
                key={event.eventID}
                eventCreator={event.eventCreator}
                actionType={populateEvent(event.eventType).actionType}
                eventType={populateEvent(event.eventType).eventType}
                eventContent={event.eventContent}
              />
            );
          })}
        </ul>
      )}

      {allEventsStatus === "success" && allEvents.eventList.length === 0 && (
        <h3 style={{ color: "black", margin: 30 }}>
          You have not added any activity
        </h3>
      )}
    </div>
  );
}

export default RecentActivity;
