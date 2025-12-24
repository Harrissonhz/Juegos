const colorNames = [
    "Amarillo",
    "Verde",
    "Rojo",
    "Blanco"
];

const colorCodes = {
    "Amarillo": "#FFD700", // Gold/Bright Yellow
    "Verde": "#00FF00",   // Limon/Bright Green
    "Rojo": "#FF0000",    // Pure Red
    "Blanco": "#FFFFFF"
};

let gameInterval = null;
let currentCountdownInterval = null;
const gameText = document.getElementById('game-text');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const intervalInput = document.getElementById('interval-input');

startBtn.addEventListener('click', () => {
    stopGame();
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

    startBtn.disabled = true;
    stopBtn.disabled = false;
    intervalInput.disabled = true;

    // Reset styles for countdown
    gameText.style.color = '';
    gameText.style.textShadow = '';

    currentCountdownInterval = startCountdown(gameText, () => {
        runGameLoop(seconds);
    });
}

function runGameLoop(seconds) {
    showRandomColor();
    gameInterval = setInterval(showRandomColor, seconds * 1000);
}

function showRandomColor() {
    // Pick a random name
    const randomNameIndex = Math.floor(Math.random() * colorNames.length);
    const name = colorNames[randomNameIndex];

    // Pick a random color code, but TRY to make it different from the name for confusion
    // We create a filtered list of possible colors excluding the current name's color if possible
    // Actually, user said "el mismo texto tenga otro color para confundir".
    // So we MUST pick a different color.

    const possibleColors = colorNames.filter(c => c !== name);
    const randomColorName = possibleColors[Math.floor(Math.random() * possibleColors.length)];
    const colorCode = colorCodes[randomColorName];

    // Animation reset
    gameText.style.animation = 'none';
    gameText.offsetHeight;
    gameText.style.animation = 'fadeIn 0.5s ease-out';

    // Remove gradient from base styles so specific color takes effect
    gameText.style.background = 'none';
    gameText.style.webkitBackgroundClip = 'initial';
    gameText.style.webkitTextFillColor = 'initial';

    gameText.textContent = name;
    gameText.style.color = colorCode;

    // Special handling for White color text to ensure visibility against light backgrounds
    if (randomColorName === "Blanco") {
        gameText.style.textShadow = "0px 0px 4px #000000";
    } else {
        gameText.style.textShadow = "none";
    }
}

function stopGame() {
    if (gameInterval) clearInterval(gameInterval);
    if (currentCountdownInterval) clearInterval(currentCountdownInterval);

    gameInterval = null;
    currentCountdownInterval = null;

    startBtn.disabled = false;
    stopBtn.disabled = true;
    intervalInput.disabled = false;

    gameText.textContent = "Juego Detenido";
    gameText.style.color = 'var(--text-color)';
    gameText.style.textShadow = 'none';
    gameText.style.background = ''; // Allow gradient to return if defined in CSS class
}
