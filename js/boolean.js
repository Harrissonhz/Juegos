const statements = [
    "El sol es azul",
    "Los perros ladran",
    "El agua moja",
    "El fuego es frío",
    "Los peces vuelan",
    "El cielo es verde",
    "Las vacas dan leche",
    "El hielo es caliente",
    "Los gatos maúllan",
    "La luna es de queso",
    "Tenemos 5 dedos en cada mano",
    "Los pájaros tienen escamas",
    "El azúcar es salado",
    "La nieve es blanca",
    "Los carros tienen 2 ruedas",
    "Las aviones nadan",
    "El chocolate es dulce",
    "La noche es oscura",
    "El pasto es morado",
    "Los elefantes son pequeños",
    "El plátano es amarillo",
    "La fresa es roja",
    "Las piedras son suaves",
    "El algodón es duro",
    "Los humanos respiran agua",
    "El mar tiene agua salada",
    "Las abejas hacen miel",
    "Las hormigas son gigantes",
    "La lluvia cae del cielo",
    "El sol sale de noche",
    "Dormimos en una cama",
    "Comemos con las orejas",
    "Los árboles tienen hojas",
    "La leche viene de la gallina",
    "El león ruge",
    "Las serpientes caminan",
    "El tomate es una fruta",
    "El helado es caliente",
    "Usamos zapatos en las manos",
    "Los libros se leen",
    "El fútbol se juega con la mano",
    "La guitarra es un instrumento",
    "El celular sirve para llamar",
    "La televisión se come",
    "Las nubes son de algodón",
    "El arcoíris tiene colores",
    "El limón es ácido",
    "La sal es dulce",
    "Los niños van a la escuela",
    "Los bebés saben correr",
    "La tortuga es muy rápida",
    "El conejo salta",
    "El pato dice cua cua",
    "La vaca dice muuu",
    "El perro dice miau",
    "El gato dice guau",
    "Las arañas tienen 8 patas",
    "El pulpo tiene 2 brazos",
    "El tiburón vive en el mar",
    "La ballena es un mamífero",
    "El pingüino vuela",
    "La jirafa tiene el cuello largo",
    "El elefante tiene trompa",
    "El cocodrilo es peludo",
    "La cebra tiene rayas",
    "El tigre tiene manchas",
    "La música se escucha",
    "Los dibujos animados son reales",
    "Batman es un superhéroe",
    "Mickey Mouse es un ratón",
    "Bob Esponja vive en una piña",
    "Superman vuela",
    "Spiderman lanza fuego",
    "La cenicienta perdió un zapato",
    "Blancanieves comió una manzana",
    "Pinocho dice mentiras",
    "El lobo sopló la casa",
    "Caperucita Roja usa capa azul",
    "Los dientes sirven para masticar",
    "Los ojos sirven para oler",
    "La nariz sirve para ver",
    "Las orejas sirven para escuchar",
    "Las piernas sirven para caminar",
    "El corazón bombea sangre",
    "El cerebro sirve para pensar",
    "Tenemos 2 corazones",
    "La sangre es azul",
    "Los huesos son duros",
    "El pelo crece",
    "Las uñas se cortan",
    "Nos lavamos los dientes",
    "Nos bañamos con ropa",
    "Dormimos con los ojos abiertos",
    "Soñamos cuando dormimos",
    "El sol calienta",
    "La luna brilla",
    "Las estrellas están lejos",
    "El mundo es plano",
    "La tierra gira"
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
    showRandomStatement();
    gameInterval = setInterval(showRandomStatement, seconds * 1000);
}

function showRandomStatement() {
    const randomStatement = statements[Math.floor(Math.random() * statements.length)];

    // Animation reset
    gameText.style.animation = 'none';
    gameText.offsetHeight;
    gameText.style.animation = 'fadeIn 0.5s ease-out';

    // Text fitting logic: simple responsive font size for longer statements
    if (randomStatement.length > 20) {
        gameText.style.fontSize = '4rem'; // Smaller for long text
    } else {
        gameText.style.fontSize = '8rem'; // Default large
    }

    gameText.textContent = randomStatement;
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
    gameText.style.fontSize = ''; // Reset font size
}
