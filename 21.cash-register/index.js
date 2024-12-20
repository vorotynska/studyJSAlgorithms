// Input elements and variables
const priceInput = document.getElementById("price");
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

let price = 1.87;

// Function to calculate change
function calculateChange(price, cash, cid) {
  let changeDue = cash - price;
  const changeArray = [];
  let totalCid = cid.reduce((sum, curr) => sum + curr[1], 0);

  if (changeDue < 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (changeDue === 0) {
    return { status: "CLOSED", change: [] };
  }

  totalCid = parseFloat(totalCid.toFixed(2));

  if (changeDue > totalCid) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  cid.reverse(); // Start from the largest denomination
  for (const [unit, unitValue] of currencyUnits.reverse()) {
    let available = cid.find(([name]) => name === unit)[1];
    let amountToGive = 0;

    while (changeDue >= unitValue && available > 0) {
      changeDue -= unitValue;
      changeDue = parseFloat(changeDue.toFixed(2));
      available -= unitValue;
      amountToGive += unitValue;
    }

    if (amountToGive > 0) {
      changeArray.push([unit, parseFloat(amountToGive.toFixed(2))]);
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
  //let price = parseFloat(priceInput.value);
  let cash = parseFloat(cashInput.value);

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  const result = calculateChange(price, cash, [...cid]);

  if (result.status === "CLOSED") {
    changeDueElement.textContent = "No change due - customer paid with exact cash";
  } else if (result.status === "INSUFFICIENT_FUNDS") {
    changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
  } else if (result.status === "OPEN") {
    const changeString = result.change
      .map(([unit, amount]) => `${unit}: $${amount}`)
      .join(" ");
    changeDueElement.textContent = `Status: OPEN ${changeString}`;
  }
}

// Attach event listener
purchaseBtn.addEventListener("click", handlePurchase);

