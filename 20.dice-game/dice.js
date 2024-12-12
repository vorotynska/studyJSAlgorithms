//Get all of your .die elements and assign them to a listOfAllDice variable.
const listOfAllDice = document.querySelectorAll('.die');
const scoreInputs = document.querySelector('#score-options input');
const scoreSpans = document.querySelector('#score-options span');
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

//an event listener to invert the value of the isModalShowing 
rulesBtn.addEventListener('click', () => {
    isModalShowing = !isModalShowing;
    rulesContainer.style.display = isModalShowing ? 'block' : 'none';
    rulesBtn.textContent = isModalShowing ? 'Hide rules' : 'Show rules';
})

//Build out the logic such that clicking on the rollDiceBtn generates five random numbers between 1 and 6 inclusive, sets the
rollDiceBtn.addEventListener('click', () => {
    
})
