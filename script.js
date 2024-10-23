const wordList = [
    "apple", "berry", "cherry", "grape", "mango",
    "peach", "plum", "lemon", "orange", "melon",
    "table", "chair", "glass", "stone", "bread",
    "water", "music", "plant", "shirt", "sweet"
];

let currentWord = '';
let attempts = 0;
let gameActive = true; // Track the game state

function startGame() {
    currentWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    console.log("Current word:", currentWord); // Debugging line
    document.getElementById('game').innerHTML = '';
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            document.getElementById('game').appendChild(cell);
        }
    }
}

document.getElementById('submit').addEventListener('click', submitGuess);
document.getElementById('input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        submitGuess();
    }
});

function submitGuess() {
    if (!gameActive) return; // Prevent guesses if the game is not active
    
    const input = document.getElementById('input').value.toUpperCase();
    if (input.length === 5 && wordList.includes(input.toLowerCase())) {
        checkGuess(input);
        attempts++;
        document.getElementById('input').value = '';
    } else {
        alert('Please enter a valid 5-letter word from the word list.');
    }
}

function checkGuess(guess) {
    const cells = document.querySelectorAll('.cell');
    let correctLetters = new Array(5).fill(false);
    let guessLetters = {};

    // First pass: Check for correct letters in the correct position
    for (let i = 0; i < 5; i++) {
        const cell = cells[attempts * 5 + i];
        cell.innerText = guess[i]; // Display the guessed letter
        if (guess[i] === currentWord[i]) {
            cell.classList.add('correct');
            correctLetters[i] = true;
        } else {
            guessLetters[guess[i]] = (guessLetters[guess[i]] || 0) + 1;
        }
    }

    // Second pass: Check for correct letters in the wrong position
    for (let i = 0; i < 5; i++) {
        if (!correctLetters[i]) {
            const cell = cells[attempts * 5 + i];
            if (currentWord.includes(guess[i]) && guessLetters[guess[i]] > 0) {
                cell.classList.add('present');
                guessLetters[guess[i]]--;
            } else {
                cell.classList.add('absent');
            }
        }
    }

    // Check for win/lose conditions
    if (guess === currentWord) {
        gameActive = false; // End the game when the player wins
        const winMessageContainer = document.getElementById('winMessageContainer');
        const blur = document.getElementById('blur');
        winMessageContainer.style.display = 'block'; // Show the win message container
        blur.style.display = 'block'; // Show the blur overlay
        
        // Trigger the animations
        setTimeout(() => {
            winMessageContainer.style.opacity = 1; // Fade in the message
            blur.style.opacity = 1; // Fade in the blur
        }, 10); // Small timeout to ensure display

        setTimeout(() => {
            winMessageContainer.style.opacity = 0; // Fade out the message
            blur.style.opacity = 0; // Fade out the blur
        }, 3000); // Show for 3 seconds

        setTimeout(() => {
            winMessageContainer.style.display = 'none'; // Hide after fading out
            blur.style.display = 'none'; // Hide the blur
        }, 3500); // 0.5 seconds after fading out
    } else if (attempts === 5) {
        gameActive = false; // End the game when the player loses
        const loseMessageContainer = document.getElementById('loseMessageContainer');
        const loseWord = document.getElementById('loseWord'); // Get the lose word element
        const blur = document.getElementById('blur');
        loseMessageContainer.style.display = 'block'; // Show the lose message container
        loseWord.innerText = `The word was: ${currentWord}`; // Display the lost word
        blur.style.display = 'block'; // Show the blur overlay

        // Trigger the animations
        setTimeout(() => {
            loseMessageContainer.style.opacity = 1; // Fade in the message
            blur.style.opacity = 1; // Fade in the blur
        }, 10); // Small timeout to ensure display

        setTimeout(() => {
            loseMessageContainer.style.opacity = 0; // Fade out the message
            blur.style.opacity = 0; // Fade out the blur
        }, 3000); // Show for 3 seconds

        setTimeout(() => {
            loseMessageContainer.style.display = 'none'; // Hide after fading out
            blur.style.display = 'none'; // Hide the blur
        }, 3500); // 0.5 seconds after fading out
    }
}

startGame();
