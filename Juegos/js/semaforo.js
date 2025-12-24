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
    "Haz una pose de estatua",
    "Simula que te persigue una abeja",
    "Haz el paso de la luna (Moonwalk)",
    "Canta ópera dramáticamente",
    "Haz como si estuvieras en un terremoto",
    "Camina como si el piso quemara",
    "Haz cara de haber comido limón",
    "Baila como abuelito",
    "Toca la guitarra imaginaria con la lengua fuera",
    "Haz como gallina ponedora",
    "Nada en el aire estilo perrito",
    "Finge ser un T-Rex intentando aplaudir",
    "Haz como si tuvieras hormigas en la ropa",
    "Camina como modelo de pasarela exagerado",
    "Haz ruidos de carro acelerando",
    "Finge que eres un bebé llorando",
    "Abraza al aire apasionadamente",
    "Pide un taxi desesperadamente",
    "Haz como si levantaras una pesa gigante",
    "Baila disco con un solo dedo",
    "Haz muecas de pez globo"
];

let mainInterval = null;
let currentCountdownInterval = null; // Global countdown
let phaseTimerInterval = null;

const initialMsg = document.getElementById('initial-msg');
const previewContainer = document.getElementById('preview-container');
const activeLightDisplay = document.getElementById('active-light-display');
const bigLight = document.getElementById('big-light');
const phaseTimerDiv = document.getElementById('phase-timer');
const previewTimerSpan = document.getElementById('preview-timer');

const textRed = document.getElementById('text-red');
const textYellow = document.getElementById('text-yellow');
const textGreen = document.getElementById('text-green');

const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const showMapBtn = document.getElementById('show-map-btn');
const intervalInput = document.getElementById('interval-input');

startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
showMapBtn.addEventListener('click', toggleMap);

let actionTime = 3;
let currentMap = null;
let isShowingMap = false;

function toggleMap() {
    if (!currentMap) return;

    if (isShowingMap) {
        // Switch back to Game
        previewContainer.style.display = 'none';
        activeLightDisplay.style.display = 'flex';
        showMapBtn.textContent = "Mostrar";
        isShowingMap = false;
    } else {
        // Show Map
        // Update text content just in case (though it shouldn't change)
        textRed.textContent = currentMap.red;
        textYellow.textContent = currentMap.yellow;
        textGreen.textContent = currentMap.green;

        // Hide big light, show preview
        activeLightDisplay.style.display = 'none';
        previewContainer.style.display = 'flex'; // Uses flex layout defined in CSS

        // Hide the preview timer title since we are just checking
        const footer = previewContainer.querySelector('h3');
        if (footer) footer.style.display = 'none';

        showMapBtn.textContent = "Ocultar";
        isShowingMap = true;
    }
}

function startGame() {
    stopGame();

    actionTime = parseInt(intervalInput.value);
    if (isNaN(actionTime) || actionTime < 1) {
        alert("Tiempo mínimo 1 segundo.");
        return;
    }

    startBtn.disabled = true;
    stopBtn.disabled = false;
    intervalInput.disabled = true;

    initialMsg.style.display = 'block';

    currentCountdownInterval = startCountdown(initialMsg, () => {
        initialMsg.style.display = 'none';
        runGameLoop();
    });
}

function runGameLoop() {
    // Phase 1: Memory (5 seconds) - Run ONCE per game start
    showPreviewPhase();
}

function showPreviewPhase() {
    activeLightDisplay.style.display = 'none';
    previewContainer.style.display = 'flex';

    // Ensure timer title is visible for the actual phase
    const footer = previewContainer.querySelector('h3');
    if (footer) footer.style.display = 'block';

    // Pick 3 random unique actions
    const shuffled = [...actions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    // Store map for the entire game session
    currentMap = {
        'red': selected[0],
        'yellow': selected[1],
        'green': selected[2]
    };

    textRed.textContent = selected[0];
    textYellow.textContent = selected[1];
    textGreen.textContent = selected[2];

    let timeLeft = 10;
    previewTimerSpan.textContent = timeLeft;

    phaseTimerInterval = setInterval(() => {
        timeLeft--;
        previewTimerSpan.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(phaseTimerInterval);
            showActionPhase(currentMap);
        }
    }, 1000);
}

function showActionPhase(map) {
    if (!isShowingMap) {
        previewContainer.style.display = 'none';
        activeLightDisplay.style.display = 'flex';
    }

    // Show the button now that we are in action phase
    showMapBtn.style.display = 'inline-block';

    // Pick 1 color
    const colors = ['red', 'yellow', 'green'];
    const selectedColor = colors[Math.floor(Math.random() * colors.length)];

    // Apply Class
    bigLight.className = `big-light ${selectedColor}`;

    // Timer
    let timeLeft = actionTime;
    phaseTimerDiv.textContent = timeLeft;

    phaseTimerInterval = setInterval(() => {
        timeLeft--;
        phaseTimerDiv.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(phaseTimerInterval);
            // REPEAT Action Phase (Infinite Loop until Stop) using the SAME map
            showActionPhase(map);
        }
    }, 1000);
}

function stopGame() {
    if (currentCountdownInterval) clearInterval(currentCountdownInterval);
    if (phaseTimerInterval) clearInterval(phaseTimerInterval);

    currentCountdownInterval = null;
    phaseTimerInterval = null;

    startBtn.disabled = false;
    stopBtn.disabled = true;
    intervalInput.disabled = false;
    showMapBtn.style.display = 'none'; // Hide hints
    showMapBtn.textContent = "Mostrar";
    isShowingMap = false;

    initialMsg.style.display = 'block';
    initialMsg.textContent = "Presiona Iniciar";
    previewContainer.style.display = 'none';
    activeLightDisplay.style.display = 'none';

    // Reset preview title visibility
    const footer = previewContainer.querySelector('h3');
    if (footer) footer.style.display = 'block';
}
