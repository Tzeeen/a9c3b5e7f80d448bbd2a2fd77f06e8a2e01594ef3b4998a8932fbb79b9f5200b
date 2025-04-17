// JavaScript functionality
document.addEventListener('DOMContentLoaded', function () {
    // Load sample comments
    const sampleComments = [
        {
            author: "James Wilson",
            date: "June 16, 2025",
            text: "As a factory worker, I've seen firsthand how robots have taken over many tasks. It's scary but also exciting - I'm retraining as a robotics technician now."
        },
        {
            author: "Maria Garcia",
            date: "June 15, 2025",
            text: "The key is adaptation. We've gone through industrial revolutions before and emerged stronger. Education systems need to keep pace with technology."
        }
    ];

    const commentsContainer = document.getElementById('commentsContainer');

    sampleComments.forEach(comment => {
        addCommentToPage(comment.author, comment.date, comment.text);
    });
});

function addComment() {
    const commentText = document.getElementById('newComment').value.trim();
    if (commentText === "") {
        alert("Please enter a comment before posting.");
        return;
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    addCommentToPage("You", currentDate, commentText);

    // Clear the textarea
    document.getElementById('newComment').value = "";
}

function addCommentToPage(author, date, text) {
    const commentsContainer = document.getElementById('commentsContainer');
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `
        <div class="comment-author">${author}</div>
        <div class="comment-date">${date}</div>
        <p>${text}</p>
    `;
    commentsContainer.prepend(commentDiv);
}

function submitPoll() {
    // Get the selected radio button
    const selectedOption = document.querySelector('input[name="impact"]:checked');

    if (!selectedOption) {
        alert("Please select an option before voting.");
        return;
    }

    // Get the label text for the selected option
    const selectedLabel = document.querySelector(`label[for="${selectedOption.id}"]`).textContent;

    // Display results
    alert(`You choose: ${selectedLabel}`);

    // Here you would typically also:
    // 1. Save the vote to localStorage or a database
    // 2. Update the visual poll results display
}


const newsURL = "https://example.com/latest-news"; // Change this to your actual news link

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