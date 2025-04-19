document.addEventListener("DOMContentLoaded", function () {
    // This function waits until the HTML document has been completely loaded and parsed

    const clickSound = new Audio();
    // Creates a new Audio object to play a sound on click

    //clickSound.src = "./asset/media/audio/421352__jaszunio15__click_3.wav";
    // An optional sound source (commented out) from freesound.org

    clickSound.src = "./asset/media/audio/219069__annabloom__click1.wav";
    // Sets the source of the click sound to an audio file by annabloom from freesound.org

    //clickSound.src = "./asset/media/audio/506054__mellau__button-click-1.wav";
    // Another optional sound source (commented out)

    clickSound.preload = "auto";
    // Preloads the audio file to improve playback performance

    document.addEventListener("click", function () {
        // Adds a click event listener to the entire document

        clickSound.currentTime = 0;
        // Resets the audio to the beginning before playing

        clickSound.play().catch(function (e) {
            // Attempts to play the sound and catches any errors (e.g., due to autoplay restrictions)

            console.log("Autoplay might be blocked:", e);
            // Logs a message to the console if playback fails
        });
    });
});

//////////////////////////////////////////////////////////

const emojis = ['🐱', '🐶', '🐰', '🦊', '🐸', '🐻'];
// An array of emojis to be used as cursor icons

let currentEmojiIndex = 0;
// Keeps track of the currently displayed emoji index

function createEmojiCursor(emoji) {
    // Creates a custom cursor image from the given emoji

    const canvas = document.createElement('canvas');
    // Creates a canvas element for drawing the emoji

    const ctx = canvas.getContext('2d');
    // Gets the 2D drawing context of the canvas

    canvas.width = 64;
    canvas.height = 64;
    // Sets the canvas size

    ctx.font = '48px serif';
    // Sets the font size and style for drawing the emoji

    ctx.textBaseline = 'top';
    // Aligns text to the top of the canvas

    ctx.fillText(emoji, 0, 0);
    // Draws the emoji at the top-left corner of the canvas

    return canvas.toDataURL('image/png');
    // Converts the canvas to a data URL and returns it
}

function setCursor(emoji) {
    // Sets the custom emoji as the cursor

    const dataURL = createEmojiCursor(emoji);
    // Generates a data URL from the emoji

    document.body.style.cursor = `url(${dataURL}) 0 0, auto`;
    // Sets the document's cursor style to the custom emoji image
}

setCursor(emojis[currentEmojiIndex]);
// Sets the initial emoji cursor when the page loads

document.addEventListener('click', () => {
    // Adds a click event listener to the whole document

    currentEmojiIndex = (currentEmojiIndex + 1) % emojis.length;
    // Increments the emoji index and wraps around to the start if necessary

    setCursor(emojis[currentEmojiIndex]);
    // Updates the cursor to the new emoji
});

///////////////////////////////////////////////////////////////

const newsPages = [
    // Array of objects containing page titles and corresponding file paths

    { title: "AI & Machine Learning\n", file: "./News/Emerging/AI&ML/AI.html" },
    { title: "Blockchain\n", file: "./News/Emerging/blockchain/blockchain.html" },
    { title: "Quantum Computing\n", file: "./News/Emerging/quantum/quantum.html" },

    { title: "Ethics\n", file: "./News/Future/ethic/ethic.html" },
    { title: "Social Impact\n", file: "./News/Future/impact/impact.html" },
    { title: "Smart City\n", file: "./News/Future/smartCity/smartCity.html" },

    { title: "New Business\n", file: "./News/Industrial/NewBusiness/business.html" },
    { title: "Regulatory News\n", file: "./News/Industrial/Regulatory/regulatory.html" },
    { title: "Startup Success\n", file: "./News/Industrial/Startup success/startup.html" }
];

function showSuggestions() {
    // Function to display search suggestions based on user input

    let query = document.getElementById("search-box").value.toLowerCase();
    // Get the current input value and convert it to lowercase for case-insensitive comparison

    let suggestionsDiv = document.getElementById("suggestions");
    // Get the element that will display the suggestions

    suggestionsDiv.innerHTML = "";
    // Clear previous suggestions

    if (query.length === 0) {
        return;
        // If input is empty, exit the function
    }

    let matches = newsPages.filter(page => page.title.toLowerCase().includes(query));
    // Filter newsPages for titles that contain the input string

    if (matches.length > 0) {
        // If there are matching results

        matches.forEach(match => {
            let item = document.createElement("a");
            // Create a new anchor element for each match

            item.href = `${match.file}`;
            // Set the link to the corresponding HTML file

            item.classList.add("list-group-item", "list-group-item-action");
            // Add Bootstrap classes for styling (assumes Bootstrap is used)

            item.innerText = match.title;
            // Set the text of the suggestion to the title

            suggestionsDiv.appendChild(item);
            // Add the suggestion item to the suggestions container
        });
    } else {
        // If no matches found

        let noMatch = document.createElement("div");
        // Create a <div> to show no results

        noMatch.classList.add("list-group-item");
        // Add styling class

        noMatch.innerText = "No results found";
        // Set message text

        suggestionsDiv.appendChild(noMatch);
        // Display the no result message
    }
}

////////////////////////////////////////////////////

