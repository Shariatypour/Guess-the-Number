const form = document.querySelector('#guess-form');
const input = document.querySelector('#num');
const checkButton = document.querySelector('#sub-btn');
const resetButton = document.querySelector('#reset-btn');
const chance = document.querySelector('#chance');
const hint = document.querySelector('#hint');
const history = document.querySelector('#guess');

const difficulty = document.querySelector('#difficulty');
const rules = document.querySelector('#rules');
const levels = {
    easy: { label: 'Easy', maximum: 20, attempts: 5 },
    medium: { label: 'Medium', maximum: 50, attempts: 6 },
    hard: { label: 'Hard', maximum: 100, attempts: 7 }
};
const bestScore = document.querySelector('#best-score');
const storageNote = document.querySelector('#storage-note');
const storageKey = 'guess-the-number.best-scores.v1';
let storageAvailable = true;

function loadRecords() {
    const records = {};
    try {
        const saved = JSON.parse(localStorage.getItem(storageKey));
        if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
            for (const key of Object.keys(levels)) {
                const score = saved[key];
                if (Number.isInteger(score) && score >= 1 && score <= levels[key].attempts) {
                    records[key] = score;
                }
            }
        }
    } catch {
        // Invalid or blocked storage must never stop a round.
        storageAvailable = false;
    }
    return records;
}

const records = loadRecords();

function updateRecord() {
    const key = difficulty.value;
    if (records[key] === undefined || guesses.length < records[key]) {
        records[key] = guesses.length;
        try {
            localStorage.setItem(storageKey, JSON.stringify(records));
        } catch {
            storageAvailable = false;
        }
    }
}

const minimum = 1;
let maximum;
let maximumAttempts;

let secretNumber;
let attemptsLeft;
let guesses;
let gameOver;

function updateDisplay() {
    const key = difficulty.value;
    const score = records[key];
    bestScore.textContent = 'Best on ' + levels[key].label + ': ' +
        (score === undefined ? 'no wins yet.' : score + (score === 1 ? ' guess.' : ' guesses.'));
    storageNote.textContent = storageAvailable
        ? 'Records are saved only in this browser.'
        : 'Storage unavailable. Records last only for this visit.';
    chance.textContent = 'Attempts left: ' + attemptsLeft;
    history.textContent = guesses.length ? guesses.join(', ') : 'No guesses yet.';
    input.disabled = gameOver;
    checkButton.disabled = gameOver;
}

function newGame(moveFocus = true) {
    const level = levels[difficulty.value];
    maximum = level.maximum;
    maximumAttempts = level.attempts;
    input.max = String(maximum);
    rules.textContent = 'Find a whole number from 1 to ' + maximum + '. You have ' + maximumAttempts + ' attempts.';
    secretNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    attemptsLeft = maximumAttempts;
    guesses = [];
    gameOver = false;
    input.value = '';
    input.removeAttribute('aria-invalid');
    hint.textContent = level.label + ' round ready. Make your first guess!';
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
        hint.textContent = 'Enter a whole number from 1 to ' + maximum + '. No attempt was used.';
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
        updateRecord();
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
difficulty.addEventListener('change', () => newGame(false));
newGame(false);
