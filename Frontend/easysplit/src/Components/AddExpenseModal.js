import React, { useRef, useEffect, useState } from "react"
import close from "../Resources/close.png"
import equal from "../Resources/equal.png"
import shares from "../Resources/graph.png"
import exactamount from "../Resources/numbers.png"
import percent from "../Resources/percent.png"

function AddExpenseModal(props) {

    const [splitMethod, setSplitMethod] = useState("equal");
    const [splitWithArr, setSplitWithArr] = useState([]);

    const modal = useRef();
    const splitInfoDiv = useRef();
    const shareWithInput = useRef();

    function addEmails() {
        let emails = (shareWithInput.current.value).split(",");
        setSplitWithArr(emails);
        console.log(splitWithArr);
    }

    function changeSplitMethod(splitMethod) {
        setSplitMethod(splitMethod);
        let emailList = splitWithArr.map(email => `<li>${email}</li>`).join('');
        if (splitMethod === 'equal') {
            splitInfoDiv.current.innerHTML = `
            <ul>
                ${emailList}
            </ul>
            `
        }
        console.log(emailList)
    }


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
            <div className="modal-content addexpensecontent">
                <div className="addExpenseHeader">
                    <h5>Add an Expense</h5>
                    <img src={close} onClick={() => { props.toggleAddExpenseModal(false) }} />
                </div>
                <div className="addExpenseFormContainer">
                    <form className="addExpenseForm">
                        <p>With <b>you</b> and:</p>
                        {/* <input type="text" className="formControl" id="split-with-name" placeholder="Name"/> */}
                        <span>
                            <input type="text" className="formControl" id="split-with-email-input" placeholder="Comma separated email(s)" ref={shareWithInput} />
                            <button id="add-emails-btn" onClick={addEmails} type="button">Add</button>
                        </span>
                        <input type="text" className="formControl" id="split-desc-input" placeholder="Enter a description"></input>
                        <span><b>$ </b><input type="number" className="formControl" id="split-amount-input" placeholder="0.00"></input></span>
                        <h5>Choose a split method:</h5>
                        <div className="split-method-imgs">
                            <img className="split-method-img" src={equal} onClick={() => { changeSplitMethod('equal') }} />
                            <img className="split-method-img" src={shares} onClick={() => { changeSplitMethod('shares') }} />
                            <img className="split-method-img" src={exactamount} onClick={() => { changeSplitMethod('exact') }} />
                            <img className="split-method-img" src={percent} onClick={() => { changeSplitMethod('percent') }} />
                        </div>
                        <h4>{splitMethod}</h4>
                        <div className="split-info" ref={splitInfoDiv}></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddExpenseModal