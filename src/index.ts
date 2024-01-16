 // accessing html elements from index.html

 // defining types.

type ElementButtonOrNull = HTMLButtonElement | null;
type ElementPara = HTMLParagraphElement | null;
type htmlElement = HTMLElement | null;

 // Roll Dice Button
 let rollButton: ElementButtonOrNull = document.querySelector('.btn--roll');
 // Hold Button
 let holdButton: ElementButtonOrNull = document.querySelector('.btn--hold');
 // New Game Button
 let newGameButton: ElementButtonOrNull = document.querySelector('.btn--new');
 // selector for Dice
 let diceCube: HTMLImageElement | null = document.querySelector('.dice');

 // Selecting Elements

 const score0Element: ElementPara = document.querySelector('#score--0');
 const score1Element: ElementPara = document.querySelector('#score--1');

 // Selecting Current Scores

 let currentScore0: htmlElement = document.getElementById('current--0');
 let currentScore1: htmlElement = document.getElementById('current--1');

 // Selecting player section elements
 const player0EL: htmlElement = document.querySelector('.player--0');
 const player1EL: htmlElement = document.querySelector('.player--1');
 
 
let scores: number[], currentScore: number, activePlayer: number, playing: boolean;

const init = (): void => {

     // starting conditions

     scores = [0, 0];
     currentScore = 0;
     activePlayer = 0;
     playing = true;
     
     if(score0Element){
         score0Element.textContent = '0';
        }
        
        if(score1Element){
            score1Element.textContent = '0';
        }
        if(currentScore0){
            currentScore0.textContent = '0';
        }
        if(currentScore1){
            currentScore1.textContent = '0';
        }

     diceCube?.classList.add('hidden');

     if(player0EL){
        player0EL.classList.remove('player--winner');
     }

     if(player1EL){
        player1EL?.classList.remove('player--winner');
     }
     if(player0EL){
        player0EL.classList.add('player--active');
     }

     if(player1EL){
        player1EL.classList.remove('player--active');
     }
}
init();

// Switch player function

let switchPlayer = (): void => {
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;

    if (currentScore0 && currentScore1) {
        currentScore0.textContent = '0';
        currentScore1.textContent = '0';
    }
    
    // toggle animation

    player0EL?.classList.toggle('player--active');
    player1EL?.classList.toggle('player--active');
}



// Rolling dice functionality
if (rollButton) {
    rollButton.addEventListener('click', function () {
        // if playing the game
if(playing){
        // 1. Generating a random dice roll
        const dice: number = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice
        if (diceCube) {
            diceCube.classList.remove('hidden');
            diceCube.src = `images/dice-${dice}.png`;
        }

        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;

            let activatePlayerElement: HTMLElement | null = document.getElementById(`current--${activePlayer}`);

            if (activatePlayerElement) {
                activatePlayerElement.textContent = currentScore.toString();
            }

            if (activePlayer === 0 && currentScore0) {
                currentScore0.textContent = currentScore.toString();
            } else if (activePlayer === 1 && currentScore1) {
                currentScore1.textContent = currentScore.toString();
            }     

        } else {
            // Switch to the next player and reset currentScore to 0
          switchPlayer();
        } }
    });

}

// Logic for button hold.

if(holdButton){
    holdButton.addEventListener('click', function(){
        
        // if playing the game
if(playing){
// 1. Add current score to active player's score
scores[activePlayer] += currentScore; // scores[1] = scores[1] + currentScore;
 
let holdActivePlayer: htmlElement = document.getElementById(`score--${activePlayer}`);
if(holdActivePlayer){
    holdActivePlayer.textContent = scores[activePlayer].toString();
}

// 2. check if player's score is >= 100
if(scores[activePlayer] >= 100){
    // Finish the game
    playing = false;

    let playerWinner = document.querySelector(`.player--${activePlayer}`);
   
    if(playerWinner){
        playerWinner.classList.add('player--winner');
        playerWinner.classList.remove('player--active');
    }

    // disabling everything after the player wins
    diceCube?.classList.add('hidden');
    
   
 

} else {
    
// Switch to the next player
switchPlayer();
}
}
    });
}

// Resetting the game

if(newGameButton){
    newGameButton.addEventListener('click', init);
}