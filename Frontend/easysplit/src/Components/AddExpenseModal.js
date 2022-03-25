import React, { useRef, useEffect, useState } from "react"
import close from "../Resources/close.png"
import equal from "../Resources/equal.png"
import shares from "../Resources/graph.png"
import exactamount from "../Resources/numbers.png"
import percent from "../Resources/percent.png"

function AddExpenseModal(props) {

    const [splitMethod, setSplitMethod] = useState("equal");    // 1
    const [splitWithArr, setSplitWithArr] = useState([]);       // 2
    const [amountAfterSplit, setAmountAfterSplit] = useState(0.0);  //3
    const [exactAmountsAfterSplit, setExactAmountsAfterSplit] = useState([]);   //4
    const [amountsAfterPercentSplit, setAmountsAfterPercentSplit] = useState([]);   //5
    const [finalSplitAmount, setFinalSplitAmount] = useState([]); //6
    const [returnObj, setReturnObj] = useState({}); //7

    const modal = useRef();
    const splitInfoDiv = useRef();
    const shareWithInput = useRef();
    const amount = useRef();
    const splitBtn = useRef();
    const saveBtn = useRef();
    const paidAmountsDiv = useRef();

    function addEmails() {
        let emails = (shareWithInput.current.value).split(",");
        setSplitWithArr(emails);
        //console.log(splitWithArr);
    }

    function computeSplit() {
        let ul = splitInfoDiv.current.children[0];
        let lis = ul.getElementsByTagName("li");
        //console.log(lis);
        if (splitMethod === 'exact') {
            let exactValues = [];
            for (let li of lis) {
                exactValues.push(li.children[1].value)
            }
            setExactAmountsAfterSplit(exactValues);
            setFinalSplitAmount(exactValues);
        }
        else if (splitMethod === 'percent') {
            let totalAmount = amount.current.value;
            //console.log(totalAmount);
            let valuesAfterSplit = [];
            for (let li of lis) {
                valuesAfterSplit.push(((li.children[1].value) / 100) * totalAmount)
                const node = document.createElement("span");
                const textnode = document.createTextNode(`$` + `${(((li.children[1].value) / 100) * totalAmount).toFixed(2)}`);
                node.appendChild(textnode);
                if (!li.children[2]) {
                    li.appendChild(node);
                }
                else {
                    li.children[2].innerText = `$` + `${(((li.children[1].value) / 100) * totalAmount).toFixed(2)}`;
                }
            }
            setAmountsAfterPercentSplit(valuesAfterSplit);
            setFinalSplitAmount(valuesAfterSplit);
        }

        populatePaidAmountsDiv();
        saveBtn.current.style.display = 'block';
    }

    function populatePaidAmountsDiv() {
        let emailList = splitWithArr.map(email => `<li style="text-align:left"> <span style='color: #2bbbad; font-weight: 500'>${email}</span><input className="formControl" type= "number" placeholder="$" style='margin: 1em 1em 0 1em; padding-left: 0.5em; width: 4em'/></li>`).join('');
        paidAmountsDiv.current.innerHTML = `
            <hr />
            <h5>Amount Paid</h5>
            <ul style="list-style-type:none;margin:0;padding:0">
                ${emailList}
            </ul>
            `
    }

    function updatePaidAmounts() {
        let ul = paidAmountsDiv.current.children[2];
        let lis = ul.getElementsByTagName("li");
        let paidAmounts = [];
        for (let li of lis) {
            paidAmounts.push(li.children[1].value * 1)
        }
        prepareReturnObj(paidAmounts);
    }

    function changeSplitMethod(splitMethod) {
        setSplitMethod(splitMethod);
        if (splitMethod === 'equal') {
            splitBtn.current.style.display = 'none';
            setAmountAfterSplit(() => {
                if (splitWithArr.length < 2) {
                    setFinalSplitAmount(amount.current.value);
                    return amount.current.value;
                }
                else {
                    setFinalSplitAmount((amount.current.value / splitWithArr.length).toFixed(2));
                    return (amount.current.value / splitWithArr.length).toFixed(2);
                }
            });
            let emailList = splitWithArr.map(email => `<li style="text-align:left"> <span style='color: #2bbbad; font-weight: 500'>${email}</span> <span style='font-weight: 500; color: "black"'>$${(amount.current.value / splitWithArr.length).toFixed(2)}</span></li>`).join('');
            splitInfoDiv.current.innerHTML = `
            <ul style="list-style-type:none;margin:0;padding:0">
                ${emailList}
            </ul>
            `
        }
        else if (splitMethod === 'exact') {
            splitBtn.current.style.display = 'block';
            let emailList = splitWithArr.map(email => `<li style="text-align:left"> <span style='color: #2bbbad; font-weight: 500'>${email}</span><input className="formControl" placeholder="$" style='margin: 1em 1em 0 1em; padding-left: 0.5em; width: 4em'/></li>`).join('');
            splitInfoDiv.current.innerHTML = `
            <ul style="list-style-type:none;margin:0;padding:0">
                ${emailList}
            </ul>
            `
        }
        else if (splitMethod === 'percent') {
            splitBtn.current.style.display = 'block';
            let emailList = splitWithArr.map(email => `<li style="text-align:left"> <span style='color: #2bbbad; font-weight: 500'>${email}</span><input className="formControl" placeholder="%" style='margin: 1em 1em 0 1em; padding-left: 0.5em; width: 4em'/></li>`).join('');
            splitInfoDiv.current.innerHTML = `
            <ul style="list-style-type:none;margin:0;padding:0">
                ${emailList}
            </ul>
            `
        }
    }

    function prepareReturnObj(paidAmounts) {
        let returnObj = [];

        for (let i = 0; i < splitWithArr.length; i++) {
            let obj = {
                userID: splitWithArr[i],
                paidAmount: paidAmounts[i],
                splitAmount: splitMethod === "equal" ? finalSplitAmount : finalSplitAmount[i]
            };
            returnObj.push(obj)
        }
        console.log(returnObj);
        return returnObj
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
                        <span><b>$ </b><input type="number" className="formControl" id="split-amount-input" placeholder="0.00" ref={amount}></input></span>
                        <h5>Choose a split method:</h5>
                        <div className="split-method-imgs">
                            <img className="split-method-img" src={equal} onClick={() => { changeSplitMethod('equal') }} />
                            {/* <img className="split-method-img" src={shares} onClick={() => { changeSplitMethod('shares') }} /> */}
                            <img className="split-method-img" src={exactamount} onClick={() => { changeSplitMethod('exact') }} />
                            <img className="split-method-img" src={percent} onClick={() => { changeSplitMethod('percent') }} />
                        </div>
                        <h4>{splitMethod}</h4>
                        <div className="split-info" ref={splitInfoDiv}></div>
                        <button id="submit-exact-percentage-btn" onClick={computeSplit} type="button" ref={splitBtn}>Split</button>
                        <div className="paid-amounts-div" ref={paidAmountsDiv}></div>
                        <button id="submit-paid-amounts-btn" onClick={updatePaidAmounts} type="button" ref={saveBtn}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddExpenseModal