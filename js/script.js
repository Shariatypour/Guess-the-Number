const form = document.querySelector('#guess-form');
const input = document.querySelector('#num');
const checkButton = document.querySelector('#sub-btn');
const resetButton = document.querySelector('#reset-btn');
const chance = document.querySelector('#chance');
const hint = document.querySelector('#hint');
const history = document.querySelector('#guess');

const minimum = 1;
const maximum = 20;
const maximumAttempts = 5;

let secretNumber;
let attemptsLeft;
let guesses;
let gameOver;

function updateDisplay() {
    chance.textContent = 'Attempts left: ' + attemptsLeft;
    history.textContent = guesses.length ? guesses.join(', ') : 'No guesses yet.';
    input.disabled = gameOver;
    checkButton.disabled = gameOver;
}

function newGame(moveFocus = true) {
    secretNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    attemptsLeft = maximumAttempts;
    guesses = [];
    gameOver = false;
    input.value = '';
    input.removeAttribute('aria-invalid');
    hint.textContent = 'Ready when you are. Make your first guess!';
    updateDisplay();
    if (moveFocus) input.focus();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (gameOver) return;

    const rawValue = input.value.trim();
    const value = Number(rawValue);
    if (rawValue === '' || !Number.isInteger(value) || value < minimum || value > maximum) {
        input.setAttribute('aria-invalid', 'true');
        hint.textContent = 'Enter a whole number from 1 to 20. No attempt was used.';
        input.focus();
        return;
    }

    input.removeAttribute('aria-invalid');
    if (guesses.includes(value)) {
        hint.textContent = 'You already tried ' + value + '. Choose another number. No attempt was used.';
        input.focus();
        input.select();
        return;
    }

    guesses.push(value);
    attemptsLeft -= 1;

    if (value === secretNumber) {
        gameOver = true;
        hint.textContent = 'You win! The number was ' + secretNumber + '. Attempts used: ' + guesses.length + '.';
    } else if (attemptsLeft === 0) {
        gameOver = true;
        hint.textContent = 'No attempts left. The number was ' + secretNumber + '. Start a new game to try again.';
    } else {
        hint.textContent = value < secretNumber
            ? 'Too low. Try a higher number.'
            : 'Too high. Try a lower number.';
    }

    input.value = '';
    updateDisplay();
    if (gameOver) resetButton.focus();
    else input.focus();
});

resetButton.addEventListener('click', () => newGame());
newGame(false);
