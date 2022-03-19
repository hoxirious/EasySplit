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
                <a href="#">Add friends with email address</a>
            </div>
        </div>
    )
}

export default AddFriendModal