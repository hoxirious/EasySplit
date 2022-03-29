import { useQuery } from "react-query";
import { getUserByID, getUser } from "../controllers/apis/user.api";
import { getUserJWt } from "../controllers/helpers/api.helper";

export default function Activity(props) {
  const { data: jwt } = useQuery("jwt", getUserJWt, {});
  const { data: creatorInfo, status: creatorInfoStatus } = useQuery(
    ["creatorInfo", props.eventCreator],
    () => getUserByID(props.eventCreator),
    { enabled: !!props }
  );
  const userJWT = jwt;
  const { data: userInfo, status: userInfoStatus } = useQuery(
    ["userInfo", userJWT],
    () => getUser(userJWT),
    {
      // The query will not execute until the userJWT exists
      enabled: !!userJWT,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      {creatorInfoStatus === "success" && userInfoStatus === "success" && (
        <>
          {props.eventType === "Expense" && (
            <li
              style={{
                border: "1px solid #b3b1b3",
                justifyContent: "space-around",
                paddingBottom: 0.5 + "em",
                paddingLeft: 0.5 + "em",
                paddingTop: 0.5 + "em",
                height: "3em",
              }}
            >
              <span style={{ color: "#2bbbad" }}>
                <b>{props.eventContent.timestamp}</b>
              </span>
              <span>
                <b>
                  {" "}
                  {creatorInfo.result.name === userInfo.result.name
                    ? "You"
                    : creatorInfo.result.name}{" "}
                </b>{" "}
                {props.actionType}
                <b> {props.eventContent.description} </b>
                expense
              </span>
            </li>
          )}

          {props.eventType === "Group" && (
            <li
              key={props.eventContent.eventID}
              style={{
                border: "1px solid #b3b1b3",
                justifyContent: "space-around",
                paddingBottom: 0.5 + "em",
                paddingLeft: 0.5 + "em",
                paddingTop: 0.5 + "em",
                height: "3em",
              }}
            >
              <span style={{ color: "#2bbbad" }}>
                <b>{props.eventContent.timestamp}</b>
              </span>
              <span>
                <b>
                  {creatorInfo.result.name === userInfo.result.name
                    ? "You"
                    : creatorInfo.result.name}
                </b>{" "}
                {props.actionType} the group
                <b> {props.eventContent.groupName}</b>
              </span>
            </li>
          )}
        </>
      )}
    </>
  );
}
