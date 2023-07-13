'use strict';

const player0Element = document.querySelector('.player--0'); //player 0 section
const player1Element = document.querySelector('.player--1'); //player 1 section
const score0Element = document.querySelector('#score--0'); //method 1 to access id elements, using '#' with the elementId
const score1Element = document.getElementById('score--1'); //another and quicker method to access id elements
const current0Score = document.getElementById('current--0');
const current1Score = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//Starting Conditions
const init = function () {
  //Initialize the game variable and state
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Score.textContent = 0;
  current1Score.textContent = 0;

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
  diceElement.classList.remove('hidden');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

const shoutWinner = function () {
  document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  //btnHold.removeEventListener('click', holdScores);
  //btnRoll.removeEventListener('click', rollDice);
  diceElement.classList.add('hidden');
};

const rollDice = function () {
  if (playing) {
    //What to do when a dice is rolled
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `img/dice-${dice}.png`;

    //3.Checked for rolled =1 or not
    if (dice !== 1) {
      //Add dice to score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
};

const holdScores = function () {
  if (playing) {
    //1. Add current score to player
    scores[activePlayer] += currentScore;
    //console.log('hi');
    //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    //2. Check if score is >= 100, then finish the game

    if (scores[activePlayer] >= 100) {
      playing = false;
      shoutWinner();
      //Finish the game
    } else {
      switchPlayer();
    }
  }
};

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScores);
btnNew.addEventListener('click', init);
