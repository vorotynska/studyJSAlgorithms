// Input elements and variables
let cidUl = document.querySelector('.cid-ul');
let total = document.querySelector('.total');
const cashInput = document.getElementById("cash");
const changeDueElement = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");

// Constants for currency units and their values
const currencyUnits = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100]
];

// Example cash in drawer
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];
//let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]
let price = 3.26

total.innerHTML = `
<p>Total: $${price}</p>
`
// Function to calculate change
function calculateChange(price, cash, cid) {
    let changeDue = parseFloat((cash - price).toFixed(2)); 
    const changeArray = [];
    const totalCid = parseFloat(cid.reduce((sum, curr) => sum + curr[1], 0).toFixed(2));
    console.log(totalCid)
    if (changeDue < 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
  
    if (changeDue === 0) {
      return { status: "EQUAL", change: [] };
    }
  
    if (changeDue > totalCid) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
  
    
    const cidCopy = [...cid].reverse(); 
    const currencyUnitsReversed = [...currencyUnits].reverse();
  
    for (const [unit, unitValue] of currencyUnitsReversed) {
      let available = cidCopy.find(([name]) => name === unit)[1];
      let amountToGive = 0;
  
      while (changeDue >= unitValue && available >= unitValue) {
        changeDue = parseFloat((changeDue - unitValue).toFixed(2));
        available = parseFloat((available - unitValue).toFixed(2));
        amountToGive = parseFloat((amountToGive + unitValue).toFixed(2));
      }
  
      if (amountToGive > 0) {
        changeArray.push([unit, amountToGive]);
      }
    }
  
    if (changeDue > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
  
    if (totalCid === cash - price) {
      return { status: "CLOSED", change: changeArray };
    }
  
    return { status: "OPEN", change: changeArray };
  }

  // Function to handle purchase
  function handlePurchase() {
    const cash = parseFloat(cashInput.value);
  
    if (cash < price) {
      alert("Customer does not have enough money to purchase the item");
      return;
    }
  
    const result = calculateChange(price, cash, [...cid]);
  
    if (result.status === "EQUAL") {
      changeDueElement.textContent = "No change due - customer paid with exact cash";
    } else if (result.status === "INSUFFICIENT_FUNDS") {
      changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
    } else if (result.status === "OPEN") {
      const changeString = result.change
        .map(([unit, amount]) => `${unit}: $${amount}`)
        .join(", ");
      changeDueElement.textContent = `Status: OPEN, Change: ${changeString}`;
    } else if (result.status === "CLOSED") {
      const changeString = result.change
        .map(([unit, amount]) => `${unit}: $${amount}`)
        .join(", ");
      changeDueElement.textContent = `Status: CLOSED, Change: ${changeString}`;
    }
  }

  purchaseBtn.addEventListener('click', handlePurchase);