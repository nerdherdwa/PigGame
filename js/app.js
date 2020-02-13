/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, diceDOM;

newGame();


document.querySelector('.btn-roll').addEventListener('click', function() {
    var dice = Math.floor(Math.random() * 6) + 1;
    
    
    diceDOM.style.display = 'block';
    diceDOM.src = '/imgs/dice-' + dice + '.png';
    //3. update the round score if the rolled number was not a one
    if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    // add hold score to player score
    scores[activePlayer] += roundScore;
    // update UI 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    // check player won game
    if (scores[activePlayer] >= 100) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!!!!';
        diceDOM.style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel' ).classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel' ).classList.add('winner');
    } else {
        nextPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', newGame);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
        
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    diceDOM.style.display = 'none';
}

function newGame() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;

    diceDOM = document.querySelector('.dice');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-0-panel' ).classList.add('active');
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
}
