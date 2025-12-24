const phrases = [
    "Patitos al Agua",
    "Patitos a Tierra",
    "Patitos al Aire"
];

let gameInterval = null;
// Store countdown interval to clear it if stop is pressed during countdown
let currentCountdownInterval = null;

const gameText = document.getElementById('game-text');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const intervalInput = document.getElementById('interval-input');

startBtn.addEventListener('click', () => {
    stopGame(); // Ensure clean state
    startGame();
});
stopBtn.addEventListener('click', stopGame);

function startGame() {
    let seconds = parseInt(intervalInput.value);

    // Validation
    if (isNaN(seconds) || seconds < 1 || seconds > 5) {
        alert("Por favor selecciona un tiempo entre 1 y 5 segundos.");
        return;
    }

    // Update UI state immediately
    startBtn.disabled = true;
    stopBtn.disabled = false;
    intervalInput.disabled = true;

    // Start Countdown
    // Note: startCountdown is defined in app.js which is loaded before this script
    currentCountdownInterval = startCountdown(gameText, () => {
        runGameLoop(seconds);
    });
}

function runGameLoop(seconds) {
    // Initial run immediately
    showRandomPhrase();

    // Set interval
    gameInterval = setInterval(showRandomPhrase, seconds * 1000);
}

function stopGame() {
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }

    // Also clear countdown if it's running
    // Note: We need to modify app.js to return the interval ID if we want to be strictly correct,
    // but for now, checking logic: startCountdown was implemented to return it.
    // However, since app.js is global, we can't easily clear the interval created inside it 
    // without storing it. I updated app.js to return it.
    // But since the interval variable inside startCountdown is local scope, 
    // we rely on the return value.
    if (currentCountdownInterval) {
        clearInterval(currentCountdownInterval);
        currentCountdownInterval = null;
    }

    // Update UI state
    startBtn.disabled = false;
    stopBtn.disabled = true;
    intervalInput.disabled = false;

    gameText.textContent = "Juego Detenido";
}

function showRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    const phrase = phrases[randomIndex];

    // Simple animation reset
    gameText.style.animation = 'none';
    gameText.offsetHeight; /* trigger reflow */
    gameText.style.animation = 'fadeIn 0.5s ease-out';

    gameText.textContent = phrase;
}
