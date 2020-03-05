/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, diceDOM, gamePlaying, previousRoll, winScore;

newGame();


document.getElementById('win-score').addEventListener('change', function() {
    document.getElementById('win-score').disabled = true;
});

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        document.getElementById('win-score').disabled = true;
        document.getElementById('message').textContent = '';
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        dice = [dice1,dice2];

        diceDOM1.style.display = 'block';
        diceDOM1.src = 'imgs/dice-' + dice[0] + '.png';

        diceDOM2.style.display = 'block';
        diceDOM2.src = 'imgs/dice-' + dice[1] + '.png';
        //3. update the round score if the rolled number was not a one
        
        if (dice[0] === 1 || dice[1] === 1) {
            document.getElementById('message').textContent = "you rolled a one. lose your round score";
            nextPlayer();
        } else if (dice[0] === 6 || dice[1]===6) {
            if (dice[0] === dice[1]) {
                document.getElementById('message').textContent = "you rolled a double 6. lose your score";
                document.querySelector('#current-' + activePlayer).textContent = 0;
                document.querySelector('#score-' + activePlayer).textContent = 0;
                nextPlayer(); 
            } else if (dice[0] === previousRoll[activePlayer][0] || dice[1] === previousRoll[activePlayer][1] ) {
                document.getElementById('message').textContent = "you rolled a double 6. lose your score";
                document.querySelector('#current-' + activePlayer).textContent = 0;
                document.querySelector('#score-' + activePlayer).textContent = 0;
                nextPlayer(); 
            } else {
                roundScore += dice[0] + dice[1];
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                previousRoll[activePlayer] = dice;
            }
        } else {
            roundScore += dice[0] + dice[1];
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            previousRoll[activePlayer] = dice;
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        winScore = document.getElementById("win-score").value;
        console.log(winScore);
        // add hold score to player score
        scores[activePlayer] += roundScore;
        previousRoll[activePlayer] = [0,0];
        // update UI 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // check player won game
        if (scores[activePlayer] >= winScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!!!!';
            diceDOM1.style.display = 'none';
            diceDOM2.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel' ).classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel' ).classList.add('winner');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', newGame);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    previousRoll = [[0,0],[0,0]];   
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    diceDOM1.style.display = 'none';
    diceDOM2.style.display = 'none';
}

function newGame() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    previousRoll = [[0,0],[0,0]];
    gamePlaying = true;
    diceDOM1 = document.querySelector('.dice-1');
    diceDOM2 = document.querySelector('.dice-2');

    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
    document.getElementById("win-score").defaultValue = "100";
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
    document.getElementById('win-score').disabled = false;
    document.getElementById('message').textContent = '';
}
