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
}


function initButtonListener(){
    let buttonList = Array.from(document.querySelectorAll("button"));

    buttonList.forEach((button) => {
        button.addEventListener("click",(e) => {
            playRound(e.target.textContent,getComputerChoice())
            
        })
    });
}

initButtonListener();
