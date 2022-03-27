import { useEffect, useState } from "react";

export default function Activity(props) {
  return (
    <>
      {props.eventType == "Expense" && (
        <li
          style={{
            border: "1px solid #b3b1b3",
            justifyContent: "space-around",
            paddingBottom: 0.5 + "em",
            paddingLeft: 0.5 + "em",
            paddingTop: 0.5 + "em",
          }}
        >
          <span style={{ color: "#2bbbad" }}>
            <b>{props.eventContent.timestamp}</b>
          </span>
          <span>
            <b> You </b> {props.actionType}
            <b> {props.eventContent.description} </b>
            in {props.eventContent.groupReference ?? ""}
          </span>
        </li>
      )}

      {props.eventType == "Group" && (
        <li
          style={{
            border: "1px solid #b3b1b3",
            justifyContent: "space-around",
            paddingBottom: 0.5 + "em",
            paddingLeft: 0.5 + "em",
            paddingTop: 0.5 + "em",
          }}
        >
          <span style={{ color: "#2bbbad" }}>
            <b>{props.eventContent.timestamp}</b>
          </span>
          <span>
            <b>You</b> {props.actionType} the group
            <b> {props.eventContent.groupName}</b>
          </span>
        </li>
      )}
    </>
  );
}
