//Randomly generate number between 0 to 2 and return the move choice according to number
//0 = rock || 1 = paper || 2 = scissors 
function getComputerChoice(){
    const choice = Math.floor(Math.random() * 3);

    if(choice == 0){
        return 'Rock';
    }
    else if(choice == 1){
        return 'Paper';
    }
    else if(choice == 2){
        return 'Scissors';
    }
}

let humanScore = 0;
let computerScore = 0;

let humanChoice;
let computerChoice;

function checkRoundWinner(){
    let isHumanWin = false;
    
    if(humanChoice == 'Rock' && computerChoice == 'Scissors'){
        isHumanWin = true;
    }
    else if (humanChoice == 'Paper' && computerChoice == 'Rock'){
        isHumanWin = true;
    }
    else if (humanChoice == 'Scissors' && computerChoice == 'Paper'){
        isHumanWin = true;
    }

    if(isHumanWin){
        return 'human';
    }
    else if(!isHumanWin && humanChoice === computerChoice){
        return 'none';
    }
    else{
        return 'computer';
    }

}


function playRound(){

    let roundWinner = checkRoundWinner();
    
    switch(roundWinner){
        case "human":
            console.log(`You win! ${humanChoice} beats ${computerChoice}.`);
            humanScore++;
            break;
        case "computer":
            console.log(`You lose! ${computerChoice} beats ${humanChoice}.`);
            computerScore++;
            break;
        case "none":
            console.log(`Tie! You both pick ${humanChoice}.`);
            break; 
    }
    
    let event ;
    event = new Event("round-end");
    document.dispatchEvent(event);

    if(checkGameWinner() != undefined){
        event = new Event("game-end");
        document.dispatchEvent(event);
    }
    
}


function initButton(){
    let buttonList = Array.from(document.querySelectorAll(".choice-button"));

    buttonList.forEach((button) => {
        button.addEventListener("click",(e) => {
            humanChoice = e.target.textContent;
            computerChoice = getComputerChoice();
            playRound();
        })
    });

    const playAgainButton = document.querySelector("#play-again-button");
    playAgainButton.hidden = true;
    
    playAgainButton.addEventListener("click",() => {
        humanScore = 0;
        computerScore = 0;

        humanChoice = null;
        computerChoice = null;
        resetUI();
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



function updateRoundUI(){
    const humanInfo = document.querySelector("#round-info .human-color");
    const computerInfo = document.querySelector("#round-info .computer-color");
    const roundWinnerText = document.querySelector("#round-winner");

    humanInfo.textContent = `Human: ${humanChoice}`;
    computerInfo.textContent = `Computer: ${computerChoice}`;
    

    roundWinnerText.className = '';
    
    const roundWinner = checkRoundWinner();
    switch(roundWinner){
        case "human":
            roundWinnerText.classList.add("win-color");
            roundWinnerText.textContent = "Human Win";
            break;
        case "computer":
            roundWinnerText.classList.add("lose-color");
            roundWinnerText.textContent = "Computer Win";
            break;
        case "none":
            roundWinnerText.classList.add("tie-color");
            roundWinnerText.textContent = "Tie";
            break;
    }

    const humanScoreText = document.querySelector("#score-counter .human-color");
    const computerScoreText = document.querySelector("#score-counter .computer-color");
    
    humanScoreText.textContent = `Human: ${humanScore}`;
    computerScoreText.textContent = `Computer: ${computerScore}`;

}

function resetUI(){
    let buttonList = Array.from(document.querySelectorAll(".choice-button"));
    buttonList.forEach((button) => {
        button.disabled = false;
    });

    let roundInfoElements = Array.from(document.querySelector("#round-info").children);
    roundInfoElements.forEach((element) =>  {

        if(element.getAttribute("class") || element.getAttribute("id"))
        {
            element.remove();
        }
    });
    
    let scoreCounterElements = Array.from(document.querySelector("#score-counter").children);
    scoreCounterElements.forEach((element) =>  {

        if(element.getAttribute("class") || element.getAttribute("id"))
        {
            element.remove();
        }
    });

    const gameWinner = document.querySelector("#game-winner span");
    gameWinner.classList.remove(gameWinner.classList);
    gameWinner.textContent = "";

    const playAgainButton = document.querySelector("#play-again-button");
    playAgainButton.hidden = true;

    initRoundInfoElement();
    initScoreCounterElement();
}

function checkGameWinner(){
    if(humanScore >= 5){
        return "human";
    }
    else if(computerScore >= 5){
        return "computer";
    }
}

//show winner and disable button
function updateEndgameUI(){
    const winner = checkGameWinner(); 
    if(winner != undefined){
        const gameWinner = document.querySelector("#game-winner span");
        
        switch(winner){
            case "human":
                gameWinner.classList.add("win-color");
                gameWinner.textContent = "Human";
                break;
            case "computer":
                gameWinner.classList.add("lose-color");
                gameWinner.textContent = "Computer";
                break;
        }
    }

    const buttonList = Array.from(document.querySelectorAll(".choice-button"));

    buttonList.forEach((button) => {
        button.disabled = true;
    });

    const playAgainButton = document.querySelector("#play-again-button");
    playAgainButton.hidden = false;
}

function init(){
    initButton();
    initRoundInfoElement();
    initScoreCounterElement();
    
    document.addEventListener("round-end",() => {
        updateRoundUI();
    });

    document.addEventListener("game-end",() => {
        updateEndgameUI();
    });
}

init();
