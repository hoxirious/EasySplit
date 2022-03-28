import React, { useRef, useEffect } from "react";
import emailLogo from "../Resources/gmail.png";
import close from "../Resources/close.png";
import { createGroup } from "../controllers/apis/group.api";
import { useMutation, useQuery } from "react-query";
import { getUserJWt } from "../controllers/helpers/api.helper";

function AddGroupModal(props) {
  const { data: jwt } = useQuery("jwt", getUserJWt, {
    refetchOnWindowFocus: false,
  });

  const userJWT = jwt;

  const { mutate } = useMutation((data) => createGroup(data, userJWT));

  const modal = useRef();
  const groupName = useRef();


  useEffect(() => {
    if (props.isOpen === true) {
      modal.current.style.display = "flex";
    } else {
      modal.current.style.display = "none";
    }
  }, [props.isOpen]);

  return (
    <div className="modal-background" ref={modal}>
      <div className="modal-content addgroupcontent">
        <img
          src={close}
          onClick={() => {
            props.toggleAddGroupModal(false);
          }}
        />
        <h6>START A NEW GROUP</h6>
        <div className="addGroupform">
          <h6>My group shall be called...</h6>
          <input
            type="text"
            className="form-control"
            id="groupname"
            placeholder="Where money"
            ref={groupName}
          />
          <button
            id="save-group-btn"
            onClick={() => {
              props.toggleAddGroupModal(false);
              mutate(groupName.current.value);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddGroupModal;
