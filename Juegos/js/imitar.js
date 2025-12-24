const animals = [
    "Perro", "Gato", "León", "Tigre", "Elefante",
    "Mono", "Rana", "Pájaro", "Pez", "Serpiente",
    "Caballo", "Vaca", "Cerdo", "Oveja", "Gallina",
    "Pato", "Conejo", "Ratón", "Oso", "Lobo",
    "Zorro", "Canguro", "Pingüino", "Delfín", "Tortuga",
    "Gorila", "Cocodrilo", "Hipopótamo", "Jirafa", "Cebra",
    "Búho", "Águila", "Flamenco", "Pavo Real", "Loro",
    "Abeja", "Mosquito", "Mariposa", "Araña", "Hormiga",
    "Tiburón", "Pulpo", "Cangrejo", "Medusa", "Ballena",
    "Dinosaurio", "Dragón", "Unicornio", "Murciélago", "Koala",
    "Perezoso", "Camello", "Llama", "Alpaca", "Rinoceronte",
    "Caracol", "Gusano", "Lagartija", "Iguana", "Salamandra"
];

let numPlayers = 4;
let roundTime = 5;
let gameActive = false;
let currentCountdownInterval = null;
let roundTimeout = null;

const initialMsg = document.getElementById('initial-msg');
const gameContent = document.getElementById('game-content');
const playerDisplay = document.getElementById('player-display');
const assignmentDisplay = document.getElementById('assignment-display');

const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const playersInput = document.getElementById('players-input');
const intervalInput = document.getElementById('interval-input');

startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);

function startGame() {
    stopGame();

    numPlayers = parseInt(playersInput.value);
    roundTime = parseInt(intervalInput.value);

    if (isNaN(numPlayers) || numPlayers < 2) {
        alert("Mínimo 2 jugadores.");
        return;
    }
    if (isNaN(roundTime) || roundTime < 1) {
        alert("Tiempo mínimo 1 segundo.");
        return;
    }

    startBtn.disabled = true;
    stopBtn.disabled = false;
    playersInput.disabled = true;
    intervalInput.disabled = true;

    initialMsg.style.display = 'block';
    gameContent.style.display = 'none';

    currentCountdownInterval = startCountdown(initialMsg, () => {
        initialMsg.style.display = 'none';
        gameContent.style.display = 'flex';
        gameActive = true;
        startRound();
    });
}

function startRound() {
    if (!gameActive) return;

    // Phase 1: Select random player(s)
    const selectedPlayers = selectRandomPlayers();

    // Show player names
    playerDisplay.textContent = formatPlayerNames(selectedPlayers);
    playerDisplay.style.display = 'block';
    assignmentDisplay.textContent = '';

    // Wait 3 seconds
    roundTimeout = setTimeout(() => {
        if (!gameActive) return;

        // Phase 2: Assign animals
        const assignments = assignAnimals(selectedPlayers);

        // Hide player names, show assignments
        playerDisplay.style.display = 'none';
        assignmentDisplay.innerHTML = formatAssignments(assignments);

        // Wait for user-selected time
        roundTimeout = setTimeout(() => {
            if (!gameActive) return;
            startRound(); // Next round
        }, roundTime * 1000);

    }, 3000);
}

function selectRandomPlayers() {
    // Randomly decide: 1 player, some players, or all players
    const mode = Math.random();

    if (mode < 0.4) {
        // Single player (40% chance)
        return [Math.floor(Math.random() * numPlayers) + 1];
    } else if (mode < 0.8) {
        // Some players (40% chance)
        const count = Math.floor(Math.random() * (numPlayers - 1)) + 2; // 2 to numPlayers
        const selected = [];
        const available = Array.from({ length: numPlayers }, (_, i) => i + 1);

        for (let i = 0; i < count; i++) {
            const idx = Math.floor(Math.random() * available.length);
            selected.push(available[idx]);
            available.splice(idx, 1);
        }

        return selected.sort((a, b) => a - b);
    } else {
        // All players (20% chance)
        return Array.from({ length: numPlayers }, (_, i) => i + 1);
    }
}

function formatPlayerNames(players) {
    if (players.length === numPlayers) {
        return "Todos los jugadores";
    } else if (players.length === 1) {
        return `Jugador ${players[0]}`;
    } else {
        return `Jugadores ${players.join(', ')}`;
    }
}

function assignAnimals(players) {
    // Randomly decide: same animal for all OR different animals
    const sameAnimal = Math.random() < 0.5;

    if (sameAnimal) {
        const animal = animals[Math.floor(Math.random() * animals.length)];
        return players.map(p => ({ player: p, animal }));
    } else {
        return players.map(p => ({
            player: p,
            animal: animals[Math.floor(Math.random() * animals.length)]
        }));
    }
}

function formatAssignments(assignments) {
    // Check if all have same animal
    const allSame = assignments.every(a => a.animal === assignments[0].animal);

    if (allSame) {
        if (assignments.length === numPlayers) {
            return `Todos: Imita un <strong>${assignments[0].animal}</strong>`;
        } else if (assignments.length === 1) {
            return `Jugador ${assignments[0].player}: Imita un <strong>${assignments[0].animal}</strong>`;
        } else {
            return `Todos: Imita un <strong>${assignments[0].animal}</strong>`;
        }
    } else {
        return assignments.map(a =>
            `Jugador ${a.player}: Imita un <strong>${a.animal}</strong>`
        ).join('<br>');
    }
}

function stopGame() {
    gameActive = false;

    if (currentCountdownInterval) clearInterval(currentCountdownInterval);
    if (roundTimeout) clearTimeout(roundTimeout);

    currentCountdownInterval = null;
    roundTimeout = null;

    startBtn.disabled = false;
    stopBtn.disabled = true;
    playersInput.disabled = false;
    intervalInput.disabled = false;

    initialMsg.style.display = 'block';
    initialMsg.textContent = "Configura y presiona Iniciar";
    gameContent.style.display = 'none';
}
