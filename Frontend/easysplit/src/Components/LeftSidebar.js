import React from "react";
import { useQuery } from "react-query";
import { Link, useRouteMatch } from "react-router-dom";
import { getUserGroups } from "../controllers/apis/group.api";
import { getUserFriends } from "../controllers/apis/friend.api";
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

  const { data: friendList, status: friendStatus } = useQuery(
    ["friendList", userJWT],
    () => getUserFriends(userJWT),
    {
      // The query will not execute until the userJWT exists
      enabled: !!userJWT,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="firstDiv">
      <a href="#" id="dashboard-link" className="fdiv-elem" onClick={() => { props.toggleAllExpenses(false); props.toggleRecentActivity(false) }}>
        Dashboard
      </a>
      <a href="#" id="activity-link" className="fdiv-elem" onClick={() => { props.toggleAllExpenses(false); props.toggleRecentActivity(true) }}>
        Recent Activity
      </a>
      <a href="#" id="expenses-link" className="fdiv-elem" onClick={() => { props.toggleAllExpenses(true); props.toggleRecentActivity(false) }}>
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
        <div id="gf-f-list" className="fdiv-elem">
          {friendStatus === "success" && (
            <>
              <ul>
                {friendList.result.map((friend) => {
                  return <li>{friend}</li>;
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftSideBar;
