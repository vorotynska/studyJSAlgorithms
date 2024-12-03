const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("results-div");
const clearBtn = document.getElementById("clear-btn");
const userInput = document.getElementById("user-input");

let isError = false;

// valid formats for US phone numbers:
const phoneRegex = /^1?\s*(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
  
  const check = (e) => {  
    e.preventDefault();
    isError = false;
    const input = userInput.value;
    if(!input) {
        result.textContent = "Please provide a phone number";
        return;
    } 
    if(!phoneRegex.test(input)) {
        result.textContent = `Invalid US number: ${input}`;
        isError = true;
        return;
    } else {
        result.textContent = `Valid US number: ${input}`;
    }
}

checkBtn.addEventListener("click", check);

clearBtn.addEventListener("click", () => {
  userInput.value = "";
  result.textContent = "";
});
