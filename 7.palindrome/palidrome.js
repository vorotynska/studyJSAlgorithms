function checkPalindrome() {
    var input = document.getElementById("text-input").value
    let inputIn = input.toLowerCase().replace(/[^a-z0-9]/g, "");
    var reversed = inputIn.split("").reverse().join("");
    
     if (!inputIn) {
        alert(`Please input a value`)
        return;
     }

    if (inputIn === reversed) {
        document.getElementById("result").innerHTML = `${input} is a palindrome.`;
    } else {
        document.getElementById("result").innerHTML = `${input} is not a palindrome.`;
    }
}