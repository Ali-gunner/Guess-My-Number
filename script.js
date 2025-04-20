'use strict';

let secretNumber = Number(Math.trunc(Math.random() * 20) + 1);
let score = 20;
let highScore = 0;
let guessHistory = [];

const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const updateHistory = function (guess) {
  guessHistory.push(guess);
  document.querySelector('.history').textContent = guessHistory.join(', ');
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMessage('⛔No number!');
  } else {
    updateHistory(guess);
  }

  if (guess === secretNumber) {
    displayMessage('🎉Correct number!');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    winSound.play();

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈Too high!' : '📉Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥You lost the game!');
      document.querySelector('.score').textContent = 0;
      loseSound.play();
    }
  }

  document.querySelector('.again').addEventListener('click', function () {
    score = 20;
    secretNumber = Number(Math.trunc(Math.random() * 20) + 1);
    displayMessage('Start guessing...');
    document.querySelector('.score').textContent = score;
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').textContent = '?';
    document.querySelector('.number').style.width = '15rem';
    guessHistory = [];
    document.querySelector('.history').textContent = '';
  });
});
