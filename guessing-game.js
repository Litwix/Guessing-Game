class Game {
    constructor() {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }

    difference() {
        return Math.abs(this.playersGuess - this.winningNumber);
    }

    checkGuess() {
        let feedback = '';
        if (this.playersGuess === this.winningNumber) {
            feedback = 'You Win!';
        } else if (this.pastGuesses.includes(this.playersGuess)) {
            feedback = 'You have already guessed that number';
        } else {
            this.pastGuesses.push(this.playersGuess);
            document.querySelector('#remaining').innerHTML = `Remaining Guesses: ${5 - this.pastGuesses.length}`;
            document.getElementById(`guess${this.pastGuesses.length}`).innerHTML = this.playersGuess;
            if (this.pastGuesses.length === 5) {
                feedback = `You Lose :( The number was ${this.winningNumber}.`;
            } else {
                let diff = this.difference();
                if (diff < 10) feedback = "You're on fire!";
                else if (diff < 25) feedback = "You're warm";
                else if (diff < 50) feedback = "You're fairly cold";
                else feedback = "You're frozen!";
            }
        }
        document.querySelector('#feedback > h3').innerHTML = feedback;
        if (feedback.includes("Win") || feedback.includes("Lose")) {
            function completeGame() {
                alert(`${feedback}\nPress "OK" to play again`);
                window.location.reload();
            }
            setTimeout(completeGame, 500);
        }
        return feedback;
    }

    playersGuessSubmission(guess) {
        if (guess.toString() === 'NaN') {
            document.querySelector('#feedback > h3').innerHTML = 'Guess must be a number';
            throw 'Guess must be a number';
        } else if (guess < 1 || guess > 100) {
            document.querySelector('#feedback > h3').innerHTML = 'Guess must be between 1-100';
            throw 'Guess must be between 1-100';
        }
        this.playersGuess = guess;
        return this.checkGuess();
    }

    provideHint() {
        const hints = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
        return shuffle(hints);
    }
}

function generateWinningNumber() {
    const num = Math.ceil(Math.random() * 100);
    return num;
}

function shuffle(arr) {
    let m = arr.length, temp, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        temp = arr[m];
        arr[m] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function newGame() {
    return new Game();
}

function playGame() {
    const game = newGame();

    const submit = document.getElementById('submit');
    submit.addEventListener('click', function() {
        const guess = Number(document.querySelector('#input-box').value);
        document.querySelector('#input-box').value = '';
        game.playersGuessSubmission(guess);
    });

    const restart = document.getElementById('restart');
    restart.addEventListener('click', function() {
        window.location.reload();
    });

    const hint = document.getElementById('hint');
    let count = 0;
    hint.addEventListener('click', function() {
        count++;
        if (count === 1) {
            const hintArr = game.provideHint();
            document.querySelector('#hintArray > h3').innerHTML = `Possible answers: ${hintArr.join(', ')}`;
        } else {
            return;
        }
    });
}

playGame();