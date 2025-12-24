const categories = [
    "Nombres",
    "Apellidos",
    "Países / Ciudades",
    "Animales",
    "Frutas / Comidas",
    "Colores",
    "Objetos",
    "Profesiones",
    "Marcas",
    "Películas",
    "Canciones",
    "Partes del cuerpo",
    "Verbos",
    "Cosas que hay en la casa",
    "Cosas que hay en la escuela",
    "Cosas que hay en la cocina",
    "Cosas que dan risa",
    "Cosas que dan miedo",
    "Cosas que huelen mal",
    "Cosas que son suaves",
    "Cosas que son pegajosas",
    "Cosas redondas",
    "Cosas que vuelan",
    "Cosas que se rompen fácil",
    "Cosas que hacen ruido",
    "Deportes",
    "Cosas imaginarias",
    "Superpoderes",
    "Nombres para mascotas",
    "Cosas que nunca le dirías a mi mamá",
    "Cosas que haría si fuera millonario",
    "Excusas",
    "Apodos"
];

const letters = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"
];

let currentCountdownInterval = null;
const gameText = document.getElementById('game-text');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');

startBtn.addEventListener('click', () => {
    stopGame(); // Ensure clean state
    startGame();
});
stopBtn.addEventListener('click', stopGame);

function startGame() {
    // Update UI state immediately
    startBtn.disabled = true;
    stopBtn.disabled = false;

    // Reset styles for countdown (gradient effect)
    gameText.style.background = '';
    gameText.style.webkitBackgroundClip = '';
    gameText.style.webkitTextFillColor = '';
    gameText.style.color = '';

    // Start Countdown
    currentCountdownInterval = startCountdown(gameText, () => {
        showResult();
    });
}

function showResult() {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];

    // Remove gradient for result to ensure specific styling works
    gameText.style.background = 'none';
    gameText.style.webkitBackgroundClip = 'initial';
    gameText.style.webkitTextFillColor = 'initial';
    gameText.style.color = 'var(--text-color)';

    // Simple animation reset
    gameText.style.animation = 'none';
    gameText.offsetHeight; /* trigger reflow */
    gameText.style.animation = 'fadeIn 0.5s ease-out';

    // Using innerHTML to allow line break
    // Using a distinct color for the letter or keeping it standard
    gameText.innerHTML = `${randomCategory}<br><span style="font-size: 0.8em; color: var(--accent-color);">${randomLetter}</span>`;
}

function stopGame() {
    if (currentCountdownInterval) {
        clearInterval(currentCountdownInterval);
        currentCountdownInterval = null;
    }

    // Update UI state
    startBtn.disabled = false;
    stopBtn.disabled = true;

    gameText.textContent = "Juego Detenido";
}
