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

// return player input string
function getHumanChoice(){
    return prompt('Input your choice');
}

let humanScore = 0;
let computerScore = 0;

//get input from player and generate computer move
//show who win the round and add one point to their score
function playRound(humanChoice,computerChoice){
    const _computerChoice = computerChoice();
    const _humanChoice = humanChoice().toLowerCase();

    let isWin = false;

    if(_humanChoice == 'rock' && _computerChoice == 'scissors'){
        isWin = true;
    }
    else if (_humanChoice == 'paper' && _computerChoice == 'rock'){
        isWin = true;
    }
    else if (_humanChoice == 'scissors' && _computerChoice == 'paper'){
        isWin = true;
    }

    if(isWin && _humanChoice == _computerChoice){
        console.log("Tie!");
    }
    else if(isWin){
        console.log(`You win! ${_humanChoice} beats ${_computerChoice}`);
        humanScore++;
    }
    else{
        console.log(`You lose! ${_computerChoice} beats ${_humanChoice}`);
        computerScore++;
    }

}

