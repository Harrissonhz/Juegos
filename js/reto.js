const challenges = [
    { type: 'Decir', text: '3 nombres de animales con M' },
    { type: 'Decir', text: '5 colores en inglés' },
    { type: 'Hacer', text: '10 saltos de tijera' },
    { type: 'Buscar', text: 'Un objeto rojo' },
    { type: 'Decir', text: 'El abecedario al revés (10 letras)' },
    { type: 'Hacer', text: 'Bailar la Macarena' },
    { type: 'Buscar', text: 'Algo que huela bien' },
    { type: 'Decir', text: '3 países de Europa' },
    { type: 'Hacer', text: 'Caminar como un cangrejo' },
    { type: 'Buscar', text: 'Una cuchara' },
    { type: 'Decir', text: '5 frutas rojas' },
    { type: 'Hacer', text: 'Cantar el feliz cumpleaños' },
    { type: 'Buscar', text: 'Una media (calcetín)' },
    { type: 'Decir', text: '3 superhéroes de Marvel' },
    { type: 'Hacer', text: 'Imitar a un mono' },
    { type: 'Buscar', text: 'Algo cuadrado' },
    { type: 'Decir', text: '3 palabras que rimen con Gato' },
    { type: 'Hacer', text: 'Dar una vuelta en el piso' },
    { type: 'Buscar', text: 'Un libro' },
    { type: 'Decir', text: 'Los días de la semana al revés' },
    { type: 'Hacer', text: 'Mantener el equilibrio en un pie' },
    { type: 'Decir', text: '3 marcas de autos' },
    { type: 'Hacer', text: 'Hacer muecas graciosas' },
    { type: 'Buscar', text: 'Algo suave' },
    { type: 'Decir', text: '5 partes del cuerpo' },
    { type: 'Hacer', text: 'Fingir que lloras' },
    { type: 'Buscar', text: 'Un zapato izquierdo' },
    { type: 'Decir', text: '3 cosas que hay en el baño' },
    { type: 'Hacer', text: 'Aplaudir con los pies (intentarlo)' },
    { type: 'Buscar', text: 'Algo azul' },
    { type: 'Decir', text: 'Tu nombre deletrado al revés' },
    { type: 'Hacer', text: 'Saltar en un pie 5 veces' },
    { type: 'Buscar', text: 'Un vaso con agua' },
    { type: 'Decir', text: '3 animales que nadan' },
    { type: 'Hacer', text: 'Rugir como un león' },
    { type: 'Buscar', text: 'Papel higiénico' },
    { type: 'Decir', text: '3 cosas frías' },
    { type: 'Hacer', text: 'Hacer como una gallina' },
    { type: 'Buscar', text: 'Una llave' },
    { type: 'Decir', text: '5 números pares' },
    { type: 'Hacer', text: 'Congelarse en una pose divertida' },
    { type: 'Buscar', text: 'Una almohada' },
    { type: 'Decir', text: '3 cosas que vuelan' },
    { type: 'Hacer', text: 'Hablar como robot' },
    { type: 'Buscar', text: 'Algo brillante' },
    { type: 'Decir', text: '3 sabores de helado' },
    { type: 'Hacer', text: 'Marcha como soldado' },
    { type: 'Buscar', text: 'Un control remoto' },
    { type: 'Decir', text: '3 instrumentos musicales' },
    { type: 'Hacer', text: 'Tocar tus pies sin doblar rodillas' }
];

let challengeCountdownInterval = null;
let currentCountdownInterval = null; // Global countdown (5,4,3,2,1)

const initialMsg = document.getElementById('initial-msg');
const challengeContent = document.getElementById('challenge-content');
const playerNameDiv = document.getElementById('player-name');
const challengeTextDiv = document.getElementById('challenge-text');
const challengeTimerDiv = document.getElementById('challenge-timer');
const endMsg = document.getElementById('end-msg');

const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const nextBtn = document.getElementById('next-btn');

const playersInput = document.getElementById('players-input');
const intervalInput = document.getElementById('interval-input');

startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
nextBtn.addEventListener('click', () => {
    nextBtn.style.display = 'none';
    endMsg.style.display = 'none';
    triggerChallengeRound();
});

let numPlayers = 2;
let baseTime = 5;

function startGame() {
    stopGame(); // Reset first

    numPlayers = parseInt(playersInput.value);
    baseTime = parseInt(intervalInput.value);

    if (isNaN(numPlayers) || numPlayers < 1) {
        alert("Mínimo 1 jugador.");
        return;
    }
    if (isNaN(baseTime) || baseTime < 1) {
        alert("Tiempo mínimo 1 segundo.");
        return;
    }

    startBtn.disabled = true;
    stopBtn.disabled = false;
    playersInput.disabled = true;
    intervalInput.disabled = true;

    initialMsg.style.display = 'block'; // Or hide, startCountdown uses the passed element.
    // Actually startCountdown uses an element to display.
    // We'll use initialMsg for countdown

    currentCountdownInterval = startCountdown(initialMsg, () => {
        initialMsg.style.display = 'none';
        challengeContent.style.display = 'flex';
        triggerChallengeRound();
    });
}

function triggerChallengeRound() {
    // 1. Pick Random Player
    const player = Math.floor(Math.random() * numPlayers) + 1;
    playerNameDiv.textContent = `Jugador ${player}`;
    playerNameDiv.style.display = 'block';

    // Hide others initially
    challengeTextDiv.style.display = 'none';
    challengeTimerDiv.style.display = 'none';

    // 2. Pick Random Challenge (Pre-calculate)
    const challenge = challenges[Math.floor(Math.random() * challenges.length)];

    // 3. Wait 3 seconds then show challenge
    setTimeout(() => {
        playerNameDiv.style.display = 'none'; // USER REQUEST: CLEAR SCREEN (Hide player name)

        challengeTextDiv.style.display = 'block';
        challengeTextDiv.style.textDecoration = 'none'; // RESET STYLES
        challengeTextDiv.style.opacity = '1';
        challengeTimerDiv.style.display = 'block';

        challengeTextDiv.innerHTML = `<span style="font-size: 0.5em; display:block; opacity:0.7;">${challenge.type}:</span> ${challenge.text}`;

        // 4. Calculate Time
        let duration = baseTime;
        if (challenge.type === 'Buscar') {
            duration = baseTime * 5;
        }

        // 5. Start Challenge Timer
        startChallengeTimer(duration);

    }, 3000);
}

function startChallengeTimer(duration) {
    let timeLeft = duration;
    challengeTimerDiv.textContent = timeLeft;
    challengeTimerDiv.style.color = 'var(--text-color)';

    endMsg.style.display = 'none';
    nextBtn.style.display = 'none';

    challengeCountdownInterval = setInterval(() => {
        timeLeft--;
        challengeTimerDiv.textContent = timeLeft;

        if (timeLeft <= 3) {
            challengeTimerDiv.style.color = 'var(--accent-color)'; // Warn
        }

        if (timeLeft <= 0) {
            clearInterval(challengeCountdownInterval);
            challengeCountdownInterval = null;

            challengeTimerDiv.textContent = "0";
            challengeTextDiv.style.textDecoration = 'line-through';
            challengeTextDiv.style.opacity = '0.6';
            endMsg.style.display = 'block';
            nextBtn.style.display = 'inline-block';
        }
    }, 1000);
}

function stopGame() {
    if (currentCountdownInterval) clearInterval(currentCountdownInterval);
    if (challengeCountdownInterval) clearInterval(challengeCountdownInterval);

    currentCountdownInterval = null;
    challengeCountdownInterval = null;

    startBtn.disabled = false;
    stopBtn.disabled = true;
    playersInput.disabled = false;
    intervalInput.disabled = false;

    initialMsg.style.display = 'block';
    initialMsg.textContent = "Configura y presiona Iniciar";
    challengeContent.style.display = 'none';
    endMsg.style.display = 'none';
    nextBtn.style.display = 'none';
}
