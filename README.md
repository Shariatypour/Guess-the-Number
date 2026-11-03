# Guess the Number

A small number-guessing game built with HTML, CSS, and vanilla JavaScript. Find a secret whole number using higher/lower hints. Choose Easy (1–20, 5 attempts), Medium (1–50, 6 attempts), or Hard (1–100, 7 attempts).

## Live demo

[Play Guess the Number](https://shariatypour.github.io/Guess-the-Number/)

## Preview

![Guess the Number v1.2 with a difficulty selector, saved personal best, remaining attempts, and labeled guess controls](docs/preview.png)

## Rules

- Each round chooses a random integer within the selected level's range, including both endpoints.
- Changing difficulty immediately starts a new round and clears guesses. New game keeps the selected level.
- Each valid, new guess uses one attempt.
- Empty, fractional, out-of-range, and repeated guesses do not use attempts.
- A wrong guess tells you whether to try a higher or lower number.
- A correct guess wins, including on the final attempt.
- Using all attempts without a correct guess ends the round and reveals the number.
- Input and submission are disabled after a win or loss.
- **New game** resets the round and chooses a fresh random number. The same number may occur again by chance.

## Personal bests

The fewest accepted guesses in a winning round is saved separately for each difficulty. A loss, tie, or slower win does not replace a better record. New game and difficulty changes keep records.

Records use `localStorage` on this browser and site origin; they are not synced across devices. Clearing site data removes them. If storage is blocked, the game continues and keeps records only for the current visit. Stored values are validated before use.

## Run locally

1. Download the repository through **Code → Download ZIP** and extract it, or clone it:

   ```sh
   git clone https://github.com/Shariatypour/Guess-the-Number.git
   cd Guess-the-Number
   ```

2. Open `index.html` in your browser. Keep the `css` and `js` folders beside it.
3. Optionally, serve the folder with VS Code's Live Server extension.

No dependencies, build step, API keys, or backend are needed.

## Controls and accessibility

| Control | Action |
| --- | --- |
| Difficulty | Select a level and start a fresh round |
| Number input | Enter a whole number within the selected range |
| Check number / Enter in the input | Submit a guess |
| Tab / Shift + Tab | Navigate enabled controls |
| Enter / Space on a focused button | Activate the button |
| New game | Reset attempts, history, input, and game status |

The input has a visible label, invalid values receive `aria-invalid`, and feedback uses a status region. When the round ends, focus moves to **New game**; starting a new round returns focus to the input.

## How it works

The `levels` object defines each level's range and attempt limit. `newGame()` reads the selected level and updates the rules, input limit, and round state. Changing levels keeps focus on the selector for keyboard navigation.

The game stores four pieces of round state:

- `secretNumber`: the number to find.
- `attemptsLeft`: the remaining guesses.
- `guesses`: the accepted guesses for this round.
- `gameOver`: whether the round has ended.

A random number is generated with:

```js
Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
```

Input validation runs **before** adding a guess or reducing attempts. The win check runs **before** the zero-attempt check so a correct final guess still wins. `updateDisplay()` keeps the controls and visible state synchronized; `newGame()` restores the initial state.

All game state exists in the browser. Refreshing the page starts a new round; round progress is not saved or submitted to a server. Personal bests are saved locally in the browser. This is a learning game, not a tamper-resistant competition.

## Project structure

```text
Guess-the-Number/
├── index.html       # Rules, labeled form, feedback, and history
├── css/style.css    # Responsive layout and focus styles
├── js/script.js     # Random number, validation, outcomes, and reset
└── docs/preview.png # Screenshot of the initial game
```

## Validation

Controlled logic checks covered empty/invalid/repeated input, higher/lower hints, normal and fifth-attempt wins, loss, submissions after completion, reset, and random endpoints 1 and 20.

Browser checks covered Enter submission, empty and repeated guesses, a winning round using visible hints, a five-guess losing round, disabled controls at completion, keyboard restart, and a 320px layout without horizontal overflow. No warning/error logs were recorded during these checks.

A screen-reader speech audit and a complete browser/device compatibility audit have not been performed.

## Project status

See [pull request #1](https://github.com/Shariatypour/Guess-the-Number/pull/1) for the implementation and validation history. The live demo is hosted on GitHub Pages.
