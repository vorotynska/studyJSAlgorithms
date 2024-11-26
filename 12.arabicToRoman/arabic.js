const numberInput = document.getElementById("number");
const result = document.getElementById("output");
const convertBtn = document.getElementById("convert-btn");

const convertToRoman = (num) => {
    const romanNumerals = [
        { value: 1000, symbol: 'M' },
        { value: 900, symbol: 'CM' },
        { value: 500, symbol: 'D' },
        { value: 400, symbol: 'CD' },
        { value: 100, symbol: 'C' },
        { value: 90, symbol: 'XC' },
        { value: 50, symbol: 'L' },
        { value: 40, symbol: 'XL' },
        { value: 10, symbol: 'X' },
        { value: 9, symbol: 'IX' },
        { value: 5, symbol: 'V' },
        { value: 4, symbol: 'IV' },
        { value: 1, symbol: 'I' }
    ];

    let roman = '';
    for (const numeral of romanNumerals) {
        while (num >= numeral.value) {
            roman += numeral.symbol;
            num -= numeral.value;
        }
    }
     return roman;
}

 const checkUserInput = () => {
    const inputInt = parseInt(numberInput.value);
  
      if (!numberInput.value || isNaN(inputInt)) {
          result.textContent = "Please enter a valid number";
          return;
      }

      if (inputInt < 0 || inputInt === 0) {
        result.textContent = "Please enter a number greater than or equal to 1";
        return;
      }
  
      if (inputInt >= 4000) {
        result.textContent = "Please enter a number less than or equal to 3999";
        return;
      }
  
      result.textContent = convertToRoman(inputInt);
      numberInput.value = "";
    };

    convertBtn.addEventListener("click", checkUserInput);
  