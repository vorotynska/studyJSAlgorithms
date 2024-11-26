function getRandomComputerResult() {
    const options = ["Rock", "Paper", "Scissors"];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }

  //returns true if player wins the game, false otherwise
  function hasPlayerWonTheRound(player, computer) {
    return (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Scissors" && computer === "Paper") ||
      (player === "Paper" && computer === "Rock")
    );
  }

  let playerScore = 0;
  let computerScore = 0;

  //get result message based on the outcome of the round
  function getRoundResults(userOption) {
    const computerResult = getRandomComputerResult();
  
    if (hasPlayerWonTheRound(userOption, computerResult)) {
      playerScore++;
      return `Player wins! ${userOption} beats ${computerResult}`;
    } else if (computerResult === userOption) {
      return `It's a tie! Both chose ${userOption}`;
    } else {
      computerScore++;
      return `Computer wins! ${computerResult} beats ${userOption}`;
    }
  }

  //update the scoreboard
  const playerScoreSpanElement = document.getElementById("player-score");
  const computerScoreSpanElement = document.getElementById("computer-score");
  const roundResultsMsg = document.getElementById("results-msg");
  const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");

function showResults(userOption) {
  // Обновляем сообщение о результатах раунда
  roundResultsMsg.innerText = getRoundResults(userOption);
  
  // Обновляем очки игрока и компьютера
  playerScoreSpanElement.innerText = playerScore;
  computerScoreSpanElement.innerText = computerScore;
  
  // Проверяем, достиг ли кто-то трех очков
  if (playerScore >= 3 || computerScore >= 3) {
    // Обновляем сообщение о победителе
    winnerMsgElement.innerText =
      playerScore >= 3 ? "Player has won the game!" : "Computer has won the game!";
    
    // Скрываем контейнер с опциями
    optionsContainer.style.display = "none";
    
    // Показываем кнопку для перезапуска игры
    resetGameBtn.style.display = "block";
  }
}

  //reset the game
  function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreSpanElement.innerText = playerScore;
    computerScoreSpanElement.innerText = computerScore;
    roundResultsMsg.innerText = "";
    winnerMsgElement.innerText = "";
    optionsContainer.style.display = "block";
    resetGameBtn.style.display = "none";
  }
  