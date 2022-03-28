import React, { useRef, useEffect } from "react";
import emailLogo from "../Resources/gmail.png";
import close from "../Resources/close.png";
import { addFriend } from "../controllers/apis/friend.api";
import { useMutation, useQuery } from "react-query";
import { getUserJWt } from "../controllers/helpers/api.helper";

function AddFriendModal(props) {
  const { data: jwt } = useQuery("jwt", getUserJWt, {
    refetchOnWindowFocus: false,
  });

  const userJWT = jwt;

  const { mutate } = useMutation((data) => addFriend(data, userJWT));

  const modal = useRef();
  const email = useRef();

  useEffect(() => {
    if (props.isOpen === true) {
      modal.current.style.display = "flex";
    } else {
      modal.current.style.display = "none";
    }
  }, [props.isOpen]);

  return (
    <div className="modal-background" ref={modal}>
      <div className="modal-content">
        <img
          src={close}
          onClick={() => {
            props.toggleAddFriendModal(false);
          }}
        />
        <img src={emailLogo} />
        <h6>Add friends</h6>
        <div className="addFriendform">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your friend's email address"
            ref={email}
          />
          <button
            id="add-friend-btn"
            onClick={() => {
              props.toggleAddFriendModal(false);
              mutate(email.current.value);
            }}
          >
            Add Friend
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddFriendModal;
