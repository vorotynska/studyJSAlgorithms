//Get all of your .die elements and assign them to a listOfAllDice variable.
const listOfAllDice = document.querySelectorAll('.die');
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById('current-round');
const rollsElement = document.getElementById('current-round-rolls');
const totalScoreElement = document.getElementById('total-score');
const scoreHistory = document.getElementById('score-history');
const rollDiceBtn = document.getElementById('roll-dice-btn');
const keepScoreBtn = document.getElementById('keep-score-btn');
const rulesBtn = document.getElementById('rules-btn');
const rulesContainer = document.querySelector('.rules-container');
//When the user clicks on the Show rules button, they should be able to toggle between showing and hiding the game rules
let isModalShowing = false;
//you will need to keep track of all of the dice values
let diceValuesArr = [];
//the current score
let score = 0;
//number of rolls
let rolls = 0;
//which round the player is on
let round = 1;

//update your rolls and your round on the page
const updateStats = () => {
    rollsElement.textContent = rolls;
    roundElement.textContent = round;
}

//function should set the scoreInputs at that index to be enabled, set the value of that input to the score, and displa
const updateRadioOption = (index, score) => {
  // Включаем радиокнопку
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  // Показываем текущее значение score на странице, чтобы пользователь мог понять, какую сумму он получил
  scoreSpans[index].textContent = `, score = ${score}`;
};

//When you roll the dice and make a selection
//keep the score you selected and move onto the next round
const updateScore = (selectedValue, achieved) => {
  // Преобразуем выбранное значение в число и добавляем к общему счету
  const selectedScore = parseInt(selectedValue, 10);
  score += selectedScore;

  // Обновляем текст общего счета на странице
  totalScoreElement.textContent = score;

  // Создаем новый элемент <li> и добавляем его в историю счета
  const newScoreItem = document.createElement('li');
  newScoreItem.textContent = `${achieved} : ${selectedValue}`;
  scoreHistory.appendChild(newScoreItem);
};


//The function will need to count how many times each number is found in the array
const getHighestDuplicates = (diceValues) => {
  const sumOfDice = diceValues.reduce((acc, curr) => acc + curr, 0);
  diceValues.forEach((num) => {
    const count = diceValues.filter((item) => item === num).length;
    //If a number appears 4 or more times, the "Four of a Kind" option is updated
    if (count >= 4) {
      updateRadioOption(1, sumOfDice);
      }
    //If a number appears 3 or more times (and there is no "Four of a Kind"), the "Three of a Kind" option is updated
    if (count >= 3) {
      updateRadioOption(0, sumOfDice);
     }
     //Regardless of the outcome, the "None of the above" option is always updated with the value 0
    updateRadioOption(5, 0);
  })
};

//check if the user has rolled three of one number and two of another number
const detectFullHouse = (diceValues) => {
  //объект counts, где ключ — число на кости, а значение — количество его появлений
 const countMap = {};
  // Подсчёт каждого числа в массиве
  diceValues.forEach((value) => {
    countMap[value] = (countMap[value] || 0) + 1;
});

const counts = Object.values(countMap);
  const hasThree = counts.includes(3);
  const hasTwo = counts.includes(2);
  if (hasThree && hasTwo) {
    // Если фул-хаус найден, обновляем третью радиокнопку
    updateRadioOption(2, 25); // Индекс 2 соответствует "Full house"
  }
//Regardless of the outcome, the "None of the above" option is always updated with the value 0
updateRadioOption(5, 0);
};

//Before each dice roll, you will need to reset the values for the score inputs and spans so a new value can be displayed
const resetRadioOptions = () => {
  scoreInputs.forEach((input) => {
    input.disabled = true; // Отключаем радиокнопку
    input.checked = false; // Убираем состояние "выбрано"
  });
  scoreSpans.forEach((span) => {
    span.textContent = ""; // Очищаем текст в span
  });
};

//reset the game
const resetGame = () => {
  score = 0;
  rolls = 0;
  round = 1;
  diceValuesArr = [];
  totalScoreElement.textContent = score;
  scoreHistory.innerHTML = '';
  //set each listOfAllDice element to have the text 0.
  listOfAllDice.forEach((die) => die.textContent = 0);
};

const checkForStraights = (diceValues) => {
  // Удаляем дубликаты и сортируем значения
  const uniqueSortedValues = [...new Set(diceValues)].sort((a, b) => a - b);
   // Функция для проверки наличия последовательности
   const hasConsecutiveSequence = (arr, length) => {
    for (let i = 0; i <= arr.length - length; i++) {
      let isSequence = true;
      for (let j = 0; j < length - 1; j++) {
        if (arr[i + j] + 1 !== arr[i + j + 1]) {
          isSequence = false;
          break;
        }
      }
      if (isSequence) return true;
    }
    return false;
  };
   // Проверяем на наличие большого и малого стрита
   const isLargeStraight = hasConsecutiveSequence(uniqueSortedValues, 5);
   const isSmallStraight = hasConsecutiveSequence(uniqueSortedValues, 4);
 
   // Обновляем радио-кнопки
   if (isLargeStraight) {
     updateRadioOption(4, 40); // Большой стрит
     updateRadioOption(3, 30)
   } else if (isSmallStraight) {
     updateRadioOption(3, 30); // Малый стрит
   } else {
     updateRadioOption(5, 0); // Нет стрита
   }
 
};

// Функция генерации случайного числа от 1 до 6
const rollDice = () => Math.floor(Math.random() * 6) + 1;

rollDiceBtn.addEventListener('click', () => {
    // Check if the user has already rolled the dice three times
    if (rolls >= 3) {
      alert("You must select a score before rolling again!");
      return; // Stop further execution if the roll limit is reached
    }
    // Increment the number of rolls
    rolls++;
   
    // Generate five random dice values
    diceValuesArr = Array.from({ length: 5 }, rollDice);
    
    // Сбрасываем радиоопции перед броском костей
    resetRadioOptions();

    // Update the dice values displayed on the screen
    diceValuesArr.forEach((value, index) => listOfAllDice[index].textContent = value);
    updateStats();
    getHighestDuplicates(diceValuesArr);
    // Проверяем на фул-хаус
  detectFullHouse(diceValuesArr);
  checkForStraights(diceValuesArr);
  });

//an event listener to invert the value of the isModalShowing 
rulesBtn.addEventListener('click', () => {
    isModalShowing = !isModalShowing;
    rulesContainer.style.display = isModalShowing ? 'block' : 'none';
    rulesBtn.textContent = isModalShowing ? 'Hide rules' : 'Show rules';
})

keepScoreBtn.addEventListener('click', () => {
  // Найти выбранную радиокнопку
  const selectedOption = document.querySelector("#score-options input:checked");

  // Если ничего не выбрано, выдать предупреждение и прекратить выполнение
  if (!selectedOption) {
    alert("You must select a score option before keeping the score!");
    return;
  }

  // Получаем значение и идентификатор выбранной опции
  const selectedValue = selectedOption.value;
  const achieved = selectedOption.id;

  // Обновляем счет и историю с помощью функции updateScore
  updateScore(selectedValue, achieved);

  // Переходим к следующему раунду
  rolls = 0; // Сбрасываем количество бросков
  round++; // Увеличиваем текущий раунд
  updateStats(); // Обновляем статистику на странице

  // Сбрасываем радиокнопки для следующего раунда
  resetRadioOptions();

  if (round > 6) {
    setTimeout(() => {
      alert("Game over! Final score: " + score);
      resetGame();
    }, 500)
  }
});

