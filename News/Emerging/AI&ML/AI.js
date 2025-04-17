const text = "AI & MACHINE LEARNING BREAKTHROUGHS";
let index = 0;
const typingElement = document.getElementById("typing");

function type() {
    if (index < text.length) {
        typingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 100);
    }
}
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

const newsURL = "http://127.0.0.1:5502/News/Emerging/AI&ML/AI.html"; 

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
