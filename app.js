/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlaying, sixRule;

init();

// selects the score from the first player and sets it to the random dice number
// selects the score from the first player and sets it to the random dice number *can alter htlm 
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em';

// read a variable from html
var x = document.querySelector('#score-0').textContent;
console.log(x);

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

//hide the dice in the beggining of the game - css style method 'style' and property 'display' and value 'none'
document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
    //Random number
    dice = Math.floor(Math.random() * 6) + 1;

    // Display the result
    var diceDOM = document.querySelector('.dice'); 
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png'; 

    if(dice !== 1){
        //Add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        if(dice === 6){
            if(sixRule[0] === activePlayer && sixRule[1] === 6){
                document.querySelector('#current-' + activePlayer).textContent = 0;
                document.querySelector('#score-' + activePlayer).textContent = 0;
            }
            sixRule = [activePlayer, 6];
        }
    } else {
        nextPlayer();
    }
}
})

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // Update the UI 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    if(scores[activePlayer] >= 20) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else{
        // Next player
        nextPlayer();
    }
}
})

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
    //Change player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';    
    document.getElementById('current-1').textContent = '0';
    
    // Change classes from active to inactive
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

function init(){
    gamePlaying = true;
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}




