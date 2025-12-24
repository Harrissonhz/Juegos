let currentCountdownInterval = null;
let timerInterval = null;
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
    if (isNaN(seconds) || seconds < 1 || seconds > 60) {
        alert("Por favor selecciona un tiempo entre 1 y 60 segundos.");
        return;
    }

    startBtn.disabled = true;
    stopBtn.disabled = false;
    intervalInput.disabled = true;

    // Reset styles for countdown
    gameText.style.color = '';
    gameText.style.textShadow = '';
    gameText.style.background = '';
    gameText.style.webkitBackgroundClip = '';
    gameText.style.webkitTextFillColor = '';

    // Start Countdown using the shared function from app.js
    currentCountdownInterval = startCountdown(gameText, () => {
        // After countdown completes, start the timer
        startTimer(seconds);
    });
}

function startTimer(seconds) {
    let timeLeft = seconds;

    // Show initial time
    gameText.style.background = 'var(--title-gradient)';
    gameText.style.webkitBackgroundClip = 'text';
    gameText.style.webkitTextFillColor = 'transparent';
    gameText.style.backgroundClip = 'text';
    gameText.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;

        // Animation reset
        gameText.style.animation = 'none';
        gameText.offsetHeight;
        gameText.style.animation = 'fadeIn 0.5s ease-out';

        if (timeLeft > 0) {
            gameText.textContent = timeLeft;
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            gameText.textContent = "¡Tiempo completado!";
        }
    }, 1000);
}

function stopGame() {
    if (currentCountdownInterval) {
        clearInterval(currentCountdownInterval);
        currentCountdownInterval = null;
    }
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    startBtn.disabled = false;
    stopBtn.disabled = true;
    intervalInput.disabled = false;

    gameText.textContent = "Juego Detenido";
    gameText.style.color = 'var(--text-color)';
    gameText.style.textShadow = 'none';
    gameText.style.background = '';
    gameText.style.webkitBackgroundClip = '';
    gameText.style.webkitTextFillColor = '';
}

