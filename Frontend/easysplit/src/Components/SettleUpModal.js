import React, { useRef, useEffect, useState } from "react"
import close from "../Resources/close.png"
import swap from "../Resources/swap.png"
function SettleUpModal(props) {

    const modal = useRef();
    const span = useRef();
    const paymentDiv = useRef();
    const email = useRef();
    const amount = useRef();
    const pDate = useRef();
    const groupName = useRef();

    const [switchState, setSwitchState] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState({
        payer: "You",
        payedTo: "",
    })

    function swapPayment() {
        if (!switchState) {
            span.current.innerHTML = `paid <b>You</b>`
            paymentDiv.current.style.flexDirection = 'row-reverse'
            setPaymentInfo({ payer: email.current.value, payedTo: "You" });
            setSwitchState(prev => !prev);
        }
        else {
            span.current.innerHTML = `<b>You</b> paid`
            paymentDiv.current.style.flexDirection = 'row'
            setPaymentInfo({ payer: "You", payedTo: email.current.value });
            setSwitchState(prev => !prev);

        }
    }

    function sendResponse() {
        let returnObj = {
            paidBy: paymentInfo.payer,
            paidTo: paymentInfo.payedTo ? paymentInfo.payedTo : email.current.value,
            amountPaid: amount.current.value,
            paymentDate: pDate.current.value,
            group: groupName.current.value
        }

        console.log(returnObj);
    }

    useEffect(() => {
        if (props.isOpen === true) {
            modal.current.style.display = 'flex'
        }
        else {
            modal.current.style.display = 'none'
        }
    }, [props.isOpen]);

    let date = new Date();
    return (

        <div className="modal-background" ref={modal} >
            <div className="modal-content settle-up">
                <div className="settle-up-header">
                    <h5>Settle Up</h5>
                    <img src={close} onClick={() => { props.toggleSettleUpModal(false) }} />
                </div>
                <div className="payment-div" ref={paymentDiv}>
                    <span ref={span}><b>You</b> paid</span>
                    <input type="email" placeholder="email" className="form-control" ref={email}></input>
                </div>
                <img src={swap} id="swap" onClick={swapPayment}></img>
                <input type="email" placeholder="$" className="form-control" ref={amount} id="settle-up-amount"></input>
                <input type="date" className="form-control" id="date" ref={pDate}></input>
                <input type="text" className="form-control" id="settle-up-group-name" placeholder="Group name" ref={groupName}></input>
                <button id="settle-up-save-btn" onClick={() => { props.toggleSettleUpModal(false); sendResponse(); }}>Save</button>
            </div>
        </div>
    )
}

export default SettleUpModal