// Show the cookie popup if no consent is found
//if (getCookie("cookieConsent") === null) {
if (getLocalStorage("cookieConsent") === null) {
    document.getElementById("cookie-popup").style.display = "block";
}

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Remove initial blur after page renders
    setTimeout(() => {
        document.body.style.filter = "blur(0px)";
    }, 50);

    // Load theme from cookies, default to dark mode
    let theme = getCookie("theme") || localStorage.getItem('theme') || "dark";

    // Handle theme style application
    const themeStyleElement = document.getElementById("theme-style");
    if (themeStyleElement) {
        // If using a single theme style element with id
        themeStyleElement.setAttribute("href", theme + "-theme.css");
    } else {
        // If using multiple link elements
        applyTheme(theme);
    }

    // Set the theme toggle button icon
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
        themeToggleBtn.textContent = theme === "dark" ? "🌙" : "☀️";
        themeToggleBtn.addEventListener("click", toggleTheme);
    }

    // Set up clear storage button
    const clearStorageBtn = document.getElementById("clear-storage");
    if (clearStorageBtn) {
        clearStorageBtn.addEventListener("click", clearAllData);
    }

    // Load header and footer if needed
    loadHeaderFooter();
});

// Delegate event listener for all link clicks to add transition effect
document.addEventListener("click", function (event) {
    let link = event.target.closest("a"); // Find closest <a> tag
    if (link && link.href) {
        event.preventDefault(); // Prevent default navigation
        document.body.classList.add("blurred"); // Add blur effect

        // Navigate after delay for transition effect
        setTimeout(() => {
            window.location.href = link.href; // Navigate after 1 second
        }, 1000);
    }
});

/**
 * Toggle between light and dark themes
 * Changes CSS file, updates icon, and saves preference
 */
function toggleTheme() {
    let currentTheme;
    const themeStyleElement = document.getElementById("theme-style");

    // Determine current theme based on available elements
    if (themeStyleElement) {
        // If using a dedicated theme style element
        currentTheme = themeStyleElement.getAttribute("href").includes("dark") ? "dark" : "light";
    } else {
        // If using multiple link elements
        currentTheme = document.querySelector('link[href*="theme"]:not([disabled])').getAttribute('href').includes('dark') ? 'dark' : 'light';
    }

    // Set new theme to opposite of current
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    // Check if cookies are accepted before saving preference
    //if (getCookie("cookieConsent") === "accepted") {
    if (getLocalStorage("cookieConsent") === "accepted") {
        // Add blur effect during theme transition
        document.body.style.filter = "blur(5px)";

        // Apply theme change with transition effect
        setTimeout(() => {
            // Apply theme based on available elements
            if (themeStyleElement) {
                themeStyleElement.setAttribute("href", newTheme + "-theme.css");
            } else {
                applyTheme(newTheme);
            }

            // Update theme toggle button
            const themeToggleBtn = document.getElementById("theme-toggle");
            if (themeToggleBtn) {
                themeToggleBtn.textContent = newTheme === "dark" ? "🌙" : "☀️";
            }

            // Save theme preference in cookies
            setCookie("theme", newTheme, 365);
            // Also save in localStorage as fallback
            localStorage.setItem('theme', newTheme);

            // Remove blur after theme change
            setTimeout(() => {
                document.body.style.filter = "blur(0px)";
            }, 300);
        }, 200);
    } else {
        // If cookies not accepted, prompt user
        alert("Please accept the cookies to save your theme settings!");
    }
}

/**
 * Apply the specified theme by updating CSS links
 * @param {string} theme - 'dark' or 'light'
 */
function applyTheme(theme) {
    // Disable all theme stylesheets
    const themeLinks = document.querySelectorAll('link[href*="theme"]');
    themeLinks.forEach(link => {
        link.disabled = true;
    });

    // Enable only the selected theme
    const activeTheme = document.querySelector(`link[href*="${theme}-theme"]`);
    if (activeTheme) {
        activeTheme.disabled = false;
    }

    // Update theme toggle button icon
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
        themeToggleBtn.textContent = theme === "dark" ? "🌙" : "☀️";
        themeToggleBtn.title = theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
    }
}

/**
 * Accept cookies and save user preference
 */
function acceptCookies() {
    //setCookie("cookieConsent", "accepted", 365);
    setLocalStorage("cookieConsent", "accepted", 365);
    document.getElementById("cookie-popup").style.display = "none";

    // Save current theme to cookie now that we have consent
    const currentTheme = localStorage.getItem('theme') || "dark";
    setCookie("theme", currentTheme, 365);
}

/**
 * Decline cookies but remember choice
 */
function declineCookies() {
    //setCookie("cookieConsent", "declined", 365);
    setLocalStorage("cookieConsent", "declined", 365);
    document.getElementById("cookie-popup").style.display = "none";
}

/**
 * Clear all stored data including cookies and localStorage
 * Confirms with user before clearing
 */
function clearAllData() {
    if (confirm("Are you sure you want to clear all Cookies and LocalStorage data? This action cannot be undone!")) {
        // Clear all cookies
        document.cookie.split(";").forEach(cookie => {
            document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/");
        });

        // Clear localStorage
        localStorage.clear();

        // Clear sessionStorage
        sessionStorage.clear();

        alert("All storage data has been cleared!");
        location.reload(); // Refresh page to apply changes
    }
}

/**
 * Set a cookie with the given name, value and expiration days
 */
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + "; path=/" + expires;
}

/**
 * Get a cookie value by name
 * @returns {string|null} Cookie value or null if not found
 */
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

//////////////////////////////////////////////////////////////

function setLocalStorage(name, value, days) {
    let data = { value: value };

    if (days) {
        let expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + (days * 24 * 60 * 60 * 1000));
        data.expiry = expireDate.getTime();
    }

    localStorage.setItem(name, JSON.stringify(data));
}

function getLocalStorage(name) {
    let item = localStorage.getItem(name);
    if (!item) return null;

    let data = JSON.parse(item);


    if (data.expiry && new Date().getTime() > data.expiry) {
        localStorage.removeItem(name);
        return null;
    }

    return data.value;
}