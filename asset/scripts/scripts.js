document.addEventListener("DOMContentLoaded", function () {
    const clickSound = new Audio();
    //clickSound.src = "./asset/media/audio/421352__jaszunio15__click_3.wav";//https://freesound.org/people/Jaszunio15/sounds/421352/
    clickSound.src = "./asset/media/audio/219069__annabloom__click1.wav";//https://freesound.org/people/annabloom/sounds/219069/
    //clickSound.src = "./asset/media/audio/506054__mellau__button-click-1.wav";//https://freesound.org/people/Mellau/sounds/506054/
    clickSound.preload = "auto";

    document.addEventListener("click", function () {
        clickSound.currentTime = 0;
        clickSound.play().catch(function (e) {
            console.log("Autoplay might be blocked:", e);
        });
    });
});

//////////////////////////////////////////////////////////

const emojis = ['🐱', '🐶', '🐰', '🦊', '🐸', '🐻'];
let currentEmojiIndex = 0;

function createEmojiCursor(emoji) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 64;
    canvas.height = 64;
    ctx.font = '48px serif';
    ctx.textBaseline = 'top';
    ctx.fillText(emoji, 0, 0);

    return canvas.toDataURL('image/png');
}

function setCursor(emoji) {
    const dataURL = createEmojiCursor(emoji);
    document.body.style.cursor = `url(${dataURL}) 0 0, auto`;
}

// 初始 emoji
setCursor(emojis[currentEmojiIndex]);

// 点击切换 emoji
document.addEventListener('click', () => {
    currentEmojiIndex = (currentEmojiIndex + 1) % emojis.length;
    setCursor(emojis[currentEmojiIndex]);
});

///////////////////////////////////////////////////////////////

const newsPages = [
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
    let query = document.getElementById("search-box").value.toLowerCase();
    let suggestionsDiv = document.getElementById("suggestions");
    suggestionsDiv.innerHTML = ""; 

    if (query.length === 0) {
        return;
    }

    let matches = newsPages.filter(page => page.title.toLowerCase().includes(query));

    if (matches.length > 0) {
        matches.forEach(match => {
            let item = document.createElement("a");
            item.href = `${match.file}`;
            item.classList.add("list-group-item", "list-group-item-action");
            item.innerText = match.title; 
            suggestionsDiv.appendChild(item);
        });
    } else {
        let noMatch = document.createElement("div");
        noMatch.classList.add("list-group-item");
        noMatch.innerText = "No results found";
        suggestionsDiv.appendChild(noMatch);
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