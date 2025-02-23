const scores = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScore();

//functions are also values
//defines the computer moves
function pickComputerMoves() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

function updateScore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${scores.wins},Losses: ${scores.losses},Ties: ${scores.ties}`;
}

let autoplaying = false;
let intervalID;
const auto = document.querySelector(".autoplay");
const autoPlay = () => {
  if (!autoplaying) {
    intervalID = setInterval(() => {
      const playerMove = pickComputerMoves();
      playGame(playerMove);
    }, 1000);
    autoplaying = true;
    if (auto.innerText === "Auto Play") {
      auto.innerHTML = "Stop Play";
    }
  } else {
    if ((auto.innerHTML = "Stop Play")) {
      auto.innerHTML = "Auto Play";
    }
    clearInterval(intervalID);
    autoplaying = false;
  }
};
auto.addEventListener("click", autoPlay);
//defines the players move

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

function playGame(playerMove) {
  const computerMove = pickComputerMoves();
  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "scissors") {
      result = "Tie";
    } else if (computerMove === "rock") {
      result = "You lose";
    } else if (computerMove === "paper") {
      result = "You Win";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "You lose";
    } else if (computerMove === "rock") {
      result = "You Win";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You lose";
    } else if (computerMove === "scissors") {
      result = "You Win";
    }
  }
  //json-javascript object notation

  //the scores  of the game

  if (result === "You Win") {
    scores.wins += 1;
  } else if (result === "You lose") {
    scores.losses += 1;
  } else if (result === "Tie") {
    scores.ties += 1;
  }
  updateScore();
  localStorage.setItem("score", JSON.stringify(scores));

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `You 
<img src="images/${playerMove}-emoji.png" class="moves"> 
<img src="images/${computerMove}-emoji.png" class="moves"> 
Computer`;
}
//reset
document.querySelector(".reset-button").addEventListener("click", () => {
  confirmReset();
});
//play game with keyboard
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  } else if (event.key === "a") {
    autoPlay();
  } else if (event.key === "Backspace") {
    confirmReset();
  }
});
function resetButton() {
  scores.wins = 0;
  scores.losses = 0;
  scores.ties = 0;
  localStorage.removeItem("score");
  updateScore();
}
function confirmReset() {
  let html = `<div class="js-confirm">
 <p>Do you want to reset the score?</p>
 <div>
  <button class="js-yes">Yes</button>
 <button class="js-no">No</button>
 </div>
 </div>`;
  if (scores.wins || scores.losses || scores.ties === 1) {
    document.querySelector(".confirmation").innerHTML = html;
      document.querySelector(".js-yes").addEventListener("click", () => {
        resetButton();
        hideconfirmReset();
      });
      document.querySelector(".js-no").addEventListener("click", () => {
        hideconfirmReset();
      });    
  }
}
function hideconfirmReset() {
  document.querySelector(".confirmation").innerHTML = "";
}

