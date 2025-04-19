const textLines = [
    "QUANTUM ",
    "COMPUTING ",
    "ADVANCEMENTS"
];
let currentLine = 0;
let index = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let lineDelay = 1500;
const typingElement = document.getElementById("typing");

// Adjust speeds for mobile devices
if (window.innerWidth < 768) {
    typingSpeed = 150;
    deletingSpeed = 75;
    lineDelay = 1000;
}

function type() {
    const currentText = textLines[currentLine];

    if (isDeleting) {
        // Delete character
        typingElement.textContent = currentText.substring(0, index - 1);
        index--;

        if (index === 0) {
            isDeleting = false;
            currentLine = (currentLine + 1) % textLines.length;
            setTimeout(type, 500);
            return;
        }
    } else {
        // Add character
        typingElement.textContent = currentText.substring(0, index + 1);
        index++;

        if (index === currentText.length) {
            if (currentLine === textLines.length - 1) {
                // All lines completed - start blinking cursor
                typingElement.classList.add('finished-typing');
                return;
            }
            isDeleting = true;
            setTimeout(type, lineDelay);
            return;
        }
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(type, speed);
}

// Add blinking cursor effect
const style = document.createElement('style');
style.textContent = `
    #typing {
      border-right: 2px solid #fff;
      animation: blink 1s step-end infinite;
    }
    #typing.finished-typing {
      border-right: none;
      animation: none;
    }
    @keyframes blink {
      from, to { border-color: transparent }
      50% { border-color: #fff; }
    }
  `;
document.head.appendChild(style);

// Start the typing effect
type();

// Show button on scroll
const backToTop = document.getElementById("backToTop");

window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
};

// Scroll to top on click
backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

const newsURL = "http://127.0.0.1:5502/News/Emerging/quantum/quantum.html"; 

document.getElementById('facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(newsURL)}`;
document.getElementById('twitter').href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(newsURL)}`;
document.getElementById('linkedin').href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(newsURL)}`;
document.getElementById('email').href = `mailto:?subject=Check out this news!&body=${encodeURIComponent(newsURL)}`;

function toggleShareMenu() {
    const menu = document.getElementById('shareMenu');
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function copyLink(event) {
    event.preventDefault();
    navigator.clipboard.writeText(newsURL).then(() => {
        alert("Link copied to clipboard!");
    });
}

// Close menu when clicking outside
document.addEventListener("click", function (event) {
    const shareContainer = document.querySelector(".share-container");
    if (!shareContainer.contains(event.target)) {
        document.getElementById('shareMenu').style.display = "none";
    }
});
