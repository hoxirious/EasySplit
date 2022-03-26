import React from "react";
import { useQuery } from "react-query";
import { Link, useRouteMatch } from "react-router-dom";
import { getUserGroups } from "../controllers/apis/group.api";
import { getUserJWt } from "../controllers/helpers/api.helper";

function LeftSideBar(props) {
  const { data: jwt } = useQuery("jwt", getUserJWt, {
    refetchOnWindowFocus: false,
  });

  const { path, url } = useRouteMatch();

  const userJWT = jwt;
  const { data: groupList, status: groupStatus } = useQuery(
    ["groupList", userJWT],
    () => getUserGroups(userJWT),
    {
      // The query will not execute until the userJWT exists
      enabled: !!userJWT,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="firstDiv">
      <a href="#" id="dashboard-link" className="fdiv-elem" onClick={() => props.toggleAllExpenses(false)}>
        Dashboard
      </a>
      <a href="#" id="activity-link" className="fdiv-elem" onClick={() => props.toggleAllExpenses(false)}>
        Recent Activity
      </a>
      <a href="#" id="expenses-link" className="fdiv-elem" onClick={() => props.toggleAllExpenses(true)}>
        All Expenses
      </a>
      <div id="group-friends-div">
        <div id="gf-g-header" className="fdiv-elem">
          Groups
          <a
            href="#"
            className="fdiv-elem"
            onClick={() => props.toggleAddGroupModal(true)}
          >
            + Add
          </a>
        </div>
        <div id="gf-g-list" className="fdiv-elem">
          {groupStatus === "success" && (
            <>
              {groupList.result.map((group) => {
                return (
                  <Link to={`/dashboard/${group.groupID}`} key={group.groupID}>
                    {group.groupName}
                  </Link>
                );
              })}
            </>
          )}
        </div>
        <div id="gf-f-header" className="fdiv-elem">
          Friends
          <a
            href="#"
            className="fdiv-elem"
            onClick={() => props.toggleAddFriendModal(true)}
          >
            + Add
          </a>
        </div>
        <ul className="friends-list">
          <li>Friend 1</li>
          <li>Friend 2</li>
          <li>Friend 3</li>
          <li>Friend 4</li>
        </ul>
        <div id="gf-f-list" className="fdiv-elem"></div>
      </div>
    </div>
  );
}

export default LeftSideBar;
