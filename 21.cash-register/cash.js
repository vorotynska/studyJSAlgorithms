//let price = 3.26
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

let total = document.querySelector('.total');
let cidUl = document.querySelector('.cid-ul')
let changeDue = document.getElementById('change-due');
let cashInput = document.getElementById('cash');
let purchaseBtn = document.getElementById('purchase-btn');

// you will need to add is the cash variable, which is the amount of cash provided by the customer for the item, which is provided via an input element on the page.
const calculateChange = (price, cid) => {
    let cash = Number(cashInput.value);
    let change = cash - price;
    changeDue.textContent = `Change Due: $${change.toFixed(2)}`;
    cid.forEach((item) => {
        //console.log(item);
        cidUl.innerHTML += `<li>${item[0]}: ${item[1]}</li>`;
       })
    total.innerHTML = `
   <p>Total: ${price}</p>
    `
}
calculateChange(20, cid)

purchaseBtn.addEventListener('click', calculateChange);

/*
function returnChange(price, cash, cid) {
   cid.forEach((item) => {
    //console.log(item);
    cidUl.innerHTML += `<li>${item[0]}: ${item[1]}</li>`;
   })
   // let cash = Number(cash.value);
    if (cash >= price) {
        let change = cash - price;
        
       // let changeArray = [['ONE HUNDRED', 100], ['TWENTY', 60], ['TEN', 20], ['FIVE', 55], ['ONE', 90], ['QUARTER', 4.25], ['DIME', 3.1], ['NICKEL', 2.05], ['PENNY', 1.01]];
        let changeReturn = [];
        cid.reverse().forEach(item => {
            let changeCount = Math.floor(change / item[1]);
            changeReturn.push([item[0], changeCount]);
            change = change % item[1];
        })
        console.log(changeReturn);
    } else {
        alert('"Customer does not have enough money to purchase the item"');
    }
}
*/
//returnChange(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);