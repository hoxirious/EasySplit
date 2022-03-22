import React, { useRef, useEffect } from "react"
import emailLogo from "../Resources/gmail.png"
import close from "../Resources/close.png"
function AddFriendModal(props) {

    const modal = useRef();

    useEffect(() => {
        if (props.isOpen === true) {
            modal.current.style.display = 'flex'
        }
        else {
            modal.current.style.display = 'none'
        }
    }, [props.isOpen]);

    return (

        <div className="modal-background" ref={modal} >
            <div className="modal-content">
                <img src={close} onClick={() => { props.toggleAddFriendModal(false) }} />
                <img src={emailLogo} />
                <h6>Add friends</h6>
                <form className="addFriendform">
                    <input type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your friend's email address" />
                    <button id="add-friend-btn" onClick={() => { props.toggleAddFriendModal(false) }}>Add Friend</button>
                </form>
            </div>
        </div>
    )
}

export default AddFriendModal