//Randomly generate number between 0 to 2 and return the move choice according to number
//0 = rock || 1 = paper || 2 = scissors 
function getComputerChoice(){
    const choice = Math.floor(Math.random() * 3);

    if(choice == 0){
        return 'rock';
    }
    else if(choice == 1){
        return 'paper';
    }
    else if(choice == 2){
        return 'scissors';
    }
}

let humanScore = 0;
let computerScore = 0;

let humanChoice;
let computerChoice;

//find winner and add score
function playRound(humanChoice,computerChoice){

    humanChoice = humanChoice.toLowerCase();
    let isWin = false;
    if(humanChoice == 'rock' && computerChoice == 'scissors'){
        isWin = true;
    }
    else if (humanChoice == 'paper' && computerChoice == 'rock'){
        isWin = true;
    }
    else if (humanChoice == 'scissors' && computerChoice == 'paper'){
        isWin = true;
    }

    if(isWin){
        console.log(`You win! ${humanChoice} beats ${computerChoice}.`);
        humanScore++;
    }
    else if(!isWin && humanChoice == computerChoice){
        console.log(`Tie! You both pick ${humanChoice}.`);
    }
    else{
        console.log(`You lose! ${computerChoice} beats ${humanChoice}.`);
        computerScore++;
    }
    
    let event = new Event("round-end");
    document.dispatchEvent(event);
}


function initButtonListener(){
    let buttonList = Array.from(document.querySelectorAll("button"));

    buttonList.forEach((button) => {
        button.addEventListener("click",(e) => {
            humanChoice = e.target.textContent;
            computerChoice = getComputerChoice();
            playRound(humanChoice,computerChoice);
        })
    });
}


function initRoundInfoElement(){
    const roundInfo = document.querySelector("#round-info");
    const info = document.createElement("p");
    
    const humanChoiceText = document.createElement("p");
    humanChoiceText.classList.add("human-color")
    humanChoiceText.textContent = `Human: `;
    roundInfo.appendChild(humanChoiceText);

    const computerChoiceText = document.createElement("p");
    computerChoiceText.classList.add("computer-color")
    computerChoiceText.textContent = `Computer: `;
    roundInfo.appendChild(computerChoiceText);

    const roundWinner = document.createElement("p");
    roundWinner.id = "round-winner";
    roundInfo.appendChild(roundWinner);
}

function initScoreCounterElement(){
    const scoreCounter = document.querySelector("#score-counter");

    const humanScoreText = document.createElement("p");
    humanScoreText.classList.add("human-color")
    humanScoreText.textContent = `Human: ${humanScore}`;
    scoreCounter.appendChild(humanScoreText);   

    const computerScoreText = document.createElement("p");
    computerScoreText.classList.add("computer-color")
    computerScoreText.textContent = `Computer: ${computerScore}`;
    scoreCounter.appendChild(computerScoreText);
}


function updateUI(){
    const humanInfo = document.querySelector("#round-info .human-color");
    const computerInfo = document.querySelector("#round-info .computer-color");
    const roundWinner = document.querySelector("#round-winner");

    humanInfo.textContent = `Human: ${humanChoice}`;
    computerInfo.textContent = `Computer: ${computerChoice}`;
    

    const humanScoreText = document.querySelector("#score-counter .human-color");
    const computerScoreText = document.querySelector("#score-counter .computer-color");
    
    humanScoreText.textContent = `Human: ${humanScore}`;
    computerScoreText.textContent = `Computer: ${computerScore}`;
}


function init(){
    initButtonListener();
    initRoundInfoElement();
    initScoreCounterElement();
    
    document.addEventListener("round-end",() => {
        updateUI();
    });
}

init();
