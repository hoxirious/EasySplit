import React from "react";
import { useQuery } from "react-query";
import { Link, NavLink } from "react-router-dom";
import { getUserFriends } from "../controllers/apis/friend.api";
import { getUserGroups } from "../controllers/apis/group.api";
import { getUserJWt } from "../controllers/helpers/api.helper";

function LeftSideBar(props) {
  const { data: jwt } = useQuery("jwt", getUserJWt, {
    refetchOnWindowFocus: false,
  });

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
      <NavLink to="/dashboard" id="dashboard-link" className="fdiv-elem">
        Dashboard
      </NavLink>
      <NavLink to="/dashboard/recent" id="activity-link" className="fdiv-elem">
        Recent Activity
      </NavLink>
      <NavLink
        to="/dashboard/allExpenses"
        id="expenses-link"
        className="fdiv-elem"
      >
        All Expenses
      </NavLink>
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
            <ul>
              {groupList.result.map((group) => {
                return (
                  <li key={group.groupID}>
                    <Link
                      to={`/dashboard/groups/${group.groupID}`}
                      key={group.groupID}
                    >
                      {group.groupName}
                    </Link>
                  </li>
                );
              })}
            </ul>
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
            <ul>
              {friendList.result.map((friend) => {
                return (
                  <li key={friend.friendID}>
                    <Link
                      to={`/dashboard/friends/${friend.friendID}`}
                      key={friend.friendID}
                    >
                      {friend.friendName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftSideBar;
