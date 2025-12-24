const actions = [
    "Salta en un pie",
    "Salta como rana",
    "Camina como robot",
    "Camina como pingüino",
    "Imita a un mono",
    "Imita a un perro",
    "Imita a un gato",
    "Da una vuelta completa",
    "Gira la cabeza lentamente",
    "Mueve los hombros",
    "Sacude los brazos",
    "Marcha en el sitio",
    "Haz como si nadaras",
    "Remo imaginario",
    "Estírate como gato",
    "Respira profundo y suelta",
    "Haz cara de sorpresa",
    "Haz cara de enojo",
    "Ríe fuerte",
    "Ríe en silencio",
    "Camina en cámara lenta",
    "Muévete como zombie",
    "Muévete como superhéroe",
    "Lanza un beso",
    "Saluda como reina o rey",
    "Finge que empujas una pared",
    "Finge que jalas una cuerda",
    "Haz equilibrio con un pie",
    "Haz una pose divertida",
    "Haz una pose de estatua"
];

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

    // Reset styles
    gameText.style.color = '';

    currentCountdownInterval = startCountdown(gameText, () => {
        runGameLoop(seconds);
    });
}

function runGameLoop(seconds) {
    showRandomAction();
    gameInterval = setInterval(showRandomAction, seconds * 1000);
}

function showRandomAction() {
    const randomAction = actions[Math.floor(Math.random() * actions.length)];

    // Animation reset
    gameText.style.animation = 'none';
    gameText.offsetHeight;
    gameText.style.animation = 'fadeIn 0.5s ease-out';

    // Restore default gradient styles if they were removed by other games sharing this (unlikely but safe)
    gameText.style.background = 'var(--title-gradient)';
    gameText.style.webkitBackgroundClip = 'text';
    gameText.style.webkitTextFillColor = 'transparent';
    gameText.style.color = 'transparent'; // Fallback

    gameText.textContent = randomAction;
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
    // Reset specific styles
    gameText.style.background = 'var(--title-gradient)';
    gameText.style.webkitBackgroundClip = 'text';
    gameText.style.webkitTextFillColor = 'transparent';
}
