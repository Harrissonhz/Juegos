const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved user preference, if any, on load of the website
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);
}

themeToggleBtn.addEventListener('click', () => {
    let theme = body.getAttribute('data-theme');

    if (theme === 'dark') {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        updateIcon('light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateIcon('dark');
    }
});

function updateIcon(theme) {
    // We can swap SVG icons here if we want different icons for sun/moon
    // For now, let's keep it simple or rotate it via CSS
    // But good practice is to switch the inner HTML of the SVG
    if (theme === 'dark') {
        themeToggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`; // Sun icon for switching to Light
    } else {
        themeToggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`; // Moon icon for switching to Dark
    }
}

// Initialize icon
updateIcon(body.getAttribute('data-theme') || 'light');

/**
 * Reusable countdown timer function
 * @param {HTMLElement} displayElement - The element to update text in
 * @param {Function} onCompleteCallback - Function to call when countdown finishes
 */
function startCountdown(displayElement, onCompleteCallback) {
    let count = 5;

    // Initial message
    displayElement.style.animation = 'none';
    displayElement.offsetHeight; /* trigger reflow */
    displayElement.style.animation = 'fadeIn 0.5s ease-out';
    displayElement.textContent = "Vamos a Jugar en:";

    // We start the countdown interval
    const countdownInterval = setInterval(() => {
        displayElement.style.animation = 'none';
        displayElement.offsetHeight; /* trigger reflow */
        displayElement.style.animation = 'fadeIn 0.5s ease-out';

        displayElement.textContent = count;

        if (count === 0) {
            clearInterval(countdownInterval);
            displayElement.textContent = "Vamooooos";

            // Wait 1 second showing "Vamooooos" before starting the actual game
            setTimeout(() => {
                if (onCompleteCallback) onCompleteCallback();
            }, 1000);
        }

        count--;
    }, 1000);

    // Return interval ID in case we need to cancel it directly (though not requested yet, good for future)
    return countdownInterval;
}
