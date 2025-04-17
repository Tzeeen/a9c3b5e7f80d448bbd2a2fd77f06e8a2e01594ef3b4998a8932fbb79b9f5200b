document.addEventListener('DOMContentLoaded', function () {
    // Search Functionality
    const searchBtn = document.querySelector('.search-bar button');
    const searchInput = document.querySelector('.search-bar input');

    searchBtn.addEventListener('click', function () {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`Searching for: "${searchTerm}"`);
            // In a real app, this would filter articles
        }
    });

    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    function newsletter() {
        // Newsletter Subscription
        const newsletterForm = document.querySelector('.newsletter form');
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            if (email) {
                alert(`Thanks for subscribing with ${email}!`);
                newsletterForm.reset();
            }
        });

        // Smooth Scrolling for Navigation
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId !== '#') {
                    document.querySelector(targetId).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

});

document.getElementById("scrollLink").addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    document.querySelector(".latest-news").scrollIntoView({ behavior: "smooth" })
});

// Get the button
let backToTopButton = document.getElementById("backToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}