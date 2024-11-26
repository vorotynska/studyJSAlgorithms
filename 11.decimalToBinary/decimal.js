const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");

const countDownAndUp = (number) => {
    console.log(number);
    if (number === 0) {
        return;
      } else {
        countDownAndUp(number - 1);
      } 
};
const animationData = [
  {
    inputVal: 5,
    addElDelay: 1000,
    msg: "decimalToBinary(5) returns '10' + 1 (5 % 2). Then it pops off the stack.",
    showMsgDelay: 10000,
    removeElDelay: 15000,
  },
  {
    inputVal: 2,
    addElDelay: 1500,
    msg: "decimalToBinary(2) returns '1' + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.",
    showMsgDelay: 15000,
    removeElDelay: 20000,
  },
  {
    inputVal: 1,
    addElDelay: 2000,
    msg: "decimalToBinary(1) returns '1' (base case) and gives that value to the stack below. Then it pops off the stack.",
    showMsgDelay: 5000,
    removeElDelay: 10000,
  },
];

//building the function to actually do the decimal to binary conversion.
/*
const decimalToBinary = (input) => {
    const inputs = [];
    const quotients = [];
    const remainders = [];

    if (input === 0) {
        result.innerText = "0";
        return;
    }
   
    while (input > 0) {
        const quotient = Math.floor(input / 2);
        const remainder = input % 2;
        inputs.push(input);
        quotients.push(quotient);
        remainders.push(remainder);
        input = quotient;
    }
    console.log("Inputs: ", inputs);
    console.log("Quotients: ", quotients);
    console.log("Remainders: ", remainders);
    result.innerText = remainders.reverse().join("");
};


//ways to improve decimalToBinary function
const decimalToBinary = (input) => {
    let binary = "";
    if (input === 0) {
        binary = "0";
      }
    while (input > 0) {
        binary = (input % 2) + binary;  // append remainder to the start of the binary string, then divide the number by 2 again and repeat until input is 0.
        input = Math.floor(input / 2);
    }
    result.innerText = binary;  
}
*/

//refactor the decimalToBinary() function to use recursion instead of a while loop.
const decimalToBinary = (input) => {
    if (input === 0 || input === 1) {
      return String(input);
    } else {
      return decimalToBinary(Math.floor(input / 2)) + (input % 2);
    }
  };

  // create a simple animation to help you understand what's happening each step of the way.
  const showAnimation = () => {
    result.innerText = "Call Stack Animation";
    animationData.forEach((obj) => {
      setTimeout(() => {
        animationContainer.innerHTML += `
          <p id="${obj.inputVal}" class="animation-frame">
            decimalToBinary(${obj.inputVal})
          </p> 
        `;
      }, obj.addElDelay);
      setTimeout(() => {
        document.getElementById(obj.inputVal).textContent = obj.msg;
      }, obj.showMsgDelay);

      setTimeout(() => {
        document.getElementById(obj.inputVal).remove();
      }, obj.removeElDelay);
    });
    setTimeout(() => {
      result.textContent = decimalToBinary(5);
    }, 20000); 
    
  };

const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

    if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {
        alert("Please provide a decimal number greater than or equal to 0");
        return;
    }

    if (inputInt === 5) {
      showAnimation();
      return;
    }

    //decimalToBinary(parseInt(numberInput.value));
    result.textContent = decimalToBinary(inputInt);
    numberInput.value = "";
  };

  convertBtn.addEventListener("click", checkUserInput);
  numberInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkUserInput();
    }
  });