import React, { useRef, useEffect, useState } from "react";
import close from "../Resources/close.png";
import equal from "../Resources/equal.png";
import shares from "../Resources/graph.png";
import exactamount from "../Resources/numbers.png";
import percent from "../Resources/percent.png";
import { createExpense, splitExpense } from "../controllers/apis/expense.api";
import { useMutation, useQuery } from "react-query";
import { getUserJWt } from "../controllers/helpers/api.helper";

function AddExpenseModal(props) {
  const [splitMethod, setSplitMethod] = useState("equal"); // Stores the split method
  const [splitWithArr, setSplitWithArr] = useState([]); // Stores the emails of the people the bill is being split with
  const [amountAfterSplit, setAmountAfterSplit] = useState(0.0); // Stores the split amount when the split method is "equal"
  const [exactAmountsAfterSplit, setExactAmountsAfterSplit] = useState([]); // Stores the split amount for each person when the split method is "exact"
  const [amountsAfterPercentSplit, setAmountsAfterPercentSplit] = useState([]); // Stores the split amount for each person when the split method is "percent"
  const [finalSplitAmount, setFinalSplitAmount] = useState([]); // Stores the split amount for each person after they are done choosing a split method. i.e stores the latest split amounts

  const modal = useRef(); // Refers to the addExpense modal that covers the entire screen
  const splitInfoDiv = useRef(); // Refers to the div that contains the list of emails and the respective split amount
  const shareWithInput = useRef(); // Refers to the input that takes in the emails
  const amount = useRef(); // Refers to the total bill amount
  const desc = useRef(); // Refers to the expense description
  const addbtn = useRef();
  const splitBtn = useRef(); // Refers to the split button
  const saveBtn = useRef(); // Refers to the save button
  const paidAmountsDiv = useRef(); // Refers to the div that contains the list of emails and the respective amount that they actually paid

  const { data: jwt } = useQuery("jwt", getUserJWt, {
    refetchOnWindowFocus: false,
  });

  const userJWT = jwt;

  const { mutate: splitExpenseMutation, data: splitDetail } = useMutation(
    async (data) => await splitExpense(data),
    {
      onSuccess: async (splitDetail) => {
        const createExpenseData = {
          groupReference: props.groupID,
          description: desc.current.value,
          totalExpense: amount.current.value,
          splitDetail: splitDetail.result,
        };
        return await createExpense(createExpenseData, userJWT);
      },
    }
  );

  function addEmails() {
    // Splits the email input into different emails with ',' being the delimitter
    let emails = shareWithInput.current.value.split(",");
    setSplitWithArr(emails); // Update the state
    addbtn.current.style.backgroundColor = "#2bbbad";
  }

  /*Executes when split button is clicked.
      Calculates the split amount based on the split method i.e exact, or percent (does not handle the "equal" method case)
      Once the split amount is computed, it updates the DOM elements to display the same
    */
  function computeSplit() {
    let ul = splitInfoDiv.current.children[0]; // The first child of splitinfoDiv is an unordered list
    let lis = ul.getElementsByTagName("li"); // Grabs all teh list items within that list. These list items are supposed to contain the email and the input that takes in the respective split amount (exact value or percent)

    if (splitMethod === "exact") {
      let exactValues = [];
      for (let li of lis) {
        exactValues.push(1 * li.children[1].value); // Since split method is exact, we grab the input value and push it inside the exact values array
      }
      setExactAmountsAfterSplit(exactValues); // Update the array that contains split amounts when split method is exact
      setFinalSplitAmount(exactValues); // Update the latest split amounts array
    } else if (splitMethod === "percent") {
      // Do the same as above but when split method is percent
      let totalAmount = amount.current.value; // Get the total bill amount because we need it to compute the split amount for percent method
      let valuesAfterSplit = [];
      for (let li of lis) {
        valuesAfterSplit.push((li.children[1].value / 100) * totalAmount); // Compute the split amount based on the percent value in the input field
        const node = document.createElement("span");
        const textnode = document.createTextNode(
          `$` + `${((li.children[1].value / 100) * totalAmount).toFixed(2)}`
        ); // Make a DOM element that will display split amounts
        node.appendChild(textnode);
        if (!li.children[2]) {
          // If the split amount has not been computed yet, it will append the split amount to the list
          li.appendChild(node);
        } else {
          // If it has been computed before, it will change the split amount to the latest computed one
          li.children[2].innerText =
            `$` + `${((li.children[1].value / 100) * totalAmount).toFixed(2)}`;
        }
      }
      setAmountsAfterPercentSplit(valuesAfterSplit); // Update the array that contains teh split amounts when the split method is "percent"
      setFinalSplitAmount(valuesAfterSplit); // Update the latest split amounts array
    }

    populatePaidAmountsDiv(); // Display the div that contains the list of emails and an input field next to each to get the amount paid input
    splitBtn.current.style.backgroundColor = "#2bbbad";
    saveBtn.current.style.display = "block"; // Display the save button
  }

  function populatePaidAmountsDiv() {
    let emailList = splitWithArr
      .map(
        (email) =>
          `<li style="text-align:left"> <span style='color: #2bbbad; font-weight: 500'>${email}</span><input className="formControl" type= "number" placeholder="$" style='margin: 1em 1em 0 1em; padding-left: 0.5em; width: 4em'/></li>`
      )
      .join("");
    paidAmountsDiv.current.innerHTML = `
            <hr />
            <h5>Amount Paid</h5>
            <ul style="list-style-type:none;margin:0;padding:0">
                ${emailList}
            </ul>
            `;
  }

  /*Grabs the value of each input field that contains the amount paid by each person */
  function updatePaidAmounts() {
    let ul = paidAmountsDiv.current.children[2]; // The second element in the paid amounts div is an unordered list. (The first two are an <hr> and a <h5> as shown in the previous function)
    let lis = ul.getElementsByTagName("li");
    let paidAmounts = [];
    for (let li of lis) {
      paidAmounts.push(li.children[1].value * 1);
    }
    splitExpenseMutation(prepareReturnObj(paidAmounts)); // Send the paid amounts to the function that prepares the object to be returned
    props.toggleAddExpenseModal(false);
    props.setGroupID(undefined);
  }

  /*Executes when one of the split method icons is clicked and the split method name is provided as argument 
      Based on the chosen split method, displays the emails and an input field next to each email (Except when the split method is 'equal' since that does not require a user input)
    */
  function changeSplitMethod(splitMethod) {
    setSplitMethod(splitMethod);
    if (splitMethod === "equal") {
      splitBtn.current.style.display = "block";
      setAmountAfterSplit(() => {
        if (splitWithArr.length < 2) {
          // If there is 0 or 1 emails, the split amount remains the same as the total bill amount
          setFinalSplitAmount(amount.current.value);
          return amount.current.value;
        } else {
          setFinalSplitAmount(
            (amount.current.value / splitWithArr.length).toFixed(2)
          ); // If emails >=2 split the total amount equally between all emails
          return (amount.current.value / splitWithArr.length).toFixed(2);
        }
      });

      /*Prepare the unordered list that will contain the emails and the respective split amount next to each email*/
      let emailList = splitWithArr
        .map(
          (email) =>
            `<li style="text-align:left"> <span style='color: #2bbbad; font-weight: 500'>${email}</span> <span style='font-weight: 500; color: "black"'>$${(
              amount.current.value / splitWithArr.length
            ).toFixed(2)}</span></li>`
        )
        .join("");
      splitInfoDiv.current.innerHTML = `
            <ul style="list-style-type:none;margin:0;padding:0">
                ${emailList}
            </ul>
            `;
    } else if (splitMethod === "exact") {
      splitBtn.current.style.display = "block";

      /*Prepare the unordered list that will contain the emails and an input field next to each email to take the exact amount input */
      let emailList = splitWithArr
        .map(
          (email) =>
            `<li style="text-align:left"> <span style='color: #2bbbad; font-weight: 500'>${email}</span><input className="formControl" placeholder="$" style='margin: 1em 1em 0 1em; padding-left: 0.5em; width: 4em'/></li>`
        )
        .join("");
      splitInfoDiv.current.innerHTML = `
            <ul style="list-style-type:none;margin:0;padding:0">
                ${emailList}
            </ul>
            `;
    } else if (splitMethod === "percent") {
      splitBtn.current.style.display = "block";
      /*Prepare the unordered list that will contain the emails and an input field next to each email to take the percentage input*/
      let emailList = splitWithArr
        .map(
          (email) =>
            `<li style="text-align:left"> <span style='color: #2bbbad; font-weight: 500'>${email}</span><input className="formControl" placeholder="%" style='margin: 1em 1em 0 1em; padding-left: 0.5em; width: 4em'/></li>`
        )
        .join("");
      splitInfoDiv.current.innerHTML = `
            <ul style="list-style-type:none;margin:0;padding:0">
                ${emailList}
            </ul>
            `;
    }
  }

  /*Prepares and returns an array of objects. 
    Each object contains an email, the respective split amount, and the paid amount*/

  function prepareReturnObj(paidAmounts) {
    let returnObj = [];

    for (let i = 0; i < splitWithArr.length; i++) {
      let obj = {
        email: splitWithArr[i],
        paidAmount: paidAmounts[i],
        splitAmount:
          splitMethod === "equal"
            ? finalSplitAmount * 1
            : finalSplitAmount[i] * 1,
      };
      returnObj.push(obj);
    }
    console.log(returnObj);
    modal.current.style.display = "none";
    shareWithInput.current.value = "";
    amount.current.value = "";
    desc.current.value = "";
    splitInfoDiv.current.innerHTML = "";
    paidAmountsDiv.current.innerHTML = "";
    splitBtn.current.style.display = "none";
    saveBtn.current.style.display = "none";
    setSplitWithArr([]);
    setAmountAfterSplit(0.0);
    setExactAmountsAfterSplit([]);
    setAmountsAfterPercentSplit([]);
    setFinalSplitAmount([]);
    addbtn.current.style.backgroundColor = "#ff652f";
    splitBtn.current.style.backgroundColor = "#ff652f";
    return returnObj;
  }

  useEffect(() => {
    if (props.isOpen === true) {
      modal.current.style.display = "flex";
    } else {
      modal.current.style.display = "none";
    }
  }, [props.isOpen]);

  return (
    <div className="modal-background" ref={modal}>
      <div className="modal-content addexpensecontent">
        <div className="addExpenseHeader">
          <h5>Add an Expense</h5>
          <img
            src={close}
            onClick={() => {
              props.toggleAddExpenseModal(false);
            }}
          />
        </div>
        <div className="addExpenseFormContainer">
          <form className="addExpenseForm">
            <p>
              <b>Split among</b>
            </p>
            {/* <input type="text" className="formControl" id="split-with-name" placeholder="Name"/> */}
            <span>
              <input
                type="text"
                className="formControl"
                id="split-with-email-input"
                placeholder="Comma separated email(s)"
                ref={shareWithInput}
              />
              <button
                id="add-emails-btn"
                onClick={addEmails}
                type="button"
                ref={addbtn}
              >
                Add
              </button>
            </span>
            <input
              type="text"
              className="formControl"
              id="split-desc-input"
              placeholder="Enter a description"
              ref={desc}
            ></input>
            <span>
              <b>$ </b>
              <input
                type="number"
                className="formControl"
                id="split-amount-input"
                placeholder="0.00"
                ref={amount}
              ></input>
            </span>
            <h5>Choose a split method:</h5>
            <div className="split-method-imgs">
              <img
                className="split-method-img"
                src={equal}
                onClick={() => {
                  changeSplitMethod("equal");
                }}
              />
              {/* <img className="split-method-img" src={shares} onClick={() => { changeSplitMethod('shares') }} /> */}
              <img
                className="split-method-img"
                src={exactamount}
                onClick={() => {
                  changeSplitMethod("exact");
                }}
              />
              <img
                className="split-method-img"
                src={percent}
                onClick={() => {
                  changeSplitMethod("percent");
                }}
              />
            </div>
            <h4>{splitMethod}</h4>
            <div className="split-info" ref={splitInfoDiv}></div>
            <button
              id="submit-exact-percentage-btn"
              onClick={computeSplit}
              type="button"
              ref={splitBtn}
            >
              Split
            </button>
            <div className="paid-amounts-div" ref={paidAmountsDiv}></div>
            <button
              id="submit-paid-amounts-btn"
              onClick={updatePaidAmounts}
              type="button"
              ref={saveBtn}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddExpenseModal;
