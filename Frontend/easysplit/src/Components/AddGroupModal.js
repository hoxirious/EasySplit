import React, { useRef, useEffect } from "react"
import emailLogo from "../Resources/gmail.png"
import close from "../Resources/close.png"
function AddGroupModal(props) {

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
            <div className="modal-content addgroupcontent">
                <img src={close} onClick={() => { props.toggleAddGroupModal(false) }} />
                <h6>START A NEW GROUP</h6>
                <form className="addGroupform">
                    <h6>My group shall be called...</h6>
                    <input type="text"
                        className="form-control"
                        id="groupname"
                        placeholder="Where money" />
                    <button id="save-group-btn" onClick={() => { props.toggleAddGroupModal(false) }}>Save</button>
                </form>
            </div>
        </div>
    )
}

export default AddGroupModal