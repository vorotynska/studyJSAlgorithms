//Чтобы проанализировать эти выражения, вам нужно будет сопоставить символы с соответствующими функциями.
const infixToFunction = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
};

// ��ункция для преобразования инфиксной записи в постфиксную
const infixEval = (str, regex) => str.replace(regex, (_match, arg1, operator, arg2) => 
  infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)));

// that you can evaluate mathematical expressions, you need to account for order of operations

const highPrecedence = str => {
  //const regex = /(\d+)\s*([\+\-\*\/])\s*(\d+)/;//-
  const regex = /\d+(\.\d+)?\s*[*\/]\s*\d+(\.\d+)?/;
  const str2 = infixEval(str, regex);
  return str2 === str ? str : highPrecedence(str2);//+
};

const isEven = num => num % 2 === 0;

const sum = nums => nums.reduce((acc, num) => acc + num);
const average = nums => sum(nums) / nums.length;

const median = nums => {
    const sorted = nums.slice().sort((a, b) => a - b); // Сортировка массива
    const length = sorted.length;
    const middle = Math.floor(length / 2); // Находим индекс середины (округленный вниз)

    // Если длина четная, возвращаем среднее двух центральных элементов, иначе элемент по индексу middle
    return isEven(length) 
    ? average([sorted[middle], sorted[middle + 1]]) 
    : sorted[Math.ceil(middle)];
};

const spreadsheetFunctions = {
    sum,
    average,
    median,
    even: (nums) => nums.filter(isEven),
    //returns the first two elements of the nums array in order.
    firsttwo: (nums) => nums.slice(0, 2),
    //Add a lasttwo property which takes a nums parameter and returns the last two elements of the nums array in order.
    lasttwo: (nums) => nums.slice(-2),
   //Add a product property which takes a nums parameter and returns the product of all the numbers in the nums array.
    product: (nums) => nums.reduce((acc, num) => acc * num, 1),
    //Add a has2 property which returns whether the nums array has 2 in the values
    has2: (nums) => nums.includes(2),
    increment: nums => nums.map(num => num + 1),
    //Add a hasEven property which returns whether the nums array has any even number in the values.
    someeven: (nums) => nums.some(isEven),
    everyeven: nums => nums.every(isEven),
    random: ([x, y]) => Math.floor(Math.random() * y + x),
    range: nums => range(...nums),
    //Add a nodupes property which returns nums with all duplicate values removed.
    nodupes: (nums) => [...new Set(nums).values()],
    "": num => num,
  }

//начать применять логику синтаксического анализа вашей функции к строке.
const applyFunction = (str) => {
  const noHigh = highPrecedence(str);
  const infix = /([\d.]+)([+-])([\d.]+)/;
  const str2 = infixEval(noHigh, infix);
  //This expression will look for function calls like sum(1, 4).
  const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i;
  const toNumberList = (args) => args.split(",").map(parseFloat)
  // Достаём функцию из объекта spreadsheetFunctions
  // Вызываем функцию с преобразованным списком чисел
  const apply = (fn, args) => spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
  return str2.replace(functionCall, (match, fn, args) => 
    spreadsheetFunctions.hasOwnProperty(fn.toLowerCase()) ?
    apply(fn, args) : match);
};

//function to generate a range of numbers.
const range = (start, end) => Array(end - start + 1)
             .fill(start)
             .map((element, index) => element + index);

const charRange = (start, end) => 
    range(start.charCodeAt(0), end.charCodeAt(0))  //charCodeAt(0) преобразовать символ в код
.map((code) => String.fromCharCode(code)); //String.fromCharCode(): Преобразует числовые коды обратно в символы

  //Start by declaring a rangeRegex variable and assign it a regular expression that matches A through J
  const evalFormula = (x, cells) => {
    const idToText = (id) => cells.find(cell => cell.id === id).value;
  
    // Используем классы символов в группах захвата
    const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/ig;
    
    //To be safe, parse num1 and num2 into integers as you pass them into range.
    const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));
    
    const elemValue = num => character => idToText(character + num);
     
    //function to return an array of cell ids
    const addCharacters = character1 => character2 => num => 
      charRange(character1, character2).map(elemValue(num)); 
   
    const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) =>
       rangeFromString(num1, num2).map(addCharacters(char1)(char2)));

    //Declare a variable cellRegex to match cell references
    const cellRegex = /[A-J][1-9][0-9]?/ig;
    //function to return an array of cell values
    const cellExpanded = rangeExpanded.replace(cellRegex, (match) => idToText(match.toUpperCase()))
    const functionExpanded = applyFunction(cellExpanded);
    return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded, cells);
  };
window.onload = () => {
    const container = document.getElementById("container");
    const createLabel = name => {
        const label = document.createElement("div");
        label.className = "label";
        label.textContent = name;
        container.appendChild(label);
    }
    const letters = charRange("A", "J");
    letters.forEach(createLabel);
    range(1, 99).forEach((number) => {
        createLabel(number);
    letters.forEach((letter) => {
        const input = document.createElement("input");
      input.type = "text";
      input.id = letter + number;
      input.ariaLabel = letter + number;
       // Устанавливаем событие onchange
       input.onchange = update;
      container.appendChild(input);
    })
    })
  };

  //функция update() может оценивать формулы.
  const update = (event) => {
    const element = event.target;
    const value = element.value.replace(/\s/g, ""); // Убираем пробелы из значения
  
    // Проверяем, если value не содержит id элемента
    //написали условие if, чтобы проверить, была ли вызвана функция.
    if (!value.includes(element.id) && value[0] === "=") {
      // Получаем все дочерние элементы контейнера
      const container = document.getElementById("container");
      const allCells = container.children;

    // Передаем строку после "=" и все ячейки в evalFormula
    element.value = evalFormula(value.substring(1), Array.from(allCells)); 
      
    }
  };
  